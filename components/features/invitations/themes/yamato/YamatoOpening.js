"use client";

import { useEffect, useRef, useState } from "react";

function wrapQuote(text) {
  if (!text) return "";
  const trimmedText = text.trim();
  const hasOpeningQuote = trimmedText.startsWith("\u201C") || trimmedText.startsWith('"');
  const hasClosingQuote = trimmedText.endsWith("\u201D") || trimmedText.endsWith('"');
  if (hasOpeningQuote && hasClosingQuote) return trimmedText;
  return `\u201C${trimmedText}\u201D`;
}

export default function YamatoOpening({ invitation }) {
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
  const reverseBrideGroom = invitation?.settings?.custom?.reverse_bride_groom || false;

  const brideConj = reverseBrideGroom ? "Putra" : "Putri";
  const groomConj = reverseBrideGroom ? "Putri" : "Putra";

  return (
    <div id="opening" name="opening-section" className={isDesktop ? "desktop" : "mobile"} ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className="quotes">
            <div
              className={`quote-text ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              <p>{wrapQuote(invitation?.quote?.text)}</p>
            </div>
            <div
              className={`quote-title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              <p>{invitation?.quote?.title}</p>
            </div>
          </div>

          {/* Desktop Version */}
          {isDesktop && (
            <div className="bride-groom">
              <div
                className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
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
                  <p>{brideConj} dari pasangan :</p>
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
                        <img src="/themes/yamato/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{bride.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <div className={`and-separator ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "950ms" }}>
                <div className="line-wrapper">
                  <div className="line"></div>
                </div>
                <div className="and-text">
                  <p>and</p>
                </div>
                <div className="line-wrapper">
                  <div className="line"></div>
                </div>
              </div>

              <div
                className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
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
                  <p>{groomConj} dari pasangan :</p>
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
                        <img src="/themes/yamato/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{groom.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Version */}
          {!isDesktop && (
            <div className="mobile-bride-groom">
              <div
                className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
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
                  <p>{brideConj} dari pasangan :</p>
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
                        <img src="/themes/yamato/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{bride.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <div className="and-separator">
                <div className="line-wrapper">
                  <div className="line"></div>
                </div>
                <div className="and-text">
                  <p>and</p>
                </div>
                <div className="line-wrapper">
                  <div className="line"></div>
                </div>
              </div>

              <div
                className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
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
                  <p>{groomConj} dari pasangan :</p>
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
                        <img src="/themes/yamato/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{groom.instagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <div className="decorations">
                <div className="top">
                  <img src="/themes/yamato/opening/mobile-decor-top.png" alt="decor-top" />
                </div>
                <div className="bottom">
                  <img src="/themes/yamato/opening/mobile-decor-bottom.png" alt="decor-bottom" />
                </div>
                <div className="left">
                  <img src="/themes/yamato/opening/mobile-decor-left.png" alt="mobile-decor-left" />
                </div>
                <div className="right">
                  <img src="/themes/yamato/opening/mobile-decor-right.png" alt="mobile-decor-right" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="left">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-right" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/opening/decor-left.png"
              alt="decor-left"
            />
          )}
        </div>
        <div className="right">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-left" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/opening/decor-right.png"
              alt="decor-right"
            />
          )}
        </div>
      </div>
    </div>
  );
}
