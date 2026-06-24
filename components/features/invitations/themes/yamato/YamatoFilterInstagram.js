"use client";

import { useEffect, useRef, useState } from "react";

export default function YamatoFilterInstagram({ invitation }) {
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
                  <div name="yamato-button" className="yamato-button" style={{ cursor: "pointer" }}>
                    <div className="icon">
                      <img src="/themes/yamato/filter-instagram/streaming-icon.svg" alt="filter-icon" />
                    </div>
                    <div className="label">
                      <p>Gunakan Filter</p>
                    </div>
                  </div>
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
                  <div name="yamato-button" className="yamato-button" style={{ cursor: "pointer" }}>
                    <div className="icon">
                      <img src="/themes/yamato/filter-instagram/livestream-icon.svg" alt="livestream-icon" />
                    </div>
                    <div className="label">
                      <p>Live Streaming</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
