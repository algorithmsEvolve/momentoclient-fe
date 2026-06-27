"use client";

import { useEffect, useRef, useState } from "react";

export default function YonakaMusicButton({ enabled, musicUrl }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!audioRef.current || !musicUrl) return;
    if (enabled) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [enabled, musicUrl]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (enabled) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop />
      <div
        name="yonaka-music-button"
        className={show ? "show" : ""}
        onClick={toggle}
      >
        <div className="wrapper">
          <div className="music-button">
            <img
              src={playing ? "/themes/yonaka/component/volume-on.svg" : "/themes/yonaka/component/volume-off.svg"}
              alt="music"
            />
          </div>
        </div>
      </div>
    </>
  );
}
