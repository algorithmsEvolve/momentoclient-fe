"use client";

import { useEffect, useRef, useState } from "react";

export default function YonakaStory({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stories = invitation?.stories || [];

  return (
    <div ref={ref} name="our-story-section">
      <div className="content">
        <div className="view-content">
          <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <p>Our Love Story</p>
          </div>
          <div className="stories">
            {stories.map((story, idx) => (
              <div
                key={story.id || idx}
                className={`story ${visible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: `${0.35 + idx * 0.1}s` }}
              >
                <div className="story-img">
                  <img src={story.photoUrl || story.imageUrl} alt={story.title} />
                </div>
                <div className="story-content">
                  <div className="story-title"><p>{story.title}</p></div>
                  <div className="story-date"><p>{story.date}</p></div>
                  <div className="story-desc"><p>{story.description}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
