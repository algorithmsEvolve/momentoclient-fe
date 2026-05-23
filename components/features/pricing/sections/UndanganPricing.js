"use client";

import Image from "next/image";
import { pricingDefaults } from "@/lib/site-content/pricingDefaults";

export default function UndanganPricing({ sectionData }) {
  const fallback = pricingDefaults.sections.undangan.placeholder;
  const placeholder = sectionData?.placeholder || fallback;
  const imageSrc = placeholder?.image?.src || fallback.image.src;
  const imageAlt = placeholder?.image?.alt || fallback.image.alt;
  const title = placeholder?.title || fallback.title;
  const description = placeholder?.description || fallback.description;

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[400px]">
      <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-8 opacity-80 animate-pulse">
        <Image 
          src={imageSrc}
          alt={imageAlt}
          fill 
          className="object-contain"
        />
      </div>
      <h2 className="text-[28px] md:text-[40px] font-serif font-bold text-transparent bg-clip-text mb-4 tracking-[-1px] uppercase"
          style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}>
        {title}
      </h2>
      <p className="text-white font-montserrat text-[14px] md:text-[16px] max-w-[400px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
