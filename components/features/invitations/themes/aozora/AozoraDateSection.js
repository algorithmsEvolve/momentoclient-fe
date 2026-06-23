"use client";

import { useEffect, useRef, useState } from "react";

export default function AozoraDateSection({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

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
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;

  const getParts = (dateString) => {
    if (!dateString) return null;
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return null;

    const day = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(dateObj);
    const date = String(dateObj.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(dateObj);
    const year = String(dateObj.getFullYear());

    return { day, date, month, year };
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const parts = timeString.split(":");
    if (parts.length >= 2) {
      return `${parts[0]}.${parts[1]}`;
    }
    return timeString;
  };

  const akadDate = getParts(akad?.date);
  const receptionDate = getParts(reception?.date);

  const custom = invitation?.settings?.custom || {};
  const hideAkadTime = custom.hide_akad_time === true || custom.hideAkadTime === true;
  const receptionLabel = custom.reception_title || custom.receptionTitle || "Resepsi";

  return (
    <div
      id="time"
      name="date-section"
      ref={sectionRef}
    >
      <div className="content">
        <div className="view-content">
          <div className="akad-reception-wrapper">
            {akadDate && (
              <div className="akad">
                <div
                  className={`date-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "250ms" }}
                >
                  <img src="/themes/aozora/date/date-icon.svg" alt="date-icon" />
                </div>

                <div
                  className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "350ms" }}
                >
                  <p>Akad Nikah</p>
                </div>

                <div
                  className={`date ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "450ms" }}
                >
                  <div className="day">
                    <p>{akadDate.day}</p>
                  </div>

                  <div className="month">
                    <div className="month-number">
                      <p>{akadDate.date}</p>
                    </div>

                    <div className="month-name">
                      <p>{akadDate.month}</p>
                    </div>
                  </div>

                  <div className="year">
                    <p>{akadDate.year}</p>
                  </div>
                </div>

                {!hideAkadTime && akad?.startTime && (
                  <div
                    className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "550ms" }}
                  >
                    {akad.startTime === "Invalid date" ? (
                      <p></p>
                    ) : !akad.endTime || akad.endTime === "Invalid date" ? (
                      <p>{formatTime(akad.startTime)}</p>
                    ) : (
                      <p>{formatTime(akad.startTime)} - {formatTime(akad.endTime)}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div
              className={`section-divider ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "600ms" }}
            >
              {isDesktop ? (
                <img src="/themes/aozora/global/section-divider.svg" alt="section-divider" />
              ) : (
                <img src="/themes/aozora/global/mobile-section-divider.svg" alt="section-divider" />
              )}
            </div>

            {receptionDate && (
              <div className="reception">
                <div
                  className={`reception-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "250ms" }}
                >
                  <img src="/themes/aozora/date/reception-icon.svg" alt="reception-icon" />
                </div>

                <div
                  className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "650ms" }}
                >
                  <p>{receptionLabel}</p>
                </div>

                <div
                  className={`date ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "750ms" }}
                >
                  <div className="day">
                    <p>{receptionDate.day}</p>
                  </div>

                  <div className="month">
                    <div className="month-number">
                      <p>{receptionDate.date}</p>
                    </div>

                    <div className="month-name">
                      <p>{receptionDate.month}</p>
                    </div>
                  </div>

                  <div className="year">
                    <p>{receptionDate.year}</p>
                  </div>
                </div>

                {reception?.startTime && reception?.endTime && (
                  <div
                    className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "850ms" }}
                  >
                    <p>{formatTime(reception.startTime)} - {formatTime(reception.endTime)}</p>
                  </div>
                )}
              </div>
            )}

            <div className="animated-decorations">
              <div
                className={`animated-middle-section ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <div className="ams-left">
                  <img src="/themes/aozora/global/animated/middle-section/left.png" alt="left-decor-ams" />
                </div>
                <div className="ams-middle">
                  <img src="/themes/aozora/global/animated/middle-section/middle.png" alt="middle-decor-ams" />
                </div>
                <div className="ams-right">
                  <img src="/themes/aozora/global/animated/middle-section/right.png" alt="right-decor-ams" />
                </div>
              </div>
            </div>

            <div className="animated-decorations ad-bottom">
              <div
                className={`animated-middle-section ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <div className="ams-left">
                  <img src="/themes/aozora/global/animated/middle-section/left.png" alt="left-decor-ams" />
                </div>
                <div className="ams-middle">
                  <img src="/themes/aozora/global/animated/middle-section/middle.png" alt="middle-decor-ams" />
                </div>
                <div className="ams-right">
                  <img src="/themes/aozora/global/animated/middle-section/right.png" alt="right-decor-ams" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
