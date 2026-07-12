"use client";

import { useEffect, useRef } from "react";

/**
 * RenSideFlowers - Composite multi-layer side flower decoration component.
 * Recreated from the old Vue SideFlowers.vue to properly layer 9 images.
 *
 * Entrance: staggered opacity fade-in via CSS transition (matching old data-aos-delay)
 * Continuous: giggling/bubbling via CSS animation on img elements (runs from page load)
 */
export default function RenSideFlowers() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.side-flower-item');
    if (!items.length) return;

    // Staggered entrance: matching old Vue data-aos-delay values
    // Infinite animations (giggling/bubbling) are applied via CSS on parent wrapper divs,
    // so they run from page load. Only the entrance (opacity fade-in) is staggered.
    const delays = [200, 700, 1200, 1700, 2200, 2700, 5000, 3700, 4200];
    const timers = [];

    items.forEach((el, i) => {
      const delay = delays[i] ?? 200;
      const timer = setTimeout(() => {
        el.classList.add('deco-enter');
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div ref={containerRef} name="side-flowers">
      <div className="bottom-leaf">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/bottom-leaf.png"
          alt="side-flowers"
        />
      </div>

      <div className="bottom-flower">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/bottom-flower.png"
          alt="side-flowers"
        />
      </div>

      <div className="upper-bottom-leaf">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/upper-bottom-leaf.png"
          alt="side-flowers"
        />
      </div>

      <div className="middle-pink-flower">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/middle-pink-flower.png"
          alt="side-flowers"
        />
      </div>

      <div className="middle-right-leaf">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/middle-right-leaf.png"
          alt="side-flowers"
        />
      </div>

      <div className="middle-red-flower">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/middle-red-flower.png"
          alt="side-flowers"
        />
      </div>

      <div className="middle-left-leaf">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/middle-left-leaf.png"
          alt="side-flowers"
        />
      </div>

      <div className="top-pink-flower">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/top-pink-flower.png"
          alt="side-flowers"
        />
      </div>

      <div className="top-leaf">
        <img
          className="side-flower-item"
          src="/themes/ren/global/animated/side-flowers/top-leaf.png"
          alt="side-flowers"
        />
      </div>
    </div>
  );
}
