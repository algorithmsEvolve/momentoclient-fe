"use client";

/**
 * BaraPreloader
 *
 * Menampilkan logo Momento dengan efek wave fill.
 * Wave naik dari bawah ke atas sesuai nilai `progress` (0–100).
 *
 * @param {number} progress - 0 sampai 100
 */
export default function BaraPreloader({ progress = 0 }) {
  const LOGO_TOP = 28;
  const LOGO_BOTTOM = 73;
  const waveY = LOGO_BOTTOM - ((progress / 100) * (LOGO_BOTTOM - LOGO_TOP));

  const solidY = waveY;
  const solidH = 110 - solidY + 5;

  const amplitude = 3;
  const wavePath = [
    `M-20 ${waveY}`,
    `Q-10 ${waveY - amplitude} 0 ${waveY}`,
    `Q10 ${waveY + amplitude} 20 ${waveY}`,
    `Q30 ${waveY - amplitude} 40 ${waveY}`,
    `Q50 ${waveY + amplitude} 60 ${waveY}`,
    `Q70 ${waveY - amplitude} 80 ${waveY}`,
    `Q90 ${waveY + amplitude} 100 ${waveY}`,
    `Q110 ${waveY - amplitude} 120 ${waveY}`,
    `L120 110 L-20 110 Z`,
  ].join(" ");

  return (
    <div name="bara-preloader">
      <div className="preloader-bg" />

      <div className="preloader-content">
        <div className="logo-wave-wrapper">
          <svg
            className="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <clipPath id="bara-logo-clip">
                <path d="M39.792 34.544a3.936 3.936 0 0 0-1.383-1.135A3.974 3.974 0 0 0 36.662 33h-8.739a3.946 3.946 0 0 0-2.773 1.14A3.877 3.877 0 0 0 24 36.89V64.11a3.877 3.877 0 0 0 1.15 2.749A3.946 3.946 0 0 0 27.923 68h8.827a3.97 3.97 0 0 0 1.754-.412 3.934 3.934 0 0 0 1.385-1.144l3.333-4.405L49.5 53.74l9.611 12.703c.367.482.841.874 1.386 1.144A3.97 3.97 0 0 0 62.25 68h8.827a3.946 3.946 0 0 0 2.773-1.14A3.877 3.877 0 0 0 75 64.11V36.89a3.877 3.877 0 0 0-1.15-2.749A3.946 3.946 0 0 0 71.077 33h-8.739a3.973 3.973 0 0 0-1.747.41 3.936 3.936 0 0 0-1.383 1.134L49.5 47.275l-4.208-5.518-5.5-7.213ZM27.923 64.11V36.89h8.74l1.067 1.4v24.527l-.98 1.295h-8.827ZM62.338 36.89h8.739V64.11H62.25l-8.827-11.667h5.884c.52 0 1.019-.204 1.387-.57a1.936 1.936 0 0 0 0-2.749 1.97 1.97 0 0 0-1.387-.57h-5.865l8.896-11.666Z" />
              </clipPath>
            </defs>

            {/* Layer 1: Logo abu-abu (base) */}
            <path
              className="logo-gray"
              d="M39.792 34.544a3.936 3.936 0 0 0-1.383-1.135A3.974 3.974 0 0 0 36.662 33h-8.739a3.946 3.946 0 0 0-2.773 1.14A3.877 3.877 0 0 0 24 36.89V64.11a3.877 3.877 0 0 0 1.15 2.749A3.946 3.946 0 0 0 27.923 68h8.827a3.97 3.97 0 0 0 1.754-.412 3.934 3.934 0 0 0 1.385-1.144l3.333-4.405L49.5 53.74l9.611 12.703c.367.482.841.874 1.386 1.144A3.97 3.97 0 0 0 62.25 68h8.827a3.946 3.946 0 0 0 2.773-1.14A3.877 3.877 0 0 0 75 64.11V36.89a3.877 3.877 0 0 0-1.15-2.749A3.946 3.946 0 0 0 71.077 33h-8.739a3.973 3.973 0 0 0-1.747.41 3.936 3.936 0 0 0-1.383 1.134L49.5 47.275l-4.208-5.518-5.5-7.213ZM27.923 64.11V36.89h8.74l1.067 1.4v24.527l-.98 1.295h-8.827ZM62.338 36.89h8.739V64.11H62.25l-8.827-11.667h5.884c.52 0 1.019-.204 1.387-.57a1.936 1.936 0 0 0 0-2.749 1.97 1.97 0 0 0-1.387-.57h-5.865l8.896-11.666Z"
            />

            {/* Layer 2: Wave group ter-clip oleh bentuk logo */}
            <g clipPath="url(#bara-logo-clip)" className="wave-fill-group">
              {/* Kotak solid di bawah wave */}
              <rect
                className="wave-solid-fill"
                x="-10"
                y={solidY}
                width="120"
                height={Math.max(0, solidH)}
              />

              {/* Wave path — posisi Y dikontrol oleh progress */}
              <path
                className="wave-path"
                d={wavePath}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
