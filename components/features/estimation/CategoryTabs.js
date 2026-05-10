"use client";

import { pricingCategories } from "@/lib/pricingData";
import { useRef, useState } from "react";

export default function CategoryTabs({ activeCategory, setActiveCategory }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full overflow-hidden mb-[30px]">
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex flex-row items-center gap-[10px] overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      >
        {pricingCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => !isDragging && setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-[20px] h-[47px] rounded-[10px] font-montserrat font-semibold text-[14px] tracking-[0.5px] whitespace-nowrap transition-all duration-300 flex items-center justify-center ${
              activeCategory === cat.id
                ? "border-grad-gold shadow-lg"
                : "bg-[#252525] border border-transparent text-white hover:border-white/10"
            }`}
          >
            <span className={`leading-none ${activeCategory === cat.id ? "text-gold" : ""}`}>
              {cat.sidebar_name || cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
