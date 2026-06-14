import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BotanFooter({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const withIllustration = invitation?.settings?.withFooterIllustration;
  const brideIllustration = invitation?.couple?.bride?.illustrationUrl || "/themes/botan/dummy/bride-illustration.png";
  const groomIllustration = invitation?.couple?.groom?.illustrationUrl || "/themes/botan/dummy/groom-illustration.png";
  const footerLink = "https://momentoproject.com";

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

  return (
    <div name="footer-section" className="botan-footer" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {withIllustration && (
            <div className="couple">
              <div className={`bride-illustration ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
                <img src={brideIllustration} alt="bride-illustration" />
              </div>
              <div className={`groom-illustration ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
                <img src={groomIllustration} alt="groom-illustration" />
              </div>
            </div>
          )}

          <a href={footerLink} target="_blank" rel="noreferrer" className={`logo ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
            <img src="/themes/botan/footer/footer-momento-logo.svg" alt="footer-logo" />
          </a>
        </div>
      </div>

      <div className="decorations">
        <img className={`decor-desktop-left ${isVisible ? "animate-fade-right" : "opacity-0"}`} src="/themes/botan/footer/decor-bottom-left.png" alt="decor-left" style={{ animationDelay: "250ms" }} />
        <img className={`decor-desktop-right ${isVisible ? "animate-fade-left" : "opacity-0"}`} src="/themes/botan/footer/decor-bottom-right.png" alt="decor-right" style={{ animationDelay: "250ms" }} />
        <img className={`decor-mobile-top ${isVisible ? "animate-zoom-slide-from-right" : "opacity-0"}`} src="/themes/botan/footer/mobile-decor-top-right.png" alt="decor-top" style={{ animationDelay: "250ms" }} />
        <img className={`decor-mobile-bottom ${isVisible ? "animate-fade-up" : "opacity-0"}`} src="/themes/botan/footer/mobile-decor-bottom-center.png" alt="decor-bottom" style={{ animationDelay: "250ms" }} />
      </div>
    </div>
  );
}
