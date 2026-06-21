"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./yuugure.css";
import YuugurePreloader from "./YuugurePreloader";
import YuugureCover from "./YuugureCover";
import YuugureCountDownAndDisplayPicture from "./YuugureCountDownAndDisplayPicture";
import YuugureOpening from "./YuugureOpening";
import YuugureDateSection from "./YuugureDateSection";
import YuugureLocation from "./YuugureLocation";
import YuugureStory from "./YuugureStory";
import YuugureGallery from "./YuugureGallery";
import YuugureRsvpForm from "./YuugureRsvpForm";
import YuugureWishSection from "./YuugureWishSection";
import YuugureGift from "./YuugureGift";
import YuugureFilterInstagram from "./YuugureFilterInstagram";
import YuugureClosing from "./YuugureClosing";
import YuugureFooter from "./YuugureFooter";
import YuugureFloatingMenu from "./YuugureFloatingMenu";
import YuugureMusicButton from "./YuugureMusicButton";

export default function YuugureTheme({ invitation, guest }) {
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

  return (
    <main className={`yuugure-theme ${deviceClass} ${hasGuest ? "guest" : ""}`} name="yuugure-theme">
      {preloading && <YuugurePreloader progress={progress} />}
      
      {!preloading && showCover && (
        <YuugureCover
          invitation={invitation}
          guest={guest}
          onOpen={openInvitation}
          isOpened={isOpened}
        />
      )}

      {!preloading && isOpened && (
        <>
          <YuugureCountDownAndDisplayPicture invitation={invitation} />
          <YuugureOpening invitation={invitation} />
          <YuugureDateSection invitation={invitation} />
          <YuugureLocation invitation={invitation} />
          {hasStories && <YuugureStory invitation={invitation} />}
          {hasGallery && <YuugureGallery invitation={invitation} />}
          {hasGuest && <YuugureRsvpForm invitation={invitation} guest={guest} />}
          <YuugureWishSection invitation={invitation} guest={guest} withoutGift={withoutGift} />
          {!withoutGift && <YuugureGift invitation={invitation} />}
          <YuugureFilterInstagram invitation={invitation} />
          <YuugureClosing invitation={invitation} />
          <YuugureFooter invitation={invitation} />

          <div className="md:hidden">
            <YuugureFloatingMenu invitation={invitation} onNavigate={scrollToSection} />
          </div>
          
          <YuugureMusicButton
            enabled={isOpened && musicRequested}
            musicUrl={invitation?.musicUrl}
          />
        </>
      )}
    </main>
  );
}
