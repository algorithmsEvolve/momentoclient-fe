"use client";

import { formatPrice, parsePrice } from "@/lib/estimationData";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import RingboxSelector from "./RingboxSelector";

export default function EstimationSidebar({ cart, summary, updateQuantity }) {
  const { subtotal, discount, total } = summary;
  const cartItems = Object.values(cart).filter((item) => item.quantity > 0);
  const totalTrays = cartItems.filter(item => item.id.startsWith('tray-')).reduce((sum, item) => sum + item.quantity, 0);
  const [selectedRingbox, setSelectedRingbox] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const ringboxPrice = selectedRingbox ? parsePrice(selectedRingbox.price) : 0;
  const bedcoverPrice = totalTrays > 9 ? 65000 : 0;
  
  // Calculate display values
  const displaySubtotal = subtotal + ringboxPrice + bedcoverPrice;
  const displayDiscount = discount + ringboxPrice + bedcoverPrice;
  const finalTotal = subtotal - discount; // Free items don't increase final cost

  // Logic to get the adjusted price per item for display in cart list
  const getAdjustedPrice = (item) => {
    if (discount > 0 && item.id.startsWith("tray-")) {
      if (["tray-kurogane", "tray-shirayuki", "tray-mokuyo", "tray-himitsu"].includes(item.id)) return 60000;
      if (item.id === "tray-suisho") return 80000;
      if (item.id === "tray-kagayaki") return 90000;
    }
    return item.price;
  };

  const handleOrder = () => {
    if (cartItems.length === 0) return;

    const ringboxText = selectedRingbox ? `\n*Ringbox: ${selectedRingbox.name} (${selectedRingbox.price})*` : "";
    const bedcoverText = totalTrays > 9 ? `\n*Hias Bedcover (Free)*` : "";

    const message = encodeURIComponent(
      `Halo Momento, saya ingin memesan paket berikut:\n\n${cartItems
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.name} (${item.quantity}x) - ${formatPrice(
              getAdjustedPrice(item) * item.quantity
            )}`
        )
        .join("\n")}${ringboxText}${bedcoverText}\n\n*Subtotal: ${formatPrice(displaySubtotal)}*\n*Diskon: -${formatPrice(displayDiscount)}*\n*Total: ${formatPrice(finalTotal)}*`
    );

    window.open(`https://wa.me/message/ZD27PNJNNSFNF1?text=${message}`, "_blank");
  };

  return (
    <aside className="w-full lg:w-[400px] flex-shrink-0 lg:self-start lg:sticky lg:top-[100px]">
      <div className="bg-[#161616] rounded-[20px] p-[25px] flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
        <h2 className="text-[20px] font-montserrat font-bold text-white mb-6 pb-6 border-b border-[#292929]">
          Estimasi Harga
        </h2>

        {/* Selected Items List */}
        <div className={`flex-1 mb-8 space-y-6 pr-2 custom-scrollbar overflow-x-hidden ${isDropdownOpen ? 'overflow-visible' : 'overflow-y-auto'}`}>
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
              <p className="text-white font-montserrat italic text-[14px]">
                Belum ada produk yang dipilih
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const adjustedPrice = getAdjustedPrice(item);
              const isTray = item.id.startsWith("tray-");
              return (
                <div key={item.id} className="flex flex-col gap-0">
                  <div className="flex gap-4 items-center">
                    {/* Trash Icon */}
                    <button 
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                    </button>

                    <div className="flex-1 space-y-3">
                      {/* Row 1: Name (Left) and Unit Price (Right) */}
                      <div className="flex justify-between items-center">
                        <span className="text-white font-montserrat font-bold text-[14px]">
                          {item.name}
                        </span>
                        <span className="text-[#FFF] font-montserrat font-normal text-[14px]">
                          {formatPrice(adjustedPrice)}
                        </span>
                      </div>

                      {/* Row 2: Counter (Left) and Subtotal (Right) */}
                      <div className="flex justify-between items-center">
                        {/* Compact Counter */}
                        <div className="flex items-center w-[120px] h-[30px] rounded-[10px] border border-[#2C2C2C] relative">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-[40px] h-full bg-[#2C2C2C] rounded-l-[9px] flex items-center justify-center transition-all hover:bg-[#333] cursor-pointer"
                          >
                            <Minus className="w-4 h-4 text-[#FFF]" />
                          </button>
                          <div className="flex-1 h-full bg-[#161616] flex items-center justify-center border-l border-r border-[#2C2C2C]">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) updateQuantity(item.id, val - item.quantity);
                              }}
                              className="w-full h-full bg-transparent text-center font-montserrat font-semibold text-white text-[12px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                          <div className="relative h-full flex group/tooltip">
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.id.startsWith("tray-") && item.quantity >= 11}
                              className={`w-[40px] h-full flex items-center justify-center rounded-r-[9px] transition-all ${item.id.startsWith("tray-") && item.quantity >= 11 ? "bg-[#777] cursor-not-allowed" : "grad-gold cursor-pointer active:scale-95"}`}
                            >
                              <Plus className={`w-4 h-4 ${item.id.startsWith("tray-") && item.quantity >= 11 ? "text-[#FFF]" : "text-[#000]"}`} />
                            </button>

                            {item.id.startsWith("tray-") && item.quantity >= 11 && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[180px] p-2 bg-[#252525] text-white text-[11px] leading-snug font-montserrat font-medium text-center rounded-[8px] shadow-xl border border-white/10 opacity-0 invisible -translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none">
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#252525]"></div>
                                1 Jenis Tray maksimal hanya bisa disewa sebanyak 11 Tray
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-white font-montserrat font-bold text-[14px]">
                          {formatPrice(adjustedPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ringbox Selector and Bedcover rendered immediately below the tray item */}
                  {isTray && (
                    <div className="ml-[40px]">
                      {totalTrays >= 8 && (
                        <RingboxSelector 
                          selectedRingbox={selectedRingbox} 
                          onSelect={setSelectedRingbox}
                          onOpenChange={setIsDropdownOpen}
                        />
                      )}
                      
                      {totalTrays > 9 && (
                        <div className="mt-4 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-montserrat font-bold text-[14px]">Hias Bedcover</span>
                            <span className="text-white font-montserrat font-medium text-[12px]">Free</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60 font-montserrat text-[12px]">1 pcs</span>
                            <span className="text-white font-montserrat font-bold text-[14px]">Rp. 65.000</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Sidebar */}
        <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-montserrat text-[12px]">Subtotal</span>
            <span className="text-white font-montserrat font-bold text-[12px]">{formatPrice(displaySubtotal)}</span>
          </div>
          {displayDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-white font-montserrat text-[12px]">Diskon</span>
              <span className="text-white font-montserrat italic text-[12px] tracking-[0px]">-{formatPrice(displayDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-4 border-t border-[#292929]">
            <span className="text-white font-montserrat font-semibold text-[20px] tracking-[-2.5%]">Total :</span>
            <span className="text-white font-montserrat font-bold text-[20px] tracking-[-2.5%]">{formatPrice(finalTotal)}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={cartItems.length === 0}
            className={`w-full py-[15px] rounded-[12px] font-montserrat font-bold text-[16px] transition-all duration-300 shadow-2xl ${
              cartItems.length > 0
                ? "btn-gold hover:scale-[1.02] active:scale-[0.98] hover:shadow-gold/20"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            Pesan Sekarang
          </button>

          <p className="text-white/30 font-montserrat italic text-[10px] md:text-[12px] mt-4 text-center leading-relaxed">
            *Untuk Sementara, kamu akan otomatis diarahkan ke whatsapp admin untuk pemesanan
          </p>
        </div>
      </div>
    </aside>
  );
}
