"use client";

import { useEffect, useRef, useState } from "react";

export default function AozoraFilterInstagram({ invitation }) {
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

  const filterUrl = invitation?.filterUrl;
  const events = invitation?.events || [];
  const livestreamEvent = events.find((e) => e.livestreamUrl);
  const livestreamUrl = livestreamEvent?.livestreamUrl;

  const hasFilter = Boolean(filterUrl);
  const hasLivestream = Boolean(livestreamUrl);

  if (!hasFilter && !hasLivestream) return null;

  return (
    <div name="filter-instagram-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className="filter-live-wrapper">
            {hasFilter && (
              <div className="filter">
                <div
                  className={`filter-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "250ms" }}
                >
                  <img
                    src="/themes/aozora/filter-instagram/filter-live-icon.svg"
                    alt="filter-icon"
                  />
                </div>

                <div
                  className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "350ms" }}
                >
                  <p>Filter Instagram</p>
                </div>

                <div
                  className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "450ms" }}
                >
                  <p>Ramaikan acara dengan menggunakan filter instagram kami</p>
                </div>

                <div
                  className={`filter-button action-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "550ms" }}
                >
                  <a href={filterUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div name="aozora-button" style={{ cursor: "pointer" }}>
                      <div className="icon">
                        <img src="/themes/aozora/filter-instagram/filter-live-icon-btn.svg" alt="button-icon" />
                      </div>
                      <div className="label">
                        <p>Filter Instagram</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}

            {hasLivestream && (
              <>
                <div className="section-divider">
                  {isDesktop ? (
                    <img
                      src="/themes/aozora/global/section-divider.svg"
                      alt="section-divider"
                    />
                  ) : (
                    <img
                      src="/themes/aozora/global/mobile-section-divider.svg"
                      alt="section-divider"
                    />
                  )}
                </div>

                <div className="live">
                  <div
                    className={`live-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "250ms" }}
                  >
                    <img
                      src="/themes/aozora/filter-instagram/filter-live-icon.svg"
                      alt="live-icon"
                    />
                  </div>

                  <div
                    className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "650ms" }}
                  >
                    <p>Live Streaming</p>
                  </div>

                  <div
                    className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "450ms" }}
                  >
                    <p>Kami juga menyediakan tayangan acara pernikahan kami secara daring melalui link di bawah ini</p>
                  </div>

                  <div
                    className={`live-button action-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "450ms" }}
                  >
                    <a href={livestreamUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div name="aozora-button" style={{ cursor: "pointer" }}>
                        <div className="icon">
                          <img src="/themes/aozora/filter-instagram/filter-live-icon-btn.svg" alt="button-icon" />
                        </div>
                        <div className="label">
                          <p>Live Streaming</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}

            <div className="animated-decorations">
              <div
                className={`animated-middle-section ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <div className="ams-left">
                  <img src="/themes/aozora/global/animated/middle-section/left.png" alt="left-decor-ams" />
                </div>
                <div className="ams-middle">
                  <img src="/themes/aozora/global/animated/middle-section/middle.png" alt="middle-decor-ams" />
                </div>
                <div className="ams-right">
                  <img src="/themes/aozora/global/animated/middle-section/right.png" alt="right-decor-ams" />
                </div>
              </div>
            </div>

            <div className="animated-decorations ad-bottom">
              <div
                className={`animated-middle-section ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <div className="ams-left">
                  <img src="/themes/aozora/global/animated/middle-section/left.png" alt="left-decor-ams" />
                </div>
                <div className="ams-middle">
                  <img src="/themes/aozora/global/animated/middle-section/middle.png" alt="middle-decor-ams" />
                </div>
                <div className="ams-right">
                  <img src="/themes/aozora/global/animated/middle-section/right.png" alt="right-decor-ams" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
