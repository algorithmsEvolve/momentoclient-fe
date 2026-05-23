"use client";

import { useEffect, useRef, useState } from "react";
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

const PRICING_EXIT_DURATION = 120;
const PRICING_ENTER_DURATION = 260;

export default function PricingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get("category");
  const activeCategory = pricingCategories.find((c) => c.id === categoryParam) ? categoryParam : "seserahan";

  const [displayCategory, setDisplayCategory] = useState(activeCategory);
  const [transitionState, setTransitionState] = useState("idle");
  const transitionTimersRef = useRef([]);

  const clearTransitionTimers = () => {
    transitionTimersRef.current.forEach(clearTimeout);
    transitionTimersRef.current = [];
  };

  useEffect(() => {
    return () => {
      transitionTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (activeCategory === displayCategory) {
      return;
    }

    clearTransitionTimers();

    // Phase 1: Exit current content
    const exitTimer = setTimeout(() => {
      setTransitionState("exiting");

      // Phase 2: Swap content and enter new category
      const swapTimer = setTimeout(() => {
        setDisplayCategory(activeCategory);
        setTransitionState("entering");

        // Phase 3: Settle to idle
        const settleTimer = setTimeout(() => {
          setTransitionState("idle");
        }, PRICING_ENTER_DURATION);

        transitionTimersRef.current.push(settleTimer);
      }, PRICING_EXIT_DURATION);

      transitionTimersRef.current.push(swapTimer);
    });

    transitionTimersRef.current.push(exitTimer);
  }, [activeCategory, displayCategory]);

  const updateCategory = (catId) => {
    if (catId === activeCategory) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", catId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
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

  // Render Section based on display category
  const renderPricingSection = (category) => {
    switch (category) {
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
    <div className="w-full pt-0 md:pt-[150px] pb-[8px] md:pb-[80px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-[16px] md:flex-row md:px-[40px] gap-[40px] lg:gap-[49px]">
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
          <div
            key={displayCategory}
            className={`pricing-category-transition ${
              transitionState === "exiting"
                ? "pricing-category-transition--exit"
                : "pricing-category-transition--enter"
            }`}
          >
            {/* Section Header */}
            {displayCategory !== "bundling" && (
              <div className="mb-[20px] md:mb-[30px] pl-[14px] md:pl-0">
                <p className="text-[#B1B1B1] font-montserrat font-semibold text-[18px] mb-[5px] leading-none">
                  Pricelist
                </p>
                <h1 className="text-[24px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
                  {formatCinzel(
                    pricingCategories.find((c) => c.id === displayCategory)?.name ||
                      "Price List",
                  )}
                </h1>

                {displayCategory === "mahar" && (
                  <div className="mt-[10px] md:mt-[10px] mb-[30px] space-y-[4px] md:space-y-0">
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
            {renderPricingSection(displayCategory)}
          </div>
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
