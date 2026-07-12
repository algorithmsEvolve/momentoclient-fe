"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function getStoryText(story) {
  if (!story) return "";
  if (typeof story === "string") return story;
  return story.description || story.desc || story.title || "";
}

export default function RenStory({ invitation }) {
  const storyItems = Array.isArray(invitation?.stories) ? invitation.stories : [];
  const [isVisible, setIsVisible] = useState(false);
  const [hasReset, setHasReset] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const sectionRef = useRef(null);
  const scrollableRef = useRef(null);
  const autoScrollInterval = useRef(null);

  const settings = invitation?.settings || {};
  const isStatic = settings.staticOurStory === true;

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
      }, 1750);
      return () => {
        clearTimeout(timeout);
        stopScroll();
      };
    }
  }, [isVisible, isStatic, startScroll, stopScroll]);

  if (!storyItems.length) return null;

  if (isStatic) {
    return (
      <div name="our-story-static-section" ref={sectionRef}>
        <div className="our-story-wrapper">
          <div className="content">
            <div className="view-content">
              <div
                className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "250ms" }}
              >
                <p>Kisah Kami</p>
              </div>

              <div className="our-stories">
                {storyItems.map((story, index) => (
                  <div
                    key={`story-static-${index}`}
                    className={`story-item ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                    style={{ animationDelay: `${350 + index * 100}ms` }}
                  >
                    {index !== 0 && (
                      <div className="bridge">
                        <img src="/themes/ren/our-story/story-bridge.png" alt="story-bridge" />
                      </div>
                    )}
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
        </div>
      </div>
    );
  }

  return (
    <div id="our-story" name="our-story-section" ref={sectionRef}>
      <div className="our-story-wrapper">
        <div className="content">
          <div className="view-content">
            <div
              className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "250ms" }}
            >
              <p>Kisah Kami</p>
            </div>

            {isDesktop ? (
              <div
                id="our-stories"
                ref={scrollableRef}
                onMouseEnter={stopScroll}
                onMouseLeave={startScroll}
                className={`our-stories pb-5 ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                {storyItems.map((story, index) => (
                  <div key={`story-${index}`} className="story-item">
                    {(index !== 0 || hasReset) && (
                      <div className="bridge">
                        <img src="/themes/ren/our-story/story-bridge.png" alt="story-bridge" />
                      </div>
                    )}
                    <div className="story-wrapper">
                      <div className="story-text">
                        <p>{getStoryText(story)}</p>
                      </div>
                    </div>
                    {index + 1 === storyItems.length && (
                      <div className="bridge">
                        <img src="/themes/ren/our-story/story-bridge.png" alt="story-bridge" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                id="our-stories"
                className={`our-stories ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
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
                    {index !== 0 ? (
                      <div className="bridge" style={{ flex: "0 0 12%", width: "12%", display: "flex", justifyContent: "center" }}>
                        <img src="/themes/ren/our-story/mobile-story-bridge-left.png" alt="story-bridge" style={{ width: "100%" }} />
                      </div>
                    ) : (
                      <div className="bridge-dummy" style={{ flex: "0 0 12%", width: "12%" }}></div>
                    )}

                    <div className="story-wrapper" style={{ flex: "0 0 76%", width: "76%", boxSizing: "border-box" }}>
                      <div className="story-text">
                        <p>{getStoryText(story)}</p>
                      </div>
                    </div>

                    {index + 1 !== storyItems.length ? (
                      <div className="bridge" style={{ flex: "0 0 12%", width: "12%", display: "flex", justifyContent: "center" }}>
                        <img src="/themes/ren/our-story/mobile-story-bridge-right.png" alt="story-bridge" style={{ width: "100%" }} />
                      </div>
                    ) : (
                      <div className="bridge-dummy" style={{ flex: "0 0 12%", width: "12%" }}></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className="bottom-left">
              <img
                className={isVisible ? "animate-fade-right" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/ren/our-story/decor-bottom-left.png"
                alt="decor-bottom-left"
              />
            </div>
            <div className="bottom-right">
              <img
                className={isVisible ? "animate-fade-left" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/ren/our-story/decor-bottom-right.png"
                alt="decor-bottom-right"
              />
            </div>
          </>
        ) : (
          <>
            <div className="top">
              <img
                className={isVisible ? "animate-zoom-in" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/ren/our-story/mobile-decor-top.png"
                alt="decor-top"
              />
            </div>
            <div className="bottom">
              <img
                className={isVisible ? "animate-zoom-in" : "opacity-0"}
                style={{ animationDelay: "1000ms" }}
                src="/themes/ren/our-story/mobile-decor-bottom.png"
                alt="decor-bottom"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
