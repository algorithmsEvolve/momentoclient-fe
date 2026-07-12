"use client";

import { useEffect, useRef, useState } from "react";
import { formatInvitationDay } from "@/lib/invitations/date";

function getEventDateParts(dateString, startTime, endTime) {
  if (!dateString) return null;

  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return null;

  const day = formatInvitationDay(dateString);
  const date = String(dateObj.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(dateObj);
  const year = String(dateObj.getFullYear());

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.slice(0, 5).replace(":", ".");
  };

  return {
    day,
    date,
    month,
    year,
    timeStart: formatTime(startTime),
    timeEnd: formatTime(endTime),
  };
}

export default function RenDateSection({ invitation }) {
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

  const events = invitation?.events || [];
  const akadEvent = events.find((e) => e.type === "akad");
  const receptionEvent = events.find((e) => e.type === "reception");

  const akadDate = akadEvent
    ? getEventDateParts(akadEvent.date, akadEvent.startTime, akadEvent.endTime)
    : null;
  const receptionDate = receptionEvent
    ? getEventDateParts(receptionEvent.date, receptionEvent.startTime, receptionEvent.endTime)
    : null;

  const settings = invitation?.settings || {};
  const hideAkadTime = settings.hideAkadTime === true;
  const receptionLabel = settings.receptionTitle || "Resepsi";

  return (
    <div id="time" name="date-section" ref={sectionRef}>
      <div className="date-section-wrapper">
        <div className="content">
          <div className="view-content">
            {akadDate && (
              <div className="akad">
                <div
                  className={`date-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "250ms" }}
                >
                  <img src="/themes/ren/date/date-icon.svg" alt="date-icon" />
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

                {!hideAkadTime && (
                  <div
                    className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "550ms" }}
                  >
                    <p>
                      {akadDate.timeStart && akadDate.timeEnd
                        ? `${akadDate.timeStart} - ${akadDate.timeEnd}`
                        : akadDate.timeStart || ""}
                    </p>
                  </div>
                )}
              </div>
            )}

            {receptionDate && (
              <div className="reception">
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

                <div
                  className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                  style={{ animationDelay: "850ms" }}
                >
                  <p>
                    {receptionDate.timeStart && receptionDate.timeEnd
                      ? `${receptionDate.timeStart} - ${receptionDate.timeEnd}`
                      : receptionDate.timeStart || ""}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="bottom">
          {!isDesktop ? (
            <img
              className={isVisible ? "animate-zoom-in" : "opacity-0"}
              style={{ animationDelay: "300ms" }}
              src="/themes/ren/date/mobile-decor-bottom.png"
              alt="decor-bottom"
            />
          ) : (
            <img
              className={isVisible ? "animate-zoom-in-up" : "opacity-0"}
              style={{ animationDelay: "300ms" }}
              src="/themes/ren/date/decor-bottom.png"
              alt="decor-bottom"
            />
          )}
        </div>
      </div>
    </div>
  );
}
