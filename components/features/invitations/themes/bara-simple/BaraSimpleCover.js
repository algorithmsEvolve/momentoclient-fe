"use client";

import { useEffect, useState } from "react";
import { formatInvitationCoverDate } from "@/lib/invitations/date";

export default function BaraSimpleCover({ invitation, guest, onOpen }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const brideName = invitation?.couple?.bride?.displayName || "Stella";
  const groomName = invitation?.couple?.groom?.displayName || "Hendra";
  const coverDate =
    invitation?.coverDate && !invitation?.settings?.hideCoverDate
      ? formatInvitationCoverDate(invitation.coverDate)
      : formatInvitationCoverDate(invitation?.primaryDate);

  const guestName = guest?.name;
  const language = invitation?.settings?.custom?.language || "ID";
  const buttonTitle = language === "EN" ? "Open Invitation" : "Buka Undangan";
  const toText = language === "EN" ? "Dear," : "Kepada Yth,";

  const handleOpen = () => {
    setIsOpened(true);
    onOpen();
  };

  return (
    <div
      name="cover-section"
      className={`${isOpened ? "scroll-cover" : ""} show`}
    >
      <div className="content">
        <div className="view-content">
          <div className="title animate-zoom-in" style={{ animationDelay: "2000ms" }}>
            <p>The Wedding Of</p>
          </div>

          <div className="bride-groom animate-zoom-in" style={{ animationDelay: "2500ms" }}>
            <div className="groom">
              <p>{groomName}</p>
            </div>
            <div className="bride">
              <div className="and">
                <p>&amp;</p>
              </div>
              <p>{brideName}</p>
            </div>
          </div>

          {guestName && (
            <div className="guest-name">
              <div className="for">
                <p>{toText}</p>
              </div>
              <div className="name">
                <p>{guestName}</p>
              </div>
            </div>
          )}

          <div className="open-button-wrapper animate-zoom-in" style={{ animationDelay: "3000ms" }}>
            <button type="button" name="bara-simple-button" onClick={handleOpen} data-testid="bara-open-button">
              <div className="icon">
                <img src="/themes/bara-simple/component/email-closed.svg" alt="button-icon" />
              </div>
              <div className="label">
                <p>{buttonTitle}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {!invitation?.settings?.hideCoverDate && (
        <div className={`date ${isDesktop ? "animate-fade-left" : "animate-fade-right"}`} style={{ animationDuration: "5000ms" }}>
          <p>{coverDate.day}</p>
          <p>{coverDate.month}</p>
          <p>{coverDate.year}</p>
        </div>
      )}

      <div className="decorations">
        <div className="bottom-left">
          {isDesktop ? (
            <img
              className="animate-fade-right"
              style={{ animationDuration: "5000ms" }}
              src="/themes/bara-simple/cover/decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          ) : (
            <img
              className="animate-fade-right"
              style={{ animationDuration: "5000ms" }}
              src="/themes/bara-simple/cover/mobile-decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          )}
        </div>

        <div className="bottom-right">
          {isDesktop && (
            <img
              className="animate-fade-right"
              style={{ animationDuration: "5000ms" }}
              src="/themes/bara-simple/cover/decor-bottom-right.png"
              alt="decor-bottom-right"
            />
          )}
        </div>

        <div className="top-right">
          {isDesktop ? (
            <img
              className="animate-fade-left"
              style={{ animationDuration: "5000ms" }}
              src="/themes/bara-simple/cover/decor-top-right.png"
              alt="decor-top-right"
            />
          ) : (
            <img
              className="animate-fade-left"
              style={{ animationDuration: "5000ms" }}
              src="/themes/bara-simple/cover/mobile-decor-top-right.png"
              alt="decor-top-right"
            />
          )}
        </div>

        {isDesktop && (
          <div className="top-left">
            <img
              className="animate-fade-left"
              style={{ animationDuration: "5000ms" }}
              src="/themes/bara-simple/cover/decor-top-left.png"
              alt="decor-top-left"
            />
          </div>
        )}
      </div>
    </div>
  );
}
