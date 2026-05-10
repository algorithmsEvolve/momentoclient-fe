"use client";

import { useState, useMemo } from "react";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
import EstimationSidebar from "./EstimationSidebar";
import { estimationProducts } from "@/lib/estimationData";
import { Info } from "lucide-react";
import ImageViewer from "@/components/ui/ImageViewer";
import Image from "next/image";

export default function EstimationContainer() {
  const [activeCategory, setActiveCategory] = useState("seserahan");
  const [cart, setCart] = useState({});
  const [selectedTrayType, setSelectedTrayType] = useState(null);
  const [viewerState, setViewerState] = useState({ isOpen: false, src: "", alt: "" });

  const updateQuantity = (productId, delta) => {
    setCart((prev) => {
      const currentQty = prev[productId]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);

      // Tray selection logic
      if (activeCategory === "seserahan" && productId.startsWith("tray-")) {
        if (newQty > 11) return prev; // Limit max trays to 11
        if (newQty > 0 && !selectedTrayType) setSelectedTrayType(productId);
        if (newQty === 0 && selectedTrayType === productId) {
          // Check if any other tray has qty
          const others = Object.entries(prev).find(([id, item]) => id.startsWith("tray-") && id !== productId && item.quantity > 0);
          if (!others) setSelectedTrayType(null);
        }
      }

      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }

      const product = Object.values(estimationProducts)
        .flat()
        .find((p) => p.id === productId);

      return { ...prev, [productId]: { ...product, quantity: newQty } };
    });
  };

  const currentProducts = useMemo(() => estimationProducts[activeCategory] || [], [activeCategory]);
const total = useMemo(() => {
  // Identify tray items
  const trayItems = Object.values(cart).filter((item) => item.id.startsWith("tray-"));
  const totalTrays = trayItems.reduce((sum, item) => sum + item.quantity, 0);

  let subtotal = 0;
  let discount = 0;

  Object.values(cart).forEach((item) => {
    let pricePerItem = item.price;

    // Apply discount logic for trays > 6
    if (totalTrays > 6 && item.id.startsWith("tray-")) {
      if (["tray-kurogane", "tray-shirayuki", "tray-mokuyo", "tray-himitsu"].includes(item.id)) {
        pricePerItem = 60000;
      } else if (item.id === "tray-suisho") {
        pricePerItem = 80000;
      } else if (item.id === "tray-kagayaki") {
        pricePerItem = 90000;
      }
    }

    const itemTotal = pricePerItem * item.quantity;
    subtotal += itemTotal;

    // Calculate original subtotal for discount display
    if (totalTrays > 6 && item.id.startsWith("tray-")) {
      discount += (item.price - pricePerItem) * item.quantity;
    }
  });

  return { subtotal, discount, total: subtotal - discount };
}, [cart]);

const totalTraysCount = Object.values(cart)
  .filter((item) => item.id.startsWith("tray-"))
  .reduce((sum, item) => sum + item.quantity, 0);

return (
  <>
    <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-start gap-10 py-10 md:py-20">
      {/* Left Column: Products Selection */}
      <div className="flex-1 flex flex-col min-w-0">
        <CategoryTabs 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {activeCategory === "seserahan" && (
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              selectedTrayType ? "max-h-[100px] opacity-100 mb-8" : "max-h-0 opacity-0 mb-0"
            }`}
          >
            <div className="flex items-start gap-3 bg-[#161616] rounded-[10px] p-4">
              <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-[2px]" />
              <div className="flex flex-col space-y-1">
                <p className="text-white font-montserrat font-medium text-[12px] tracking-[0.5px]">
                  • Kamu hanya dapat memilih 1 jenis tray, hapus jika ingin mengubah jenis tray yang lain
                </p>
                {totalTraysCount > 7 && (
                  <p className="text-white font-montserrat font-medium text-[12px] tracking-[0.5px]">
                    • Kamu mendapatkan <span className="font-bold">FREE RINGBOX</span> karena memesan lebih dari 7 Box
                  </p>
                )}
                {totalTraysCount > 9 && (
                  <p className="text-white font-montserrat font-medium text-[12px] tracking-[0.5px]">
                    • Kamu mendapatkan <span className="font-bold">FREE HIAS BEDCOVER</span> karena memesan lebih dari 9 Box
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
          {currentProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[400px] bg-[#161616] rounded-[20px] border border-white/5">
              <div className="relative w-[80px] h-[80px] mb-8 opacity-20">
                <Image 
                  src="/images/momento-logo.png" 
                  alt="Momento" 
                  fill 
                  className="object-contain grayscale"
                />
              </div>
              <h2 className="text-[24px] font-serif font-bold text-white/40 mb-2 uppercase">
                On Progress
              </h2>
              <p className="text-white/30 font-montserrat text-[14px] max-w-[320px] leading-relaxed italic">
                Kategori ini sedang dalam tahap persiapan. Nantikan update harganya segera!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-8">
              {currentProducts.map((product) => {
                const isDisabled = activeCategory === "seserahan" && product.id.startsWith("tray-") && selectedTrayType && selectedTrayType !== product.id;
                const isMaxLimitReached = activeCategory === "seserahan" && product.id.startsWith("tray-") && (cart[product.id]?.quantity || 0) >= 11;
                return (
                  <div key={product.id} className="flex justify-center md:justify-start">
                    <ProductCard
                      product={product}
                      quantity={cart[product.id]?.quantity || 0}
                      updateQuantity={updateQuantity}
                      openViewer={(src, alt) => setViewerState({ isOpen: true, src, alt })}
                      isDisabled={isDisabled}
                      isMaxLimitReached={isMaxLimitReached}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Estimation Sidebar */}
        <EstimationSidebar cart={cart} summary={total} updateQuantity={updateQuantity} />
      </div>
      <ImageViewer
        src={viewerState.src}
        alt={viewerState.alt}
        isOpen={viewerState.isOpen}
        onClose={() => setViewerState({ ...viewerState, isOpen: false })}
      />
    </>
  );
}
