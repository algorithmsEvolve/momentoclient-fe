"use client";

import { useEffect, useRef, useState } from "react";

export default function BaraSimpleMusicButton({ invitation }) {
  const [musicOn, setMusicOn] = useState(false);
  const [show, setShow] = useState(false);
  const audioRef = useRef(null);
  const musicOnRef = useRef(false);

  const enabled = invitation?.settings?.musicEnabled !== false;
  const musicUrl = invitation?.musicUrl;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  if (!enabled || !musicUrl || !show) return null;

  return (
    <div name="bara-music-button" className="show">
      <div className="wrapper" onClick={toggleMusic}>
        <img
          className="music-button"
          src={musicOn ? "/themes/bara-simple/component/volume-on.svg" : "/themes/bara-simple/component/volume-off.svg"}
          alt={musicOn ? "Volume On" : "Volume Off"}
        />
      </div>
    </div>
  );
}
