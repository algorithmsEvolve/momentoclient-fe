"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ImageViewer from "@/components/ui/ImageViewer";

function GalleryItem({ galleries, index, flipped, onClickImage }) {
  const imgData = galleries[index];
  if (!imgData) return null;

  const isFlipped = flipped[index] || false;
  const front = imgData.imageUrl || "";
  const back = galleries.length === 10 ? galleries[index + 5]?.imageUrl : "";

  return (
    <div
      className={`flip-image image-wrapper ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClickImage(isFlipped ? back : front)}
      style={{ cursor: "pointer" }}
    >
      <div className="front">
        <img src={front} alt={`gallery-front-${index + 1}`} />
      </div>
      {back && (
        <div className="back">
          <img src={back} alt={`gallery-back-${index + 1}`} />
        </div>
      )}
    </div>
  );
}

export default function YamatoGallery({ invitation }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [flipAll, setFlipAll] = useState(false);
  const [flipped, setFlipped] = useState([false, false, false, false, false]);
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

  const galleries = useMemo(() => {
    return Array.isArray(invitation?.galleries) ? invitation.galleries : [];
  }, [invitation?.galleries]);

  const galleryType = invitation?.settings?.galleryType || "4P1L";

  useEffect(() => {
    if (galleries.length === 10) {
      const interval = setInterval(() => {
        setFlipAll((prev) => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleries.length]);

  useEffect(() => {
    setFlipped((prev) => prev.map((_, i) => flipAll));
  }, [flipAll]);

  const handleImageClick = (src) => {
    if (!src) return;
    const index = galleries.findIndex((img) => img.imageUrl === src);
    setSelectedImageIndex(index !== -1 ? index : 0);
    setViewerOpen(true);
  };

  if (!galleries.length) return null;

  return (
    <div id="gallery" name="gallery-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div
            className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <img
              src={invitation?.nickLogo || "/themes/yamato/gallery/nick-logo.png"}
              alt="nick-logo"
            />
          </div>

          {isDesktop && (
            <>
              {galleryType === "4P1L" ? (
                <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name="gt-4P1L" style={{ animationDelay: "350ms" }}>
                  <div className="left-image">
                    <div className="left-left">
                      <GalleryItem galleries={galleries} index={0} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                    <div className="left-right">
                      <GalleryItem galleries={galleries} index={2} flipped={flipped} onClickImage={handleImageClick} />
                      <GalleryItem galleries={galleries} index={1} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                  </div>
                  <div className="right-image">
                    <div className="right-left">
                      <GalleryItem galleries={galleries} index={4} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                    <div className="right-right">
                      <GalleryItem galleries={galleries} index={3} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name="gt-5P0L" style={{ animationDelay: "350ms" }}>
                  <div className="left-image">
                    <div className="left-left">
                      <GalleryItem galleries={galleries} index={0} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                    <div className="left-right">
                      <GalleryItem galleries={galleries} index={1} flipped={flipped} onClickImage={handleImageClick} />
                      <GalleryItem galleries={galleries} index={2} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                  </div>
                  <div className="right-image">
                    <div className="right-left">
                      <GalleryItem galleries={galleries} index={3} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                    <div className="right-right">
                      <GalleryItem galleries={galleries} index={4} flipped={flipped} onClickImage={handleImageClick} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {!isDesktop && (
            <div className={`mobile-galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
              <div className="top-image">
                <div className="top-left">
                  <GalleryItem galleries={galleries} index={0} flipped={flipped} onClickImage={handleImageClick} />
                </div>
                <div className="top-right">
                  <GalleryItem galleries={galleries} index={1} flipped={flipped} onClickImage={handleImageClick} />
                </div>
              </div>
              <div className="middle-image">
                <GalleryItem galleries={galleries} index={2} flipped={flipped} onClickImage={handleImageClick} />
              </div>
              <div className="bottom-image">
                <div className="bottom-left">
                  <GalleryItem galleries={galleries} index={3} flipped={flipped} onClickImage={handleImageClick} />
                </div>
                <div className="bottom-right">
                  <GalleryItem galleries={galleries} index={4} flipped={flipped} onClickImage={handleImageClick} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className="top-left">
              <img
                className={isVisible ? "animate-fade-right" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/yamato/gallery/decor-top-left.png"
                alt="decor-top-left"
              />
            </div>
            <div className="top-right">
              <img
                className={isVisible ? "animate-fade-left" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/yamato/gallery/decor-top-right.png"
                alt="decor-top-right"
              />
            </div>
          </>
        ) : (
          <>
            <div className="top">
              <img
                className={isVisible ? "animate-zoom-in-down" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/yamato/gallery/mobile-decor-top.png"
                alt="mobile-decor-top"
              />
            </div>
            <div className="bottom">
              <img
                className={isVisible ? "animate-zoom-in-up" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/yamato/gallery/mobile-decor-bottom.png"
                alt="mobile-decor-bottom"
              />
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
