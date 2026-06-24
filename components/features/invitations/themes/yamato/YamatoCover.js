"use client";

import { useEffect, useState } from "react";
import { formatInvitationCoverDate } from "@/lib/invitations/date";

export default function YamatoCover({ invitation, guest, onOpen, isOpened }) {
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

  const brideName = invitation?.couple?.bride?.displayName || "Ajeng";
  const groomName = invitation?.couple?.groom?.displayName || "Tirta";

  const coverDateStr = invitation?.coverDate || invitation?.primaryDate || "2024-12-12";
  const formattedDate = formatInvitationCoverDate(coverDateStr);
  const dateParts = formattedDate.split(" . ");

  const day = dateParts[0] || "12";
  const month = dateParts[1] || "12";
  const year = dateParts[2] || "24";

  const guestName = guest?.name
    ? guest.name.replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const settings = invitation?.settings || {};
  const showCoverTitle = settings.coverTitle !== false;
  const hideCoverDate = settings.hideCoverDate === true;

  const coverImage = isDesktop
    ? invitation?.settings?.coverImageDesktop || invitation?.coverImageDesktop
    : invitation?.settings?.coverImageMobile || invitation?.coverImageMobile;

  return (
    <div
      name="cover-section"
      className={`cover-section ${!isOpened ? "show" : ""} ${isOpened ? "scroll-cover" : ""}`}
      style={{
        width: "100vw",
        backgroundImage: coverImage ? `url('${coverImage}')` : undefined,
      }}
    >
      <div className="content">
        <div className="view-content">
          {showCoverTitle && (
            <div
              className="title animate-zoom-in"
              style={{ animationDelay: "500ms" }}
            >
              <p>The Wedding of</p>
            </div>
          )}

          <div
            className="bride-groom animate-zoom-in"
            style={{ animationDelay: "1000ms" }}
          >
            <div className="bride">
              <p>{brideName}</p>
              <div className="and">
                <p>and</p>
              </div>
            </div>
            <div className="groom">
              <p>{groomName}</p>
            </div>
          </div>

          {guestName && (
            <div
              className="guest-name animate-zoom-in"
              style={{ animationDelay: "1500ms" }}
            >
              <div className="for">
                <p>Kepada Yth,</p>
              </div>
              <div className="name">
                <p>{guestName}</p>
              </div>
            </div>
          )}

          <div
            className="open-button-wrapper animate-zoom-in"
            style={{ animationDelay: "2000ms" }}
          >
            <div
              name="yamato-button"
              onClick={onOpen}
              style={{ cursor: "pointer" }}
              data-testid="yamato-open-button"
              role="button"
            >
              <div className="icon">
                <img src="/themes/yamato/component/email-closed.svg" alt="button-icon" />
              </div>
              <div className="label">
                <p>Open Invitation</p>
              </div>
            </div>
          </div>

          {!hideCoverDate && (
            <div
              className="cover-date-wrapper animate-zoom-in"
              style={{ animationDelay: "2500ms" }}
            >
              <div className="cover-date">
                <p>{formattedDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <div className="top">
            <img
              className="animate-fade-up"
              style={{ animationDelay: "250ms" }}
              src="/themes/yamato/cover/decor-top.png"
              alt="decor-top"
            />
          </div>
        ) : (
          <>
            <div className="top">
              <img
                className="animate-fade-down"
                style={{ animationDelay: "250ms" }}
                src="/themes/yamato/cover/mobile-decor-top.png"
                alt="decor-mobile-top"
              />
            </div>
            <div className="bottom">
              <img
                className="animate-fade-up"
                style={{ animationDelay: "250ms" }}
                src="/themes/yamato/cover/mobile-decor-bottom.png"
                alt="decor-mobile-bottom"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
