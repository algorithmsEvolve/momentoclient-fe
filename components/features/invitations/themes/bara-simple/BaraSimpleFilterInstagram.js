"use client";

import { useEffect, useRef, useState } from "react";

export default function BaraSimpleFilterInstagram({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const filterUrl = invitation?.filterUrl;
  const livestreamUrl = invitation?.livestreamUrl;

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

  if (!filterUrl && !livestreamUrl) return null;

  return (
    <div name="filter-instagram-section" ref={sectionRef}>
      <div className={`content ${livestreamUrl ? "livestream" : ""}`}>
        <div className="view-content">
          {filterUrl && (
            <div className="item">
              <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
                <p>Filter Instagram</p>
              </div>
              <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
                <p>Ramaikan acara dengan menggunakan filter instagram kami</p>
              </div>
              <div className={`filter-button action-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "450ms" }}>
                <a href={filterUrl} target="_blank" rel="noreferrer">
                  <div name="bara-simple-button">
                    <div className="icon">
                      <img src="/themes/bara-simple/filter-instagram/streaming-icon.svg" alt="filter-icon" />
                    </div>
                    <div className="label"><p>Filter Instagram</p></div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {livestreamUrl && (
            <div className="item">
              <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
                <p>Live Streaming</p>
              </div>
              <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
                <p>Tanpa mengurangi rasa hormat kami, kami menyediakan tayangan acara pernikahan kami secara daring melalui link di bawah ini:</p>
              </div>
              <div className={`live-button action-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "450ms" }}>
                <a href={livestreamUrl} target="_blank" rel="noreferrer">
                  <div name="bara-simple-button" className="white">
                    <div className="icon">
                      <img src="/themes/bara-simple/filter-instagram/livestream-icon.svg" alt="livestream-icon" />
                    </div>
                    <div className="label"><p>Live Streaming</p></div>
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
