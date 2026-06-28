"use client";

import { useEffect, useRef, useState } from "react";

export default function BaraLocation({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;
  const locationName = akad?.locationName || reception?.locationName || "Lokasi belum tersedia";
  const address = akad?.address || reception?.address || "Alamat acara belum diisi.";
  const mapUrl = akad?.mapUrl || reception?.mapUrl;

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

  return (
    <div id="location" name="location-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <img src="/themes/bara/location/location-icon.svg" alt="location-icon" />
          </div>
          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
            <p>{locationName}</p>
          </div>
          <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "400ms" }}>
            <p>{address}</p>
          </div>
          {mapUrl && (
            <div className={`maps ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
              <iframe
                src={mapUrl}
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
