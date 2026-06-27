"use client";

import { useEffect, useRef, useState } from "react";

export default function YonakaOpening({ invitation }) {
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

  const bride = invitation?.couple?.bride || {};
  const groom = invitation?.couple?.groom || {};

  const generateInstagramUrl = (username) => `https://instagram.com/${username}`;

  const PersonCard = ({ person, role }) => (
    <div className={role}>
      <div className={`${role}-content`}>
        <div className={`${role}-photo`}>
          <img src={person.photoUrl} alt={role} />
        </div>
        <div className={`${role}-name`}>
          <p>{person.fullName}</p>
        </div>
        <div className="conj">
          <p>{role === "bride" ? "Putri dari pasangan :" : "Putra dari pasangan :"}</p>
        </div>
        <div className="parent">
          <p>{person.fatherName}</p>
          <p>{person.motherName}</p>
        </div>
        {person.instagram && (
          <div className="instagram">
            <a className="ig-wrapper" href={generateInstagramUrl(person.instagram)} target="_blank" rel="noreferrer">
              <div className="icon">
                <img src="/themes/yonaka/opening/instagram-icon.svg" alt="instagram" />
              </div>
              <div className="label">
                <p>@{person.instagram}</p>
              </div>
            </a>
          </div>
        )}
      </div>
      <div className="avatar-decorations">
        <div className="avatar-bottom-left">
          <img src="/themes/yonaka/opening/avatar-decor-bottom-left.png" alt="decor" />
        </div>
        <div className="avatar-bottom-right">
          <img src="/themes/yonaka/opening/avatar-decor-bottom-right.png" alt="decor" />
        </div>
      </div>
    </div>
  );

  const AndSeparator = ({ mobile }) => (
    <div className="and-separator">
      {mobile && (
        <div className="line-wrapper"><div className="line" /></div>
      )}
      <div className="and-text"><p>and</p></div>
      {mobile && (
        <div className="line-wrapper"><div className="line" /></div>
      )}
    </div>
  );

  return (
    <div ref={ref} id="opening" name="opening-section">
      <div className="content">
        <div className="view-content">
          <div className={`quotes ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="quote-text">
              <p>{invitation?.quote?.text}</p>
            </div>
            <div className="quote-title">
              <p>{invitation?.quote?.title}</p>
            </div>
          </div>

          {isDesktop ? (
            <div className={`bride-groom ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.75s" }}>
              <PersonCard person={bride} role="bride" />
              <div className="and-separator">
                <div className="and-text"><p>and</p></div>
              </div>
              <PersonCard person={groom} role="groom" />
            </div>
          ) : (
            <div className={`mobile-bride-groom ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.75s" }}>
              <PersonCard person={bride} role="bride" />
              <AndSeparator mobile />
              <PersonCard person={groom} role="groom" />
            </div>
          )}
        </div>
      </div>

      {isDesktop && (
        <div className="decorations">
          <div className="top-left">
            <img
              className={visible ? "animate-fade-right" : "opacity-0"}
              style={{ animationDelay: "1s" }}
              src="/themes/yonaka/opening/decor-top-left.png"
              alt="decor"
            />
          </div>
          <div className="top-right">
            <img
              className={visible ? "animate-fade-left" : "opacity-0"}
              style={{ animationDelay: "1s" }}
              src="/themes/yonaka/opening/decor-top-right.png"
              alt="decor"
            />
          </div>
        </div>
      )}
    </div>
  );
}
