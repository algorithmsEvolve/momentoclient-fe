"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MaharImageCollage.module.css";

const IMAGE_COUNT = 12;
const CHANGE_INTERVAL = 5000;
const STAGGER_DELAY = 500;
const SLOT_ORDER = [0, 1, 2, 3];

const defaultMaharImages = Array.from({ length: IMAGE_COUNT }, (_, index) => ({
  src: `/images/mahar-items/mahar-${index + 1}.png`,
  alt: `Mahar ${index + 1}`,
}));

function normalizeMaharImages(images) {
  return defaultMaharImages.map((fallback, index) => {
    const image = images?.[index];
    const src = typeof image === "string" ? image : image?.src;

    if (!src) return fallback;

    return {
      src,
      alt:
        (typeof image === "object" && image?.alt) ||
        fallback.alt,
    };
  });
}

function AnimatedImage({
  currentImage,
  nextImage,
  isFlipping,
  isPaused,
  sizes,
  onFlipComplete,
}) {
  return (
    <div className={styles.scene}>
      <div
        className={`${styles.card} ${isFlipping ? styles.flip : ""} ${
          isPaused ? styles.paused : ""
        }`}
        onAnimationEnd={onFlipComplete}
      >
        <div className={`${styles.face} ${styles.front}`}>
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes={sizes}
            className="object-cover"
            unoptimized
          />
        </div>

        {nextImage && (
          <div className={`${styles.face} ${styles.back}`}>
            <Image
              src={nextImage.src}
              alt={nextImage.alt}
              fill
              sizes={sizes}
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MaharImageCollage({ images = [] }) {
  const maharImages = useMemo(() => normalizeMaharImages(images), [images]);
  const [isPaused, setIsPaused] = useState(false);
  const [slots, setSlots] = useState(() =>
    maharImages.slice(0, 4).map((image) => ({
      currentImage: image,
      nextImage: null,
      isFlipping: false,
    }))
  );
  const nextImageIndex = useRef(4);

  useEffect(() => {
    const pendingTimers = new Set();
    let isDisposed = false;
    let timersPaused = document.visibilityState !== "visible";

    const startTimer = (timer) => {
      if (timersPaused || isDisposed) return;

      timer.startedAt = performance.now();
      timer.id = window.setTimeout(() => {
        timer.id = null;
        pendingTimers.delete(timer);

        if (!isDisposed) {
          timer.callback();
        }
      }, timer.remaining);
    };

    const scheduleTimer = (callback, delay) => {
      const timer = {
        callback,
        id: null,
        remaining: delay,
        startedAt: 0,
      };

      pendingTimers.add(timer);
      startTimer(timer);
      return timer;
    };

    const clearTimers = () => {
      pendingTimers.forEach((timer) => {
        if (timer.id !== null) {
          window.clearTimeout(timer.id);
        }
      });
      pendingTimers.clear();
    };

    const pauseTimers = () => {
      const pausedAt = performance.now();

      pendingTimers.forEach((timer) => {
        if (timer.id === null) return;

        window.clearTimeout(timer.id);
        timer.id = null;
        timer.remaining = Math.max(
          0,
          timer.remaining - (pausedAt - timer.startedAt)
        );
      });
    };

    const resumeTimers = () => {
      pendingTimers.forEach(startTimer);
    };

    const changeSlotImage = (slotIndex) => {
      const replacementImage = maharImages[nextImageIndex.current];
      nextImageIndex.current = (nextImageIndex.current + 1) % maharImages.length;

      setSlots((current) =>
        current.map((slot, index) =>
          index === slotIndex
            ? {
                ...slot,
                nextImage: replacementImage,
                isFlipping: true,
              }
            : slot
        )
      );
    };

    const runSequence = () => {
      SLOT_ORDER.forEach((slotIndex, sequenceIndex) => {
        scheduleTimer(() => changeSlotImage(slotIndex), sequenceIndex * STAGGER_DELAY);
      });

      scheduleTimer(runSequence, CHANGE_INTERVAL);
    };

    const handleVisibilityChange = () => {
      const shouldPause = document.visibilityState !== "visible";
      setIsPaused(shouldPause);

      if (shouldPause) {
        timersPaused = true;
        pauseTimers();
        return;
      }

      timersPaused = false;
      resumeTimers();
    };

    const preloadImages = maharImages.map(
      (image) =>
        new Promise((resolve) => {
          const preloadImage = new window.Image();

          preloadImage.onload = resolve;
          preloadImage.onerror = resolve;
          preloadImage.src = image.src;

          if (preloadImage.complete) {
            resolve();
          }
        })
    );

    document.addEventListener("visibilitychange", handleVisibilityChange);

    Promise.all(preloadImages).then(() => {
      if (!isDisposed) {
        scheduleTimer(runSequence, CHANGE_INTERVAL);
      }
    });

    return () => {
      isDisposed = true;
      clearTimers();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [maharImages]);

  const completeFlip = (slotIndex) => {
    setSlots((current) =>
      current.map((slot, index) =>
        index === slotIndex && slot.nextImage
          ? {
              currentImage: slot.nextImage,
              nextImage: null,
              isFlipping: false,
            }
          : slot
      )
    );
  };

  return (
    <div className="w-full max-w-[320px] md:max-w-none md:w-[508px] flex-shrink-0 grid grid-cols-2 gap-[11px] relative order-2 md:order-1 px-4 md:px-0">
      <div className="flex flex-col gap-[11px]">
        <div className="relative w-full aspect-[152/126] md:w-[248px] md:h-[205px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
          <AnimatedImage
            currentImage={slots[0].currentImage}
            nextImage={slots[0].nextImage}
            isFlipping={slots[0].isFlipping}
            isPaused={isPaused}
            sizes="(min-width: 768px) 248px, 45vw"
            onFlipComplete={() => completeFlip(0)}
          />
        </div>
        <div className="relative w-[75%] md:w-[188px] ml-auto aspect-[115/155] md:h-[252px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
          <AnimatedImage
            currentImage={slots[3].currentImage}
            nextImage={slots[3].nextImage}
            isFlipping={slots[3].isFlipping}
            isPaused={isPaused}
            sizes="(min-width: 768px) 188px, 34vw"
            onFlipComplete={() => completeFlip(3)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[11px] pt-4 md:pt-0">
        <div className="relative w-[76%] md:w-[188px] aspect-[116/157] md:h-[258px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
          <AnimatedImage
            currentImage={slots[1].currentImage}
            nextImage={slots[1].nextImage}
            isFlipping={slots[1].isFlipping}
            isPaused={isPaused}
            sizes="(min-width: 768px) 188px, 34vw"
            onFlipComplete={() => completeFlip(1)}
          />
        </div>
        <div className="relative w-full aspect-[152/126] md:w-[248px] md:h-[188px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
          <AnimatedImage
            currentImage={slots[2].currentImage}
            nextImage={slots[2].nextImage}
            isFlipping={slots[2].isFlipping}
            isPaused={isPaused}
            sizes="(min-width: 768px) 248px, 45vw"
            onFlipComplete={() => completeFlip(2)}
          />
        </div>
      </div>
    </div>
  );
}
