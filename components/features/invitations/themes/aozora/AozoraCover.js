"use client";

import { useEffect, useState } from "react";

export default function AozoraCover({ invitation, guest, onOpen, isOpened }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const brideName = invitation?.couple?.bride?.displayName || "Ayu";
  const groomName = invitation?.couple?.groom?.displayName || "Bagas";
  const guestName = guest?.name;

  return (
    <div
      name="cover-section"
      className={`cover-section ${!isOpened ? "show" : ""} ${isOpened ? "scroll-cover" : ""}`}
      style={{ width: "100vw" }}
    >
      <div className="content">
        <div className="view-content">
          <div
            className="title animate-zoom-in"
            style={{ animationDelay: "2000ms" }}
          >
            <p>The Wedding Of</p>
          </div>

          <div
            className="bride-groom animate-zoom-in"
            style={{ animationDelay: "2500ms" }}
          >
            {isDesktop ? (
              <p>{brideName} &amp; {groomName}</p>
            ) : (
              <>
                <div className="bride">
                  <p>{brideName}</p>
                </div>
                <div className="and">
                  <p>&amp;</p>
                </div>
                <div className="groom">
                  <p>{groomName}</p>
                </div>
              </>
            )}
          </div>

          {guestName && (
            <div
              className="guest-name animate-zoom-in"
              style={{ animationDelay: "3000ms" }}
            >
              <p>
                Kepada Yth., <span className="name">{guestName}</span>
              </p>
            </div>
          )}

          <div
            className="open-button-wrapper animate-zoom-in"
            style={{ animationDelay: isDesktop ? "7000ms" : "5000ms" }}
          >
            <div
              name="aozora-button"
              onClick={onOpen}
              style={{ cursor: "pointer" }}
              data-testid="aozora-open-button"
              role="button"
            >
              <div className="icon">
                <img src="/themes/aozora/component/email-closed.svg" alt="button-icon" />
              </div>
              <div className="label">
                <p>Buka Undangan</p>
              </div>
            </div>
          </div>

          <div className="animated-bride-groom">
            <div className="bride">
              <img src="/themes/aozora/global/animated/bride-groom/bride.png" alt="bride-groom-bride" />
            </div>
            <div className="groom">
              <img src="/themes/aozora/global/animated/bride-groom/groom.png" alt="bride-groom-groom" />
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="animated-bottom-left flowers-stacked">
          <div
            className="top animate-fade-right"
            style={{ animationDelay: "500ms" }}
          >
            <img
              src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
              alt="flowers-stacked-top-flower"
            />
          </div>
          <div className="middle animate-fade-up">
            <img
              src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
              alt="flowers-stacked-middle-flower"
            />
          </div>
          <div className="upper-mid animate-zoom-in">
            <img
              src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
              alt="flowers-stacked-upper-mid-flower"
            />
          </div>
          <div
            className="bottom animate-fade-up"
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
            className="top animate-fade-left"
            style={{ animationDelay: "500ms" }}
          >
            <img
              src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
              alt="flowers-stacked-top-flower"
            />
          </div>
          <div className="middle animate-fade-up">
            <img
              src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
              alt="flowers-stacked-middle-flower"
            />
          </div>
          <div className="upper-mid animate-zoom-in">
            <img
              src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
              alt="flowers-stacked-upper-mid-flower"
            />
          </div>
          {isDesktop && (
            <div
              className="bottom animate-fade-up"
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
    </div>
  );
}
