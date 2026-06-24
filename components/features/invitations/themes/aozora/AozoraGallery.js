"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ImageViewer from "@/components/ui/ImageViewer";

function GalleryDesktopDecoration({ isDesktop, isVisible }) {
  if (!isDesktop) return <AvatarDecoration isVisible={isVisible} />;

  return (
    <div className="decorations">
      <div className="animated-bottom-left flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-right" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>

        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>

        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>

        <div className="mid-around">
          <div className="ma-wrapper">
            <div className="ma-left">
              <img
                className={isVisible ? "animate-fade-up" : "opacity-0"}
                src="/themes/aozora/gallery/mid-left.png"
                alt="mid-around-left"
              />
            </div>

            <div className="ma-mid">
              <img
                id="ma-mid"
                className={isVisible ? "animate-fade-up" : "opacity-0"}
                src="/themes/aozora/gallery/mid-mid.png"
                alt="mid-around-mid"
              />
            </div>

            <div className="ma-right">
              <img
                className={isVisible ? "animate-fade-up" : "opacity-0"}
                src="/themes/aozora/gallery/mid-right.png"
                alt="mid-around-right"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="animated-bottom-right flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-left" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>

        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>

        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
      </div>
    </div>
  );
}

function AvatarDecoration({ isVisible }) {
  return (
    <div name="avatar-decoration" className="avatar-decorations">
      <div className="animated-bottom-left flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-right" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
        <div
          className={`bottom ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "1000ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/bottom-flower.png"
            alt="flowers-stacked-bottom-flower"
          />
        </div>
      </div>

      <div className="animated-bottom-right flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-left" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
      </div>
    </div>
  );
}

export default function AozoraGallery({ invitation }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [flipped, setFlipped] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false
  });
  const [flipAll, setFlipAll] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const invitationGalleries = invitation?.galleries;
  const galleries = useMemo(() => {
    return Array.isArray(invitationGalleries) ? invitationGalleries : [];
  }, [invitationGalleries]);

  const galleryType = invitation?.settings?.galleryType || "4P1L";

  const images = useMemo(() => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push({
        front: galleries[i]?.imageUrl || "",
        back: galleries.length === 10 ? galleries[i + 5]?.imageUrl : ""
      });
    }
    return result;
  }, [galleries]);

  useEffect(() => {
    if (galleries.length === 10) {
      const interval = setInterval(() => {
        setFlipAll(prev => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleries.length]);

  useEffect(() => {
    const keys = ["first", "second", "third", "fourth", "fifth"];
    keys.forEach((key, index) => {
      const indexMod = flipAll ? index : keys.length - index;
      setTimeout(() => {
        setFlipped(prev => ({ ...prev, [key]: flipAll }));
      }, (indexMod / 3) * 1000);
    });
  }, [flipAll]);

  const handleImageClick = (src) => {
    if (!src) return;
    const index = galleries.findIndex(img => img.imageUrl === src);
    setSelectedImageIndex(index !== -1 ? index : 0);
    setViewerOpen(true);
  };

  const renderImage = (index, className, flippedState) => {
    const imgData = images[index];
    if (!imgData) return null;

    return (
      <div 
        className={`${className} flip-image image-wrapper ${flippedState ? 'flipped' : ''}`}
        onClick={() => handleImageClick(flippedState ? imgData.back : imgData.front)}
        style={{ cursor: "pointer" }}
      >
        <div className="front">
          <img src={imgData.front} alt={`gallery-front-${index + 1}`} />
        </div>
        {imgData.back && (
          <div className="back">
            <img src={imgData.back} alt={`gallery-back-${index + 1}`} />
          </div>
        )}
      </div>
    );
  };

  if (!galleries.length) return null;

  return (
    <div id="gallery" name="gallery-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
            <img src={invitation?.nickLogo || "/themes/aozora/gallery/nick-logo.png"} alt="nick-logo" />
          </div>

          {/* Desktop layouts */}
          {isDesktop && (
            <>
              {galleryType === "4P1L" ? (
                <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name="gt-4P1L" style={{ animationDelay: "350ms" }}>
                  <div className="left-image">
                    <div className="left-left">
                      {renderImage(0, "first-image", flipped.first)}
                    </div>
                    <div className="left-right">
                      {renderImage(2, "second-image", flipped.second)}
                      {renderImage(1, "third-image", flipped.third)}
                    </div>
                  </div>
                  <div className="right-image">
                    <div className="right-left">
                      {renderImage(4, "fourth-image", flipped.fourth)}
                    </div>
                    <div className="right-right">
                      {renderImage(3, "fifth-image", flipped.fifth)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name="gt-3P2L" style={{ animationDelay: "350ms" }}>
                  <div className="left-image">
                    {renderImage(0, "first-image", flipped.first)}
                    {renderImage(1, "second-image", flipped.second)}
                  </div>
                  <div className="center-image">
                    {renderImage(2, "third-image", flipped.third)}
                    {renderImage(3, "fourth-image", flipped.fourth)}
                  </div>
                  <div className="right-image">
                    {renderImage(4, "fifth-image", flipped.fifth)}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Mobile layouts */}
          {!isDesktop && (
            <>
              {galleryType === "4P1L" ? (
                <div className={`mobile-galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name="gt-4P1L" style={{ animationDelay: "350ms" }}>
                  <div className="top-image">
                    <div className="top-left">
                      {renderImage(0, "first-image", flipped.first)}
                    </div>
                    <div className="top-right">
                      {renderImage(1, "second-image", flipped.second)}
                    </div>
                  </div>
                  <div className="middle-image">
                    {renderImage(2, "third-image", flipped.third)}
                  </div>
                  <div className="bottom-image">
                    <div className="bottom-left">
                      {renderImage(3, "fourth-image", flipped.fourth)}
                    </div>
                    <div className="bottom-right">
                      {renderImage(4, "fifth-image", flipped.fifth)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`mobile-galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name="gt-3P2L" style={{ animationDelay: "350ms" }}>
                  <div className="top-image">
                    {renderImage(0, "first-image", flipped.first)}
                  </div>
                  <div className="middle-image">
                    <div className="middle-left">
                      {renderImage(1, "second-image", flipped.second)}
                    </div>
                    <div className="middle-right">
                      {renderImage(2, "third-image", flipped.third)}
                    </div>
                  </div>
                  <div className="bottom-image">
                    <div className="bottom-left">
                      {renderImage(3, "fourth-image", flipped.fourth)}
                    </div>
                    <div className="bottom-right">
                      {renderImage(4, "fifth-image", flipped.fifth)}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <GalleryDesktopDecoration isDesktop={isDesktop} isVisible={isVisible} />

      <ImageViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={galleries}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
}
