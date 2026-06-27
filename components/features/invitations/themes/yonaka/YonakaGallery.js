"use client";

import { useEffect, useRef, useState } from "react";
import ImageViewer from "@/components/ui/ImageViewer";

export default function YonakaGallery({ invitation, galleryType = "4P1L" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const galleries = invitation?.galleries || [];
  const images = galleries.map((g) => g.photoUrl || g.url || g.imageUrl);

  const openViewer = (idx) => {
    setViewerIndex(idx);
    setViewerOpen(true);
  };

  return (
    <div ref={ref} name="gallery-section">
      <div className="content">
        <div className="view-content">
          <div className={`logo ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <img src="/themes/yonaka/our-story/love-story-icon.svg" alt="gallery-icon" />
          </div>

          <div name={`gallery-${galleryType}`}>
            {images.map((src, idx) => (
              <div
                key={idx}
                className="gallery-item"
                onClick={() => openViewer(idx)}
                style={{ cursor: "pointer" }}
              >
                <img src={src} alt={`gallery-${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="top-left"><img src="/themes/yonaka/gallery/decor-top-left.png" alt="decor" /></div>
        <div className="top-right"><img src="/themes/yonaka/gallery/decor-top-right.png" alt="decor" /></div>
      </div>

      {viewerOpen && (
        <ImageViewer
          images={images}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
