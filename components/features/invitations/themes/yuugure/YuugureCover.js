"use client";

import { useEffect, useState } from "react";
import { formatInvitationCoverDate } from "@/lib/invitations/date";

export default function YuugureCover({ invitation, guest, onOpen, isOpened }) {
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

  const brideName = invitation?.couple?.bride?.displayName || "Aoi";
  const groomName = invitation?.couple?.groom?.displayName || "Sora";
  
  const coverDateStr = invitation?.coverDate || invitation?.primaryDate || "2026-10-10";
  const formattedDate = formatInvitationCoverDate(coverDateStr); // e.g. "10 . 10 . 26"
  const dateParts = formattedDate.split(" . ");
  
  const day = dateParts[0] || "10";
  const month = dateParts[1] || "10";
  const year = dateParts[2] || "26";

  const guestName = guest?.name;
  
  // Settings
  const settings = invitation?.settings || {};
  const showCoverTitle = settings.coverTitle !== false;
  const showMiddleDate = settings.middleCoverDate === true;
  const hideCoverDate = settings.hideCoverDate === true;
  const coverAndPlacedAfterBride = settings.coverAndPlacedAfterBride === true;
  
  const formattedMiddleDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(coverDateStr));

  return (
    <div
      name="cover-section"
      className={`cover-section ${!isOpened ? "show" : ""} ${isOpened ? "scroll-cover" : ""}`}
      style={{ width: "100vw" }}
    >
      <div className="content animate-zoom-in" style={{ animationDelay: "0ms" }}>
        <div className="view-content">
          {showCoverTitle && (
            <div className="title animate-zoom-in" style={{ animationDelay: "150ms" }}>
              <p>The Wedding of</p>
            </div>
          )}
          
          <div
            className={`bride-groom ${coverAndPlacedAfterBride ? "cover-and-placed-after-bride" : ""} animate-zoom-in`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="bride">
              <p>
                {brideName}
                {coverAndPlacedAfterBride && <span className="and">&amp;</span>}
              </p>
            </div>
            
            <div className="groom">
              {!coverAndPlacedAfterBride && (
                <div className="and">
                  <p>&amp;</p>
                </div>
              )}
              <p>{groomName}</p>
            </div>
          </div>

          {showMiddleDate && (
            <div className="middle-date animate-zoom-in" style={{ animationDelay: "500ms" }}>
              <div className="middle-date-separator">
                <div className="separator-line"></div>
              </div>
              <p>{formattedMiddleDate}</p>
              <div className="middle-date-separator">
                <div className="separator-line"></div>
              </div>
            </div>
          )}

          {guestName && (
            <div className="guest-name animate-zoom-in" style={{ animationDelay: "650ms" }}>
              <div className="for">
                <p>Kepada Yth,</p>
              </div>
              <div className="name">
                <p>{guestName}</p>
              </div>
            </div>
          )}

          <div className="open-button-wrapper animate-zoom-in" style={{ animationDelay: "750ms" }}>
            <div
              name="yuugure-button"
              onClick={onOpen}
              style={{ cursor: "pointer" }}
              data-testid="yuugure-open-button"
              role="button"
            >
              <div className="icon">
                <img src="/themes/yuugure/component/email-closed.svg" alt="email" />
              </div>
              <div className="label">
                <p>Buka Undangan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!hideCoverDate && (
        <div className="date animate-zoom-in-left" style={{ animationDelay: "0ms" }}>
          <div className="day">
            <p>{day}</p>
          </div>
          <div className="month">
            <p>{month}</p>
          </div>
          <div className="year">
            <p>{year}</p>
          </div>
        </div>
      )}

      <div className="decorations">
        <div className="bottom-left animate-fade-in" style={{ animationDelay: "750ms" }}>
          <img
            src={isDesktop ? "/themes/yuugure/cover/decor-left.png" : "/themes/yuugure/cover/mobile-decor-left.png"}
            alt="decor-bottom-left"
          />
        </div>

        <div className="bottom-right animate-fade-in" style={{ animationDelay: "250ms" }}>
          <img
            src={isDesktop ? "/themes/yuugure/cover/decor-bottom-right.png" : "/themes/yuugure/cover/mobile-decor-right.png"}
            alt="decor-bottom-right"
          />
        </div>

        {isDesktop ? (
          <div className="top-right animate-fade-in" style={{ animationDelay: "1250ms" }}>
            <img src="/themes/yuugure/cover/decor-right.png" alt="decor-top-right" />
          </div>
        ) : (
          <div className="top-left animate-fade-in" style={{ animationDelay: "1250ms" }}>
            <img src="/themes/yuugure/cover/mobile-decor-top-left.png" alt="decor-top-left" />
          </div>
        )}
      </div>
    </div>
  );
}
