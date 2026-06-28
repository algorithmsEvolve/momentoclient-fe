"use client";

import { useEffect, useRef, useState } from "react";
import { getCountdownParts } from "@/lib/invitations/date";

export default function BaraCountDownAndDisplayPicture({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);
  const targetDate = invitation?.primaryDate;
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(targetDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  const displayPicture = invitation?.settings?.displayPicture;

  return (
    <div name="count-down-and-display-picture-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {displayPicture && (
            <div className={`display-img-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
              <div className="display-img">
                <img src={displayPicture} alt="display-picture" />
              </div>
            </div>
          )}

          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
            <p>Hari yang dinanti</p>
          </div>

          <div className={`count-down ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "400ms" }}>
            {[
              ["Hari", countdown.days],
              ["Jam", countdown.hours],
              ["Menit", countdown.minutes],
              ["Detik", countdown.seconds],
            ].map(([label, value]) => (
              <div key={label} className="count-down-item">
                <div className="label">
                  <p>{label}</p>
                </div>
                <div className="value">
                  <p>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="decorations">
        {!isDesktop && (
          <div className={`top ${isVisible ? "animate-zoom-in-down" : "opacity-0"}`} style={{ animationDelay: "700ms" }}>
            <img src="/themes/bara/count-down-and-display-picture/mobile-decor-top.png" alt="decor-top" />
          </div>
        )}
        {isDesktop && (
          <>
            <div className={`top-left ${isVisible ? "animate-fade-right" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
              <img src="/themes/bara/count-down-and-display-picture/decor-top-left.png" alt="decor-top-left" />
            </div>
            <div className={`top-right ${isVisible ? "animate-fade-left" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
              <img src="/themes/bara/count-down-and-display-picture/decor-top-right.png" alt="decor-top-right" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
