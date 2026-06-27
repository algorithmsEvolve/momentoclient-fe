"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./yonaka.css";
import YonakaPreloader from "@/components/features/invitations/themes/yonaka/YonakaPreloader";
import YonakaCover from "@/components/features/invitations/themes/yonaka/YonakaCover";
import YonakaCountDownAndDisplayPicture from "@/components/features/invitations/themes/yonaka/YonakaCountDownAndDisplayPicture";
import YonakaOpening from "@/components/features/invitations/themes/yonaka/YonakaOpening";
import YonakaDateSection from "@/components/features/invitations/themes/yonaka/YonakaDateSection";
import YonakaLocation from "@/components/features/invitations/themes/yonaka/YonakaLocation";
import YonakaRsvpForm from "@/components/features/invitations/themes/yonaka/YonakaRsvpForm";
import YonakaStory from "@/components/features/invitations/themes/yonaka/YonakaStory";
import YonakaGallery from "@/components/features/invitations/themes/yonaka/YonakaGallery";
import YonakaFilterInstagram from "@/components/features/invitations/themes/yonaka/YonakaFilterInstagram";
import YonakaWishSection from "@/components/features/invitations/themes/yonaka/YonakaWishSection";
import YonakaGift from "@/components/features/invitations/themes/yonaka/YonakaGift";
import YonakaFooter from "@/components/features/invitations/themes/yonaka/YonakaFooter";
import YonakaFloatingMenu from "@/components/features/invitations/themes/yonaka/YonakaFloatingMenu";
import YonakaMusicButton from "@/components/features/invitations/themes/yonaka/YonakaMusicButton";

export default function YonakaTheme({ invitation, guest }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [musicRequested, setMusicRequested] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { progress, isDone } = usePreloadProgress(invitation, { minDuration: 1200 });
  const preloading = !isDone;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isOpened) return;
  }, [isOpened]);

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
  const hasGallery = Array.isArray(invitation?.galleries) && invitation.galleries.length > 0;
  const hasStories = Array.isArray(invitation?.stories) && invitation.stories.length > 0;
  const withoutGift = invitation?.settings?.withoutGift || !hasGift;
  const galleryType = invitation?.settings?.galleryType || "4P1L";
  const displayPicture = invitation?.settings?.displayPicture;

  const deviceClass = isDesktop ? "desktop" : "mobile";

  return (
    <div className={deviceClass}>
      <main
        className={`yonaka-theme ${deviceClass} ${hasGuest ? "guest" : ""}`}
        name="yonaka-theme"
      >
        {preloading && <YonakaPreloader progress={progress} invitation={invitation} />}

        {!preloading && showCover && (
          <YonakaCover
            invitation={invitation}
            guest={guest}
            onOpen={openInvitation}
            isOpened={isOpened}
          />
        )}

        {!preloading && isOpened && (
          <>
            {displayPicture ? (
              <YonakaCountDownAndDisplayPicture invitation={invitation} />
            ) : null}

            <YonakaOpening invitation={invitation} />

            <YonakaDateSection invitation={invitation} />

            <YonakaLocation invitation={invitation} />

            {hasGuest && <YonakaRsvpForm invitation={invitation} guest={guest} />}

            {hasStories && <YonakaStory invitation={invitation} />}

            {hasGallery && <YonakaGallery invitation={invitation} galleryType={galleryType} />}

            <YonakaFilterInstagram invitation={invitation} />

            <YonakaWishSection invitation={invitation} guest={guest} />

            {!withoutGift && <YonakaGift invitation={invitation} />}

            <YonakaFooter invitation={invitation} />

            <div className="md:hidden">
              <YonakaFloatingMenu invitation={invitation} onNavigate={scrollToSection} />
            </div>

            <YonakaMusicButton
              enabled={isOpened && musicRequested}
              musicUrl={invitation?.musicUrl}
            />
          </>
        )}
      </main>
    </div>
  );
}
