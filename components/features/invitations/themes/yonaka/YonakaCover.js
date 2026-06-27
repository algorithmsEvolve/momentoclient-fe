"use client";

import { useEffect, useState, useRef } from "react";
import { formatInvitationCoverDate } from "@/lib/invitations/date";

export default function YonakaCover({ invitation, guest, onOpen, isOpened }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [animReady, setAnimReady] = useState(false);
  const [classShow, setClassShow] = useState(true);
  const [scrollCover, setScrollCover] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => setAnimReady(true), 100);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const brideName = invitation?.couple?.bride?.displayName || "";
  const groomName = invitation?.couple?.groom?.displayName || "";
  const guestName = guest?.name || "";
  const coverImage = isDesktop
    ? invitation?.coverImageDesktop || invitation?.coverImage
    : invitation?.coverImageMobile || invitation?.coverImage;
  const showCoverTitle = invitation?.settings?.custom?.cover_title;
  const hideCoverDate = invitation?.settings?.hideCoverDate;

  const coverDate = invitation?.coverDate || invitation?.primaryDate;
  let formattedDate = "";
  if (coverDate && !hideCoverDate) {
    try {
      const d = new Date(coverDate);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(-2);
      formattedDate = { day, month, year };
    } catch {
      formattedDate = null;
    }
  }

  const handleOpen = () => {
    setClassShow(false);
    setScrollCover(true);
    onOpen();
  };

  const capitalizeEveryWord = (str) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div
      name="cover-section"
      className={`${classShow ? "show" : ""} ${scrollCover ? "scroll-cover" : ""}`}
      style={{
        width: "100vw",
        backgroundImage: coverImage ? `url('${coverImage}')` : "none",
        backgroundColor: "#1C192C",
      }}
    >
      <div className="content" style={animReady ? { animation: "zoomIn 1.5s ease 1.5s both" } : { opacity: 0 }}>
        <div className="view-content">
          {showCoverTitle && (
            <div className="title" style={{ animation: "zoomIn 1.5s ease 1.5s both" }}>
              <p>The Wedding of</p>
            </div>
          )}

          <div className="bride-groom" style={{ animation: "zoomIn 1.5s ease 1s both" }}>
            <div className="bride">
              <p>{brideName}</p>
              <div className="and">
                <p>&amp;</p>
              </div>
            </div>
            <div className="groom">
              <p>{groomName}</p>
            </div>
          </div>

          {guestName && (
            <div className="guest-name" style={{ animation: "zoomIn 1.5s ease 2s both" }}>
              <div className="for">
                <p>Kepada Yth,</p>
              </div>
              <div className="name">
                <p>{capitalizeEveryWord(guestName)}</p>
              </div>
            </div>
          )}

          <div className="open-button-wrapper" style={{ animation: "zoomIn 1.5s ease 2.5s both" }}>
            <button type="button" name="yonaka-button" onClick={handleOpen}>
              <div className="icon">
                <img src="/themes/yonaka/component/email-closed.svg" alt="email" />
              </div>
              <div className="label">
                <p>Buka Undangan</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {formattedDate && (
        <div className="cover-date-wrapper">
          <p style={{ animation: "fadeSlideFromRight 1.5s ease 3s both" }}>{formattedDate.day}</p>
          <p style={{ animation: "fadeSlideFromRight 1.5s ease 3.3s both" }}>{formattedDate.month}</p>
          <p style={{ animation: "fadeSlideFromRight 1.5s ease 3.6s both" }}>{formattedDate.year}</p>
        </div>
      )}

      <div className="decorations">
        <div className="top-left">
          <img
            style={{ animation: "fadeSlideFromLeft 1.5s ease 0s both" }}
            src={isDesktop ? "/themes/yonaka/cover/decor-top-left.png" : "/themes/yonaka/cover/mobile-decor-top-left.png"}
            alt="decor-top-left"
          />
        </div>
        <div className="bottom-right">
          <img
            style={{ animation: "fadeSlideFromRight 1.5s ease 0.5s both" }}
            src={isDesktop ? "/themes/yonaka/cover/decor-bottom-right.png" : "/themes/yonaka/cover/mobile-decor-bottom-right.png"}
            alt="decor-bottom-right"
          />
        </div>
        <div className="top-right">
          <img
            style={{ animation: "fadeZoomIn 1.5s ease 1s both" }}
            src={isDesktop ? "/themes/yonaka/cover/decor-top-right.png" : "/themes/yonaka/cover/mobile-decor-top-right.png"}
            alt="decor-top-right"
          />
        </div>
        <div className="bottom-left">
          <img
            style={{ animation: "fadeZoomIn 1.5s ease 1.5s both" }}
            src={isDesktop ? "/themes/yonaka/cover/decor-bottom-left.png" : "/themes/yonaka/cover/mobile-decor-bottom-left.png"}
            alt="decor-bottom-left"
          />
        </div>
      </div>
    </div>
  );
}
