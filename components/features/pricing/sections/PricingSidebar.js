"use client";

export default function PricingSidebar({
  activeCategory,
  categories = [],
  updateCategory,
}) {
  return (
    <aside className="hidden md:block w-[240px] shrink-0 border-r border-white/10 pr-0">
      <nav className="flex flex-col sticky top-[120px]">
        {categories.map((cat) => {
          const isGroupEnd = 
            (cat.id === "undangan") || 
            (cat.id === "mahar" && !categories.find(c => c.id === "undangan")) ||
            (cat.id === "wcc");

          return (
            <button
              key={cat.id}
              onClick={() => updateCategory(cat.id)}
              className={`group relative flex items-center h-[60px] cursor-pointer transition-all duration-300 border-b border-white/5 last:border-0 overflow-hidden ${
                isGroupEnd ? "mb-4 pb-4 border-b-white/20" : ""
              }`}
            >
              <div
                className={`absolute ${isGroupEnd ? "top-[7.5px] bottom-[22.5px]" : "top-[15px] bottom-[15px]"} left-0 w-[3px] grad-gold rounded-full transition-all duration-300 ${
                  activeCategory === cat.id ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                }`}
              />
              <span
                className={`pl-[25px] text-[16px] font-montserrat font-bold tracking-[0.5px] whitespace-nowrap antialiased transition-colors duration-300 ${
                  activeCategory === cat.id
                    ? "text-gold"
                    : "text-white hover:text-gold"
                }`}
              >
                {cat.sidebarName || cat.sidebar_name || cat.name}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
