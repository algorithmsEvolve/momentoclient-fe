"use client";

import Image from "next/image";
import { pricingDefaults } from "@/lib/site-content/pricingDefaults";

export default function KeepsakePricing({ openViewer, formatCinzel, sectionData }) {
  const defaultSection = pricingDefaults.sections.keepsake;
  const main = sectionData?.main?.enabled === false
    ? defaultSection.main
    : sectionData?.main || defaultSection.main;
  const addOnItems = (sectionData?.addOns?.items || []).filter(
    (item) => item?.enabled !== false,
  );
  const displayAddOns = addOnItems.length > 0 ? addOnItems : defaultSection.addOns.items;
  const addOnsEyebrow = sectionData?.addOns?.eyebrow || defaultSection.addOns.eyebrow;
  const addOnsTitle = sectionData?.addOns?.title || defaultSection.addOns.title;

  return (
    <div className="flex flex-col gap-0 mt-0">
      {/* Main Keepsake Card */}
      <div className="bg-[#161616] rounded-[10px] md:rounded-[20px] p-[20px] md:p-[30px] border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20">
        <div className="flex justify-between items-start mb-[15px] md:mb-[20px]">
          <h2 className="text-[20px] md:text-[24px] font-montserrat font-bold text-white">
            {main.name}
          </h2>
          <span className="text-gold font-montserrat font-bold text-[18px] md:text-[24px]">
            {main.price}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-[30px]">
          <div
            className="w-full aspect-[260/169] md:aspect-[399/259] md:w-[399px] flex-shrink-0 cursor-zoom-in group"
            onClick={() => openViewer(main.image?.src, main.image?.alt || main.name)}
          >
            <div className="relative w-full h-full rounded-[5px] md:rounded-[10px] overflow-hidden border border-white/5">
              <Image
                src={main.image?.src}
                alt={main.image?.alt || main.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-white font-montserrat font-bold text-[14px] md:text-[16px] mb-[8px] md:mb-[12px]">
              {main.includeTitle || "Include :"}
            </h3>
            <ul className="text-white font-montserrat font-medium text-[12px] md:font-normal md:text-white/80 md:text-[14px] space-y-[6px] md:space-y-[8px] list-none pl-[8px] md:pl-0">
              {(main.includes || []).map((item, index) => (
                <li key={index} className="flex items-start"><span className="mr-2">•</span> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Ons Aksesoris Keepsake Section */}
      <div className="mt-[45px] md:mt-[100px] w-full max-w-[896px] mx-auto md:mx-0 mb-[80px]">
        <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[14px] md:text-[16px] mb-1">
            {addOnsEyebrow}
          </p>
          <h2 className="text-[20px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
            {formatCinzel(addOnsTitle)}
          </h2>
        </div>
        
        <div className="bg-[#161616] p-[20px] md:p-[38px] rounded-[10px] md:rounded-[20px] border border-white/5 space-y-[12px] md:space-y-[16px]">
          {displayAddOns.map((item, i) => (
            <div key={item.id || i} className="flex items-baseline font-montserrat text-[12px] md:text-[16px] w-full min-w-0">
              <span className="text-white shrink-0 pr-4">{item.name}</span>
              <div className="flex-1 overflow-hidden h-[1em] min-w-0">
                <span className="text-white tracking-[0.4em] font-medium select-none whitespace-nowrap">
                  ....................................................................................................
                </span>
              </div>
              <span className="text-gold font-bold shrink-0 pl-4">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
