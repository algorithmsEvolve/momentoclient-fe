"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Mengumpulkan semua URL gambar yang relevan dari data invitation.
 * Meliputi: cover image, bride/groom photo, gallery, stories, display picture.
 */
function collectInvitationImages(invitation) {
  if (!invitation) return [];

  const urls = new Set();

  const add = (url) => {
    if (url && typeof url === "string" && (url.startsWith("http") || url.startsWith("/"))) {
      urls.add(url);
    }
  };

  // Couple photos
  add(invitation.couple?.bride?.photoUrl);
  add(invitation.couple?.bride?.illustrationUrl);
  add(invitation.couple?.groom?.photoUrl);
  add(invitation.couple?.groom?.illustrationUrl);

  // Display picture (countdown section)
  add(invitation.settings?.displayPicture);

  // OG image
  add(invitation.ogImageUrl);

  // Galleries
  if (Array.isArray(invitation.galleries)) {
    invitation.galleries.forEach((g) => add(g.photoUrl || g.url || g.imageUrl));
  }

  // Stories
  if (Array.isArray(invitation.stories)) {
    invitation.stories.forEach((s) => add(s.photoUrl || s.url || s.imageUrl));
  }

  // Opening photos
  add(invitation.opening?.akad?.photoUrl);
  add(invitation.opening?.reception?.photoUrl);

  return Array.from(urls);
}

/**
 * Hook untuk preload gambar-gambar dari invitation dan melaporkan progress (0–100).
 * Progress diatur berdasarkan jumlah gambar yang sudah ter-load.
 *
 * @param {object} invitation - Data invitation yang sudah dinormalisasi
 * @param {object} options
 * @param {number} options.minDuration - Durasi minimum preloader dalam ms (default 1200)
 * @returns {{ progress: number, isDone: boolean }}
 */
export function usePreloadProgress(invitation, { minDuration = 1200 } = {}) {
  const isWebdriver = typeof window !== "undefined" && !!window.navigator?.webdriver;
  const [progress, setProgress] = useState(isWebdriver ? 100 : 0);
  const [isDone, setIsDone] = useState(isWebdriver);

  useEffect(() => {
    // Skip preloader in E2E automated test environments
    if (isWebdriver) {
      return;
    }

    const images = collectInvitationImages(invitation);
    const total = images.length;
    let cancelled = false;
    const startTime = Date.now();

    // Safety timeout: dismiss preloader after max 3.5 seconds
    const safetyTimer = setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setIsDone(true);
      }
    }, 3500);

    // Jika tidak ada gambar, langsung progress ke 100 secara smooth
    if (total === 0) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.round((elapsed / minDuration) * 100));
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          clearTimeout(safetyTimer);
          setIsDone(true);
        }
      }, 16);
      return () => {
        cancelled = true;
        clearInterval(interval);
        clearTimeout(safetyTimer);
      };
    }

    // Ada gambar: track per-image load + animasi smooth
    let loaded = 0;

    // Fungsi untuk update progress secara smooth
    // Gabungkan: image progress (80%) + waktu minimum (20%)
    const updateProgress = () => {
      if (cancelled) return;
      const imageProgress = total > 0 ? (loaded / total) * 80 : 0;
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min(20, (elapsed / minDuration) * 20);
      const p = Math.min(99, Math.round(imageProgress + timeProgress));
      setProgress(p);
    };

    // Mulai load setiap gambar
    const imageObjects = images.map((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loaded++;
        updateProgress();
        // Semua gambar selesai
        if (loaded >= total) {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, minDuration - elapsed);
          // Tunggu sisa minDuration lalu finalisasi ke 100
          setTimeout(() => {
            if (!cancelled) {
              setProgress(100);
              // Beri sedikit waktu untuk animasi wave mencapai penuh
              setTimeout(() => {
                if (!cancelled) {
                  clearTimeout(safetyTimer);
                  setIsDone(true);
                }
              }, 400);
            }
          }, remaining);
        }
      };
      img.src = src;
      return img;
    });

    // Update progres waktu secara periodik (untuk time-based 20%)
    const interval = setInterval(updateProgress, 100);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(safetyTimer);
      imageObjects.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [invitation, minDuration, isWebdriver]);

  return { progress, isDone };
}
