"use client";

import { useEffect, useRef } from "react";

/**
 * RenBulkFlowers - Composite multi-layer flower decoration component.
 * Recreated from the old Vue BulkFlowers.vue to properly layer 8 images.
 * Each layer has its own position, size, z-index, and animation.
 *
 * Entrance: staggered opacity fade-in via CSS transition (matching old data-aos-delay)
 * Continuous: giggling/bubbling via CSS animation on img elements (runs from page load)
 */
export default function RenBulkFlowers() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.bulk-flower-item');
    if (!items.length) return;

    // Staggered entrance: add .deco-enter class with delays matching old Vue data-aos-delay
    // Infinite animations (giggling/bubbling) are applied via CSS on parent wrapper divs,
    // so they run from page load. Only the entrance (opacity fade-in) is staggered.
    const delays = [4200, 3700, 3200, 2700, 2200, 1700, 1200, 700, 200];
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
    <div ref={containerRef} name="bulk-flowers">
      <div className="upper-top-leaf">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/upper-top-leaf.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="top-leaf">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/top-leaf.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="top-flower">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/top-flower.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="middle-leaf-top">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/middle-leaf-top.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="middle-leaf-bottom">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/middle-leaf-bottom.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="middle-flower">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/middle-flower.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="below-middle">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/below-middle.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="upper-base">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/upper-base.png"
          alt="bulk-flowers"
        />
      </div>

      <div className="base-flower">
        <img
          className="bulk-flower-item"
          src="/themes/ren/global/animated/bulk-flowers/base-flower.png"
          alt="bulk-flowers"
        />
      </div>
    </div>
  );
}
