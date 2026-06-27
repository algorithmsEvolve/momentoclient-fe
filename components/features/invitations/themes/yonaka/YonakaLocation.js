"use client";

import { useEffect, useRef, useState } from "react";

export default function YonakaLocation({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const events = invitation?.events || [];
  const mainEvent = events.find((e) => e.type === "reception") || events[0];
  const locationName = mainEvent?.locationName || "";
  const address = mainEvent?.address || "";
  const mapUrl = mainEvent?.mapUrl || "";

  return (
    <div ref={ref} id="location" name="location-section">
      <div className="content">
        <div className="view-content">
          <div className={`icon ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <img src="/themes/yonaka/location/location-icon.svg" alt="location-icon" />
          </div>
          <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
            <p>{locationName}</p>
          </div>
          <div className={`desc ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.45s" }}>
            <p>{address}</p>
          </div>
          {mapUrl && (
            <div className={`maps ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.55s" }}>
              <iframe className="g-maps" src={mapUrl} title="location-map" allowFullScreen loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
