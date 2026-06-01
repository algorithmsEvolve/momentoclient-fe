"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice, parsePrice } from "@/lib/estimationData";

export default function MaharVariantModal({
  product,
  existingItem,
  isOpen,
  onClose,
  onSubmit,
}) {
  const variants = useMemo(
    () => (Array.isArray(product?.variants) ? product.variants : []),
    [product]
  );
  const [selectedState, setSelectedState] = useState({ productId: null, variant: null });
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen || !product) return null;

  const selectedVariant =
    selectedState.productId === product.id
      ? selectedState.variant
      : existingItem?.selectedVariant || variants[0] || null;
  const selectedPrice = parsePrice(selectedVariant?.price);
  const selectedSize = selectedVariant?.size || selectedVariant?.label || selectedVariant?.name;

  const handleSubmit = () => {
    if (!selectedVariant) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setIsClosing(false);
      onSubmit(product, selectedVariant);
    }, 170);
  };

  const handleClose = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 170);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
      <div
        className={`absolute inset-0 bg-black/72 ${
          isClosing ? "estimation-modal-backdrop--closing" : "estimation-modal-backdrop"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative z-10 w-full max-w-[660px] overflow-hidden rounded-[10px] bg-[#161616] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${
          isClosing ? "estimation-modal-panel--closing" : "estimation-modal-panel"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-[20px] top-[20px] z-20 flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-white transition-colors hover:text-[#D4AF37]"
          aria-label="Tutup modal variasi mahar"
        >
          <X className="h-[24px] w-[24px]" strokeWidth={2.4} />
        </button>

        <div className="px-[20px] pb-[47px] pt-[22px] md:px-[35px]">
          <h2 className="font-montserrat text-[16px] font-bold leading-tight tracking-[-0.025em] text-white md:text-[24px]">
            Pilih Variasi Mahar
          </h2>

          <div className="mt-[20px] flex gap-[20px] md:gap-[25px]">
            <div className="relative h-[130px] w-[125px] flex-shrink-0 overflow-hidden rounded-[5px] bg-[#252525]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1 pt-[2px]">
              <p className="mb-[13px] font-montserrat text-[12px] font-semibold leading-none text-white md:text-[16px]">
                Ukuran Mahar :
              </p>

              <div className="flex flex-wrap gap-[12px]">
                {variants.map((variant) => {
                  const variantSize = variant.size || variant.label || variant.name;
                  const isSelected = selectedSize === variantSize;

                  return (
                    <button
                      key={`${variantSize}-${variant.price}`}
                      type="button"
                      onClick={() => setSelectedState({ productId: product.id, variant })}
                      className={`h-[44px] min-w-[90px] cursor-pointer rounded-[5px] border px-[20px] font-montserrat text-[12px] font-semibold tracking-[0.5px] transition-all duration-200 md:text-[16px] ${
                        isSelected
                          ? "border-[#D4AF37] text-[#D4AF37] shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
                          : "border-transparent bg-[#252525] text-white hover:bg-[#2D2D2D] hover:translate-y-[-1px]"
                      }`}
                    >
                      {variantSize}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#292929] px-[20px] py-[20px] md:px-[35px]">
          <div>
            <p className="font-montserrat text-[12px] font-semibold leading-none text-white md:text-[16px]">
              Jumlah Harga :
            </p>
            <p className="mt-[8px] font-montserrat text-[16px] font-bold leading-none text-white md:text-[24px]">
              {formatPrice(selectedPrice)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedVariant}
            className="btn-gold cursor-pointer rounded-[5px] px-[21px] py-[12px] font-montserrat text-[12px] font-semibold tracking-[0.5px] text-black transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Tambahkan
          </button>
        </div>
      </div>
    </div>
  );
}
