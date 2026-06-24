"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function getStoryText(story) {
  if (!story) return "";
  if (typeof story === "string") return story;
  return story.description || story.desc || "";
}

export default function YamatoStory({ invitation, isStatic = false }) {
  const storyItems = Array.isArray(invitation?.stories) ? invitation.stories : [];
  const [isVisible, setIsVisible] = useState(false);
  const [hasReset, setHasReset] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
    if (isStatic) return;
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
  }, [isStatic]);

  const stopMobileScroll = useCallback(() => {
    if (mobileAutoScrollInterval.current) {
      clearInterval(mobileAutoScrollInterval.current);
      mobileAutoScrollInterval.current = null;
    }
  }, []);

  const startMobileScroll = useCallback(() => {
    if (isStatic) return;
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
      }, 5000);
    }
  }, [isStatic]);

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

  useEffect(() => {
    if (isVisible && !isStatic) {
      const timeout = setTimeout(() => {
        startScroll();
        startMobileScroll();
      }, 1500);
      return () => {
        clearTimeout(timeout);
        stopScroll();
        stopMobileScroll();
      };
    }
  }, [isVisible, isStatic, startScroll, stopScroll, startMobileScroll, stopMobileScroll]);

  if (!storyItems.length) return null;

  if (isStatic) {
    return (
      <div name="our-story-static-section" ref={sectionRef}>
        <div className="content">
          <div className="view-content">
            <div
              className={`title ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "500ms" }}
            >
              <p>Kisah Kami</p>
            </div>
            <div className="our-stories">
              {storyItems.map((story, index) => (
                <div
                  key={`story-static-${index}`}
                  className={`story-item ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  {index !== 0 && (
                    <div className="story-separator">
                      <div className="line-wrapper">
                        <div className="line"></div>
                      </div>
                      <div className="story-icon">
                        <img src="/themes/yamato/our-story/love-story-icon.svg" alt="love-story-icon" />
                      </div>
                      <div className="line-wrapper">
                        <div className="line"></div>
                      </div>
                    </div>
                  )}
                  <div className="story-content">
                    <div className="title">
                      <p>{typeof story === "string" ? "" : (story.title || "")}</p>
                    </div>
                    <div className="desc">
                      <p>{typeof story === "string" ? story : (story.description || story.desc || "")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="our-story" name="our-story-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <p>Kisah Kami</p>
          </div>

          {isDesktop ? (
            <div className="our-story-wrapper">
              <div className="story-left-line">
                <img src="/themes/yamato/our-story/story-left-line.svg" alt="story-left-line" />
              </div>
              <div
                id="our-stories"
                ref={scrollableRef}
                onMouseEnter={stopScroll}
                onMouseLeave={startScroll}
                className={`carousel-our-story ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <div className="our-stories">
                  {storyItems.map((story, index) => (
                    <div key={`story-${index}`} className="story-item">
                      <div className="story-wrapper">
                        <div className="story-text">
                          <p>{getStoryText(story)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              id="our-stories-mobile"
              ref={mobileScrollableRef}
              onTouchStart={stopMobileScroll}
              onTouchEnd={startMobileScroll}
              className={`carousel-our-story ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                animationDelay: "350ms",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                width: "100%",
              }}
            >
              {storyItems.map((story, index) => (
                <div
                  key={`story-mobile-${index}`}
                  className="mobile-story-item"
                  style={{
                    scrollSnapAlign: "center",
                    flex: "0 0 100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="story-wrapper">
                    <div className="story-text">
                      <p>{getStoryText(story)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="bottom-left">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-right" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/our-story/decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          )}
        </div>
        <div className="bottom-right">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-left" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/our-story/decor-bottom-right.png"
              alt="decor-bottom-right"
            />
          )}
        </div>
      </div>
    </div>
  );
}
