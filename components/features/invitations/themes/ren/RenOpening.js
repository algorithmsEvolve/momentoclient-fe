"use client";

import { useEffect, useRef, useState } from "react";
import RenSideFlowers from "./RenSideFlowers";

export default function RenOpening({ invitation }) {
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

  return (
    <div id="opening" name="opening-section" className={isDesktop ? "desktop" : "mobile"} ref={sectionRef}>
      <div className="opening-wrapper">
        <div className="content">
          <div className="view-content">
            <div className="quotes">
              <div
                className={`quote-text ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "500ms" }}
              >
                <p>{invitation?.quote?.text}</p>
              </div>

              <div
                className={`quote-title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "600ms" }}
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
                          <img src="/themes/ren/opening/instagram-icon.svg" alt="instagram-icon" />
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
                    <p>&amp;</p>
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
                          <img src="/themes/ren/opening/instagram-icon.svg" alt="instagram-icon" />
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
                          <img src="/themes/ren/opening/instagram-icon.svg" alt="instagram-icon" />
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
                    <p>&amp;</p>
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
                          <img src="/themes/ren/opening/instagram-icon.svg" alt="instagram-icon" />
                        </div>
                        <div className="label">
                          <p>@{groom.instagram}</p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                <div className="decorations">
                  <div className="bottom-left">
                    <RenSideFlowers />
                  </div>
                  <div className="bottom-right">
                    <RenSideFlowers />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isDesktop && (
          <div className="decorations">
            <div className="bottom-left">
              <RenSideFlowers />
            </div>
            <div className="bottom-right">
              <RenSideFlowers />
            </div>
          </div>
        )}
      </div>

      <div className="decorations">
        <div className="top">
          {isDesktop ? (
            <img
              className={isVisible ? "animate-zoom-in-down" : "opacity-0"}
              style={{ animationDelay: "750ms" }}
              src="/themes/ren/opening/decor-top.png"
              alt="decor-top"
            />
          ) : (
            <img
              className={isVisible ? "animate-zoom-in-down" : "opacity-0"}
              style={{ animationDelay: "750ms" }}
              src="/themes/ren/opening/mobile-decor-top.png"
              alt="decor-top"
            />
          )}
        </div>

        {!isDesktop && (
          <div className="bottom">
            <img
              className={isVisible ? "animate-zoom-in-down" : "opacity-0"}
              style={{ animationDelay: "750ms" }}
              src="/themes/ren/opening/mobile-decor-bottom.png"
              alt="decor-bottom"
            />
          </div>
        )}
      </div>
    </div>
  );
}
