"use client";

import { useEffect, useState, useRef } from "react";

function AvatarDecoration() {
  const [isVisible, setIsVisible] = useState(false);
  const decorationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (decorationRef.current) {
      observer.observe(decorationRef.current);
    }

    return () => {
      if (decorationRef.current) {
        observer.unobserve(decorationRef.current);
      }
    };
  }, []);

  return (
    <div name="avatar-decoration" className="avatar-decorations" ref={decorationRef}>
      <div className="animated-bottom-left flowers-stacked">
        <div
          className={`top ${isVisible ? "animate-fade-right" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
        <div
          className={`bottom ${isVisible ? "animate-fade-up" : "opacity-0"}`}
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
          className={`top ${isVisible ? "animate-fade-left" : "opacity-0"}`}
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className={`middle ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className={`upper-mid ${isVisible ? "animate-zoom-in" : "opacity-0"}`}>
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
      </div>
    </div>
  );
}

function formatDisplayName(fullname) {
  if (!fullname) return "";
  const maxLength = 18;
  if (fullname.length < maxLength && fullname.includes(" ")) {
    return fullname.split(" ").map((name, index) => (
      <span key={index}>
        {index > 0 && <br />}
        {name}
      </span>
    ));
  }
  return fullname;
}

export default function AozoraOpening({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const quoteText = invitation?.quote?.text;
  const quoteTitle = invitation?.quote?.title;

  const bride = invitation?.couple?.bride || {};
  const groom = invitation?.couple?.groom || {};

  const brideFullName = bride.fullName || "";
  const brideFather = bride.fatherName || "";
  const brideMother = bride.motherName || "";
  const brideInstagram = bride.instagram || "";
  const bridePhoto = bride.photoUrl || "";

  const groomFullName = groom.fullName || "";
  const groomFather = groom.fatherName || "";
  const groomMother = groom.motherName || "";
  const groomInstagram = groom.instagram || "";
  const groomPhoto = groom.photoUrl || "";

  const groomNameFullWidth = invitation?.settings?.custom?.groom_name_fullwidth === true;

  const getInstagramUrl = (username) => {
    return `https://www.instagram.com/${username.replace("@", "")}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      id="opening"
      name="opening-section"
      ref={sectionRef}
    >
      <div className="content">
        <div className="view-content">
          <div className="quotes">
            <div
              className={`quote-text ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "500ms" }}
            >
              <p>{quoteText}</p>
            </div>

            <div
              className={`quote-title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "600ms" }}
            >
              <p>{quoteTitle}</p>
            </div>
          </div>

          <div className="bride-groom">
            <div
              className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "750ms" }}
            >
              <div className="bride-wrapper">
                <div className="bride-photo">
                  <img src={bridePhoto} alt="bride-picture" />
                </div>

                <div className="bride-name">
                  <p>{brideFullName}</p>
                </div>

                <div className="conj">
                  <p>Putri dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{brideFather}</p>
                  <p>{brideMother}</p>
                </div>

                {brideInstagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={getInstagramUrl(brideInstagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/aozora/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{brideInstagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <AvatarDecoration />
            </div>

            <div
              className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "750ms" }}
            >
              <div className="groom-wrapper">
                <div className="groom-photo">
                  <img src={groomPhoto} alt="groom-picture" />
                </div>

                <div
                  className={`groom-name ${groomNameFullWidth ? "groom-name-fullwidth" : ""}`}
                >
                  <p>{formatDisplayName(groomFullName)}</p>
                </div>

                <div className="conj">
                  <p>Putra dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{groomFather}</p>
                  <p>{groomMother}</p>
                </div>

                {groomInstagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={getInstagramUrl(groomInstagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/aozora/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{groomInstagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <AvatarDecoration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
