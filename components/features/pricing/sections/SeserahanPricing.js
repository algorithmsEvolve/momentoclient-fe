"use client";

import Image from "next/image";
import { seserahanPackages, addOns } from "@/lib/pricingData";

export default function SeserahanPricing({ openViewer }) {
  return (
    <div className="flex flex-col gap-0">
      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[15px] md:mb-[80px]">
        {seserahanPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-[#161616] rounded-[5px] md:rounded-[20px] p-[15px] md:p-[30px] flex flex-col gap-0 border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/20"
          >
            <div className="flex-1 flex flex-col">
              <div className="mb-4 md:mb-[32px]">
                <h2 className="text-[18px] md:text-[24px] font-montserrat font-bold text-white tracking-[-0.025em] leading-tight mb-0">
                  {pkg.name}
                </h2>
                <p className="text-white font-montserrat text-[12px] md:text-[14px] leading-normal md:leading-[22px] antialiased">
                  <span className="md:opacity-60 font-normal md:font-normal">
                    Harga Per box :
                  </span>{" "}
                  <span className="font-bold"> {pkg.basePrice}</span>
                </p>
              </div>

              <div className="flex flex-row md:flex-row gap-[15px] md:gap-[32px] lg:gap-[30px]">
                <div
                  className="w-[123px] h-[150px] md:w-[173px] md:h-[210px] flex-shrink-0 cursor-zoom-in group"
                  onClick={() => openViewer(pkg.images[0], pkg.name)}
                >
                  <div className="relative w-full h-full rounded-[5px] overflow-hidden border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image
                      src={pkg.images[0]}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-0 md:gap-[15px] pt-0">
                  {pkg.pricing.map((opt, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col border-b border-[#343434] md:border-white/10 pb-3 md:pb-[15px] mb-3 md:mb-0 last:border-0 last:pb-0 last:mb-0"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gold font-montserrat font-bold text-[12px] md:text-[14px] uppercase">
                          {opt.boxes}
                        </span>
                        <span className="text-white font-montserrat font-semibold text-[12px] md:text-[16px] tracking-[0.5px]">
                          {opt.price}
                        </span>
                      </div>
                      {opt.free && (
                        <div className="flex flex-col gap-0 mt-1 md:mt-2">
                          <span className="text-white font-montserrat font-bold text-[12px] leading-[15px]">
                            Free :
                          </span>
                          <p className="text-white md:text-white/60 text-[12px] font-montserrat font-normal leading-[15px] md:leading-relaxed mt-0.5">
                            {opt.free}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Ons Section */}
      <div className="mt-[80px]">
        <div className="mb-[20px] md:mb-[30px] pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] mb-[5px] leading-none">
            Add Ons
          </p>
          <h2 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
            <span className="inline-block mr-2 last:mr-0 uppercase">
              <span className="text-[1.15em]">R</span>
              <span className="text-[0.9em]">INGBOX,</span>
            </span>
            <span className="inline-block mr-2 last:mr-0 uppercase">
              <span className="text-[1.15em]">H</span>
              <span className="text-[0.9em]">IAS</span>
            </span>
            <span className="inline-block mr-2 last:mr-0 uppercase">
              <span className="text-[1.15em]">B</span>
              <span className="text-[0.9em]">EDCOVER</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] items-start">
          {addOns.slice(0, 6).map((item, i) => (
            <div
              key={i}
              className="bg-[#161616] p-[15px] rounded-[10px] flex items-start gap-[15px] border border-white/5 transition-all hover:border-[#D4AF37]/20"
            >
              <div
                className="relative w-[90px] h-[90px] rounded-[5px] overflow-hidden flex-shrink-0 cursor-zoom-in group"
                onClick={() => openViewer(item.image, item.name)}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col pt-0">
                <h3 className="text-white font-montserrat font-bold text-[20px] leading-tight mb-[5px]">
                  {item.name}
                </h3>
                <p className="text-white font-montserrat text-[12px] leading-normal antialiased">
                  <span className="font-normal">Harga Sewa :</span>{" "}
                  <span className="font-bold"> {item.price}</span>
                </p>
                <p className="text-gold text-[12px] font-montserrat font-medium italic mt-[17px] leading-tight">
                  {item.note || "*tidak bisa ubah warna"}
                </p>
              </div>
            </div>
          ))}

          <div className="bg-[#161616] p-[15px] rounded-[10px] md:rounded-[20px] border border-white/5 md:row-span-3 lg:col-start-3 lg:row-start-1 lg:row-span-3 flex flex-col h-full">
            <div className="grid grid-cols-2 gap-[10px] mb-[15px] md:mb-[25px]">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="relative aspect-[147/143] md:aspect-square rounded-[5px] md:rounded-[8px] overflow-hidden cursor-zoom-in group"
                  onClick={() =>
                    openViewer(
                      `/images/pricelist/seserahan/addons/hias-${num}.png`,
                      `Hias Bedcover ${num}`,
                    )
                  }
                >
                  <Image
                    src={`/images/pricelist/seserahan/addons/hias-${num}.png`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={`Hias Bedcover ${num}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <h3 className="text-white font-montserrat font-bold text-[16px] md:text-[20px] mb-1">
                Hias Bedcover
              </h3>
              <p className="text-white text-[12px] md:text-[14px] font-montserrat">
                <span className="font-normal md:hidden">Rp. 65.000</span>
                <span className="hidden md:inline">
                  Harga Sewa :{" "}
                  <span className="font-bold">Rp. 65.000</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
