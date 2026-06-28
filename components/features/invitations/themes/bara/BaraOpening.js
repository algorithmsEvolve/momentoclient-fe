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

export default function BaraOpening({ invitation }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const bride = invitation?.couple?.bride;
  const groom = invitation?.couple?.groom;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div id="opening" name="opening-section" ref={sectionRef}>
      <div className="opening-wrapper">
        <div className="content">
          <div className="view-content">
            <div className="quotes">
              <div className={`quote-text ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                <p>{wrapQuote(invitation?.quote?.text)}</p>
              </div>
              <div className={`quote-title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "600ms" }}>
                <p>{invitation?.quote?.title}</p>
              </div>
            </div>

            {isDesktop && (
              <div className="bride-groom">
                <div className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "1200ms" }}>
                  <div className="bride-photo">
                    <img
                      src={bride?.photoUrl || "/themes/bara/dummy/bride.jpg"}
                      alt="bride-picture"
                    />
                  </div>
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
                      <a className="ig-wrapper" href={`https://instagram.com/${bride.instagram}`} target="_blank" rel="noreferrer">
                        <div className="icon">
                          <img src="/themes/bara/opening/instagram-icon.svg" alt="instagram-icon" />
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
                    <div className="line" />
                  </div>
                  <div className="and-text">
                    <p>&amp;</p>
                  </div>
                  <div className="line-wrapper">
                    <div className="line" />
                  </div>
                </div>

                <div className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "1200ms" }}>
                  <div className="groom-photo">
                    <img
                      src={groom?.photoUrl || "/themes/bara/dummy/groom.jpg"}
                      alt="groom-picture"
                    />
                  </div>
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
                      <a className="ig-wrapper" href={`https://instagram.com/${groom.instagram}`} target="_blank" rel="noreferrer">
                        <div className="icon">
                          <img src="/themes/bara/opening/instagram-icon.svg" alt="instagram-icon" />
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

            {!isDesktop && (
              <div className="mobile-bride-groom">
                <div className={`bride ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "1200ms" }}>
                  <div className="bride-photo">
                    <img
                      src={bride?.photoUrl || "/themes/bara/dummy/bride.jpg"}
                      alt="bride-picture"
                    />
                  </div>
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
                      <a className="ig-wrapper" href={`https://instagram.com/${bride.instagram}`} target="_blank" rel="noreferrer">
                        <div className="icon">
                          <img src="/themes/bara/opening/instagram-icon.svg" alt="instagram-icon" />
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
                    <div className="line" />
                  </div>
                  <div className="and-text">
                    <p>&amp;</p>
                  </div>
                  <div className="line-wrapper">
                    <div className="line" />
                  </div>
                </div>

                <div className={`groom ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "1200ms" }}>
                  <div className="groom-photo">
                    <img
                      src={groom?.photoUrl || "/themes/bara/dummy/groom.jpg"}
                      alt="groom-picture"
                    />
                  </div>
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
                      <a className="ig-wrapper" href={`https://instagram.com/${groom.instagram}`} target="_blank" rel="noreferrer">
                        <div className="icon">
                          <img src="/themes/bara/opening/instagram-icon.svg" alt="instagram-icon" />
                        </div>
                        <div className="label">
                          <p>@{groom.instagram}</p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                <div className="decorations">
                  <div className={`middle-left ${isVisible ? "animate-fade-right" : "opacity-0"}`} style={{ animationDelay: "1500ms" }}>
                    <img src="/themes/bara/opening/mobile-decor-middle-left.png" alt="mobile-decor-middle-left" />
                  </div>
                  <div className={`middle-right ${isVisible ? "animate-fade-left" : "opacity-0"}`} style={{ animationDelay: "1800ms" }}>
                    <img src="/themes/bara/opening/mobile-decor-middle-right.png" alt="mobile-decor-middle-right" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className={`top ${isVisible ? "animate-zoom-in-down" : "opacity-0"}`} style={{ animationDelay: "0ms" }}>
          {isDesktop ? (
            <img src="/themes/bara/opening/decor-top.png" alt="decor-top" />
          ) : (
            <img src="/themes/bara/opening/mobile-decor-top.png" alt="decor-top" />
          )}
        </div>
        {isDesktop && (
          <>
            <div className={`bottom-left ${isVisible ? "animate-fade-left" : "opacity-0"}`} style={{ animationDelay: "1500ms" }}>
              <img src="/themes/bara/opening/decor-bottom-left.png" alt="decor-bottom-left" />
            </div>
            <div className={`bottom-right ${isVisible ? "animate-fade-right" : "opacity-0"}`} style={{ animationDelay: "1800ms" }}>
              <img src="/themes/bara/opening/decor-bottom-right.png" alt="decor-bottom-right" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
