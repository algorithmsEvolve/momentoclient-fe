"use client";

import { useEffect, useRef, useState } from "react";
import { getCountdownParts } from "@/lib/invitations/date";

export default function YamatoCountDownAndDisplayPicture({ invitation }) {
  const targetDate = invitation?.primaryDate;
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    const timerId = setTimeout(handleResize, 0);

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
      clearTimeout(timerId);
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

  const hideDisplayPicture =
    invitation?.settings?.hideDisplayPicture === true ||
    invitation?.settings?.custom?.hide_display_picture === true ||
    invitation?.settings?.custom?.hideDisplayPicture === true;
  const displayPicture = hideDisplayPicture ? null : invitation?.settings?.displayPicture;

  return (
    <div
      name="count-down-and-display-picture-section"
      className={!displayPicture ? "without-display-picture" : ""}
      ref={sectionRef}
    >
      <div className="content">
        <div className="view-content">
          {displayPicture && (
            <div
              className={`display-img-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "500ms" }}
            >
              <div className="display-img">
                <img src={displayPicture} alt="display-img" />
              </div>
            </div>
          )}

          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "1000ms" }}
          >
            <p>Journey Begins in</p>
          </div>

          <div
            className={`count-down ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "1250ms" }}
          >
            {[
              { label: "Hari", value: countdown.days },
              { label: "Jam", value: countdown.hours },
              { label: "Menit", value: countdown.minutes },
              { label: "Detik", value: countdown.seconds },
            ].map((time) => (
              <div key={time.label} className="count-down-item">
                <div className="label">
                  <p>{time.label}</p>
                </div>
                <div className="value">
                  <p>{time.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="top">
          {isDesktop ? (
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "1250ms" }}
              src="/themes/yamato/count-down-and-display-picture/decor-top.png"
              alt="decor-top"
            />
          ) : (
            <img
              className={isVisible ? "animate-zoom-in" : "opacity-0"}
              style={{ animationDelay: "1250ms" }}
              src="/themes/yamato/count-down-and-display-picture/mobile-decor-top.png"
              alt="mobile-decor-top"
            />
          )}
        </div>
      </div>
    </div>
  );
}
