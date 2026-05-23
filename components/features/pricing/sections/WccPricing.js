"use client";

import { wccPackages, wccAddOns } from "@/lib/pricingData";

export default function WccPricing({ formatCinzel }) {
  return (
    <div className="flex flex-col gap-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[15px] md:mb-[80px]">
        {wccPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#161616] rounded-[10px] md:rounded-[20px] p-[20px] md:p-[30px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20"
          >
            <h2 className="text-[18px] md:text-[24px] font-montserrat font-bold text-white mb-[8px] tracking-[-0.025em]">
              {pkg.name}
            </h2>
            <p className="text-white font-montserrat text-[12px] leading-[20px] mb-[15px] md:mb-6 opacity-80 md:opacity-100">
              {pkg.desc}
            </p>

            <div className="flex-1 flex flex-col">
              <h3 className="text-white font-montserrat font-bold text-[12px] mb-2">
                Detail :
              </h3>
              <ul className="text-white font-montserrat font-normal text-[12px] space-y-0 list-none mb-6 md:mb-8 pl-1">
                {pkg.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start leading-[20px]">
                    <span className="mr-[8px]">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <span className="text-gold font-montserrat font-bold text-[18px] md:text-[20px]">
                {pkg.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* WCC Add Ons Section */}
      <div className="mt-[32px] md:mt-[40px] w-full max-w-[896px] mx-auto md:mx-0 mb-[80px]">
        <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] md:text-[20px] mb-1">
            Add Ons
          </p>
          <h2 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
            {formatCinzel("CONTENT WCC")}
          </h2>
        </div>

        <div className="bg-[#161616] p-[20px] md:p-[38px] rounded-[10px] md:rounded-[20px] border border-white/5 space-y-[12px] md:space-y-[16px]">
          {wccAddOns.map((item, i) => (
            <div
              key={i}
              className="flex items-baseline font-montserrat w-full min-w-0"
            >
              <span className="text-white text-[12px] md:text-[14px] shrink-0 pr-4 leading-[22px]">
                {item.name}
              </span>
              <div className="flex-1 overflow-hidden h-[1em] min-w-0">
                <span className="text-white tracking-[0.4em] font-medium select-none whitespace-nowrap opacity-20">
                  ....................................................................................................
                </span>
              </div>
              <span className="text-gold font-bold text-[12px] md:text-[16px] shrink-0 pl-4">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
