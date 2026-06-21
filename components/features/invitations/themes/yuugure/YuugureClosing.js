"use client";

import { useEffect, useRef, useState } from "react";

export default function YuugureClosing({ invitation }) {
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

  const closing = invitation?.settings?.closing || invitation?.closing;
  if (!closing || (!closing.desc && !closing.label)) return null;

  return (
    <div name="closing-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          {closing.desc && (
            <div
              className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              <p>{closing.desc}</p>
            </div>
          )}

          {closing.label && (
            <div
              className={`label ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              <p>{closing.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
