"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { addOns } from "@/lib/pricingData";

export default function RingboxSelector({ selectedRingbox, onSelect, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) onOpenChange(newState);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-montserrat font-bold text-[14px]">Sewa Ringbox</span>
        <span className="text-white font-montserrat font-medium text-[12px]">Free</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Dropdown Container */}
          <div className="relative z-[100]">
            <button
              onClick={toggleDropdown}
              className="w-[180px] h-[40px] bg-[#161616] border border-[#292929] rounded-[10px] flex items-center justify-between text-white font-montserrat text-[12px] hover:border-gold/50 transition-colors overflow-hidden p-0"
            >
              <span className="truncate pl-4 flex-1 text-left">
                {selectedRingbox ? selectedRingbox.name.replace(" Ringbox", "") : "Pilih Ringbox"}
              </span>
              <div className="h-full w-[40px] bg-[#2C2C2C] flex items-center justify-center border-l border-[#292929]">
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {isOpen && (
              <div className="absolute left-0 w-full bg-[#161616] border border-[#292929] rounded-[10px] overflow-hidden mt-1 z-[200] max-h-[200px] overflow-y-auto scrollbar-custom">
                {addOns.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3 text-white font-montserrat text-[12px] hover:bg-[#2C2C2C] transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Icon next to dropdown */}
          {!selectedRingbox && (
            <div className="relative flex items-center group/info cursor-help">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              <div className="absolute top-full right-0 mt-2 w-[180px] p-2 bg-[#252525] text-white text-[12px] font-montserrat font-medium text-center rounded-[8px] shadow-xl border border-white/10 opacity-0 invisible -translate-y-2 group-hover/info:opacity-100 group-hover/info:visible group-hover/info:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none">
                <div className="absolute bottom-full right-1 border-4 border-transparent border-b-[#252525]"></div>
                Harap pilih free Ringbox yang kamu inginkan
              </div>
            </div>
          )}
        </div>

        {/* Price on the far right */}
        <span className="text-white font-montserrat font-semibold text-[14px]">
          {selectedRingbox ? selectedRingbox.price : "Rp. 0"}
        </span>
      </div>
    </div>
  );
}

