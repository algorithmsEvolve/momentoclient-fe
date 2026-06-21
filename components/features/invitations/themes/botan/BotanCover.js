import { useEffect, useState } from "react";
import { formatInvitationCoverDate } from "@/lib/invitations/date";

export default function BotanCover({ invitation, guest, onOpen, isOpened }) {
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

  const brideName = invitation?.couple?.bride?.displayName || "Aira";
  const groomName = invitation?.couple?.groom?.displayName || "Bima";
  const coverDate =
    invitation?.coverDate && !invitation?.settings?.hideCoverDate
      ? formatInvitationCoverDate(invitation.coverDate)
      : formatInvitationCoverDate(invitation?.primaryDate);

  const guestName = guest?.name;

  return (
    <div
      name="cover-section"
      className={`cover-section ${!isOpened ? "show" : ""} ${isOpened ? "scroll-cover" : ""}`}
      style={{ width: "100vw" }}
    >
      <div className="content">
        <div className="view-content animate-zoom-in">
          <div className="title">
            <p>The Wedding Of</p>
          </div>

          <div className="bride-groom">
            <div className="bride">
              <p>{brideName}</p>
            </div>

            <div className="and">
              <p>&amp;</p>
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
            <button type="button" name="botan-button" onClick={onOpen} data-testid="botan-open-button">
              <div className="icon">
                <img src="/themes/botan/component/email-closed.svg" alt="email" />
              </div>
              <div className="label">
                <p>Buka Undangan</p>
              </div>
            </button>
          </div>

          {(!invitation?.settings?.hideCoverDate) && (
            <div className="date">
              <p>{coverDate}</p>
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="back animate-fade-up">
          <img
            src={isDesktop ? "/themes/botan/cover/decor-back.png" : "/themes/botan/cover/mobile-decor-back.png"}
            alt="decor-back"
          />
        </div>

        <div className="back-left animate-zoom-in">
          <img
            src={isDesktop ? "/themes/botan/cover/decor-back-left.png" : "/themes/botan/cover/mobile-decor-back-left.png"}
            alt="decor-back-left"
          />
        </div>
        
        <div className="bottom-left animate-fade-right">
          <img
            src={isDesktop ? "/themes/botan/cover/decor-left.png" : "/themes/botan/cover/mobile-decor-left.png"}
            alt="decor-bottom-left"
          />
        </div>

        <div className="top-right animate-fade-left">
          <img
            src={isDesktop ? "/themes/botan/cover/decor-right.png" : "/themes/botan/cover/mobile-decor-right.png"}
            alt="decor-top-right"
          />
        </div>
      </div>
    </div>
  );
}

