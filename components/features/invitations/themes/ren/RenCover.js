"use client";

import { useEffect, useState } from "react";

import RenBulkFlowers from "./RenBulkFlowers";
import RenButterflies from "./RenButterflies";

export default function RenCover({ invitation, guest, onOpen, isOpened }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    const timerId = setTimeout(handleResize, 0);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const brideName = invitation?.couple?.bride?.displayName || "Bride";
  const groomName = invitation?.couple?.groom?.displayName || "Groom";

  const guestName = guest?.name;

  return (
    <div
      name="cover-section"
      className={`cover-section ${!isOpened ? "show" : ""} ${isOpened ? "scroll-cover" : ""}`}
      style={{ width: "100vw" }}
    >
      <div className="content">
        <div className="view-content animate-zoom-in" style={{ animationDelay: "200ms", animationDuration: "800ms" }}>
          <div className="wedding-title animate-zoom-in" style={{ animationDelay: "200ms", animationDuration: "800ms" }}>
            <p>THE WEDDING OF</p>
          </div>

          <div className="bride-groom">
            <div className="bride animate-zoom-in" style={{ animationDelay: "200ms", animationDuration: "800ms" }}>
              <p>{brideName}</p>
            </div>

            <div className="and animate-zoom-in" style={{ animationDelay: "200ms", animationDuration: "800ms" }}>
              <p>&amp;</p>
            </div>

            <div className="groom animate-zoom-in" style={{ animationDelay: "200ms", animationDuration: "800ms" }}>
              <p>{groomName}</p>
            </div>
          </div>

          {guestName && (
            <div className="guest-name">
              <div className="for">
                <p>Kepada Yth,</p>
              </div>
              <div className="name">
                <p>{guestName}</p>
              </div>
            </div>
          )}

          <div className="open-button-wrapper animate-zoom-in" style={{ animationDelay: "500ms", animationDuration: "800ms" }}>
            <div
              name="ren-button"
              onClick={onOpen}
              style={{ cursor: "pointer" }}
              data-testid="ren-open-button"
              role="button"
            >
              <div className="icon">
                <img src="/themes/ren/component/email-closed.svg" alt="email" />
              </div>
              <div className="label">
                <p>Buka Undangan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="bottom-left">
          <RenBulkFlowers />
        </div>

        <div className="bottom-right">
          <RenBulkFlowers />
        </div>

        <div className="top-left">
          <RenButterflies />
        </div>

        {!isDesktop && (
          <div className="bottom">
            <img
              src="/themes/ren/cover/mobile-decor-bottom.png"
              alt="mobile-decor-bottom"
              className="animate-zoom-in-up"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
