"use client";

import { useEffect, useState } from "react";
import { formatInvitationCoverDate } from "@/lib/invitations/date";

export default function BaraCover({ invitation, guest, onOpen }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const brideName = invitation?.couple?.bride?.displayName || "Aira";
  const groomName = invitation?.couple?.groom?.displayName || "Bima";
  const coverDate =
    invitation?.coverDate && !invitation?.settings?.hideCoverDate
      ? formatInvitationCoverDate(invitation.coverDate)
      : formatInvitationCoverDate(invitation?.primaryDate);

  const guestName = guest?.name;

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
        <div className="view-content animate-zoom-in">
          <div className="bride-groom">
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
            <div className="guest-name">
              <div className="for">
                <p>Kepada Yth,</p>
              </div>
              <div className="name">
                <p>{guestName}</p>
              </div>
            </div>
          )}

          <div className="open-button-wrapper animate-zoom-in">
            <button type="button" name="bara-button" onClick={handleOpen} data-testid="bara-open-button">
              <div className="icon">
                <img src="/themes/bara/component/email-closed.svg" alt="button-icon" />
              </div>
              <div className="label">
                <p>Buka Undangan</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {!invitation?.settings?.hideCoverDate && (
        <div className={`date ${isDesktop ? "animate-fade-left" : "animate-fade-right"}`}>
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
              src="/themes/bara/cover/decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          ) : (
            <img
              className="animate-fade-right"
              src="/themes/bara/cover/mobile-decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          )}
        </div>

        {isDesktop && (
          <div className="bottom-right">
            <img
              className="animate-fade-right"
              src="/themes/bara/cover/decor-bottom-right.png"
              alt="decor-bottom-right"
            />
          </div>
        )}

        <div className="top-right">
          {isDesktop ? (
            <img
              className="animate-fade-left"
              src="/themes/bara/cover/decor-top-right.png"
              alt="decor-top-right"
            />
          ) : (
            <img
              className="animate-fade-left"
              src="/themes/bara/cover/mobile-decor-top-right.png"
              alt="decor-top-right"
            />
          )}
        </div>

        {isDesktop && (
          <div className="top-left">
            <img
              className="animate-fade-left"
              src="/themes/bara/cover/decor-top-left.png"
              alt="decor-top-left"
            />
          </div>
        )}
      </div>
    </div>
  );
}
