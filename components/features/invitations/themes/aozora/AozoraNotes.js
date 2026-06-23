"use client";

import { useEffect, useState } from "react";

function AvatarDecoration() {
  return (
    <div name="avatar-decoration" className="avatar-decorations">
      <div className="animated-bottom-left flowers-stacked">
        <div
          className="top animate-fade-right"
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className="middle animate-fade-up">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className="upper-mid animate-zoom-in">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
        <div
          className="bottom animate-fade-up"
          style={{ animationDelay: "1000ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/bottom-flower.png"
            alt="flowers-stacked-bottom-flower"
          />
        </div>
      </div>

      <div className="animated-bottom-right flowers-stacked">
        <div
          className="top animate-fade-left"
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className="middle animate-fade-up">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className="upper-mid animate-zoom-in">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
      </div>
    </div>
  );
}

export default function AozoraNotes({ invitation }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const notesTitle = invitation?.settings?.notesTitle || invitation?.settings?.custom?.notes_title || "Title Notes";
  const notesDesc = invitation?.settings?.notesDesc || invitation?.settings?.custom?.notes_desc || "Notes untuk tamu notes untuk tamu notes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamunotes untuk tamu";

  return (
    <div name="notes-section">
      <div className="content">
        <div className="view-content">
          <div className="note-wrapper">
            <div className="note-list"></div>

            <div className="title">
              <p>{notesTitle}</p>
            </div>

            <div className="desc">
              <p>{notesDesc}</p>
            </div>
          </div>
        </div>
      </div>
      
      {!isDesktop && (
        <div className="decorations">
          <AvatarDecoration />
        </div>
      )}
    </div>
  );
}
