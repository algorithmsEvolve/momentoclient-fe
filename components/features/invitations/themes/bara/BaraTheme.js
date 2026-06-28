"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./bara.css";

import BaraPreloader from "./BaraPreloader";
import BaraCover from "./BaraCover";
import BaraCountDownAndDisplayPicture from "./BaraCountDownAndDisplayPicture";
import BaraOpening from "./BaraOpening";
import BaraDateSection from "./BaraDateSection";
import BaraCountDown from "./BaraCountDown";
import BaraLocation from "./BaraLocation";
import BaraRsvpForm from "./BaraRsvpForm";
import BaraOurStory from "./BaraOurStory";
import BaraGallery from "./BaraGallery";
import BaraFilterInstagram from "./BaraFilterInstagram";
import BaraWishSection from "./BaraWishSection";
import BaraGift from "./BaraGift";
import BaraFooter from "./BaraFooter";
import BaraFloatingMenu from "./BaraFloatingMenu";
import BaraMusicButton from "./BaraMusicButton";

export default function BaraTheme({ invitation, guest }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);

  const { progress, isDone } = usePreloadProgress(invitation, { minDuration: 1200 });
  const preloading = !isDone;

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setIsDesktop(!isMobile);

      if (isMobile) {
        document.body.classList.add("mobile");
        document.body.classList.remove("desktop");
      } else {
        document.body.classList.add("desktop");
        document.body.classList.remove("mobile");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("mobile", "desktop");
    };
  }, []);

  const openInvitation = () => {
    setIsOpened(true);
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
  const hasGallery = Array.isArray(invitation?.galleries) && invitation.galleries.length > 0;
  const hasStories = Array.isArray(invitation?.stories) && invitation.stories.length > 0;
  const withoutGift = invitation?.settings?.withoutGift || !hasGift;
  const hasDisplayPicture = Boolean(invitation?.settings?.displayPicture);
  const galleryType = invitation?.settings?.galleryType || "5P0L";

  const deviceClass = isDesktop ? "desktop" : "mobile";

  return (
    <div name="bara-theme" className={`${deviceClass}${hasGuest ? " guest" : ""}`}>
      {preloading && <BaraPreloader progress={progress} />}
      {!preloading && showCover && <BaraCover invitation={invitation} guest={guest} onOpen={openInvitation} />}
      {!preloading && isOpened && (
        <>
          {hasDisplayPicture && <BaraCountDownAndDisplayPicture invitation={invitation} />}
          <BaraOpening invitation={invitation} />
          <BaraDateSection invitation={invitation} />
          {!hasDisplayPicture && <BaraCountDown invitation={invitation} />}
          <BaraLocation invitation={invitation} />
          {hasGuest && <BaraRsvpForm invitation={invitation} guest={guest} />}
          {hasStories && <BaraOurStory invitation={invitation} />}
          {hasGallery && <BaraGallery invitation={invitation} galleryType={galleryType} />}
          <BaraFilterInstagram invitation={invitation} />
          <BaraWishSection invitation={invitation} guest={guest} withoutGift={withoutGift} />
          {!withoutGift && <BaraGift invitation={invitation} />}
          <BaraFooter />
          {!isDesktop && <BaraFloatingMenu scrollToSection={scrollToSection} />}
          <BaraMusicButton invitation={invitation} />
        </>
      )}
    </div>
  );
}
