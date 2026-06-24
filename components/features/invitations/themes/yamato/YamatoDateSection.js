"use client";

import { useEffect, useRef, useState } from "react";
export default function YamatoDateSection({ invitation }) {
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

  const custom = invitation?.settings?.custom || {};
  const receptionLabel = custom.reception_title || "Resepsi";

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return {
      day: d.toLocaleDateString("id-ID", { weekday: "long" }),
      date: d.toLocaleDateString("id-ID", { day: "2-digit" }),
      month: d.toLocaleDateString("id-ID", { month: "long" }),
      year: d.toLocaleDateString("id-ID", { year: "numeric" }),
    };
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return null;
    return timeStr.replace(".", ":").substring(0, 5);
  };

  const akadDate = akadEvent ? formatDate(akadEvent.date) : null;
  const receptionDate = receptionEvent ? formatDate(receptionEvent.date) : null;

  const akadTimeStart = akadEvent ? formatTime(akadEvent.startTime) : null;
  const akadTimeEnd = akadEvent ? formatTime(akadEvent.endTime) : null;
  const receptionTimeStart = receptionEvent ? formatTime(receptionEvent.startTime) : null;
  const receptionTimeEnd = receptionEvent ? formatTime(receptionEvent.endTime) : null;

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
                  <img src="/themes/yamato/date/date-icon.svg" alt="date-icon" />
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
                  <div className="day"><p>{akadDate.day}</p></div>
                  <div className="month">
                    <div className="month-number"><p>{akadDate.date}</p></div>
                    <div className="month-name"><p>{akadDate.month}</p></div>
                  </div>
                  <div className="year"><p>{akadDate.year}</p></div>
                </div>
                {akadTimeStart && (
                  <div
                    className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "550ms" }}
                  >
                    <p>{akadTimeEnd ? `${akadTimeStart} - ${akadTimeEnd}` : akadTimeStart}</p>
                  </div>
                )}
              </div>
            )}

            {receptionDate && (
              <div className="reception">
                {!akadDate && (
                  <div
                    className={`date-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "250ms" }}
                  >
                    <img src="/themes/yamato/date/date-icon.svg" alt="date-icon" />
                  </div>
                )}
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
                  <div className="day"><p>{receptionDate.day}</p></div>
                  <div className="month">
                    <div className="month-number"><p>{receptionDate.date}</p></div>
                    <div className="month-name"><p>{receptionDate.month}</p></div>
                  </div>
                  <div className="year"><p>{receptionDate.year}</p></div>
                </div>
                {receptionTimeStart && (
                  <div
                    className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: "850ms" }}
                  >
                    <p>{receptionTimeEnd ? `${receptionTimeStart} - ${receptionTimeEnd}` : receptionTimeStart}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="top">
          {isDesktop ? (
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "300ms" }}
              src="/themes/yamato/date/decor-top.png"
              alt="decor-top"
            />
          ) : (
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "300ms" }}
              src="/themes/yamato/date/mobile-decor-top.png"
              alt="mobile-decor-top"
            />
          )}
        </div>
      </div>
    </div>
  );
}
