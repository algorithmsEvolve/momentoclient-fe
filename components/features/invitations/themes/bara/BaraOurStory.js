"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function BaraOurStory({ invitation }) {
  const storyItems = Array.isArray(invitation?.stories) ? invitation.stories : [];
  const [isVisible, setIsVisible] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const sectionRef = useRef(null);
  const scrollableRef = useRef(null);
  const mobileScrollableRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const mobileAutoScrollInterval = useRef(null);

  const stopScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  const startScroll = useCallback(function startScrollInner() {
    if (!autoScrollInterval.current) {
      autoScrollInterval.current = setInterval(() => {
        const scrollableDiv = scrollableRef.current;
        if (!scrollableDiv || scrollableDiv.offsetParent === null) return;

        const contentHeight = scrollableDiv.scrollHeight;
        const visibleHeight = scrollableDiv.clientHeight;
        const scrollSpeed = 1;

        if (scrollableDiv.scrollTop < (contentHeight - visibleHeight - 0.6)) {
          scrollableDiv.scrollTop += scrollSpeed;
        } else {
          setHasReset(true);

          if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
          }

          setTimeout(() => {
            if (scrollableRef.current) scrollableRef.current.scrollTop = 0;
            startScrollInner();
          }, 250);
        }
      }, 50);
    }
  }, []);

  const stopMobileScroll = useCallback(() => {
    if (mobileAutoScrollInterval.current) {
      clearInterval(mobileAutoScrollInterval.current);
      mobileAutoScrollInterval.current = null;
    }
  }, []);

  const startMobileScroll = useCallback(() => {
    if (!mobileAutoScrollInterval.current) {
      mobileAutoScrollInterval.current = setInterval(() => {
        const container = mobileScrollableRef.current;
        if (!container || container.offsetParent === null) return;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const cardWidth = container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }, 8000);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0 }
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

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        startScroll();
        startMobileScroll();
      }, 1750);
      return () => {
        clearTimeout(timeout);
        stopScroll();
        stopMobileScroll();
      };
    }
  }, [isVisible, startScroll, stopScroll, startMobileScroll, stopMobileScroll]);

  if (!storyItems.length) return null;

  const withImage = (story) => !!story.imageUrl;

  return (
    <div id="our-story" name="our-story-section" ref={sectionRef}>
      <div className="our-story-wrapper">
        <div className="content">
          <div className="view-content">
            <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <p>Kisah Kami</p>
            </div>

            <div
              id="our-stories"
              ref={scrollableRef}
              onMouseEnter={stopScroll}
              onMouseLeave={startScroll}
              className={`our-stories ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "350ms" }}
            >
              {storyItems.map((story, index) => (
                <div key={`story-${index}`} className="story-item">
                  {(index !== 0 || hasReset) && (
                    <div className="bridge-image">
                      <img src="/themes/bara/our-story/story-bridge.png" alt="story-bridge" />
                    </div>
                  )}
                  <div className="story-text">
                    {story.date && (
                      <div className="date">
                        <p>{story.date}</p>
                      </div>
                    )}
                    {story.title && (
                      <div className="story">
                        <p>{story.title}</p>
                      </div>
                    )}
                    {story.description && (
                      <div className="story">
                        <p>{story.description}</p>
                      </div>
                    )}
                  </div>
                  {withImage(story) && (
                    <div className="story-image">
                      <img src={story.imageUrl} alt="story-image" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              id="our-stories-mobile"
              ref={mobileScrollableRef}
              onTouchStart={stopMobileScroll}
              onTouchEnd={startMobileScroll}
              className={`our-stories ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{
                animationDelay: "350ms",
              }}
            >
              {storyItems.map((story, index) => (
                <div key={`story-${index}`} className="story-item">
                  <div className="story-text">
                    {story.date && (
                      <div className="date">
                        <p>{story.date}</p>
                      </div>
                    )}
                    {story.title && (
                      <div className="story">
                        <p>{story.title}</p>
                      </div>
                    )}
                    {story.description && (
                      <div className="story">
                        <p>{story.description}</p>
                      </div>
                    )}
                  </div>
                  {withImage(story) && (
                    <div className="story-image">
                      <img src={story.imageUrl} alt="story-image" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
