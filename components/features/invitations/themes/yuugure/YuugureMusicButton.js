"use client";

import { useEffect, useRef, useState } from "react";

export default function YuugureMusicButton({ enabled, musicUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!musicUrl) return;

    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  useEffect(() => {
    if (!audioRef.current) return;

    let timerId;
    if (enabled) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
      timerId = setTimeout(() => {
        setIsPlaying(false);
      }, 0);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [enabled]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (enabled) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  if (!musicUrl) return null;

  return (
    <div
      name="yuugure-music-button"
      className={isPlaying ? "play" : "pause"}
      onClick={toggleMusic}
      style={{ cursor: "pointer" }}
    >
      <img
        src={`/themes/yuugure/component/${
          isPlaying ? "volume-on.svg" : "volume-off.svg"
        }`}
        alt="music-control"
      />
    </div>
  );
}
