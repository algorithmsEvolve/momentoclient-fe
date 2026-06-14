"use client";

import { useEffect, useRef, useState } from "react";
import { getCountdownParts } from "@/lib/invitations/date";

export default function BotanCountdown({ targetDate }) {
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));
  const [justMarried, setJustMarried] = useState(false);
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      const parts = getCountdownParts(targetDate);
      setCountdown(parts);
      if (parts.days === "00" && parts.hours === "00" && parts.minutes === "00" && parts.seconds === "00") {
        setJustMarried(true);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div name="count-down-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {justMarried ? (
            <div className={`just-married-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
              <div className="just-married">
                <img src="/themes/botan/count-down/just-married-icon.svg" alt="just-married" />
              </div>
            </div>
          ) : (
            <>
              <div className={`icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
                <img src="/themes/botan/count-down/balloon-icon.svg" alt="day-icon" />
              </div>

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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

