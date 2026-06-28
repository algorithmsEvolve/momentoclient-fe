"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ImageViewer from "@/components/ui/ImageViewer";

export default function BaraGallery({ invitation, galleryType = "4P1L" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);
  const [flipped, setFlipped] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
  });
  const [flipAll, setFlipAll] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const invitationGalleries = invitation?.galleries;
  const galleries = useMemo(() => {
    return Array.isArray(invitationGalleries) ? invitationGalleries : [];
  }, [invitationGalleries]);

  const images = useMemo(() => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push({
        front: galleries[i]?.imageUrl || "",
        back: galleries.length === 10 ? galleries[i + 5]?.imageUrl : "",
      });
    }
    return result;
  }, [galleries]);

  useEffect(() => {
    if (galleries.length === 10) {
      const interval = setInterval(() => {
        setFlipAll((prev) => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleries.length]);

  useEffect(() => {
    const keys = ["first", "second", "third", "fourth", "fifth"];
    keys.forEach((key, index) => {
      const indexMod = flipAll ? index : keys.length - index;
      setTimeout(() => {
        setFlipped((prev) => ({ ...prev, [key]: flipAll }));
      }, (indexMod / 3) * 1000);
    });
  }, [flipAll]);

  const handleImageClick = (src) => {
    if (!src) return;
    const index = galleries.findIndex((img) => img.imageUrl === src);
    setSelectedImageIndex(index !== -1 ? index : 0);
    setViewerOpen(true);
  };

  const renderImage = (index, className, flippedState) => {
    const imgData = images[index];
    if (!imgData) return null;

    return (
      <div
        className={`flip-image ${className} ${flippedState ? "flipped" : ""}`}
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

  return (
    <div id="gallery" name="gallery-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`nick-logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
            <img src={invitation?.nickLogo || "/themes/bara/gallery/nick-logo.png"} alt="nick-logo" />
          </div>

          {isDesktop && (
            <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name={`gt-${galleryType}`} style={{ animationDelay: "350ms" }}>
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
                  {renderImage(4, "fourth-image", flipped.fourth)}
                </div>
                <div className="right-right">
                  {renderImage(3, "fifth-image", flipped.fifth)}
                </div>
              </div>
            </div>
          )}

          {!isDesktop && (
            <div className={`mobile-galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name={`gt-${galleryType}`} style={{ animationDelay: "350ms" }}>
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
          )}
        </div>
      </div>

      <div className="decorations">
        {!isDesktop && (
          <div className={`bottom ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
            <img src="/themes/bara/gallery/mobile-decor-bottom.png" alt="decor-bottom" />
          </div>
        )}
        {isDesktop && (
          <>
            <div className={`bottom-left ${isVisible ? "animate-fade-in-left" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
              <img src="/themes/bara/gallery/decor-bottom-left.png" alt="decor-bottom-left" />
            </div>
            <div className={`bottom-right ${isVisible ? "animate-fade-in-right" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
              <img src="/themes/bara/gallery/decor-bottom-right.png" alt="decor-bottom-right" />
            </div>
          </>
        )}
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
