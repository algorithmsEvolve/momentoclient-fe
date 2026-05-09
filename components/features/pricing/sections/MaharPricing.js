"use client";

import Image from "next/image";
import { maharPackages } from "@/lib/pricingData";

export default function MaharPricing({ openViewer, formatCinzel }) {
  return (
    <div className="flex flex-col gap-0">
      {/* Mahar Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-[15px] md:mb-20">
        {maharPackages.map((pkg) => (
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
                onClick={() => openViewer(pkg.image, pkg.name)}
              >
                <div className="relative w-full h-full rounded-[5px] md:rounded-[10px] overflow-hidden border border-white/5">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start md:justify-between gap-[10px] md:gap-4 md:pt-1">
                <div className="flex flex-col gap-[10px] md:gap-4">
                  {pkg.pricing.map((opt, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-white/10 md:border-[#343434] pb-[8px] md:pb-3 md:pt-0 last:border-0"
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

                <div className="hidden md:block pt-4 md:pt-1">
                  <p className="text-white font-montserrat font-bold text-[12px] leading-tight mb-1">
                    Belum termasuk :
                  </p>
                  <p className="text-white font-montserrat text-[12px] leading-[18px] opacity-80">
                    Replika mahar seperti LM, Perhiasan, Mata Uang Asing, dsb.
                  </p>
                </div>
              </div>
            </div>

            <div className="block md:hidden pt-2 border-t border-white/5">
              <p className="text-white font-montserrat font-bold text-[12px] leading-tight mb-1">
                Belum termasuk :
              </p>
              <p className="text-white font-montserrat text-[12px] leading-[18px] opacity-80">
                Replika mahar seperti LM, Perhiasan, Mata Uang Asing, dsb.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Mahar Section */}
      <div className="bg-[#161616] rounded-[10px] p-[20px] md:p-[30px] border border-white/5 mb-0 md:mb-20">
        <div className="flex flex-col lg:flex-row gap-[10px]">
          <div className="flex flex-col gap-[10px] lg:hidden mb-[10px]">
            <div>
              <h2 className="text-[20px] font-montserrat font-bold text-white mb-2">
                Custom Mahar
              </h2>
              <p className="text-white font-montserrat text-[12px] italic mb-4 pr-10">
                Harga disesuaikan biaya barang dan tingkat kesulitan pembuat
              </p>
              <div className="space-y-1">
                <p className="text-white font-montserrat font-bold text-[12px]">
                  Belum termasuk :
                </p>
                <p className="text-white font-montserrat text-[12px] leading-[18px] pr-[30px]">
                  Replika mahar seperti LM, Perhiasan, Mata Uang Asing, dsb.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-[10px]">
            <div className="hidden lg:block">
              <h2 className="text-[24px] font-montserrat font-bold text-white mb-2">
                Custom Mahar
              </h2>
              <p className="text-white font-montserrat text-[14px] italic mb-4">
                Harga disesuaikan biaya barang dan tingkat kesulitan pembuatan.
              </p>
              <div className="space-y-1">
                <p className="text-white font-montserrat font-bold text-[12px]">
                  Belum termasuk :
                </p>
                <p className="text-white font-montserrat text-[12px] opacity-80">
                  Replika mahar seperti LM, Perhiasan, Mata Uang Asing, dsb.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[10px] mt-auto">
              {[1, 2].map((i) => (
                <div
                  key={`custom-grid-1-${i}`}
                  className="hidden lg:block relative aspect-[145/166] lg:aspect-[210/169] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(`/images/pricelist/mahar/custom-${i}.png`, `Custom Mahar ${i}`)}
                >
                  <Image
                    src={`/images/pricelist/mahar/custom-${i}.png`}
                    alt={`Custom Mahar ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
              {[3, 4].map((i) => (
                <div
                  key={`custom-mobile-grid-1-${i}`}
                  className="block lg:hidden relative aspect-[145/166] lg:aspect-[210/169] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(`/images/pricelist/mahar/custom-${i}.png`, `Custom Mahar ${i}`)}
                >
                  <Image
                    src={`/images/pricelist/mahar/custom-${i}.png`}
                    alt={`Custom Mahar ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-[10px]">
            <div className="grid grid-cols-2 gap-[10px] mt-auto">
              {[3, 4].map((i) => (
                <div
                  key={`custom-grid-2-${i}`}
                  className="hidden lg:block relative aspect-[145/111] lg:aspect-[3/4] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(`/images/pricelist/mahar/custom-${i}.png`, `Custom Mahar ${i}`)}
                >
                  <Image
                    src={`/images/pricelist/mahar/custom-${i}.png`}
                    alt={`Custom Mahar ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
              {[1, 2].map((i) => (
                <div
                  key={`custom-mobile-grid-2-${i}`}
                  className="block lg:hidden relative aspect-[145/111] lg:aspect-[3/4] rounded-[5px] lg:rounded-[10px] overflow-hidden cursor-zoom-in group border border-white/5"
                  onClick={() => openViewer(`/images/pricelist/mahar/custom-${i}.png`, `Custom Mahar ${i}`)}
                >
                  <Image
                    src={`/images/pricelist/mahar/custom-${i}.png`}
                    alt={`Custom Mahar ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Ons Replika Mahar Section */}
      <div className="mt-[31px] md:mt-16 w-full max-w-4xl mx-auto md:mx-0">
        <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[14px] md:text-[16px] mb-1">
            Add Ons
          </p>
          <h2 className="text-[20px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
            {formatCinzel("REPLIKA MAHAR")}
          </h2>
        </div>
        
        <div className="bg-[#161616] p-[38px] rounded-[20px] border border-white/5 space-y-4">
          {[
            { name: "Mata uang Asing", price: "Rp. 5.000/pcs" },
            { name: "Koin Kuno", price: "Rp. 5.000/pcs" },
            { name: "LM 1 - 10 Gram", price: "Rp. 10.000/pcs" },
            { name: "LM > 10 Gram", price: "Rp. 10.000/pcs" },
            { name: "Set Perhiasan", price: "Rp. 15.000/set" },
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
