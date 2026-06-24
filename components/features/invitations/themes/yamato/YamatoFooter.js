"use client";

import { useEffect, useRef, useState } from "react";

export default function YamatoFooter({ invitation }) {
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

  const withFooterIllustration = invitation?.settings?.withFooterIllustration || false;
  const brideIllustration = invitation?.couple?.bride?.illustrationUrl;
  const groomIllustration = invitation?.couple?.groom?.illustrationUrl;
  const footerLink = "https://momento.web.id";

  return (
    <div name="footer-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {withFooterIllustration && (brideIllustration || groomIllustration) && (
            <div className="couple">
              {brideIllustration && (
                <div className="bride-illustration">
                  <img src={brideIllustration} alt="bride-illustration" />
                </div>
              )}
              {groomIllustration && (
                <div className="groom-illustration">
                  <img src={groomIllustration} alt="groom-illustration" />
                </div>
              )}
            </div>
          )}

          <a
            href={footerLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <img
              src="/themes/yamato/footer/footer-momento-logo.png"
              alt="footer-logo"
            />
          </a>
        </div>
      </div>

      <div className="decorations">
        {isDesktop && (
          <div className="top">
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "250ms" }}
              src="/themes/yamato/footer/decor-top.png"
              alt="decor-top"
            />
          </div>
        )}
        {!isDesktop && (
          <div className="bottom">
            <img
              className={isVisible ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: "250ms" }}
              src="/themes/yamato/footer/mobile-decor-bottom.png"
              alt="decor-bottom"
            />
          </div>
        )}
      </div>
    </div>
  );
}
