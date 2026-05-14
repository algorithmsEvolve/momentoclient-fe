"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export default function ProductCard({ product, quantity, updateQuantity, openViewer, isDisabled, isMaxLimitReached, hideImage }) {
  return (
    <div className={`bg-[#161616] w-[150px] md:w-[173px] h-[240px] md:h-[262px] rounded-[10px] border border-[#292929] overflow-hidden flex flex-col transition-all duration-300 ${isDisabled ? 'opacity-30 grayscale' : 'group'}`}>
      {/* Product Image - Clickable for Image Viewer */}
      {!hideImage && (
        <div 
          className={`relative w-[150px] md:w-[173px] h-[130px] md:h-[144px] overflow-hidden flex-shrink-0 ${!isDisabled ? 'cursor-zoom-in' : ''}`}
          onClick={() => !isDisabled && openViewer(product.image, product.name)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      {/* Product Info */}
      <div className={`flex flex-col flex-1 p-[8px] md:p-[10px] ${hideImage ? 'pt-4' : ''}`}>
        <h3 className={`text-white font-montserrat font-bold tracking-[-2.5%] mb-0.5 leading-none ${hideImage ? 'text-[14px] leading-snug mb-2' : 'text-[13px] md:text-[16px]'}`}>
          {product.name}
        </h3>
        <p className="text-white font-montserrat font-normal text-[11px] md:text-[12px] mb-4">
          {product.displayPrice}
        </p>

        {/* Counter UI - Precise Figma 145x30 (Mobile adjusted to 135px width) */}
        <div className="mt-auto flex items-center w-[135px] md:w-[145px] h-[30px] rounded-[10px] overflow-hidden border border-[#2C2C2C] mx-auto relative">

          {/* Minus Button Wrapper - Resized to 30x30 */}
          <button
            onClick={() => updateQuantity(product.id, -1)}
            disabled={isDisabled || quantity === 0}
            className={`w-[40px] md:w-[45px] h-full bg-[#2C2C2C] rounded-l-[9px] flex items-center justify-center transition-all cursor-pointer group/minus`}
          >
            <Minus 
              className={`w-[18px] md:w-[20px] h-[18px] md:h-[20px] transition-colors ${
                !isDisabled && quantity > 0 ? "text-[#FFF]" : "text-[#777]"
              }`} 
            />
          </button>
          
          {/* Qty Display Wrapper - Expanded to fill remaining space */}
          <div className="flex-1 h-full bg-[#161616] flex items-center justify-center border-l border-r border-[#2C2C2C]">
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) updateQuantity(product.id, val - quantity);
              }}
              disabled={isDisabled}
              className="w-full h-full bg-transparent text-center font-montserrat font-semibold text-white text-[12px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:cursor-not-allowed"
            />
          </div>


          {/* Plus Button Wrapper - Resized to 30x30 with Gold Gradient */}
          <div className="relative h-full flex group/tooltip">
            <button
              onClick={() => updateQuantity(product.id, 1)}
              disabled={isDisabled || isMaxLimitReached}
              className={`w-[40px] md:w-[45px] h-full flex items-center justify-center rounded-r-[9px] transition-all ${isDisabled || isMaxLimitReached ? "cursor-not-allowed" : "cursor-pointer active:scale-95"} group/plus`}
              style={{
                background: isDisabled || isMaxLimitReached ? "#777" : "linear-gradient(90deg, #D4AF37 0%, #CF953C 100%)"
              }}
            >
              <Plus className="w-[18px] md:w-[20px] h-[18px] md:h-[20px] text-[#000]" />
            </button>

            {isMaxLimitReached && (
              <div className="absolute top-full right-0 mt-2 w-[160px] p-2 bg-[#252525] text-white text-[11px] leading-snug font-montserrat font-medium text-center rounded-[8px] shadow-xl border border-white/10 opacity-0 invisible -translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none">
                <div className="absolute bottom-full right-3 border-4 border-transparent border-b-[#252525]"></div>
                1 Jenis Tray maksimal hanya bisa disewa sebanyak 11 Tray
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
