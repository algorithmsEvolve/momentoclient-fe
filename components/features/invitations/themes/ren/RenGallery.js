"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ImageViewer from "@/components/ui/ImageViewer";

export default function RenGallery({ invitation }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
  const nickLogo = invitation?.settings?.nickLogo;

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

  const handleImageClick = (src) => {
    if (!src) return;
    const index = galleries.findIndex(img => img.imageUrl === src);
    setSelectedImageIndex(index !== -1 ? index : 0);
    setViewerOpen(true);
  };

  const renderImage = (index, className) => {
    const imgData = images[index];
    if (!imgData) return null;

    return (
      <div
        className={`${className} image-wrapper`}
        onClick={() => handleImageClick(imgData.front)}
        style={{ cursor: "pointer" }}
      >
        <img src={imgData.front} alt={`gallery-${index + 1}`} />
      </div>
    );
  };

  if (!galleries.length) return null;

  return (
    <div id="gallery" name="gallery-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {nickLogo && (
            <div className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <img src={nickLogo} alt="nick-logo" />
            </div>
          )}

          {isDesktop && (
            <div className={`galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name={`gt-${galleryType}`} style={{ animationDelay: "350ms" }}>
              {galleryType === "4P1L" ? (
                <>
                  <div className="left-image">
                    <div className="left-left">
                      {renderImage(0, "first-image")}
                    </div>
                    <div className="left-right">
                      {renderImage(2, "second-image")}
                      {renderImage(1, "third-image")}
                    </div>
                  </div>
                  <div className="right-image">
                    <div className="right-left">
                      {renderImage(4, "fourth-image")}
                    </div>
                    <div className="right-right">
                      {renderImage(3, "fifth-image")}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="left-image">
                    <div className="left-left">
                      {renderImage(0, "first-image")}
                    </div>
                    <div className="left-right">
                      {renderImage(1, "second-image")}
                      {renderImage(2, "third-image")}
                    </div>
                  </div>
                  <div className="right-image">
                    <div className="right-left">
                      {renderImage(3, "fourth-image")}
                    </div>
                    <div className="right-right">
                      {renderImage(4, "fifth-image")}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {!isDesktop && (
            <div className={`mobile-galleries ${isVisible ? "animate-zoom-in" : "opacity-0"}`} name={`gt-${galleryType}`} style={{ animationDelay: "350ms" }}>
              {galleryType === "4P1L" ? (
                <>
                  <div className="top-image">
                    <div className="top-left">
                      {renderImage(0, "first-image")}
                    </div>
                    <div className="top-right">
                      {renderImage(1, "second-image")}
                    </div>
                  </div>
                  <div className="middle-image">
                    {renderImage(2, "third-image")}
                  </div>
                  <div className="bottom-image">
                    <div className="bottom-left">
                      {renderImage(3, "fourth-image")}
                    </div>
                    <div className="bottom-right">
                      {renderImage(4, "fifth-image")}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="top-image">
                    <div className="top-left">
                      {renderImage(0, "first-image")}
                    </div>
                    <div className="top-right">
                      {renderImage(1, "second-image")}
                    </div>
                  </div>
                  <div className="middle-image">
                    {renderImage(2, "third-image")}
                  </div>
                  <div className="bottom-image">
                    <div className="bottom-left">
                      {renderImage(3, "fourth-image")}
                    </div>
                    <div className="bottom-right">
                      {renderImage(4, "fifth-image")}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        {!isDesktop ? (
          <div className="bottom">
            <img
              className={isVisible ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/ren/gallery/mobile-decor-bottom.png"
              alt="decor-bottom"
            />
          </div>
        ) : (
          <>
            <div className="bottom-left">
              <img
                className={isVisible ? "animate-fade-right" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/ren/gallery/decor-bottom-left.png"
                alt="decor-bottom-left"
              />
            </div>
            <div className="bottom-right">
              <img
                className={isVisible ? "animate-fade-left" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/ren/gallery/decor-bottom-right.png"
                alt="decor-bottom-right"
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
