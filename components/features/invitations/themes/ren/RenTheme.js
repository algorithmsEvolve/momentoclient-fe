"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./ren.css";
import RenPreloader from "./RenPreloader";
import RenCover from "./RenCover";
import RenCountDownAndDisplayPicture from "./RenCountDownAndDisplayPicture";
import RenOpening from "./RenOpening";
import RenDateSection from "./RenDateSection";
import RenLocation from "./RenLocation";
import RenStory from "./RenStory";
import RenGallery from "./RenGallery";
import RenRsvpForm from "./RenRsvpForm";
import RenWishSection from "./RenWishSection";
import RenGift from "./RenGift";
import RenFilterInstagram from "./RenFilterInstagram";
import RenFooter from "./RenFooter";
import RenFloatingMenu from "./RenFloatingMenu";
import RenMusicButton from "./RenMusicButton";

export default function RenTheme({ invitation, guest }) {
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
  const hasDisplayPicture = Boolean(invitation?.settings?.displayPicture);

  return (
    <main className={`ren-theme ${deviceClass} ${hasGuest ? "guest" : ""}`} name="ren-theme">
      {preloading && <RenPreloader progress={progress} />}

      {!preloading && showCover && (
        <RenCover
          invitation={invitation}
          guest={guest}
          onOpen={openInvitation}
          isOpened={isOpened}
        />
      )}

      {!preloading && isOpened && (
        <>
          {hasDisplayPicture && <RenCountDownAndDisplayPicture invitation={invitation} />}
          <RenOpening invitation={invitation} />
          <RenDateSection invitation={invitation} />
          {!hasDisplayPicture && <RenCountDownAndDisplayPicture invitation={invitation} />}
          <RenLocation invitation={invitation} />
          {hasGuest && <RenRsvpForm invitation={invitation} guest={guest} />}
          {hasStories && <RenStory invitation={invitation} />}
          {hasGallery && <RenGallery invitation={invitation} />}
          <RenFilterInstagram invitation={invitation} />
          <RenWishSection invitation={invitation} guest={guest} withoutGift={withoutGift} />
          {!withoutGift && <RenGift invitation={invitation} />}
          <RenFooter invitation={invitation} />

          <div className="md:hidden">
            <RenFloatingMenu invitation={invitation} onNavigate={scrollToSection} />
          </div>

          <RenMusicButton
            enabled={isOpened && musicRequested}
            musicUrl={invitation?.musicUrl}
          />
        </>
      )}
    </main>
  );
}
