"use client";

import { useEffect, useState } from "react";
import { getCountdownParts } from "@/lib/invitations/date";

export default function AozoraCountdown({ invitation }) {
  const targetDate = invitation?.primaryDate;
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));
  const [justMarried, setJustMarried] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const updateCountdown = () => {
      const targetTime = targetDate ? new Date(targetDate).getTime() : 0;
      const now = Date.now();
      const distance = targetTime - now;
      setJustMarried(distance <= 0);
      setCountdown(getCountdownParts(targetDate));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, [targetDate]);

  const hideDisplayPicture = invitation?.settings?.hideDisplayPicture === true;
  const displayPicture = hideDisplayPicture ? null : invitation?.settings?.displayPicture;

  const dpOffset = isDesktop ? "-800" : "-1000";
  const countdownOffset = isDesktop ? "-800" : "-1200";

  return (
    <div name="count-down-section">
      <div className="content">
        <div className="view-content">
          {displayPicture && (
            <div
              name="display-picture"
              className="animate-zoom-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="dp-image">
                <img src={displayPicture} alt="dp-image" />
              </div>
            </div>
          )}

          {!justMarried && (
            <>
              <div
                className="title animate-zoom-in"
                style={{ animationDelay: "350ms" }}
              >
                <p>Hari yang dinanti</p>
              </div>

              <div
                className="count-down animate-zoom-in"
                style={{ animationDelay: "450ms" }}
              >
                {[
                  { label: "Hari", value: countdown.days },
                  { label: "Jam", value: countdown.hours },
                  { label: "Menit", value: countdown.minutes },
                  { label: "Detik", value: countdown.seconds },
                ].map((time) => (
                  <div key={time.label} className="count-down-item">
                    <div className="value">
                      <p>{time.value}</p>
                    </div>
                    <div className="label">
                      <p>{time.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {justMarried && (
        <div
          className="just-married-wrapper animate-fade-in"
          style={{ animationDelay: "350ms" }}
        >
          <div className="just-married">
            <img src="/themes/aozora/count-down/just-married-icon.svg" alt="just-married" />
          </div>
        </div>
      )}

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
      </div>
    </div>
  );
}
