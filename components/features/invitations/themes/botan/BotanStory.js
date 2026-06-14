"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { formatInvitationDate } from "@/lib/invitations/date";

export default function BotanStory({ invitation }) {
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
        if (!scrollableDiv || scrollableDiv.offsetParent === null) return; // Skip if mobile is active

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
        if (!container || container.offsetParent === null) return; // Skip if desktop is active

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

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible, startScroll, stopScroll, startMobileScroll, stopMobileScroll]);

  if (!storyItems.length) return null;

  const withImage = (story) => !!story.imageUrl;

  return (
    <div id="our-story" name="our-story-section" ref={sectionRef}>
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
            className={`hidden md:flex our-stories pb-5 ${isVisible ? "animate-zoom-in" : "opacity-0"}`} 
            style={{ animationDelay: "350ms" }}
          >
            {storyItems.map((story, index) => (
              <div key={`story-${index}`} className="story-item">
                {(index !== 0 || hasReset) && (
                  <div className="bridge">
                    <img src="/themes/botan/our-story/story-bridge.png" alt="story-bridge" />
                  </div>
                )}
                <div className="story-wrapper">
                  {withImage(story) ? (
                    <div className="story-with-image">
                      <div className="story-left">
                        <div className="story-image">
                          <img src={story.imageUrl} alt="story-image" />
                        </div>
                      </div>
                      <div className="story-right">
                        <div className="story-title">
                          <p>{story.title}</p>
                        </div>
                        <div className="story-desc">
                          <p>{story.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="story-text">
                      {story.title && story.description ? (
                        <div className="story-with-title">
                          <div className="story-title">
                            <p>{story.title}</p>
                          </div>
                          <div className="story-desc">
                            <p>{story.description}</p>
                          </div>
                        </div>
                      ) : (
                        <p>{story.description || story.title}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div 
            id="our-stories-mobile" 
            ref={mobileScrollableRef}
            onTouchStart={stopMobileScroll}
            onTouchEnd={startMobileScroll}
            className={`md:hidden our-stories ${isVisible ? "animate-zoom-in" : "opacity-0"}`} 
            style={{ 
              display: 'flex', 
              flexDirection: 'row',
              flexWrap: 'nowrap',
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory', 
              scrollBehavior: 'smooth',
              animationDelay: "350ms",
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%'
            }}
          >
            <style jsx>{`
              #our-stories-mobile::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {storyItems.map((story, index) => (
              <div key={`story-${index}`} className="mobile-story-item" style={{ scrollSnapAlign: 'center', flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {index !== 0 ? (
                  <div className="bridge" style={{ flex: '0 0 10%', width: '10%', display: 'flex', justifyContent: 'center' }}>
                    <img src="/themes/botan/our-story/mobile-story-bridge-left.png" alt="story-bridge" style={{ width: '100%' }} />
                  </div>
                ) : (
                  <div className="bridge-dummy" style={{ flex: '0 0 10%', width: '10%' }}></div>
                )}
                
                <div className="story-wrapper" style={{ flex: '0 0 80%', width: '80%', boxSizing: 'border-box' }}>
                  {withImage(story) ? (
                    <div className="story-with-image">
                      <div className="story-image">
                        <img src={story.imageUrl} alt="story-image" />
                      </div>
                      <div className="story-content">
                        <div className="story-title">
                          <p>{story.title}</p>
                        </div>
                        <div className="story-desc">
                          <p>{story.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="story-text">
                      {story.title && story.description ? (
                        <div className="story-with-title">
                          <div className="story-title">
                            <p>{story.title}</p>
                          </div>
                          <div className="story-desc">
                            <p>{story.description}</p>
                          </div>
                        </div>
                      ) : (
                        <p>{story.description || story.title}</p>
                      )}
                    </div>
                  )}
                </div>

                {index + 1 !== storyItems.length ? (
                  <div className="bridge" style={{ flex: '0 0 10%', width: '10%', display: 'flex', justifyContent: 'center' }}>
                    <img src="/themes/botan/our-story/mobile-story-bridge-right.png" alt="story-bridge" style={{ width: '100%' }} />
                  </div>
                ) : (
                  <div className="bridge-dummy" style={{ flex: '0 0 10%', width: '10%' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden decorations">
        <div className={`top-left ${isVisible ? "animate-fade-right" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
          <img src="/themes/botan/our-story/mobile-decor-top-left.png" alt="decor-top-left" />
        </div>
      </div>
    </div>
  );
}

