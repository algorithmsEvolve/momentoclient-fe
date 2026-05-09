"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { pricingCategories } from "@/lib/pricingData";
import ImageViewer from "@/components/ui/ImageViewer";

// Modular Sections
import PricingSidebar from "./sections/PricingSidebar";
import PricingMobileNav from "./sections/PricingMobileNav";
import SeserahanPricing from "./sections/SeserahanPricing";
import MaharPricing from "./sections/MaharPricing";
import UndanganPricing from "./sections/UndanganPricing";
import KeepsakePricing from "./sections/KeepsakePricing";
import BouquetPricing from "./sections/BouquetPricing";
import WccPricing from "./sections/WccPricing";
import BundlingPricing from "./sections/BundlingPricing";

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

  // Render Section based on active category
  const renderPricingSection = () => {
    switch (activeCategory) {
      case "seserahan":
        return <SeserahanPricing openViewer={openViewer} />;
      case "mahar":
        return <MaharPricing openViewer={openViewer} formatCinzel={formatCinzel} />;
      case "undangan":
        return <UndanganPricing />;
      case "keepsake":
        return <KeepsakePricing openViewer={openViewer} formatCinzel={formatCinzel} />;
      case "bouqet":
        return <BouquetPricing openViewer={openViewer} />;
      case "wcc":
        return <WccPricing formatCinzel={formatCinzel} />;
      case "bundling":
        return <BundlingPricing formatCinzel={formatCinzel} />;
      default:
        return <SeserahanPricing openViewer={openViewer} />;
    }
  };

  return (
    <div className="w-full pt-0 md:pt-[150px] pb-2 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-10 lg:gap-[49px]">
        {/* Mobile Horizontal Navigation */}
        <PricingMobileNav 
          activeCategory={activeCategory} 
          updateCategory={updateCategory} 
        />

        {/* Desktop Sidebar Navigation */}
        <PricingSidebar 
          activeCategory={activeCategory} 
          updateCategory={updateCategory} 
        />

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

          {/* Pricing Sections */}
          {renderPricingSection()}
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
