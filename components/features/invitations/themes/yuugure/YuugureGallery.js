"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ImageViewer from "@/components/ui/ImageViewer";

export default function YuugureGallery({ invitation }) {
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
    const timerId = setTimeout(handleResize, 0);

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
      clearTimeout(timerId);
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
            <img src="/themes/yuugure/gallery/nick-logo.png" alt="nick-logo" />
          </div>

          {/* Desktop layouts */}
          {isDesktop && (
            <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name={`gt-${galleryType}`} style={{ animationDelay: "350ms" }}>
              {galleryType === "4P1L" ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="left-image">
                    <div className="left-left">
                      {renderImage(0, "first-image", flipped.first)}
                    </div>
                    <div className="left-right">
                      {renderImage(1, "second-image", flipped.second)}
                      {renderImage(2, "third-image", flipped.third)}
                    </div>
                  </div>
                  <div className="right-image">
                    <div className="right-left">
                      {renderImage(3, "fourth-image", flipped.fourth)}
                    </div>
                    <div className="right-right">
                      {renderImage(4, "fifth-image", flipped.fifth)}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile layouts */}
          {!isDesktop && (
            <div className={`mobile-galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name={`gt-${galleryType}`} style={{ animationDelay: "350ms" }}>
              {galleryType === "4P1L" ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="top-left">
          <img
            className={isVisible ? "animate-zoom-in" : "opacity-0"}
            style={{ animationDelay: "1000ms" }}
            src={isDesktop ? "/themes/yuugure/gallery/decor-top-left.png" : "/themes/yuugure/gallery/mobile-decor-top-left.png"}
            alt="decor-top-left"
          />
        </div>

        <div className="bottom-right">
          <img
            className={isVisible ? "animate-zoom-in" : "opacity-0"}
            style={{ animationDelay: "1000ms" }}
            src={isDesktop ? "/themes/yuugure/gallery/decor-bottom-right.png" : "/themes/yuugure/gallery/mobile-decor-bottom-right.png"}
            alt="decor-bottom-right"
          />
        </div>
      </div>

      <ImageViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={galleries}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
}
