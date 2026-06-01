"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export default function ProductCard({
  product,
  quantity,
  updateQuantity,
  openViewer,
  isDisabled,
  isMaxLimitReached,
  hideImage,
  actionLabel,
  selectedActionLabel,
  onAction,
  hideControls = false,
  hideNote = false,
}) {
  const isSelected = quantity > 0;
  const counterIconColor = isSelected ? "text-[#D4AF37]" : "text-white";
  const disabledIconColor = "text-white/35";
  const isMaharCard = product.type === "mahar" || product.type === "mahar-addon";
  const isKeepsakeBouquetCard = product.id?.startsWith("keepsake-") || product.id?.startsWith("bouquet-");
  const isWccPackage = product.type === "wcc-package";
  const isWccAddOn = product.type === "wcc-addon";
  const cardHeightClass = actionLabel || isMaharCard
    ? "h-[300px] md:h-[340px]"
    : isKeepsakeBouquetCard
      ? "h-[330px] md:h-[340px]"
    : isWccAddOn
      ? "h-[175px]"
    : "h-[260px] md:h-[300px]";
  const controlMarginClass = isWccAddOn ? "mt-0" : isKeepsakeBouquetCard ? "mt-auto" : isMaharCard ? "mt-[18px]" : "mt-[13px]";
  const counterWidthClass = isKeepsakeBouquetCard ? "w-full" : isWccAddOn ? "w-full" : "w-[126px] md:w-[145px]";

  if (isWccPackage) {
    return (
      <div
        className={`group flex h-[480px] w-full max-w-[295px] flex-col overflow-hidden rounded-[8px] border bg-[#161616] transition-all duration-300 md:h-[304px] ${
          isSelected ? "border-[#4A4127]" : "border-transparent"
        } ${isDisabled ? "opacity-45" : ""}`}
      >
        <div className={`flex h-full flex-col transition-opacity duration-300 ${
          isSelected ? "opacity-100" : isDisabled ? "opacity-55" : "opacity-100"
        }`}
        >
        <div
          className={`relative h-[260px] w-full flex-shrink-0 overflow-hidden md:h-[156px] ${!isDisabled ? "cursor-zoom-in" : ""}`}
          onClick={() => !isDisabled && openViewer(product.image, product.name)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-[19px] p-[15px]">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-montserrat text-[16px] font-bold leading-[20px] tracking-[-0.025em] text-[#D4AF37]">
                {product.name}
              </h3>
              <span className="shrink-0 pt-[2px] font-montserrat text-[14px] font-bold leading-[17px] text-white">
                {product.displayPrice}
              </span>
            </div>
            <p className="mt-[7px] line-clamp-2 font-montserrat text-[12px] font-normal leading-[18px] text-white">
              {product.desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => !isDisabled && onAction?.(product)}
            disabled={isDisabled}
            className={`flex h-[36px] w-full shrink-0 items-center justify-center rounded-[8px] border font-montserrat text-[12px] font-semibold leading-[22px] transition-all ${
              isSelected
                ? "border-[#4A4127] bg-transparent text-[#D4AF37]"
                : "border-transparent bg-[#252525] text-white hover:bg-[#2D2D2D]"
            } ${
              isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"
            }`}
          >
            {isSelected ? selectedActionLabel || "Telah Dipilih" : actionLabel || "Pilih Item"}
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#161616] ${isWccAddOn ? "w-full max-w-[150px]" : "w-[150px] md:w-[173px]"} ${cardHeightClass} rounded-[10px] overflow-hidden flex flex-col border transition-all duration-300 ${
        isSelected ? "border-[#4A4127] shadow-[0_0_0_1px_rgba(212,175,55,0.08)]" : "border-transparent"
      } ${isDisabled ? "opacity-30 grayscale" : "group"}`}
    >
      {/* Product Image - Clickable for Image Viewer */}
      {!hideImage && (
        <div 
          className={`relative w-[150px] md:w-[173px] h-[145px] md:h-[180px] overflow-hidden flex-shrink-0 ${!isDisabled ? "cursor-zoom-in" : ""}`}
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
      <div className={`flex flex-col flex-1 px-[12px] pb-[12px] pt-[14px] md:px-[15px] md:pb-[18px] md:pt-[17px] ${hideImage ? "pt-4" : ""} ${isWccAddOn ? "justify-between gap-[28px] px-[13px] py-[13px] md:px-[13px] md:py-[13px]" : ""}`}>
        <div>
          <h3 className={`text-white font-montserrat font-bold mb-[3px] leading-[20px] ${hideImage ? "text-[14px] leading-snug mb-2" : "text-[15px] md:text-[16px]"} ${isWccAddOn ? "text-[12px] leading-[16px] md:text-[13px]" : ""}`}>
            {product.name}
          </h3>
          <p className={`text-white font-montserrat font-normal text-[12px] leading-[22px] ${isWccAddOn ? "text-[9px] leading-[14px]" : ""}`}>
            {product.displayPrice}
          </p>
        </div>

        {product.note && !hideNote && (
          <p className="mt-[13px] font-montserrat text-[10px] italic leading-[14px] text-[#D4AF37]/70">
            {product.note}
          </p>
        )}

        {hideControls ? null : actionLabel ? (
          <button
            onClick={() => !isDisabled && onAction?.(product)}
            disabled={isDisabled}
            className={`${controlMarginClass} flex h-[35px] w-full items-center justify-center rounded-[10px] border font-montserrat text-[12px] font-semibold tracking-[0.5px] transition-all duration-300 ${
              isSelected
                ? "border-[#4A4127] text-[#D4AF37]"
                : "border-transparent bg-[#252525] text-white hover:bg-[#2D2D2D]"
            } ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer active:scale-[0.98]"}`}
          >
            {isSelected ? selectedActionLabel || "Telah Dipilih" : actionLabel}
          </button>
        ) : (
          <div
            className={`${controlMarginClass} flex items-center ${counterWidthClass} h-[35px] rounded-[10px] overflow-hidden border mx-auto relative transition-colors duration-300 ${
              isSelected ? "border-[#4A4127]" : "border-transparent"
            }`}
          >

          {/* Minus Button Wrapper - Resized to 30x30 */}
          <button
            onClick={() => updateQuantity(product.id, -1)}
            disabled={isDisabled || quantity === 0}
            className={`${isWccAddOn ? "w-[30px]" : "w-[35px]"} h-[35px] bg-[#242424] rounded-l-[9px] flex items-center justify-center transition-all ${
              isDisabled || quantity === 0 ? "cursor-not-allowed" : "cursor-pointer active:scale-95"
            } group/minus`}
          >
            <Minus 
              strokeWidth={3}
              className={`${isWccAddOn ? "h-[16px] w-[16px]" : "h-[20px] w-[20px]"} transition-colors ${
                isDisabled || quantity === 0 ? disabledIconColor : counterIconColor
              }`} 
            />
          </button>
          
          {/* Qty Display Wrapper - Expanded to fill remaining space */}
          <div className="flex-1 h-full bg-[#131313] flex items-center justify-center border-l border-r border-[#2C2C2C]">
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


          {/* Plus Button Wrapper */}
          <div className="relative h-full flex group/tooltip">
            <button
              onClick={() => updateQuantity(product.id, 1)}
              disabled={isDisabled || isMaxLimitReached}
              className={`h-[35px] ${isWccAddOn ? "w-[30px]" : "w-[35px]"} bg-[#242424] flex items-center justify-center rounded-r-[9px] transition-all ${isDisabled || isMaxLimitReached ? "cursor-not-allowed" : "cursor-pointer active:scale-95"} group/plus`}
            >
              <Plus
                strokeWidth={2.7}
                className={`${isWccAddOn ? "h-[16px] w-[16px]" : "h-[20px] w-[20px]"} transition-colors ${
                  isDisabled || isMaxLimitReached ? disabledIconColor : counterIconColor
                }`}
              />
            </button>

            {isMaxLimitReached && (
              <div className="absolute top-full right-0 mt-2 w-[160px] p-2 bg-[#252525] text-white text-[11px] leading-snug font-montserrat font-medium text-center rounded-[8px] shadow-xl border border-white/10 opacity-0 invisible -translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none">
                <div className="absolute bottom-full right-3 border-4 border-transparent border-b-[#252525]"></div>
                1 Jenis Tray maksimal hanya bisa disewa sebanyak 11 Tray
              </div>
            )}
          </div>
        </div>
        )}

      </div>
    </div>
  );
}
