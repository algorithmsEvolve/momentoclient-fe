"use client";

import { useEffect, useRef, useState } from "react";

export default function YamatoLocation({ invitation }) {
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

  const events = invitation?.events || [];
  const primaryEvent = events[0];
  const location = primaryEvent || invitation?.location || {};

  return (
    <div id="location" name="location-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div
            className={`icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <img src="/themes/yamato/location/location-icon.svg" alt="location-icon" />
          </div>
          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "350ms" }}
          >
            <p>{location.place || location.locationName || "Lokasi Acara"}</p>
          </div>
          <div
            className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "450ms" }}
          >
            <p>{location.address}</p>
          </div>
          <div
            className={`maps ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "550ms" }}
          >
            <iframe
              src={location.mapUrl || location.url}
              className="g-maps"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
