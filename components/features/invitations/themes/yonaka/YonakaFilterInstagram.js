"use client";

import { useEffect, useRef, useState } from "react";

export default function YonakaFilterInstagram({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filterUrl = invitation?.settings?.filterUrl;
  const livestreamUrl = invitation?.settings?.custom?.livestreamUrl;

  return (
    <div ref={ref} name="filter-instagram-section">
      <div className="content">
        <div className="view-content">
          <div className={`item ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <div className="title"><p>Filter Instagram</p></div>
            <div className="desc"><p>Ramaikan acara dengan menggunakan filter instagram kami</p></div>
            <div className="filter-button action-button">
              <a href={filterUrl || "#"} target="_blank" rel="noreferrer">
                <button type="button" name="yonaka-button">
                  <div className="icon">
                    <img src="/themes/yonaka/filter-instagram/streaming-icon.svg" alt="icon" />
                  </div>
                  <div className="label"><p>Gunakan Filter</p></div>
                </button>
              </a>
            </div>
          </div>

          {livestreamUrl && (
            <div className={`item livestream ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
              <div className="title"><p>Live Streaming</p></div>
              <div className="desc"><p>Saksikan momen spesial kami secara langsung</p></div>
              <div className="action-button">
                <a href={livestreamUrl} target="_blank" rel="noreferrer">
                  <button type="button" name="yonaka-button">
                    <div className="icon">
                      <img src="/themes/yonaka/filter-instagram/livestream-icon.svg" alt="icon" />
                    </div>
                    <div className="label"><p>Nonton Live</p></div>
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
