"use client";

import { useEffect, useRef, useState } from "react";
import { formatInvitationTime } from "@/lib/invitations/date";

export default function BaraSimpleDateSection({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

  const language = invitation?.settings?.custom?.language || "ID";
  const isEN = language === "EN";

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
      { threshold: 0.1, rootMargin: "-50px" }
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

  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;

  const getParts = (dateString) => {
    if (!dateString) return null;
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return null;

    const day = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(dateObj);
    const date = new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(dateObj);
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(dateObj);
    const year = new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(dateObj);

    return { day, date, month, year };
  };

  const akadDate = getParts(akad?.date);
  const receptionDate = getParts(reception?.date);

  return (
    <div id="time" name="date-section" ref={sectionRef}>
      <div className="date-section-wrapper">
        <div className="content">
          <div className="view-content">
            {akadDate && (
              <div className="akad">
                <div className={`date-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
                  <img src="/themes/bara-simple/date/date-icon.svg" alt="date-icon" />
                </div>
                <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                  <p>{akad?.title || (isEN ? "Marriage Ceremony" : "Akad Nikah")}</p>
                </div>
                <div className={`date ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "400ms" }}>
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
                {akad?.startTime && (
                  <div className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
                    <p>
                      {formatInvitationTime(akad.startTime)}
                      {akad.endTime && ` - ${formatInvitationTime(akad.endTime)}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {receptionDate && (
              <div className="reception">
                <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "600ms" }}>
                  <p>{reception?.title || (isEN ? "Reception" : "Resepsi")}</p>
                </div>
                <div className={`date ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "700ms" }}>
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
                {reception?.startTime && (
                  <div className={`time ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "800ms" }}>
                    <p>
                      {formatInvitationTime(reception.startTime)}
                      {reception.endTime && ` - ${formatInvitationTime(reception.endTime)}`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className={`bottom-left ${isVisible ? "animate-fade-in-left" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
              <img src="/themes/bara-simple/date/decor-bottom-left.png" alt="decor-bottom-left" />
            </div>
            <div className={`bottom-right ${isVisible ? "animate-fade-in-right" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
              <img src="/themes/bara-simple/date/decor-bottom-right.png" alt="decor-bottom-right" />
            </div>
          </>
        ) : (
          <div className="bottom">
            <img
              src="/themes/bara-simple/date/mobile-decor-bottom.png"
              alt="decor-bottom"
              className={isVisible ? "animate-zoom-in" : "opacity-0"}
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
