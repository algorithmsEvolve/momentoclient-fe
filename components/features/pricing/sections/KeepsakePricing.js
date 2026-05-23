"use client";

import Image from "next/image";

export default function KeepsakePricing({ openViewer, formatCinzel }) {
  return (
    <div className="flex flex-col gap-0 mt-0">
      {/* Main Keepsake Card */}
      <div className="bg-[#161616] rounded-[10px] md:rounded-[20px] p-[20px] md:p-[30px] border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20">
        <div className="flex justify-between items-start mb-[15px] md:mb-[20px]">
          <h2 className="text-[20px] md:text-[24px] font-montserrat font-bold text-white">
            Keepsake
          </h2>
          <span className="text-gold font-montserrat font-bold text-[18px] md:text-[24px]">
            Rp. 115.000
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-[30px]">
          <div
            className="w-full aspect-[260/169] md:aspect-[399/259] md:w-[399px] flex-shrink-0 cursor-zoom-in group"
            onClick={() => openViewer("/images/extras/keepsake.png", "Wedding Keepsake")}
          >
            <div className="relative w-full h-full rounded-[5px] md:rounded-[10px] overflow-hidden border border-white/5">
              <Image
                src="/images/extras/keepsake.png"
                alt="Wedding Keepsake"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-white font-montserrat font-bold text-[14px] md:text-[16px] mb-[8px] md:mb-[12px]">
              Include :
            </h3>
            <ul className="text-white font-montserrat font-medium text-[12px] md:font-normal md:text-white/80 md:text-[14px] space-y-[6px] md:space-y-[8px] list-none pl-[8px] md:pl-0">
              <li className="flex items-start"><span className="mr-2">•</span> Envelope + Wax Seal</li>
              <li className="flex items-start"><span className="mr-2">•</span> 2 Name with Tassel</li>
              <li className="flex items-start"><span className="mr-2">•</span> 2 Vows with Ribbon</li>
              <li className="flex items-start"><span className="mr-2">•</span> 1 Quotes</li>
              <li className="flex items-start"><span className="mr-2">•</span> 1 Location + Wax Seal</li>
              <li className="flex items-start"><span className="mr-2">•</span> 1 Dates</li>
              <li className="flex items-start"><span className="mr-2">•</span> 1 Initial Logo</li>
              <li className="flex items-start"><span className="mr-2">•</span> Sifon Ribbon -+ 1m</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Ons Aksesoris Keepsake Section */}
      <div className="mt-[45px] md:mt-[100px] w-full max-w-[896px] mx-auto md:mx-0 mb-[80px]">
        <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[14px] md:text-[16px] mb-1">
            Add Ons
          </p>
          <h2 className="text-[20px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
            {formatCinzel("AKSESORIS KEEPSAKE")}
          </h2>
        </div>
        
        <div className="bg-[#161616] p-[20px] md:p-[38px] rounded-[10px] md:rounded-[20px] border border-white/5 space-y-[12px] md:space-y-[16px]">
          {[
            { name: "Artificial Flower", price: "Rp. 5.000" },
            { name: "Acrylic Logo", price: "Rp. 15.000" },
            { name: "Stamp Wax", price: "Rp. 30.000" },
            { name: "Spoon Wax", price: "Rp. 30.000" },
            { name: "Alas Satin 30x30", price: "Rp. 30.000" },
            { name: "Europe Magnifier", price: "Rp. 35.000" },
          ].map((item, i) => (
            <div key={i} className="flex items-baseline font-montserrat text-[12px] md:text-[16px] w-full min-w-0">
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
