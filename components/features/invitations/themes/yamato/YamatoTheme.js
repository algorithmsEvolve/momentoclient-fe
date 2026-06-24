"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./yamato.css";
import YamatoPreloader from "./YamatoPreloader";
import YamatoCover from "./YamatoCover";
import YamatoCountDownAndDisplayPicture from "./YamatoCountDownAndDisplayPicture";
import YamatoOpening from "./YamatoOpening";
import YamatoDateSection from "./YamatoDateSection";
import YamatoLocation from "./YamatoLocation";
import YamatoStory from "./YamatoStory";
import YamatoGallery from "./YamatoGallery";
import YamatoRsvpForm from "./YamatoRsvpForm";
import YamatoFilterInstagram from "./YamatoFilterInstagram";
import YamatoWishSection from "./YamatoWishSection";
import YamatoGift from "./YamatoGift";
import YamatoFooter from "./YamatoFooter";
import YamatoFloatingMenu from "./YamatoFloatingMenu";
import YamatoMusicButton from "./YamatoMusicButton";

export default function YamatoTheme({ invitation, guest }) {
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
  const isStatic = invitation?.settings?.staticOurStory === true;

  return (
    <main className={`yamato-theme ${deviceClass} ${hasGuest ? "guest" : ""}`} name="yamato-theme">
      {preloading && <YamatoPreloader progress={progress} invitation={invitation} />}

      {!preloading && showCover && (
        <YamatoCover
          invitation={invitation}
          guest={guest}
          onOpen={openInvitation}
          isOpened={isOpened}
        />
      )}

      {!preloading && isOpened && (
        <>
          <YamatoCountDownAndDisplayPicture invitation={invitation} />
          <YamatoOpening invitation={invitation} />
          <YamatoDateSection invitation={invitation} />
          <YamatoLocation invitation={invitation} />
          {hasGuest && <YamatoRsvpForm invitation={invitation} guest={guest} />}
          {hasStories && (
            isStatic
              ? <YamatoStory invitation={invitation} isStatic />
              : <YamatoStory invitation={invitation} />
          )}
          {hasGallery && <YamatoGallery invitation={invitation} />}
          <YamatoFilterInstagram invitation={invitation} />
          <YamatoWishSection invitation={invitation} guest={guest} withoutGift={withoutGift} />
          {!withoutGift && <YamatoGift invitation={invitation} />}
          <YamatoFooter invitation={invitation} />

          <div className="md:hidden">
            <YamatoFloatingMenu invitation={invitation} onNavigate={scrollToSection} />
          </div>

          <YamatoMusicButton
            enabled={isOpened && musicRequested}
            musicUrl={invitation?.musicUrl}
          />
        </>
      )}
    </main>
  );
}
