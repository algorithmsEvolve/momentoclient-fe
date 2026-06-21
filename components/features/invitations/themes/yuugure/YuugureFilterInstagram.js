"use client";

import { useEffect, useRef, useState } from "react";

export default function YuugureFilterInstagram({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filterUrl = invitation?.filterUrl;
  
  // Find if any event has a livestream URL
  const events = invitation?.events || [];
  const livestreamEvent = events.find((e) => e.livestreamUrl);
  const livestreamUrl = livestreamEvent?.livestreamUrl;

  const hasFilter = Boolean(filterUrl);
  const hasLivestream = Boolean(livestreamUrl);

  if (!hasFilter && !hasLivestream) return null;

  return (
    <div name="filter-instagram-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {hasFilter && (
            <div className="filter-ig item">
              <div
                className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <p>Filter Instagram</p>
              </div>

              <div
                className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <p>Ramaikan acara dengan menggunakan filter instagram kami</p>
              </div>

              <div
                className={`filter-button action-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "450ms" }}
              >
                <a href={filterUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button type="button" name="yuugure-button" className="yuugure-button" style={{ cursor: "pointer" }}>
                    <div className="icon">
                      <img src="/themes/yuugure/filter-instagram/streaming-icon.svg" alt="filter-icon" />
                    </div>
                    <div className="label">
                      <p>Filter Instagram</p>
                    </div>
                  </button>
                </a>
              </div>
            </div>
          )}

          {hasLivestream && (
            <div className="livestream item">
              <div
                className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <p>Live Streaming</p>
              </div>

              <div
                className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <p>Kami juga menyediakan tayangan acara pernikahan kami secara daring melalui link di bawah ini :</p>
              </div>

              <div
                className={`live-button action-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "450ms" }}
              >
                <a href={livestreamUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button type="button" name="yuugure-button" className="yuugure-button" style={{ cursor: "pointer" }}>
                    <div className="icon">
                      <img src="/themes/yuugure/filter-instagram/livestream-icon.svg" alt="livestream-icon" />
                    </div>
                    <div className="label">
                      <p>Live Streaming</p>
                    </div>
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
