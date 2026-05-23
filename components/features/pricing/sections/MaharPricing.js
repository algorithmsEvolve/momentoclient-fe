"use client";

import Image from "next/image";
import { pricingDefaults } from "@/lib/site-content/pricingDefaults";

export default function MaharPricing({ openViewer, formatCinzel, sectionData }) {
  const defaultSection = pricingDefaults.sections.mahar;
  const packages = (sectionData?.packages || []).filter((item) => item?.enabled !== false);
  const addOnItems = (sectionData?.addOns?.items || []).filter(
    (item) => item?.enabled !== false,
  );
  const customSection =
    sectionData?.custom?.enabled === false
      ? null
      : sectionData?.custom || defaultSection.custom;

  const displayPackages = packages.length > 0 ? packages : defaultSection.packages;
  const displayAddOns = addOnItems.length > 0 ? addOnItems : defaultSection.addOns.items;
  const excludedLabel = sectionData?.excludedLabel || defaultSection.excludedLabel;
  const excludedText = sectionData?.excludedText || defaultSection.excludedText;
  const addOnsEyebrow = sectionData?.addOns?.eyebrow || defaultSection.addOns.eyebrow;
  const addOnsTitle = sectionData?.addOns?.title || defaultSection.addOns.title;
  const customImages = customSection?.images || [];

  return (
    <div className="flex flex-col gap-0">
      {/* Mahar Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[15px] md:mb-[80px]">
        {displayPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#161616] rounded-[10px] p-[20px] md:p-[30px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20"
          >
            <h2 className="text-[20px] md:text-[24px] font-montserrat font-bold text-white mb-[15px]">
              {pkg.name}
            </h2>

            <div className="flex flex-row gap-[15px] md:gap-[18px] mb-[15px] md:mb-0">
              <div
                className="w-[115px] h-[139px] md:w-[170px] md:h-[206px] flex-shrink-0 cursor-zoom-in group"
                onClick={() => openViewer(pkg.image?.src || pkg.image, pkg.name)}
              >
                <div className="relative w-full h-full rounded-[5px] md:rounded-[10px] overflow-hidden border border-white/5">
                  <Image
                    src={pkg.image?.src || pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start md:justify-between gap-[10px] md:gap-[16px] md:pt-1">
                <div className="flex flex-col gap-[10px] md:gap-[16px]">
                  {pkg.pricing.map((opt, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-white/10 md:border-[#343434] pb-[8px] md:pb-[12px] md:pt-0 last:border-0"
                    >
                      <span className="text-gold font-montserrat font-bold text-[14px]">
                        {opt.size}
                      </span>
                      <span className="text-white font-montserrat font-semibold text-[14px] md:text-[16px]">
                        {opt.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hidden md:block pt-[16px] md:pt-[4px]">
                  <p className="text-white font-montserrat font-bold text-[12px] leading-tight mb-1">
                    {excludedLabel}
                  </p>
                  <p className="text-white font-montserrat text-[12px] leading-[18px] opacity-80">
                    {excludedText}
                  </p>
                </div>
              </div>
            </div>

            <div className="block md:hidden pt-2 border-t border-white/5">
              <p className="text-white font-montserrat font-bold text-[12px] leading-tight mb-1">
                {excludedLabel}
              </p>
              <p className="text-white font-montserrat text-[12px] leading-[18px] opacity-80">
                {excludedText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {customSection && (
      <div className="bg-[#161616] rounded-[10px] p-[20px] md:p-[30px] border border-white/5 mb-0 md:mb-[80px]">
        <div className="flex flex-col lg:flex-row gap-[10px]">
          <div className="flex flex-col gap-[10px] lg:hidden mb-[10px]">
            <div>
              <h2 className="text-[20px] font-montserrat font-bold text-white mb-2">
                {customSection.title || "Custom Mahar"}
              </h2>
              <p className="text-white font-montserrat text-[12px] italic mb-4 pr-10">
                {customSection.description}
              </p>
              <div className="space-y-1">
                <p className="text-white font-montserrat font-bold text-[12px]">
                  {customSection.excludedLabel || excludedLabel}
                </p>
                <p className="text-white font-montserrat text-[12px] leading-[18px] pr-[30px]">
                  {customSection.excludedText || excludedText}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-[10px]">
            <div className="hidden lg:block">
              <h2 className="text-[24px] font-montserrat font-bold text-white mb-2">
                {customSection.title || "Custom Mahar"}
              </h2>
              <p className="text-white font-montserrat text-[14px] italic mb-4">
                {customSection.description}
              </p>
              <div className="space-y-1">
                <p className="text-white font-montserrat font-bold text-[12px]">
                  {customSection.excludedLabel || excludedLabel}
                </p>
                <p className="text-white font-montserrat text-[12px] opacity-80">
                  {customSection.excludedText || excludedText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[10px] mt-auto">
              {customImages.slice(0, 2).map((image, i) => (
                <div
                  key={`custom-grid-1-${i}-${image.src}`}
                  className="hidden lg:block relative aspect-[145/166] lg:aspect-[210/169] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(image.src, image.alt || `Custom Mahar ${i + 1}`)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Custom Mahar ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
              {customImages.slice(2, 4).map((image, i) => (
                <div
                  key={`custom-mobile-grid-1-${i}-${image.src}`}
                  className="block lg:hidden relative aspect-[145/166] lg:aspect-[210/169] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(image.src, image.alt || `Custom Mahar ${i + 3}`)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Custom Mahar ${i + 3}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-[10px]">
            <div className="grid grid-cols-2 gap-[10px] mt-auto">
              {customImages.slice(2, 4).map((image, i) => (
                <div
                  key={`custom-grid-2-${i}-${image.src}`}
                  className="hidden lg:block relative aspect-[145/111] lg:aspect-[3/4] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(image.src, image.alt || `Custom Mahar ${i + 3}`)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Custom Mahar ${i + 3}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
              {customImages.slice(0, 2).map((image, i) => (
                <div
                  key={`custom-mobile-grid-2-${i}-${image.src}`}
                  className="block lg:hidden relative aspect-[145/111] lg:aspect-[3/4] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(image.src, image.alt || `Custom Mahar ${i + 1}`)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Custom Mahar ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Add Ons Replika Mahar Section */}
      <div className="mt-[31px] md:mt-[64px] w-full max-w-[896px] mx-auto md:mx-0">
        <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[14px] md:text-[16px] mb-1">
            {addOnsEyebrow}
          </p>
          <h2 className="text-[20px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
            {formatCinzel(addOnsTitle)}
          </h2>
        </div>
        
        <div className="bg-[#161616] p-[38px] rounded-[20px] border border-white/5 space-y-[16px]">
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
