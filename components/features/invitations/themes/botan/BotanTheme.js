"use client";

import { useEffect, useState } from "react";
import "./botan.css";
import BotanPreloader from "@/components/features/invitations/themes/botan/BotanPreloader";
import BotanCover from "@/components/features/invitations/themes/botan/BotanCover";
import BotanCountdown from "@/components/features/invitations/themes/botan/BotanCountdown";
import BotanDateSection from "@/components/features/invitations/themes/botan/BotanDateSection";
import BotanFloatingMenu from "@/components/features/invitations/themes/botan/BotanFloatingMenu";
import BotanFooter from "@/components/features/invitations/themes/botan/BotanFooter";
import BotanGallery from "@/components/features/invitations/themes/botan/BotanGallery";
import BotanGift from "@/components/features/invitations/themes/botan/BotanGift";
import BotanLocation from "@/components/features/invitations/themes/botan/BotanLocation";
import BotanMusicButton from "@/components/features/invitations/themes/botan/BotanMusicButton";
import BotanOpening from "@/components/features/invitations/themes/botan/BotanOpening";
import BotanRsvpForm from "@/components/features/invitations/themes/botan/BotanRsvpForm";
import BotanStory from "@/components/features/invitations/themes/botan/BotanStory";
import BotanWishSection from "@/components/features/invitations/themes/botan/BotanWishSection";

export default function BotanTheme({ invitation, guest }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [musicRequested, setMusicRequested] = useState(false);
  const [preloading, setPreloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
  const galleryType = invitation?.settings?.galleryType || "4P1L";

  return (
    <main className={`botan-theme ${hasGuest ? "guest" : ""}`}>
      {preloading && <BotanPreloader />}
      
      {!preloading && showCover && (
        <BotanCover
          invitation={invitation}
          guest={guest}
          onOpen={openInvitation}
          isOpened={isOpened}
        />
      )}

      {!preloading && isOpened && (
        <>
          <BotanOpening invitation={invitation} />
          <BotanDateSection invitation={invitation} />
          <BotanCountdown targetDate={invitation?.primaryDate} />
          <BotanLocation invitation={invitation} />
          {hasGuest && <BotanRsvpForm invitation={invitation} guest={guest} />}
          <BotanStory invitation={invitation} />
          <BotanGallery invitation={invitation} galleryType={galleryType} />
          <BotanWishSection invitation={invitation} guest={guest} />
          {!withoutGift && <BotanGift invitation={invitation} />}
          <BotanFooter />

          <div className="md:hidden">
            <BotanFloatingMenu invitation={invitation} onNavigate={scrollToSection} />
          </div>
          
          <BotanMusicButton
            enabled={isOpened && musicRequested}
            musicUrl={invitation?.musicUrl}
          />
        </>
      )}
    </main>
  );
}

