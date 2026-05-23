"use client";

import Image from "next/image";
import { bouquetPackages } from "@/lib/pricingData";

export default function BouquetPricing({ openViewer }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] md:gap-[24px] mb-[80px]">
      {bouquetPackages.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-[#161616] rounded-[10px] md:rounded-[20px] p-[20px] md:p-[30px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20"
        >
          <h2 className="text-[20px] md:text-[24px] font-montserrat font-bold text-white mb-[15px] tracking-[-0.025em]">
            {pkg.name}
          </h2>
          
          <div className="flex flex-row gap-[15px] md:gap-[20px]">
            <div
              className="w-[120px] h-[156px] flex-shrink-0 cursor-zoom-in group"
              onClick={() => openViewer(pkg.image, pkg.name)}
            >
              <div className="relative w-full h-full rounded-[10px] overflow-hidden border border-white/5">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-montserrat font-bold text-[12px] md:text-[14px] mb-2">
                  Detail :
                </h3>
                <ul className="text-white font-montserrat font-normal text-[12px] space-y-0 list-none">
                  {pkg.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start leading-[20px]">
                      <span className="mr-[5px]">•</span> 
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:hidden text-left mt-2">
                <span className="text-gold font-montserrat font-bold text-[18px]">
                  {pkg.price}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block mt-auto pt-[24px] text-left">
            <span className="text-gold font-montserrat font-bold text-[24px]">
              {pkg.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
