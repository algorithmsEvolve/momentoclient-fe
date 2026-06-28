"use client";

import { useEffect, useRef, useState } from "react";

export default function BaraFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);
  const footerLink = "https://momentoproject.com";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div name="footer-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <a
            href={footerLink}
            target="_blank"
            rel="noreferrer"
            className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "350ms" }}
          >
            <img src="/themes/bara/footer/footer-momento-logo.svg" alt="footer-logo" />
          </a>
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className={`bottom-left ${isVisible ? "animate-fade-in-left" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <img src="/themes/bara/footer/decor-bottom-left.png" alt="decor-bottom-left" />
            </div>
            <div className={`bottom-right ${isVisible ? "animate-fade-in-right" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <img src="/themes/bara/footer/decor-bottom-right.png" alt="decor-bottom-right" />
            </div>
          </>
        ) : (
          <div className={`bottom-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
            <img src="/themes/bara/footer/mobile-decor-bottom-center.png" alt="decor-bottom-center" />
          </div>
        )}
      </div>
    </div>
  );
}
