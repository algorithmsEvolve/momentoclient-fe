"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import ImageViewer from "@/components/ui/ImageViewer";

export default function BotanGallery({ invitation, galleryType }) {
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

  const galleries = useMemo(() => {
    return Array.isArray(invitation?.galleries) ? invitation.galleries : [];
  }, [invitation?.galleries]);

  const images = useMemo(() => {
    const imagesLength = galleries.length < 10 ? galleries.length : Math.floor(galleries.length / 2);
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
    <div id="gallery" name="gallery-section">
      <div className="content">
        <div className="view-content">
          <div className="logo">
            <img src={invitation?.quote?.nickLogo || "/themes/botan/gallery/nick-logo.png"} alt="nick-logo" />
          </div>

          {galleryType === '4P1L' && galleries.length >= 5 && (
            <>
              <div className="hidden md:flex galleries" name="gt-4P1L">
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

              <div className="md:hidden mobile-galleries" name="gt-4P1L">
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
            </>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="top-left">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/gallery/decor-top-left.png" />
            <img src="/themes/botan/gallery/mobile-decor-top-left.png" alt="decor-top-left" />
          </picture>
        </div>
        <div className="top-right">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/gallery/decor-top-right.png" />
            <img src="/themes/botan/gallery/mobile-decor-top-right.png" alt="decor-top-right" />
          </picture>
        </div>
        <div className="md:hidden back">
          <img src="/themes/botan/gallery/mobile-decor-back.png" alt="decor-back" />
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

