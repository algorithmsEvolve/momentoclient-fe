"use client";

import Image from "next/image";
import { pricingDefaults } from "@/lib/site-content/pricingDefaults";

export default function SeserahanPricing({ openViewer, sectionData }) {
  const defaultSection = pricingDefaults.sections.seserahan;
  const hasSectionObject =
    sectionData && typeof sectionData === "object" && !Array.isArray(sectionData);
  const section = hasSectionObject ? sectionData : defaultSection;

  const packageSource = Array.isArray(section.packages) ? section.packages : [];
  const addOnSource = Array.isArray(section.addOns?.items) ? section.addOns.items : [];
  const displayPackages = packageSource.filter((item) => item?.enabled !== false);
  const displayAddOns = addOnSource.filter((item) => item?.enabled !== false);
  const bedcover = section.addOns?.bedcover || defaultSection.addOns.bedcover;
  const usesFallback = !hasSectionObject;

  const priceLabel = section.basePriceLabel || defaultSection.basePriceLabel;
  const addOnsEyebrow = section.addOns?.eyebrow || defaultSection.addOns.eyebrow;
  const addOnsTitle = section.addOns?.title || defaultSection.addOns.title;
  const emptyState = section.emptyState || defaultSection.emptyState;

  const getImage = (image, fallbackAlt) => ({
    src: image?.src || image || "",
    alt: image?.alt || fallbackAlt || "",
  });

  return (
    <div className="flex flex-col gap-0">
      {/* Packages Grid */}
      {displayPackages.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-[15px] md:mb-[80px]">
          {displayPackages.map((pkg) => {
            const packageImage = getImage(pkg.images?.[0], pkg.name);
            return (
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
                        {priceLabel}
                      </span>{" "}
                      <span className="font-bold"> {pkg.basePrice}</span>
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-row gap-[15px] md:gap-[32px] lg:gap-[30px]">
                    <div
                      className="w-[123px] h-[150px] md:w-[173px] md:h-[210px] flex-shrink-0 cursor-zoom-in group"
                      onClick={() => openViewer(packageImage.src, packageImage.alt)}
                    >
                      <div className="relative w-full h-full rounded-[5px] overflow-hidden border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                        <Image
                          src={packageImage.src}
                          alt={packageImage.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-0 md:gap-[15px] pt-0">
                      {(pkg.pricing || []).map((opt, idx) => (
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
            );
          })}
        </div>
      ) : (
        <div className="mb-[40px] rounded-[10px] border border-white/10 bg-[#161616] p-[24px] md:p-[30px]">
          <h3 className="mb-2 font-montserrat text-[18px] font-bold text-white">
            {emptyState?.title || "Paket seserahan belum tersedia"}
          </h3>
          <p className="font-montserrat text-[13px] leading-[22px] text-white/70">
            {emptyState?.description || "Silakan hubungi Momento untuk informasi terbaru."}
          </p>
          {usesFallback && (
            <p className="mt-3 font-montserrat text-[11px] text-white/40">
              Menampilkan fallback karena data section belum tersedia.
            </p>
          )}
        </div>
      )}

      {/* Add Ons Section */}
      <div className="mt-[80px]">
        <div className="mb-[20px] md:mb-[30px] pl-[14px] md:pl-0">
          <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] mb-[5px] leading-none">
            {addOnsEyebrow}
          </p>
          <h2 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
            {addOnsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] items-start">
          {displayAddOns.slice(0, 6).map((item, i) => {
            const addOnImage = getImage(item.image, item.name);
            return (
            <div
              key={item.id || i}
              className="bg-[#161616] p-[15px] rounded-[10px] flex items-start gap-[15px] border border-white/5 transition-all hover:border-[#D4AF37]/20"
            >
              <div
                className="relative w-[90px] h-[90px] rounded-[5px] overflow-hidden flex-shrink-0 cursor-zoom-in group"
                onClick={() => openViewer(addOnImage.src, addOnImage.alt)}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={addOnImage.src}
                  alt={addOnImage.alt}
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
          )})}

          {bedcover?.enabled !== false && (() => {
            const bedcoverImage = getImage(bedcover?.image, bedcover?.name || "Hias Bedcover");
            return (
            <div
              className="bg-[#161616] p-[15px] rounded-[10px] flex items-start gap-[15px] border border-white/5 transition-all hover:border-[#D4AF37]/20"
            >
              <div
                className="relative w-[90px] h-[90px] rounded-[5px] overflow-hidden flex-shrink-0 cursor-zoom-in group"
                onClick={() => openViewer(bedcoverImage.src, bedcoverImage.alt)}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={bedcoverImage.src}
                  alt={bedcoverImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col pt-0">
                <h3 className="text-white font-montserrat font-bold text-[20px] leading-tight mb-[5px]">
                  {bedcover?.name || "Hias Bedcover"}
                </h3>
                <p className="text-white font-montserrat text-[12px] leading-normal antialiased">
                  <span className="font-normal">Harga Sewa :</span>{" "}
                  <span className="font-bold">{bedcover?.price || "Rp. 65.000"}</span>
                </p>
                <p className="text-gold text-[12px] font-montserrat font-medium italic mt-[17px] leading-tight">
                  {bedcover?.note || "*bisa ubah warna"}
                </p>
              </div>
            </div>
          );
          })()}
        </div>
      </div>
    </div>
  );
}
