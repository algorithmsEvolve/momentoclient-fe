"use client";

import { useEffect, useRef, useState } from "react";

function useCountDown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

export default function YonakaCountDownAndDisplayPicture({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const displayPicture = invitation?.settings?.displayPicture;
  const targetDate = invitation?.primaryDate;
  const { days, hours, minutes, seconds } = useCountDown(targetDate);

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
      { threshold: 0.15, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const items = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <div ref={ref} name="count-down-and-display-picture-section">
      <div className="content">
        <div className="view-content">
          {displayPicture && (
            <div className="display-img-wrapper-container">
              <div className={`display-img-wrapper ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
                <div className="display-img">
                  <img src={displayPicture} alt="display-picture" />
                </div>
              </div>
            </div>
          )}

          <div className="title-wrapper">
            <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
              <p>Hari yang dinanti</p>
            </div>
          </div>

          <div className={`count-down ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "1.25s" }}>
            {items.map((item) => (
              <div key={item.label} className="count-down-item">
                <div className="value">
                  <p>{String(item.value).padStart(2, "0")}</p>
                </div>
                <div className="label">
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="top-left">
          <img
            className={visible ? (isDesktop ? "animate-fade-down" : "animate-zoom-in-down") : "opacity-0"}
            style={{ animationDelay: "1.25s" }}
            src={isDesktop ? "/themes/yonaka/count-down-and-display-picture/decor-top-left.png" : "/themes/yonaka/count-down-and-display-picture/mobile-decor-top-left.png"}
            alt="decor"
          />
        </div>
        <div className="top-right">
          <img
            className={visible ? (isDesktop ? "animate-fade-down" : "animate-zoom-in-down") : "opacity-0"}
            style={{ animationDelay: "1.25s" }}
            src={isDesktop ? "/themes/yonaka/count-down-and-display-picture/decor-top-right.png" : "/themes/yonaka/count-down-and-display-picture/mobile-decor-top-right.png"}
            alt="decor"
          />
        </div>
      </div>
    </div>
  );
}
