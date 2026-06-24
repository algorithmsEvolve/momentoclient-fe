"use client";

import { useEffect, useState, useRef } from "react";

function FlowerDecoration({ isDesktop }) {
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
        {isDesktop && (
          <div
            className={`bottom ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "1000ms" }}
          >
            <img
              src="/themes/aozora/global/animated/flowers-stacked/bottom-flower.png"
              alt="flowers-stacked-bottom-flower"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AozoraFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

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

  return (
    <div name="footer-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className="footer-wrapper">
            <div className="bride-illustration">
              <img
                className={isVisible ? "animate-zoom-in" : "opacity-0"}
                style={{ animationDelay: "500ms" }}
                src="/themes/aozora/footer/bride-illustration.png"
                alt="bride-illustration"
              />
            </div>

            <a
              className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "500ms" }}
              href="https://www.instagram.com/momentoprjct/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/themes/aozora/footer/footer-momento-logo.svg"
                alt="footer-logo"
              />
            </a>
          </div>
        </div>
      </div>

      <FlowerDecoration isDesktop={isDesktop} />
    </div>
  );
}
