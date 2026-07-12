"use client";

import { useEffect, useRef } from "react";

/**
 * RenButterflies - Composite two-layer butterfly decoration component.
 * Recreated from the old Vue Butterflies.vue with front and back butterflies.
 *
 * Entrance: staggered opacity fade-in via CSS transition
 * Continuous: GIF animation provides the butterfly movement (no extra CSS needed)
 */
export default function RenButterflies() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('img');
    if (!items.length) return;

    // Staggered entrance
    const delays = [0, 500];
    const timers = [];

    items.forEach((el, i) => {
      const delay = delays[i] ?? 0;
      const timer = setTimeout(() => {
        el.classList.add('deco-enter');
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div ref={containerRef} name="butterflies">
      <div className="front-butterfly">
        <img
          src="/themes/ren/global/animated/butterflies/front-butterfly.gif"
          alt="butterfly"
        />
      </div>

      <div className="back-butterfly">
        <img
          src="/themes/ren/global/animated/butterflies/back-butterfly.gif"
          alt="butterfly"
        />
      </div>
    </div>
  );
}
