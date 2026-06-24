"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./aozora.css";
import AozoraPreloader from "./AozoraPreloader";
import AozoraCover from "./AozoraCover";
import AozoraCountdown from "./AozoraCountdown";
import AozoraOpening from "./AozoraOpening";
import AozoraDateSection from "./AozoraDateSection";
import AozoraLocation from "./AozoraLocation";
import AozoraStory from "./AozoraStory";
import AozoraGallery from "./AozoraGallery";
import AozoraRsvpForm from "./AozoraRsvpForm";
import AozoraWishSection from "./AozoraWishSection";
import AozoraGift from "./AozoraGift";
import AozoraFilterInstagram from "./AozoraFilterInstagram";
import AozoraNotes from "./AozoraNotes";
import AozoraFooter from "./AozoraFooter";
import AozoraFloatingMenu from "./AozoraFloatingMenu";
import AozoraMusicButton from "./AozoraMusicButton";

export default function AozoraTheme({ invitation, guest }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [musicRequested, setMusicRequested] = useState(false);
  const [deviceClass, setDeviceClass] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      const currentClass = isMobile ? "mobile" : "desktop";
      setDeviceClass(currentClass);

      if (isMobile) {
        document.body.classList.add("mobile");
        document.body.classList.remove("desktop");
      } else {
        document.body.classList.add("desktop");
        document.body.classList.remove("mobile");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("mobile", "desktop");
    };
  }, []);

  const { progress, isDone } = usePreloadProgress(invitation, { minDuration: 1200 });
  const preloading = !isDone;

  const openInvitation = () => {
    setIsOpened(true);
    setMusicRequested(true);

    setTimeout(() => {
      setShowCover(false);
    }, 1750);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const hasGift = Array.isArray(invitation?.gifts) && invitation.gifts.length > 0;
  const hasGuest = Boolean(guest);
  const withoutGift = !hasGift;
  const hasStories = Array.isArray(invitation?.stories) && invitation.stories.length > 0;
  const hasGallery = Array.isArray(invitation?.galleries) && invitation.galleries.length > 0;
  const hasNotes = Boolean(invitation?.settings?.withNotes || invitation?.settings?.custom?.with_notes);

  return (
    <main className={`aozora-theme ${deviceClass} ${hasGuest ? "guest" : ""}`} name="aozora-theme">
      {preloading && <AozoraPreloader progress={progress} />}
      
      {!preloading && showCover && (
        <AozoraCover
          invitation={invitation}
          guest={guest}
          onOpen={openInvitation}
          isOpened={isOpened}
        />
      )}

      {!preloading && isOpened && (
        <>
          <AozoraCountdown invitation={invitation} />
          <AozoraOpening invitation={invitation} />
          <AozoraDateSection invitation={invitation} />
          <AozoraLocation invitation={invitation} />
          {hasStories && <AozoraStory invitation={invitation} />}
          {hasGallery && <AozoraGallery invitation={invitation} />}
          {hasGuest && <AozoraRsvpForm invitation={invitation} guest={guest} />}
          <AozoraFilterInstagram invitation={invitation} />
          <AozoraWishSection invitation={invitation} guest={guest} withoutGift={withoutGift} />
          {!withoutGift && <AozoraGift invitation={invitation} />}
          {hasNotes && <AozoraNotes invitation={invitation} />}
          <AozoraFooter invitation={invitation} />

          <div className="md:hidden">
            <AozoraFloatingMenu invitation={invitation} onNavigate={scrollToSection} />
          </div>
          
          <AozoraMusicButton
            enabled={isOpened && musicRequested}
            musicUrl={invitation?.musicUrl}
          />
        </>
      )}
    </main>
  );
}
