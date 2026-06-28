"use client";

import { useEffect, useRef, useState } from "react";

export default function BaraSimpleDisplayPicture({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

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

  const displayPicture = invitation?.settings?.displayPicture;

  if (!displayPicture) return null;

  return (
    <div name="display-picture-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`display-img-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
            <div className="display-img">
              <img src={displayPicture} alt="display-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className={`top-left ${isVisible ? "animate-fade-right" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <img src="/themes/bara-simple/display-picture/decor-top-left.png" alt="decor-top-left" />
            </div>
            <div className={`top-right ${isVisible ? "animate-fade-left" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <img src="/themes/bara-simple/display-picture/decor-top-right.png" alt="decor-top-right" />
            </div>
          </>
        ) : (
          <div className={`top ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
            <img src="/themes/bara-simple/display-picture/mobile-decor-top.png" alt="decor-top" />
          </div>
        )}
      </div>
    </div>
  );
}
