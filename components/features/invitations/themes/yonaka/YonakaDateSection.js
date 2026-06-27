"use client";

import { useEffect, useRef, useState } from "react";

function formatDateInfo(dateStr) {
  if (!dateStr) return {};
  const d = new Date(dateStr);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return {
    day: days[d.getDay()],
    date: String(d.getDate()).padStart(2, "0"),
    month: months[d.getMonth()],
    year: String(d.getFullYear()),
  };
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  return `${h}:${m}`;
}

export default function YonakaDateSection({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const events = invitation?.events || [];
  const akad = events.find((e) => e.type === "akad");
  const reception = events.find((e) => e.type === "reception");

  const hideAkadTime = invitation?.settings?.custom?.hideAkadTime;

  return (
    <div ref={ref} id="time" name="date-section">
      <div className="date-section-wrapper">
        <div className="content">
          <div className="view-content">
            {akad && (
              <div className="akad">
                <div className={`date-icon ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
                  <img src="/themes/yonaka/date/date-icon.svg" alt="date-icon" />
                </div>
                <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
                  <p>Akad Nikah</p>
                </div>
                <div className={`date ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.45s" }}>
                  <div className="day"><p>{formatDateInfo(akad.date).day}</p></div>
                  <div className="month">
                    <div className="month-number"><p>{formatDateInfo(akad.date).date}</p></div>
                    <div className="month-name"><p>{formatDateInfo(akad.date).month}</p></div>
                  </div>
                  <div className="year"><p>{formatDateInfo(akad.date).year}</p></div>
                </div>
                {!hideAkadTime && akad.startTime && (
                  <div className={`time ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.55s" }}>
                    <p>
                      {formatTime(akad.startTime)}
                      {akad.endTime ? ` - ${formatTime(akad.endTime)}` : ""}
                    </p>
                  </div>
                )}
              </div>
            )}

            {reception && (
              <div className="reception">
                <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.65s" }}>
                  <p>{reception.title || "Resepsi"}</p>
                </div>
                <div className={`date ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.75s" }}>
                  <div className="day"><p>{formatDateInfo(reception.date).day}</p></div>
                  <div className="month">
                    <div className="month-number"><p>{formatDateInfo(reception.date).date}</p></div>
                    <div className="month-name"><p>{formatDateInfo(reception.date).month}</p></div>
                  </div>
                  <div className="year"><p>{formatDateInfo(reception.date).year}</p></div>
                </div>
                {reception.startTime && (
                  <div className={`time ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.85s" }}>
                    <p>{formatTime(reception.startTime)}{reception.endTime ? ` - ${formatTime(reception.endTime)}` : ""}</p>
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
            <div className="top-left">
              <img
                className={visible ? "animate-zoom-in-right" : "opacity-0"}
                style={{ animationDelay: "0.3s" }}
                src="/themes/yonaka/date/decor-top-left.png"
                alt="decor"
              />
            </div>
            <div className="top-right">
              <img
                className={visible ? "animate-zoom-in-left" : "opacity-0"}
                style={{ animationDelay: "0.3s" }}
                src="/themes/yonaka/date/decor-top-right.png"
                alt="decor"
              />
            </div>
          </>
        ) : (
          <div className="top">
            <img
              className={visible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "0.3s" }}
              src="/themes/yonaka/date/mobile-decor-top.png"
              alt="decor"
            />
          </div>
        )}
      </div>
    </div>
  );
}
