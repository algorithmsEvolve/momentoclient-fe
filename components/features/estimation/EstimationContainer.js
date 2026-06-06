"use client";

import { useState, useMemo } from "react";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
import BundlingPackageCard from "./BundlingPackageCard";
import EstimationSidebar from "./EstimationSidebar";
import EstimationCartDrawer from "./EstimationCartDrawer";
import MaharVariantModal from "./MaharVariantModal";
import Navbar from "@/components/ui/Navbar";
import {
  buildEstimationProducts,
  flattenEstimationProducts,
  formatPrice,
  getAdjustedEstimationPrice,
  parsePrice,
} from "@/lib/estimationData";
import { Info } from "lucide-react";
import ImageViewer from "@/components/ui/ImageViewer";
import Image from "next/image";

export default function EstimationContainer({ pricingContent }) {
  const [activeCategory, setActiveCategory] = useState("seserahan");
  const [cart, setCart] = useState({});
  const [selectedTrayType, setSelectedTrayType] = useState(null);
  const [viewerState, setViewerState] = useState({ isOpen: false, src: "", alt: "" });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [maharModalProduct, setMaharModalProduct] = useState(null);
  const productsByCategory = useMemo(
    () => buildEstimationProducts(pricingContent),
    [pricingContent]
  );

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

      if (productId.startsWith("wcc-") && !productId.startsWith("wcc-addon-") && newQty > 0) {
        const nextCart = Object.fromEntries(
          Object.entries(prev).filter(([id]) => id === productId || !id.startsWith("wcc-") || id.startsWith("wcc-addon-"))
        );
        prev = nextCart;
      }

      if (productId.startsWith("bundling-") && newQty > 0) {
        const nextCart = Object.fromEntries(
          Object.entries(prev).filter(([id]) => id === productId || !id.startsWith("bundling-"))
        );
        prev = nextCart;
      }

      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }

      const product = flattenEstimationProducts(productsByCategory)
        .find((p) => p.id === productId);

      if (!product) return prev;

      return {
        ...prev,
        [productId]: {
          ...product,
          ...prev[productId],
          quantity: newQty,
        },
      };
    });
  };

  const updateCartItem = (productId, updates) => {
    setCart((prev) => {
      if (!prev[productId]) return prev;

      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          ...updates,
        },
      };
    });
  };

  const openMaharSelection = (product) => {
    if (product.type === "mahar") {
      setMaharModalProduct(product);
      return;
    }

    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: 1,
      },
    }));
  };

  const addMaharVariantToCart = (product, variant) => {
    const price = parsePrice(variant.price);

    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        price,
        displayPrice: formatPrice(price),
        selectedVariant: variant,
        quantity: 1,
      },
    }));
    setMaharModalProduct(null);
  };

  const currentProducts = useMemo(
    () => {
      if (activeCategory === "keepsake-bouqet") {
        return [
          ...(productsByCategory.keepsake || []),
          ...(productsByCategory.bouqet || []),
        ];
      }

      return productsByCategory[activeCategory] || [];
    },
    [activeCategory, productsByCategory]
  );

  const bundlingGroups = productsByCategory.bundlingGroups || [];

  const ringboxOptions = useMemo(
    () => (productsByCategory.seserahan || []).filter((product) => product.type === "ringbox"),
    [productsByCategory]
  );

  const bedcoverProduct = useMemo(
    () => (productsByCategory.seserahan || []).find((product) => product.type === "bedcover"),
    [productsByCategory]
  );
  
  const total = useMemo(() => {
    // Identify tray items
    const trayItems = Object.values(cart).filter((item) => item.id.startsWith("tray-"));
    const totalTrays = trayItems.reduce((sum, item) => sum + item.quantity, 0);

    let subtotal = 0;
    let discount = 0;
    let keepsakeBouquetSubtotal = 0;
    let hasKeepsakeItem = false;
    let hasBouquetItem = false;

    Object.values(cart).forEach((item) => {
      const pricePerItem = getAdjustedEstimationPrice(item, totalTrays);

      const itemBasePrice = item.type === "bundling-package"
        ? item.originalPriceValue || item.price
        : item.price;
      const itemTotal = itemBasePrice * item.quantity;
      subtotal += itemTotal;

      if (item.id.startsWith("keepsake-")) {
        keepsakeBouquetSubtotal += itemTotal;
        hasKeepsakeItem = true;
      }

      if (item.id.startsWith("bouquet-")) {
        keepsakeBouquetSubtotal += itemTotal;
        hasBouquetItem = true;
      }

      // Calculate original subtotal for discount display
      if (totalTrays > 6 && item.id.startsWith("tray-")) {
        discount += (item.price - pricePerItem) * item.quantity;
      }

      if (item.type === "bundling-package") {
        discount += ((item.originalPriceValue || item.price) - item.price) * item.quantity;
      }
    });

    if (hasKeepsakeItem && hasBouquetItem) {
      discount += Math.round(keepsakeBouquetSubtotal * 0.1);
    }

    return { subtotal, discount, total: subtotal - discount };
  }, [cart]);

  const totalTraysCount = Object.values(cart)
    .filter((item) => item.id.startsWith("tray-"))
    .reduce((sum, item) => sum + item.quantity, 0);
  const hasSelectedMahar = Object.values(cart).some(
    (item) => item.type === "mahar" && item.quantity > 0
  );
  const cartItemCount = Object.values(cart)
    .filter((item) => item.quantity > 0)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar
        onOpenCart={() => setIsCartDrawerOpen(true)}
        cartItemCount={cartItemCount}
      />
      <EstimationCartDrawer 
        isOpen={isCartDrawerOpen} 
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        summary={total}
        updateQuantity={updateQuantity}
        updateCartItem={updateCartItem}
        ringboxOptions={ringboxOptions}
        bedcoverProduct={bedcoverProduct}
        onEditItem={openMaharSelection}
      />
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 xl:px-12 flex flex-col lg:flex-row items-start gap-8 xl:gap-12 py-10 md:py-20 overflow-hidden lg:overflow-visible">
        {/* Left Column: Products Selection */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden lg:overflow-visible">
          <CategoryTabs 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />

          {activeCategory === "seserahan" && (
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                selectedTrayType ? "max-h-[260px] opacity-100 mb-8 md:max-h-[140px]" : "max-h-0 opacity-0 mb-0"
              }`}
            >
              <div className="flex items-start gap-3 bg-[#161616] rounded-[10px] p-4">
                <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-[2px]" />
                <div className="flex flex-col space-y-2 md:space-y-1">
                  <p className="text-white font-montserrat font-medium text-[12px] leading-[20px] tracking-[0.5px]">
                    • Kamu hanya dapat memilih 1 jenis tray, hapus jika ingin mengubah jenis tray yang lain
                  </p>
                  {totalTraysCount > 7 && (
                    <p className="text-white font-montserrat font-medium text-[12px] leading-[20px] tracking-[0.5px]">
                      • Kamu mendapatkan <span className="font-bold">FREE RINGBOX</span> karena memesan lebih dari 7 Box
                    </p>
                  )}
                  {totalTraysCount > 9 && (
                    <p className="text-white font-montserrat font-medium text-[12px] leading-[20px] tracking-[0.5px]">
                      • Kamu mendapatkan <span className="font-bold">FREE HIAS BEDCOVER</span> karena memesan lebih dari 9 Box
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeCategory === "mahar" && hasSelectedMahar && totalTraysCount >= 6 && (
            <div className="mb-8 flex items-start gap-3 rounded-[10px] bg-[#161616] p-4">
              <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-[2px]" />
              <p className="text-white font-montserrat font-medium text-[12px] leading-[20px] tracking-[0.5px]">
                • Kamu mendapatkan <span className="font-bold">FREE SEWA RINGBOX, HIAS BEDCOVER, KOTAK MAHAR ASLI DAN REPLIKA MAHAR</span> karena telah memesan minimal 6 Tray Seserahan dan Frame Mahar
              </p>
            </div>
          )}

          {activeCategory === "bundling" && bundlingGroups.length > 0 ? (
            <div className="flex w-full flex-col gap-[28px] md:gap-[34px]">
              {bundlingGroups.map((group) => (
                <section key={group.id} className="w-full">
                  <div className="mb-[22px]">
                    <p className="mb-[6px] font-montserrat text-[15px] font-semibold leading-none text-[#B1B1B1] md:text-[16px]">
                      {group.eyebrow || "Bundling"}
                    </p>
                    <h2 className="font-serif text-[22px] font-bold uppercase leading-[28px] text-white md:text-[24px]">
                      {group.category}
                    </h2>
                  </div>

                  <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-2">
                    {group.packages.map((pkg) => {
                      const selectedBundlingPackageId = Object.values(cart).find((item) => item.type === "bundling-package")?.id;
                      const isBundlingPackageDisabled = Boolean(selectedBundlingPackageId && selectedBundlingPackageId !== pkg.id);

                      return (
                        <BundlingPackageCard
                          key={pkg.id}
                          pkg={pkg}
                          quantity={cart[pkg.id]?.quantity || 0}
                          isDisabled={isBundlingPackageDisabled}
                          onSelect={(product) => {
                            if (!cart[product.id]?.quantity) updateQuantity(product.id, 1);
                          }}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : currentProducts.length === 0 ? (
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
            <div className={activeCategory === "wcc" ? "grid w-full grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-6 md:gap-y-6 xl:grid-cols-6 xl:gap-x-[30px]" : "grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-x-6 xl:gap-x-8 md:gap-y-8 w-full"}>
              {currentProducts.map((product) => {
                const isDisabled = activeCategory === "seserahan" && product.id.startsWith("tray-") && selectedTrayType && selectedTrayType !== product.id;
                const isMaxLimitReached = activeCategory === "seserahan" && product.id.startsWith("tray-") && (cart[product.id]?.quantity || 0) >= 11;
                const hideImage = (activeCategory === "wcc" && product.type !== "wcc-package") || activeCategory === "bundling";
                const isMaharAddOn = activeCategory === "mahar" && product.type === "mahar-addon";
                const showMaharAction = activeCategory === "mahar" && product.type === "mahar";
                const showWccAction = activeCategory === "wcc" && product.type === "wcc-package";
                const selectedWccPackageId = Object.values(cart).find((item) => item.type === "wcc-package")?.id;
                const isWccPackageDisabled = activeCategory === "wcc" && product.type === "wcc-package" && selectedWccPackageId && selectedWccPackageId !== product.id;
                return (
                  <div key={product.id} className={`flex justify-center w-full ${activeCategory === "wcc" && product.type === "wcc-package" ? "col-span-2 md:col-span-1 xl:col-span-2" : "xl:justify-start"}`}>
                    <ProductCard
                      product={product}
                      category={activeCategory}
                      quantity={cart[product.id]?.quantity || 0}
                      updateQuantity={updateQuantity}
                      openViewer={(src, alt) => setViewerState({ isOpen: true, src, alt })}
                      isDisabled={isDisabled || isWccPackageDisabled}
                      isMaxLimitReached={isMaxLimitReached}
                      hideImage={hideImage}
                      actionLabel={showMaharAction || showWccAction ? "Pilih Item" : null}
                      selectedActionLabel={showMaharAction || showWccAction ? "Telah Dipilih" : null}
                      onAction={showMaharAction ? openMaharSelection : showWccAction ? (product) => {
                        if (!cart[product.id]?.quantity) updateQuantity(product.id, 1);
                      } : null}
                      hideControls={isMaharAddOn && !hasSelectedMahar}
                      hideNote={isMaharAddOn && hasSelectedMahar}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Estimation Sidebar (Visible only on Desktop) */}
        <div className="hidden lg:sticky lg:top-[100px] lg:block lg:self-start">
          <EstimationSidebar
            cart={cart}
            summary={total}
            updateQuantity={updateQuantity}
            updateCartItem={updateCartItem}
            ringboxOptions={ringboxOptions}
            bedcoverProduct={bedcoverProduct}
            onEditItem={openMaharSelection}
          />
        </div>
      </div>
      <MaharVariantModal
        isOpen={Boolean(maharModalProduct)}
        product={maharModalProduct}
        existingItem={maharModalProduct ? cart[maharModalProduct.id] : null}
        onClose={() => setMaharModalProduct(null)}
        onSubmit={addMaharVariantToCart}
      />
      <ImageViewer
        src={viewerState.src}
        alt={viewerState.alt}
        isOpen={viewerState.isOpen}
        onClose={() => setViewerState({ ...viewerState, isOpen: false })}
      />
    </>
  );
}
