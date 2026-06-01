"use client";

import Image from "next/image";

const getIconSrc = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string") return icon;
  return icon.src || null;
};

const getItemDetail = (item) => {
  if (Array.isArray(item.options) && item.options.length > 0) {
    return item.options.join(" / ");
  }

  if (item.note) return item.note;

  if (Array.isArray(item.listItems) && item.listItems.length > 0) {
    return item.listItems.join(" / ");
  }

  return "";
};

export default function BundlingPackageCard({
  pkg,
  quantity,
  isDisabled,
  onSelect,
}) {
  const isSelected = quantity > 0;

  return (
    <article
      className={`flex min-h-[298px] w-full flex-col rounded-[8px] border bg-[#161616] px-[20px] py-[20px] transition-all duration-300 md:min-h-[298px] ${
        isSelected ? "border-[#4A4127]" : "border-transparent"
      } ${isDisabled ? "opacity-45" : "opacity-100"}`}
    >
      <div className="flex flex-1 flex-col">
        <header className="mb-[18px] flex items-start justify-between gap-4">
          <h3 className="font-montserrat text-[16px] font-bold leading-[20px] text-white">
            {pkg.name}
          </h3>
          <p className="shrink-0 pt-[1px] font-montserrat text-[14px] font-bold leading-[18px] text-white">
            {pkg.originalPrice || pkg.displayPrice}
          </p>
        </header>

        <div className="space-y-[14px]">
          {pkg.items.map((item, index) => {
            const iconSrc = getIconSrc(item.icon);
            const detail = getItemDetail(item);

            return (
              <div key={`${pkg.id}-item-${index}`} className="flex items-start gap-[12px]">
                <div className="relative mt-[2px] h-[14px] w-[14px] shrink-0">
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={item.icon?.alt || item.name || "Bundling item"}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="block h-full w-full rounded-full border border-[#D4AF37]" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-montserrat text-[13px] font-bold leading-[17px] text-white">
                    {item.name}
                  </p>
                  {detail && (
                    <p className="mt-[3px] font-montserrat text-[11px] font-medium leading-[16px] text-white/55">
                      {detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {pkg.bonus.length > 0 && (
          <div className="mt-[18px] flex gap-[6px] pl-[26px] font-montserrat text-[11px] font-medium leading-[16px] text-white">
            <span className="shrink-0 font-bold text-[#D4AF37]">Bonus/Free :</span>
            <span className="min-w-0">{pkg.bonus.join("  |  ")}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => !isDisabled && onSelect(pkg)}
        disabled={isDisabled}
        className={`mt-[24px] flex h-[34px] w-full items-center justify-center rounded-[7px] border font-montserrat text-[12px] font-semibold leading-[22px] transition-all ${
          isSelected
            ? "border-[#4A4127] bg-transparent text-[#D4AF37]"
            : "border-transparent bg-[#252525] text-white hover:bg-[#2D2D2D]"
        } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"}`}
      >
        {isSelected ? "Telah Dipilih" : "Pilih Paket Ini"}
      </button>
    </article>
  );
}
