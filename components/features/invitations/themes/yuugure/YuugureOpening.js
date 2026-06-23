"use client";

import { useEffect, useRef, useState } from "react";

function wrapQuote(text) {
  if (!text) return "";
  const trimmedText = text.trim();
  const hasOpeningQuote = trimmedText.startsWith("“") || trimmedText.startsWith('"');
  const hasClosingQuote = trimmedText.endsWith("”") || trimmedText.endsWith('"');

  if (hasOpeningQuote && hasClosingQuote) return trimmedText;

  return `“${trimmedText}”`;
}

export default function YuugureOpening({ invitation }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    const timerId = setTimeout(handleResize, 0);

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
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const bride = invitation?.couple?.bride;
  const groom = invitation?.couple?.groom;
  const settings = invitation?.settings || {};

  const withOpeningBasmalah =
    settings.openingBasmalah === true ||
    settings.custom?.opening_basmalah === true;
  const openingInfoText = settings.openingInfoText || null;
  const withInfo = Boolean(openingInfoText);

  return (
    <div id="opening" name="opening-section" className={isDesktop ? "desktop" : "mobile"} ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {withOpeningBasmalah && (
            <p
              className={`basmalah ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              <span className="basmalah-latin">{"Assalamu'alaikum Warahmatullahi Wabarakaatuh"}</span>
            </p>
          )}

          {withInfo && (
            <p
              className={`info-text ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              {openingInfoText}
            </p>
          )}

          <div className="quotes">
            <div
              className={`quote-text ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              <p>{wrapQuote(invitation?.quote?.text)}</p>
            </div>

            <div
              className={`quote-title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "400ms" }}
            >
              <p>{invitation?.quote?.title}</p>
            </div>
          </div>

          {/* Desktop Version */}
          {isDesktop && (
            <div className="bride-groom">
              <div
                className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"} ${!bride?.photoUrl ? "without-bride-groom-photo" : ""}`}
                style={{ animationDelay: "750ms" }}
              >
                {bride?.photoUrl && (
                  <div className="bride-photo">
                    <img src={bride.photoUrl} alt="bride-picture" />
                  </div>
                )}

                <div className="bride-name">
                  <p>{bride?.fullName || bride?.displayName || "Bride"}</p>
                </div>

                <div className="conj">
                  <p>Putri dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{bride?.fatherName}</p>
                  <p>{bride?.motherName}</p>
                </div>

                {bride?.instagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={`https://instagram.com/${bride.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/yuugure/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{bride.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="decorations">
                  <div className="top-left">
                    <img src="/themes/yuugure/opening/decor-bride-top.png" alt="decor-bride" />
                  </div>
                </div>

                <div className="decor-avatar-back"></div>
              </div>

              <div
                className={`and-separator ${isVisible ? "animate-zoom-in" : "opacity-0"} ${(!bride?.photoUrl && !groom?.photoUrl) ? "without-bride-groom-photo" : ""}`}
                style={{ animationDelay: "950ms" }}
              >
                <div className="and-separator-line"></div>
                <div className="and-text">
                  <p>&amp;</p>
                </div>
                <div className="and-separator-line"></div>
              </div>

              <div
                className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"} ${!groom?.photoUrl ? "without-bride-groom-photo" : ""}`}
                style={{ animationDelay: "750ms" }}
              >
                {groom?.photoUrl && (
                  <div className="groom-photo">
                    <img src={groom.photoUrl} alt="groom-picture" />
                  </div>
                )}

                <div className="groom-name">
                  <p>{groom?.fullName || groom?.displayName || "Groom"}</p>
                </div>

                <div className="conj">
                  <p>Putra dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{groom?.fatherName}</p>
                  <p>{groom?.motherName}</p>
                </div>

                {groom?.instagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={`https://instagram.com/${groom.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/yuugure/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{groom.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="decorations">
                  <div className="top-right">
                    <img src="/themes/yuugure/opening/decor-groom-top.png" alt="decor-groom" />
                  </div>
                </div>

                <div className="decor-avatar-back"></div>
              </div>
            </div>
          )}

          {/* Mobile Version */}
          {!isDesktop && (
            <div className="mobile-bride-groom">
              <div
                className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"} ${!bride?.photoUrl ? "without-bride-groom-photo" : ""}`}
                style={{ animationDelay: "750ms" }}
              >
                <div className="bride-content">
                  {bride?.photoUrl && (
                    <div className="bride-photo">
                      <img src={bride.photoUrl} alt="bride-picture" />
                    </div>
                  )}

                  <div className="bride-name">
                    <p>{bride?.fullName || bride?.displayName || "Bride"}</p>
                  </div>

                  <div className="conj">
                    <p>Putri dari pasangan :</p>
                  </div>

                  <div className="parent">
                    <p>{bride?.fatherName}</p>
                    <p>{bride?.motherName}</p>
                  </div>

                  {bride?.instagram && (
                    <div className="instagram">
                      <a
                        className="ig-wrapper"
                        href={`https://instagram.com/${bride.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="icon">
                          <img src="/themes/yuugure/opening/instagram-icon.svg" alt="instagram-icon" />
                        </div>
                        <div className="label">
                          <p>@{bride.instagram}</p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                <div className="decorations">
                  <div className="top-left">
                    <img src="/themes/yuugure/opening/mobile-decor-bride-top.png" alt="decor-bride" />
                  </div>
                </div>

                <div className="mobile-decor-avatar-back"></div>
              </div>

              <div className="and-separator">
                <div className="line-wrapper">
                  <div className="line"></div>
                </div>
                <div className="and-text">
                  <p>&amp;</p>
                </div>
                <div className="line-wrapper">
                  <div className="line"></div>
                </div>
              </div>

              <div
                className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"} ${!groom?.photoUrl ? "without-bride-groom-photo" : ""}`}
                style={{ animationDelay: "750ms" }}
              >
                {groom?.photoUrl && (
                  <div className="groom-photo">
                    <img src={groom.photoUrl} alt="groom-picture" />
                  </div>
                )}

                <div className="groom-name">
                  <p>{groom?.fullName || groom?.displayName || "Groom"}</p>
                </div>

                <div className="conj">
                  <p>Putra dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{groom?.fatherName}</p>
                  <p>{groom?.motherName}</p>
                </div>

                {groom?.instagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={`https://instagram.com/${groom.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/yuugure/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{groom.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="decorations">
                  <div className="top-right">
                    <img src="/themes/yuugure/opening/mobile-decor-groom-top.png" alt="decor-groom" />
                  </div>
                </div>

                <div className="mobile-decor-avatar-back"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="bottom-left">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-right" : "opacity-0"}
              style={{ animationDelay: "1200ms" }}
              src="/themes/yuugure/opening/decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          )}
        </div>

        <div className="bottom-right">
          <img
            className={isVisible ? "animate-fade-left" : "opacity-0"}
            style={{ animationDelay: isDesktop ? "1400ms" : "1000ms" }}
            src={isDesktop ? "/themes/yuugure/opening/decor-bottom-right.png" : "/themes/yuugure/opening/mobile-decor-bottom-right.png"}
            alt="decor-bottom-right"
          />
        </div>

        {!isDesktop && (
          <div className="bottom-center">
            <img
              className={isVisible ? "animate-fade-up" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yuugure/opening/mobile-decor-bottom-center.png"
              alt="mobile-decor-bottom-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}
