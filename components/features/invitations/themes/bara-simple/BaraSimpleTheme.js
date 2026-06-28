"use client";

import { useEffect, useState } from "react";
import { usePreloadProgress } from "@/lib/invitations/usePreloadProgress";
import "./bara-simple.css";

import BaraSimplePreloader from "./BaraSimplePreloader";
import BaraSimpleCover from "./BaraSimpleCover";
import BaraSimpleDisplayPicture from "./BaraSimpleDisplayPicture";
import BaraSimpleOpening from "./BaraSimpleOpening";
import BaraSimpleDateSection from "./BaraSimpleDateSection";
import BaraSimpleLocation from "./BaraSimpleLocation";
import BaraSimpleRsvpForm from "./BaraSimpleRsvpForm";
import BaraSimpleFooter from "./BaraSimpleFooter";
import BaraSimpleFloatingMenu from "./BaraSimpleFloatingMenu";
import BaraSimpleMusicButton from "./BaraSimpleMusicButton";

export default function BaraSimpleTheme({ invitation, guest }) {
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

  const hasDisplayPicture = Boolean(invitation?.settings?.displayPicture);

  const deviceClass = isDesktop ? "desktop" : "mobile";

  return (
    <div name="bara-simple-theme" className={`${deviceClass} guest`}>
      {preloading && <BaraSimplePreloader progress={progress} />}
      {!preloading && showCover && <BaraSimpleCover invitation={invitation} guest={guest} onOpen={openInvitation} />}
      {!preloading && isOpened && (
        <>
          {hasDisplayPicture && <BaraSimpleDisplayPicture invitation={invitation} />}
          <BaraSimpleOpening invitation={invitation} />
          <BaraSimpleDateSection invitation={invitation} />
          <BaraSimpleLocation invitation={invitation} />
          <BaraSimpleRsvpForm invitation={invitation} />
          <BaraSimpleFooter />
          {!isDesktop && <BaraSimpleFloatingMenu scrollToSection={scrollToSection} />}
          <BaraSimpleMusicButton invitation={invitation} />
        </>
      )}
    </div>
  );
}
