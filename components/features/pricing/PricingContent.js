"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  pricingCategories,
  seserahanPackages,
  maharPackages,
  addOns,
  bouquetPackages,
  wccPackages,
  wccAddOns,
  bundlingPackages,
} from "@/lib/pricingData";
import ImageViewer from "@/components/ui/ImageViewer";

export default function PricingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get("category");
  const activeCategory = pricingCategories.find((c) => c.id === categoryParam) ? categoryParam : "seserahan";

  const updateCategory = (catId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", catId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [viewerState, setViewerState] = useState({
    isOpen: false,
    src: "",
    alt: "",
  });

  const openViewer = (src, alt) => {
    setViewerState({ isOpen: true, src, alt });
  };

  // Helper for Cinzel pattern: First letter of each word is slightly larger
  const formatCinzel = (text) => {
    if (!text) return null;
    return text.split(" ").map((word, index) => (
      <span key={index} className="inline-block mr-2 last:mr-0 uppercase">
        <span className="text-[1.15em]">{word[0]}</span>
        <span className="text-[0.9em]">{word.slice(1)}</span>
      </span>
    ));
  };

  return (
    <div className="w-full pt-0 md:pt-[150px] pb-2 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-10 lg:gap-[49px]">
        {/* Mobile Horizontal Navigation */}
        <div className="block md:hidden sticky top-[80px] z-30 w-[calc(100%+2rem)] -mx-4 bg-[#161616] overflow-x-auto scrollbar-hide mb-[30px]">
          <nav className="flex flex-row items-center min-w-max px-4">
            {pricingCategories.map((cat) => {
              const shortName = cat.name
                .replace("Sewa ", "")
                .replace("Frame ", "")
                .replace("Undangan Digital", "Undangan")
                .replace("Wedding ", "")
                .replace("Wed. ", "");

              return (
                <button
                  key={cat.id}
                  onClick={() => updateCategory(cat.id)}
                  className="relative flex items-center h-[55px] px-5 transition-all duration-300"
                >
                  <span
                    className={`text-[12px] font-montserrat font-bold tracking-[0.5px] whitespace-nowrap antialiased transition-colors duration-300 ${
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#CF953C] via-[#D4AF37] to-[#CF953C] bg-clip-text text-transparent"
                        : "text-white/60"
                    }`}
                  >
                    {shortName}
                  </span>
                  {activeCategory === cat.id && (
                    <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#CF953C] to-[#CF953C]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:block md:w-[240px] flex-shrink-0 border-r border-white/10 pr-0">
          <nav className="flex flex-col sticky top-[120px]">
            {pricingCategories.map((cat, index) => {
              // Dynamically determine group ends so it works even if categories are hidden
              const isGroupEnd = 
                (cat.id === "undangan") || 
                (cat.id === "mahar" && !pricingCategories.find(c => c.id === "undangan")) ||
                (cat.id === "wcc");

              return (
                <button
                  key={cat.id}
                  onClick={() => updateCategory(cat.id)}
                  className={`group relative flex items-center h-[60px] cursor-pointer transition-all duration-300 border-b border-white/5 last:border-0 ${
                    isGroupEnd ? "mb-4 pb-4 border-b-white/20" : ""
                  }`}
                >
                  {activeCategory === cat.id && (
                    <div className={`absolute ${isGroupEnd ? "top-[7.5px] bottom-[22.5px]" : "top-[15px] bottom-[15px]"} left-0 w-[3px] grad-gold rounded-full`} />
                  )}
                  <span
                    className={`pl-[25px] text-[16px] font-montserrat font-bold tracking-[0.5px] whitespace-nowrap antialiased transition-colors duration-300 ${
                      activeCategory === cat.id
                        ? "text-gold"
                        : "text-white hover:text-gold"
                    }`}
                  >
                    {cat.sidebar_name || cat.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Section Header */}
          {activeCategory !== "bundling" && (
            <div className="mb-5 md:mb-[30px] pl-[14px] md:pl-0">
              <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] mb-[5px] leading-none">
                Pricelist
              </p>
              <h1 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
                {formatCinzel(
                  pricingCategories.find((c) => c.id === activeCategory)?.name ||
                    "Price List",
                )}
              </h1>

              {activeCategory === "mahar" && (
                <div className="mt-[10px] md:mt-[10px] mb-[30px] space-y-1 md:space-y-0">
                  <p className="text-white font-montserrat text-[12px] md:text-[16px] leading-[18px] md:leading-[30px]">
                    <span className="font-bold">Free</span> Replika rupiah kertas
                    maks. 10 lembar
                  </p>
                  <p className="text-white font-montserrat text-[12px] md:text-[16px] leading-[18px] md:leading-[30px]">
                    <span className="font-bold">Free</span> Packaging kardus &
                    bubblewrap
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Packages Grid */}
          {(activeCategory === "seserahan" || activeCategory === "mahar") && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-[15px] md:mb-20">
              {activeCategory === "seserahan" &&
              seserahanPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#161616] rounded-[5px] md:rounded-[20px] p-[15px] md:p-[30px] flex flex-col gap-0 border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/20"
                >
                  {/* Package Details - Container for Image & Text */}
                  <div className="flex-1 flex flex-col">
                    {/* Header Information */}
                    <div className="mb-4 md:mb-[32px]">
                      <h2 className="text-[18px] md:text-[24px] font-montserrat font-bold text-white tracking-[-2.5%] leading-tight mb-0">
                        {pkg.name}
                      </h2>
                      <p className="text-white font-montserrat text-[12px] md:text-[14px] leading-normal md:leading-[22px] antialiased">
                        <span className="md:opacity-60 font-normal md:font-normal">
                          Harga Per box :
                        </span>{" "}
                        <span className="font-bold"> {pkg.basePrice}</span>
                      </p>
                    </div>

                    <div className="flex flex-row md:flex-row gap-[15px] md:gap-8 lg:gap-[30px]">
                      {/* Package Image - Mobile: 123x150 | Desktop: 173x210 */}
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

                      {/* Pricing Items - Precise Figma Typography */}
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

            {activeCategory === "mahar" &&
              maharPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#161616] rounded-[10px] p-[20px] md:p-[30px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20"
                >
                  <h2 className="text-[20px] md:text-[24px] font-montserrat font-bold text-white mb-[15px]">
                    {pkg.name}
                  </h2>

                  <div className="flex flex-row gap-[15px] md:gap-[18px] mb-[15px] md:mb-0">
                    {/* Image */}
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

                    {/* Pricing Column */}
                    <div className="flex-1 flex flex-col justify-start md:justify-between gap-[10px] md:gap-4 md:pt-1">
                      {/* Pricing Table */}
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

                      {/* Desktop Footer (Hidden on Mobile) */}
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

                  {/* Mobile Footer (Hidden on Desktop) */}
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
          )}

              {/* Custom Mahar Section */}
              {activeCategory === "mahar" && (
                <div className="bg-[#161616] rounded-[10px] p-[20px] md:p-[30px] border border-white/5 mb-0 md:mb-20">
                  <div className="flex flex-col lg:flex-row gap-[10px]">
                    
                    {/* Mobile Text Content (Visible on Mobile, Hidden on Desktop) */}
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

                    {/* Left Column (Desktop) / Top Grid (Mobile) */}
                    <div className="flex flex-col flex-1 gap-[10px]">
                      {/* Desktop Text Content (Hidden on Mobile) */}
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

                      {/* Images: 1 & 2 on Desktop, 3 & 4 on Mobile */}
                      <div className="grid grid-cols-2 gap-[10px] mt-auto">
                        {/* Desktop Images (1 & 2) */}
                        {[1, 2].map((i) => (
                          <div
                            key={`desktop-grid1-${i}`}
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
                        {/* Mobile Images (3 & 4) */}
                        {[3, 4].map((i) => (
                          <div
                            key={`mobile-grid1-${i}`}
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

                    {/* Right Column (Desktop) / Bottom Grid (Mobile) */}
                    <div className="flex flex-col flex-1 gap-[10px]">
                      <div className="grid grid-cols-2 gap-[10px] mt-auto">
                        {/* Desktop Images (3 & 4) */}
                        {[3, 4].map((i) => (
                          <div
                            key={`desktop-grid2-${i}`}
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
                        {/* Mobile Images (1 & 2) */}
                        {[1, 2].map((i) => (
                          <div
                            key={`mobile-grid2-${i}`}
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
              )}

              {/* Add Ons Replika Mahar Section */}
              {activeCategory === "mahar" && (
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
              )}

              {/* Add Ons Section */}
          {activeCategory === "seserahan" && (
            <div className="mt-20">
              <div className="mb-5 md:mb-[30px] pl-[14px] md:pl-0">
                <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] mb-[5px] leading-none">
                  Add Ons
                </p>
                <h2 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
                  {formatCinzel("RINGBOX, HIAS BEDCOVER")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] items-start">
                {/* Ringboxes - First 6 items */}
                {addOns.slice(0, 6).map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#161616] p-[15px] rounded-[10px] flex items-start gap-[15px] border border-white/5 transition-all hover:border-[#D4AF37]/20"
                  >
                    {/* Image - Precise Dimensions: 90x90 */}
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
                    {/* Content Area */}
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

                {/* Hias Bedcover - Large Featured Card */}
                <div className="bg-[#161616] p-[15px] rounded-[10px] md:rounded-[20px] border border-white/5 md:row-span-3 lg:col-start-3 lg:row-start-1 lg:row-span-3 flex flex-col h-full">
                  <div className="grid grid-cols-2 gap-[10px] mb-[15px] md:mb-[25px]">
                    <div
                      className="relative aspect-[147/143] md:aspect-square rounded-[5px] md:rounded-[8px] overflow-hidden cursor-zoom-in group"
                      onClick={() =>
                        openViewer(
                          "/images/pricelist/seserahan/addons/hias-1.png",
                          "Hias Bedcover 1",
                        )
                      }
                    >
                      <Image
                        src="/images/pricelist/seserahan/addons/hias-1.png"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Hias Bedcover 1"
                      />
                    </div>
                    <div
                      className="relative aspect-[147/143] md:aspect-square rounded-[5px] md:rounded-[8px] overflow-hidden cursor-zoom-in group"
                      onClick={() =>
                        openViewer(
                          "/images/pricelist/seserahan/addons/hias-2.png",
                          "Hias Bedcover 2",
                        )
                      }
                    >
                      <Image
                        src="/images/pricelist/seserahan/addons/hias-2.png"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Hias Bedcover 2"
                      />
                    </div>
                    <div
                      className="relative aspect-[147/143] md:aspect-square rounded-[5px] md:rounded-[8px] overflow-hidden cursor-zoom-in group"
                      onClick={() =>
                        openViewer(
                          "/images/pricelist/seserahan/addons/hias-3.png",
                          "Hias Bedcover 3",
                        )
                      }
                    >
                      <Image
                        src="/images/pricelist/seserahan/addons/hias-3.png"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Hias Bedcover 3"
                      />
                    </div>
                    <div
                      className="relative aspect-[147/143] md:aspect-square rounded-[5px] md:rounded-[8px] overflow-hidden cursor-zoom-in group"
                      onClick={() =>
                        openViewer(
                          "/images/pricelist/seserahan/addons/hias-4.png",
                          "Hias Bedcover 4",
                        )
                      }
                    >
                      <Image
                        src="/images/pricelist/seserahan/addons/hias-4.png"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Hias Bedcover 4"
                      />
                    </div>
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

                {/* Remaining items if any (e.g. Kuro if it were extra) */}
              </div>
            </div>
          )}

          {/* Undangan Digital Section (On Progress) */}
          {activeCategory === "undangan" && (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[400px]">
              <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-8 opacity-80 animate-pulse">
                <Image 
                  src="/images/momento-logo.png" 
                  alt="Momento" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h2 className="text-[28px] md:text-[40px] font-serif font-bold text-transparent bg-clip-text mb-4 tracking-[-1px] uppercase"
                  style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}>
                On Progress
              </h2>
              <p className="text-white font-montserrat text-[14px] md:text-[16px] max-w-[400px] leading-relaxed">
                Kami sedang meracik konten terbaik untuk Pricelist Undangan Digital. Nantikan pembaruan dari kami segera!
              </p>
            </div>
          )}

          {/* Keepsake Section */}
          {activeCategory === "keepsake" && (
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
                  {/* Image */}
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

                  {/* Include List */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-white font-montserrat font-bold text-[14px] md:text-[16px] mb-2 md:mb-3">
                      Include :
                    </h3>
                    <ul className="text-white font-montserrat font-medium text-[12px] md:font-normal md:text-white/80 md:text-[14px] space-y-[6px] md:space-y-2 list-none pl-2 md:pl-0">
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
              <div className="mt-[45px] md:mt-[100px] w-full max-w-4xl mx-auto md:mx-0 mb-20">
                <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
                  {/* Mobile uses 'Pricelist', Desktop uses 'Add Ons' to match design variations */}
                  <p className="text-[#B1B1B1] font-montserrat font-semibold text-[14px] md:text-[16px] mb-1">
                    <span>Add Ons</span>
                  </p>
                  <h2 className="text-[20px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
                    {formatCinzel("AKSESORIS KEEPSAKE")}
                  </h2>
                </div>
                
                <div className="bg-[#161616] p-[20px] md:p-[38px] rounded-[10px] md:rounded-[20px] border border-white/5 space-y-3 md:space-y-4">
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
          )}
          {/* Flower Bouquet Section */}
          {activeCategory === "bouqet" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
              {bouquetPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#161616] rounded-[10px] md:rounded-[20px] p-[20px] md:p-[30px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20"
                >
                  <h2 className="text-[20px] md:text-[24px] font-montserrat font-bold text-white mb-[15px] tracking-[-2.5%]">
                    {pkg.name}
                  </h2>
                  
                  <div className="flex flex-row gap-[15px] md:gap-[20px]">
                    {/* Image - Precise Dimensions: 120x156 */}
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

                    {/* Details */}
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
                      
                      {/* Price Section - Inside Column for Mobile */}
                      <div className="md:hidden text-left mt-2">
                        <span className="text-gold font-montserrat font-bold text-[18px]">
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Section - Below Row for Desktop */}
                  <div className="hidden md:block mt-auto pt-6 text-left">
                    <span className="text-gold font-montserrat font-bold text-[24px]">
                      {pkg.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wedding Content Creator Section */}
          {activeCategory === "wcc" && (
            <div className="flex flex-col gap-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-[15px] md:mb-20">
                {wccPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-[#161616] rounded-[10px] md:rounded-[20px] p-[20px] md:p-[30px] flex flex-col border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/20"
                  >
                    <h2 className="text-[18px] md:text-[24px] font-montserrat font-bold text-white mb-2 tracking-[-2.5%]">
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
              <div className="mt-8 md:mt-10 w-full max-w-4xl mx-auto md:mx-0 mb-20">
                <div className="mb-5 md:mb-8 pl-[14px] md:pl-0">
                  <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] md:text-[20px] mb-1">
                    Add Ons
                  </p>
                  <h2 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[0px] md:tracking-[-1px] leading-tight">
                    {formatCinzel("CONTENT WCC")}
                  </h2>
                </div>

                <div className="bg-[#161616] p-[20px] md:p-[38px] rounded-[10px] md:rounded-[20px] border border-white/5 space-y-3 md:space-y-4">
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
          )}

          {/* Bundling Package Section */}
          {activeCategory === "bundling" && (
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
          )}
        </main>
      </div>

      {/* Modern Image Viewer Component */}
      <ImageViewer
        src={viewerState.src}
        alt={viewerState.alt}
        isOpen={viewerState.isOpen}
        onClose={() => setViewerState({ ...viewerState, isOpen: false })}
      />
    </div>
  );
}
