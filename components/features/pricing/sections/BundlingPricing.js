"use client";

import Image from "next/image";
import { bundlingPackages } from "@/lib/pricingData";

export default function BundlingPricing({ formatCinzel }) {
  return (
    <div className="flex flex-col gap-0 w-full mb-20">
      {bundlingPackages.map((categoryData, catIdx) => (
        <div key={catIdx} className="flex flex-col gap-0 w-full">
          {/* Category Header */}
          <div className="mb-5 md:mb-10 pl-[14px] md:pl-0">
            <p className="text-[#B1B1B1] font-montserrat font-semibold text-[14px] md:text-[18px] mb-[5px] leading-none">
              Bundling
            </p>
            <h2 className="text-[20px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
              {formatCinzel(categoryData.category)}
            </h2>
          </div>

          {/* Packages in Category */}
          <div className="flex flex-col gap-5 md:gap-8 w-full">
            {categoryData.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="relative bg-[#161616] rounded-[10px] md:rounded-[20px] pt-[30px] pb-0 md:pb-[31px] px-[20px] md:pl-[50px] md:pr-[31px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20 overflow-hidden w-full"
              >
                {/* Price Tag (Top Right on Desktop, Bottom Full Width on Mobile) */}
                <div className="md:absolute md:top-0 md:right-0 mt-8 md:mt-0 mx-[-20px] md:mx-0 grad-gold rounded-b-[10px] md:rounded-bl-[15px] md:rounded-br-none py-[15px] md:p-[15px] flex flex-col items-center justify-center md:min-w-[280px] shadow-lg order-last md:order-none">
                  <span className="relative text-[#161616] text-[12px] md:text-[16px] font-montserrat font-semibold mb-0.5 md:mb-1">
                    {pkg.originalPrice}
                    <span className="absolute top-1/2 left-[-5%] w-[110%] h-[1.5px] bg-[#E50000] -rotate-[10deg] origin-center" />
                  </span>
                  <span className="text-[#161616] text-[18px] md:text-[24px] font-montserrat font-bold tracking-tight">
                    {pkg.price}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-[18px] md:text-[28px] font-serif font-bold text-white uppercase tracking-wider mb-6 md:mb-12 relative z-10 w-full md:w-3/5">
                  {pkg.name}
                </h3>

                {/* Items Grid */}
                <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-[30px] w-full">
                  {pkg.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      {/* Item Header */}
                      <div className="flex items-center gap-3 mb-[5px]">
                        <div className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] relative flex-shrink-0">
                          {item.icon && (
                            <Image src={item.icon} alt={item.name} fill className="object-contain" />
                          )}
                        </div>
                        <span className="font-montserrat font-semibold text-white text-[14px] md:text-[18px]">
                          {item.name.split(/( \d+ Tray)/).map((part, i) => 
                            part.match(/ \d+ Tray/) ? <span key={i} className="text-gold">{part}</span> : part
                          )}
                        </span>
                      </div>
                      
                      {/* Item Note (if any) */}
                      {item.note && (
                        <span className="font-montserrat text-white/50 text-[10px] md:text-[12px] mb-[10px] pl-[28px] md:pl-[32px]">
                          {item.note}
                        </span>
                      )}

                      {/* Options Chips */}
                      {item.options && (
                        <div className="flex flex-wrap gap-2 md:gap-3 pl-[28px] md:pl-[32px]">
                          {item.options.map((opt, optIdx) => (
                            <span 
                              key={optIdx} 
                              className="bg-[#2A2A2A] text-white/80 rounded-[8px] px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[13px] font-montserrat font-medium whitespace-nowrap"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* List Items (for Undangan Digital) */}
                      {item.isList && item.listItems && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2 pl-[28px] md:pl-[32px]">
                          {item.listItems.map((listItem, listIdx) => (
                            <li key={listIdx} className="flex items-start gap-2">
                              <span className="text-white mt-1 text-[14px] leading-none">•</span>
                              <span className="text-white font-montserrat text-[12px] md:text-[14px] leading-tight">
                                {listItem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bonus Section */}
                <div className="flex flex-col gap-0 mt-[30px]">
                  <span className="text-gold font-montserrat font-bold uppercase text-[12px] md:text-[16px] mb-[10px]">
                    BONUS / FREE :
                  </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white font-montserrat font-medium text-[14px] tracking-normal">
                    {pkg.bonus.map((b, i) => (
                      <div key={i} className="flex items-stretch h-full gap-3">
                        <span className="leading-tight flex items-center">{b}</span>
                        {i < pkg.bonus.length - 1 && (
                          <span className="text-white hidden md:flex items-center text-[18px] font-normal opacity-80 h-full">|</span>
                        )}
                        {i < pkg.bonus.length - 1 && (
                          <span className="text-white md:hidden flex items-center text-[16px] font-normal opacity-80 h-full">|</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
          
          {/* Category Separator */}
          {catIdx < bundlingPackages.length - 1 && (
            <div className="w-full h-[1px] bg-white/20 my-[30px]" />
          )}
        </div>
      ))}
    </div>
  );
}
