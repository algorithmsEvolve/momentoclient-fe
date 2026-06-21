"use client";

import { useEffect, useRef, useState } from "react";

export default function YuugureFooter({ invitation }) {
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

  const bride = invitation?.couple?.bride;
  const groom = invitation?.couple?.groom;
  
  const showIllustration = Boolean(bride?.illustrationUrl && groom?.illustrationUrl);
  const footerLink = "https://momento.id"; // default branding URL

  return (
    <div name="footer-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {showIllustration && (
            <div className="couple">
              <div className="bride-illustration">
                <img src={bride.illustrationUrl} alt="bride-illustration" />
              </div>
              <div className="groom-illustration">
                <img src={groom.illustrationUrl} alt="groom-illustration" />
              </div>
            </div>
          )}

          <a
            href={footerLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <img src="/themes/yuugure/footer/footer-momento-logo.svg" alt="footer-logo" />
          </a>
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className="bottom-left">
              <img
                className={isVisible ? "animate-fade-right" : "opacity-0"}
                style={{ animationDelay: "250ms" }}
                src="/themes/yuugure/footer/decor-bottom-left.png"
                alt="decor-bottom-left"
              />
            </div>
            <div className="bottom-right">
              <img
                className={isVisible ? "animate-fade-left" : "opacity-0"}
                style={{ animationDelay: "500ms" }}
                src="/themes/yuugure/footer/decor-bottom-right.png"
                alt="decor-bottom-right"
              />
            </div>
          </>
        ) : (
          <>
            <div className="bottom-left">
              <img
                className={isVisible ? "animate-fade-right" : "opacity-0"}
                style={{ animationDelay: "250ms" }}
                src="/themes/yuugure/footer/mobile-decor-bottom-left.png"
                alt="decor-bottom-left"
              />
            </div>
            <div className="bottom-right">
              <img
                className={isVisible ? "animate-fade-left" : "opacity-0"}
                style={{ animationDelay: "250ms" }}
                src="/themes/yuugure/footer/mobile-decor-bottom-right.png"
                alt="decor-bottom-right"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
