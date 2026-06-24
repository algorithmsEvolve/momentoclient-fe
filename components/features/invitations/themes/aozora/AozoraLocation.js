"use client";

import { useEffect, useRef, useState } from "react";

function FlowerDecoration() {
  const [isVisible, setIsVisible] = useState(false);
  const decorationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (decorationRef.current) {
      observer.observe(decorationRef.current);
    }

    return () => {
      if (decorationRef.current) {
        observer.unobserve(decorationRef.current);
      }
    };
  }, []);

  return (
    <div className="decorations" ref={decorationRef}>
      <div className="animated-bottom-left flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-right" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
        <div
          className={`bottom ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "1000ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/bottom-flower.png"
            alt="flowers-stacked-bottom-flower"
          />
        </div>
      </div>

      <div className="animated-bottom-right flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-left" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
      </div>
    </div>
  );
}

export default function AozoraLocation({ invitation }) {
  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;
  const locationName = akad?.locationName || reception?.locationName || "Lokasi belum tersedia";
  const address = akad?.address || reception?.address || "Alamat acara belum diisi.";
  const mapUrl = akad?.mapUrl || reception?.mapUrl;

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

  return (
    <div
      id="location"
      name="location-section"
      ref={sectionRef}
    >
      <div className="content">
        <div className="view-content">
          <div className="location-wrapper">
            <div className="lw-left">
              <div className="location-home-icon">
                <img
                  src="/themes/aozora/location/location-place-icon.png"
                  alt="location-place-icon"
                  className={isVisible ? "animate-fade-up" : "opacity-0"}
                  style={{ animationDelay: "300ms" }}
                />

                <FlowerDecoration />
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

              {mapUrl && (
                <div
                  className={`maps ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "550ms" }}
                >
                  <iframe
                    src={mapUrl}
                    className="g-maps"
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
      </div>
    </div>
  );
}
