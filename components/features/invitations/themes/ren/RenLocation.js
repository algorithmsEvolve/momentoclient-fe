"use client";

import { useEffect, useRef, useState } from "react";

export default function RenLocation({ invitation }) {
  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;

  const locationName = reception?.locationName || akad?.locationName || "Lokasi belum tersedia";
  const address = reception?.address || akad?.address || "Alamat acara belum diisi.";
  const mapUrl = reception?.mapUrl || akad?.mapUrl;

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

  const settings = invitation?.settings || {};
  const withoutEmbededMaps = settings.withoutEmbededMaps === true || !mapUrl?.includes("embed");

  return (
    <div id="location" name="location-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className="location-wrapper">
            <div className="lw-left">
              <div className="location-home-icon">
                <img
                  src="/themes/ren/location/location-place-icon.png"
                  alt="location-place-icon"
                  className={isVisible ? "animate-fade-up" : "opacity-0"}
                  style={{ animationDelay: "300ms" }}
                />

                <div className="decorations">
                  <div className="bottom">
                    <img
                      src="/themes/ren/location/location-decor-bottom.png"
                      alt="location-decor-bottom"
                      className={isVisible ? "animate-zoom-in-down" : "opacity-0"}
                      style={{ animationDelay: "500ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lw-right">
              <div
                className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <p>{locationName}</p>
              </div>

              <div
                className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "450ms" }}
              >
                <p>{address}</p>
              </div>

              <div
                className={`maps ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "550ms" }}
              >
                {withoutEmbededMaps && mapUrl ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={mapUrl}
                    className="maps-button"
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    <button type="button" name="ren-button" className="ren-button" style={{ cursor: "pointer" }}>
                      <div className="label">
                        <p>Lihat Lokasi Maps</p>
                      </div>
                    </button>
                  </a>
                ) : (
                  mapUrl && (
                    <iframe
                      src={mapUrl}
                      className="g-maps"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      title="Map"
                    ></iframe>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
