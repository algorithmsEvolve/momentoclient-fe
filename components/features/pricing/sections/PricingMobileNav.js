"use client";

import { pricingCategories } from "@/lib/pricingData";

export default function PricingMobileNav({ activeCategory, updateCategory }) {
  return (
    <div className="block md:hidden sticky top-[80px] z-30 w-[calc(100%+32px)] -mx-[16px] bg-[#161616] overflow-x-auto scrollbar-hide mb-[30px]">
      <nav className="flex min-w-max flex-row items-center px-[16px]">
        {pricingCategories.map((cat) => {
          const shortName = cat.name
            .replace("Sewa ", "")
            .replace("Frame ", "")
            .replace("Undangan Digital", "Undangan")
            .replace("Wedding ", "")
            .replace("Wed. ", "");

          return (
            <button
              key={cat.id}
              onClick={() => updateCategory(cat.id)}
              className="relative flex h-[55px] items-center px-[20px] transition-all duration-300"
            >
              <span
                className={`text-[12px] font-montserrat font-bold tracking-[0.5px] whitespace-nowrap antialiased transition-colors duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#CF953C] via-[#D4AF37] to-[#CF953C] bg-clip-text text-transparent"
                    : "text-white/60"
                }`}
              >
                {shortName}
              </span>
              {activeCategory === cat.id && (
                <div className="absolute bottom-0 left-[20px] right-[20px] h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#CF953C] to-[#CF953C]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
