"use client";

import Image from "next/image";

export default function BotanPreloader() {
  return (
    <div name="botan-preloader">
      <div className="loading-spin">
        <div className="relative w-20 h-20">
          <Image
            src="/themes/botan/component/momentospin.png"
            alt="loading"
            fill
            className="object-contain"
          />
        </div>

        <div className="loading-bar-wrapper">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
