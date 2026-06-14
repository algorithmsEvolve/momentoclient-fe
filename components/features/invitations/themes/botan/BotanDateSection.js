"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatInvitationDate, formatInvitationDay, formatInvitationTime } from "@/lib/invitations/date";

export default function BotanDateSection({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;

  // Extract day, date, month, year from full date string for custom formatting
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
      <div className="content">
        <div className="view-content">
          <div className={`date-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <img src="/themes/botan/date/date-icon.svg" alt="date-icon" />
          </div>
          {akadDate && (
            <div className="akad">
              <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                <p>{akad?.title || "Akad Nikah"}</p>
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
              <div className="hidden md:flex bird-decorations">
                <div className={`birds-left ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                  <img src="/themes/botan/date/decor-side.png" alt="birds-left" />
                </div>
                <div className={`birds-right ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                  <img src="/themes/botan/date/decor-side.png" alt="birds-right" />
                </div>
              </div>

              <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "600ms" }}>
                <p>{reception?.title || "Resepsi"}</p>
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

      <div className="md:hidden decorations">
        <div className={`top-right ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
          <img src="/themes/botan/date/mobile-decor-right.png" alt="decor-top-right" />
        </div>
      </div>
    </div>
  );
}

