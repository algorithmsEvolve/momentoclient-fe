"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ImageViewer from "@/components/ui/ImageViewer";
import PricingMobileNav from "./sections/PricingMobileNav";
import PricingSidebar from "./sections/PricingSidebar";
import BouquetPricing from "./sections/BouquetPricing";
import BundlingPricing from "./sections/BundlingPricing";
import KeepsakePricing from "./sections/KeepsakePricing";
import MaharPricing from "./sections/MaharPricing";
import SeserahanPricing from "./sections/SeserahanPricing";
import UndanganPricing from "./sections/UndanganPricing";
import WccPricing from "./sections/WccPricing";

const PRICING_EXIT_DURATION = 120;
const PRICING_ENTER_DURATION = 260;

export default function PricingContent({ content }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categories = useMemo(() => {
    const list = Array.isArray(content?.categories) ? content.categories : [];
    return list.filter((item) => item && item.id && item.enabled !== false);
  }, [content]);

  const fallbackCategory = categories[0]?.id || "seserahan";
  const preferredCategory = content?.settings?.defaultCategory || fallbackCategory;
  const validCategoryIds = new Set(categories.map((item) => item.id));
  const categoryParam = searchParams.get("category");

  const activeCategory = validCategoryIds.has(categoryParam)
    ? categoryParam
    : validCategoryIds.has(preferredCategory)
      ? preferredCategory
      : fallbackCategory;

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

    const exitTimer = setTimeout(() => {
      setTransitionState("exiting");

      const swapTimer = setTimeout(() => {
        setDisplayCategory(activeCategory);
        setTransitionState("entering");

        const settleTimer = setTimeout(() => {
          setTransitionState("idle");
        }, PRICING_ENTER_DURATION);

        transitionTimersRef.current.push(settleTimer);
      }, PRICING_EXIT_DURATION);

      transitionTimersRef.current.push(swapTimer);
    });

    transitionTimersRef.current.push(exitTimer);
  }, [activeCategory, displayCategory]);

  const updateCategory = (categoryId) => {
    if (categoryId === activeCategory || !validCategoryIds.has(categoryId)) {
      return;
    }

    if (transitionState !== "idle") return;

    window.scrollTo(0, 0);

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const [viewerState, setViewerState] = useState({
    isOpen: false,
    src: "",
    alt: "",
  });

  const openViewer = (src, alt) => {
    setViewerState({ isOpen: true, src, alt });
  };

  const formatCinzel = (text) => {
    if (!text) return null;
    return text.split(" ").map((word, index) => (
      <span key={index} className="mr-2 inline-block uppercase last:mr-0">
        <span className="text-[1.15em]">{word[0]}</span>
        <span className="text-[0.9em]">{word.slice(1)}</span>
      </span>
    ));
  };

  const sectionMap = content?.sections || {};
  const activeSection = sectionMap?.[displayCategory] || {};
  const activeCategoryMeta = categories.find((item) => item.id === displayCategory);
  const showCategoryHeader = content?.settings?.showCategoryHeader !== false;

  const renderPricingSection = (categoryId) => {
    switch (categoryId) {
      case "seserahan":
        return <SeserahanPricing sectionData={sectionMap.seserahan} openViewer={openViewer} />;
      case "mahar":
        return (
          <MaharPricing
            sectionData={sectionMap.mahar}
            openViewer={openViewer}
            formatCinzel={formatCinzel}
          />
        );
      case "undangan":
        return <UndanganPricing sectionData={sectionMap.undangan} />;
      case "keepsake":
        return (
          <KeepsakePricing
            sectionData={sectionMap.keepsake}
            openViewer={openViewer}
            formatCinzel={formatCinzel}
          />
        );
      case "bouqet":
        return <BouquetPricing sectionData={sectionMap.bouqet} openViewer={openViewer} />;
      case "wcc":
        return <WccPricing sectionData={sectionMap.wcc} formatCinzel={formatCinzel} />;
      case "bundling":
        return <BundlingPricing sectionData={sectionMap.bundling} formatCinzel={formatCinzel} />;
      default:
        return <SeserahanPricing sectionData={sectionMap.seserahan} openViewer={openViewer} />;
    }
  };

  const maharFreeNotes = Array.isArray(activeSection?.freeNotes)
    ? activeSection.freeNotes
    : [];

  return (
    <div className="w-full pb-[260px] pt-0 md:pb-[80px] md:pt-[150px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[40px] px-[16px] md:flex-row md:px-[40px] lg:gap-[49px]">
        <PricingMobileNav
          activeCategory={activeCategory}
          categories={categories}
          updateCategory={updateCategory}
        />

        <PricingSidebar
          activeCategory={activeCategory}
          categories={categories}
          updateCategory={updateCategory}
        />

        <main className="flex-1">
          <div
            key={displayCategory}
            className={`pricing-category-transition ${
              transitionState === "exiting"
                ? "pricing-category-transition--exit"
                : "pricing-category-transition--enter"
            }`}
          >
            {showCategoryHeader && displayCategory !== "bundling" && (
              <div className="mb-[20px] pl-[14px] md:mb-[30px] md:pl-0">
                <p className="mb-[5px] font-montserrat text-[18px] font-semibold leading-none text-[#B1B1B1]">
                  {activeSection?.eyebrow || "Pricelist"}
                </p>
                <h1 className="font-serif text-[24px] font-bold uppercase leading-tight tracking-[-1px] text-white md:text-[32px]">
                  {formatCinzel(activeSection?.title || activeCategoryMeta?.name || "Price List")}
                </h1>

                {displayCategory === "mahar" && maharFreeNotes.length > 0 && (
                  <div className="mb-[30px] mt-[10px] space-y-[4px] md:space-y-0">
                    {maharFreeNotes.map((note, index) => (
                      <p
                        key={index}
                        className="font-montserrat text-[12px] leading-[18px] text-white md:text-[16px] md:leading-[30px]"
                      >
                        <span className="font-bold">Free</span> {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {renderPricingSection(displayCategory)}
          </div>
        </main>
      </div>

      <ImageViewer
        alt={viewerState.alt}
        isOpen={viewerState.isOpen}
        onClose={() => setViewerState((prev) => ({ ...prev, isOpen: false }))}
        src={viewerState.src}
      />
    </div>
  );
}
