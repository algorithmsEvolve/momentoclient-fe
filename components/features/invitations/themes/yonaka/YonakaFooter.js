"use client";

import { useEffect, useRef, useState } from "react";

export default function YonakaFooter({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const withFooterIllustration = invitation?.settings?.withFooterIllustration;
  const bride = invitation?.couple?.bride || {};
  const groom = invitation?.couple?.groom || {};

  return (
    <div ref={ref} name="footer-section">
      <div className="content">
        <div className="view-content">
          {withFooterIllustration && (
            <div className="couple">
              <div className="bride-illustration">
                <img src={bride.illustrationUrl} alt="bride" />
              </div>
              <div className="groom-illustration">
                <img src={groom.illustrationUrl} alt="groom" />
              </div>
            </div>
          )}
          <a
            href="https://momento.web.id"
            target="_blank"
            rel="noreferrer"
            className={`logo ${visible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "0.25s" }}
          >
            <img src="/themes/yonaka/footer/footer-momento-logo.png" alt="momento-logo" />
          </a>
        </div>
      </div>

      <div className="decorations">
        <div className="bottom-left">
          <img
            src={isDesktop ? "/themes/yonaka/footer/decor-bottom-left.png" : "/themes/yonaka/footer/mobile-decor-bottom-left.png"}
            alt="decor"
          />
        </div>
        <div className="bottom-right">
          <img
            src={isDesktop ? "/themes/yonaka/footer/decor-bottom-right.png" : "/themes/yonaka/footer/mobile-decor-bottom-right.png"}
            alt="decor"
          />
        </div>
      </div>
    </div>
  );
}
