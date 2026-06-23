"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function AozoraStory({ invitation }) {
  const storyItems = Array.isArray(invitation?.stories) ? invitation.stories : [];
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const sectionRef = useRef(null);
  const autoplayRef = useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [autoplayRef.current]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

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
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!storyItems.length) return null;

  const hasImages = storyItems.some((story) => story.imageUrl || story.image);

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

          <div className="our-story-wrapper">
            {!hasImages && (
              <div className="story-left-line">
                {isDesktop ? (
                  <img
                    src="/themes/aozora/our-story/story-left-line.svg"
                    alt="story-left-line"
                  />
                ) : (
                  <img
                    src="/themes/aozora/our-story/mobile-story-left-line.svg"
                    alt="story-left-line"
                  />
                )}
              </div>
            )}

            <div className="carousel-our-story">
              <div
                id="our-stories"
                className={`our-stories ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {storyItems.map((story, index) => {
                      const title = story.title;
                      const desc = story.description || story.desc;
                      const imageUrl = story.imageUrl || story.image;

                      return (
                        <div key={`story-${index}`} className="embla__slide">
                          <div className="story-item">
                            <div className="story-wrapper">
                              {imageUrl ? (
                                <div className="story-with-image">
                                  <div className="story-image">
                                    <img src={imageUrl} alt="story-image" />
                                  </div>
                                  <img
                                    className="story-bridge"
                                    src={
                                      isDesktop
                                        ? "/themes/aozora/our-story/story-left-line.svg"
                                        : "/themes/aozora/our-story/mobile-story-left-line.svg"
                                    }
                                    alt="story-bridge"
                                  />
                                  <div className="story-content">
                                    {title && (
                                      <div className="story-title">
                                        <p>{title}</p>
                                      </div>
                                    )}
                                    {desc && (
                                      <div className="story-desc">
                                        <p>{desc}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="story-text">
                                  {title || desc ? (
                                    <div className="story-with-title">
                                      {title && (
                                        <div className="story-title">
                                          <p>{title}</p>
                                        </div>
                                      )}
                                      {desc && (
                                        <div className="story-desc">
                                          <p>{desc}</p>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <p>
                                      {typeof story === "string" ? story : ""}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {scrollSnaps.length > 1 && (
                  <div className="embla-dots">
                    {scrollSnaps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`embla-dot ${index === selectedIndex ? "is-selected" : ""}`}
                        onClick={() => scrollTo(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
