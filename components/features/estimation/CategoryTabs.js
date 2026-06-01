"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const estimationTabs = [
  { id: "seserahan", label: "Seserahan" },
  { id: "mahar", label: "Mahar" },
  { id: "undangan", label: "Undangan" },
  { id: "keepsake-bouqet", label: "Keepsake & Bouquet" },
  { id: "wcc", label: "WCC" },
  { id: "bundling", label: "Bundling Package" },
];

export default function CategoryTabs({ activeCategory, setActiveCategory }) {
  const scrollRef = useRef(null);
  const tabRefs = useRef({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activePill, setActivePill] = useState({ left: 0, width: 0 });

  const updateActivePill = useCallback(() => {
    const activeEl = tabRefs.current[activeCategory];
    if (!activeEl) return;

    setActivePill({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });
  }, [activeCategory]);

  useLayoutEffect(() => {
    updateActivePill();
  }, [updateActivePill]);

  useEffect(() => {
    window.addEventListener("resize", updateActivePill);
    return () => window.removeEventListener("resize", updateActivePill);
  }, [updateActivePill]);

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
    <div className="mb-[30px] w-full overflow-hidden">
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="scrollbar-hide cursor-grab overflow-x-auto rounded-[10px] bg-[#161616] active:cursor-grabbing select-none"
      >
        <div className="relative flex min-w-max flex-row items-center gap-0 p-0">
          <div
            className="absolute bottom-0 top-0 rounded-[10px] bg-[#252525] transition-[left,width] duration-300 ease-out"
            style={{
              left: activePill.left,
              width: activePill.width,
            }}
          />

          {estimationTabs.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => {
                if (el) tabRefs.current[cat.id] = el;
              }}
              onClick={() => !isDragging && setActiveCategory(cat.id)}
              className="relative z-10 flex h-[47px] flex-shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[10px] px-[20px] py-[15px] font-montserrat text-[14px] font-semibold tracking-[0.5px] text-white transition-colors duration-300"
            >
              <span className="leading-none">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
