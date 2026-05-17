"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BotanMusicButton({ enabled, musicUrl }) {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const musicOnRef = useRef(false);

  useEffect(() => {
    musicOnRef.current = musicOn;
  }, [musicOn]);

  useEffect(() => {
    if (!enabled || !musicUrl) {
      return undefined;
    }

    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false));
    };

    tryPlay();

    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.visibilityState === "hidden") {
        audioRef.current.pause();
        return;
      }

      if (musicOnRef.current) {
        audioRef.current.play().catch(() => setMusicOn(false));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      audio.pause();
      audioRef.current = null;
    };
  }, [enabled, musicUrl]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
  };

  if (!enabled || !musicUrl) return null;

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className="fixed right-4 top-4 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#cb877ea6] p-2 shadow-[0_20px_40px_rgba(98,68,43,0.15)] transition hover:bg-[#cb877e] md:right-8 md:top-8"
      aria-label={musicOn ? "Pause music" : "Play music"}
    >
      <Image
        src={musicOn ? "/themes/botan/component/volume-on.svg" : "/themes/botan/component/volume-off.svg"}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        aria-hidden="true"
      />
    </button>
  );
}
