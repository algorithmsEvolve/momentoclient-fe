"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeDefaults } from "@/lib/site-content/homeDefaults";
import { getImageSrc } from "@/lib/site-content/image";

export default function OpeningSection({ content = {} }) {
  const c = { ...homeDefaults.opening, ...content };
  const desktopCtaHref = c.cta?.desktopHref || c.cta?.href || '/harga';
  const mobileCtaHref = c.cta?.mobileHref || '/estimasi';

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const fullText = c.headline || "Everything For\nYour Special Moments";

  useEffect(() => {
    let timer;
    
    const handleTyping = () => {
      const nextText = isDeleting 
        ? fullText.slice(0, text.length - 1)
        : fullText.slice(0, text.length + 1);

      setText(nextText);

      if (!isDeleting && nextText === fullText) {
        setTypingSpeed(5000);
        setIsDeleting(true);
      } else if (isDeleting && nextText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 40 : 100);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, fullText]);


  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-[100px] flex flex-col items-center justify-center text-center px-6 bg-[#010101] overflow-hidden">
      <div className="relative z-10 max-w-[840px] w-full mx-auto flex flex-col items-center">
        <div className="min-h-[150px] flex items-center justify-center mb-8 text-center w-full px-2">
          <h1 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold tracking-[-1px] leading-[42px] sm:leading-[52px] md:leading-[65px] font-serif antialiased text-white relative block">
            {text.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}<span className="inline-block w-[3px] h-[36px] sm:h-[40px] md:h-[45px] bg-white ml-2 animate-pulse align-middle" />
          </h1>
        </div>


        <div className="flex flex-col gap-3 text-[13px] sm:text-[16px] font-medium text-white/80 mb-12 leading-[1.3] font-nav tracking-tighter max-w-[420px] sm:max-w-[680px]">
          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-col gap-3">
            <div className="flex flex-wrap justify-center gap-[10px]">
              {c.services?.slice(0, 4).map((service, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-white/80 mr-[10px]">|</span>}
                  <span>{service}</span>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-[10px]">
              {c.services?.slice(4).map((service, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-white/80 mr-[10px]">|</span>}
                  <span>{service}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Layout (Pairs 2x2) */}
          <div className="flex sm:hidden flex-col gap-3">
            {[0, 2, 4].map((start) => (
              <div key={start} className="flex justify-center gap-[10px]">
                {c.services?.slice(start, start + 2).map((service, i) => (
                  <span key={i}>
                    {i > 0 && <span className="text-white/80 mr-[10px]">|</span>}
                    <span>{service}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Link href={desktopCtaHref} className="btn-gold hidden w-full max-w-[320px] h-[56px] lg:flex items-center justify-center rounded-[12px] text-[15px] font-semibold font-nav tracking-[0.5px] text-[#161616] shadow-xl hover:brightness-110 transition-all duration-300 antialiased">
          <span>{c.cta?.desktopLabel || 'LIHAT HARGA'}</span>
        </Link>
        <Link href={mobileCtaHref} className="btn-gold w-full max-w-[320px] h-[56px] flex lg:hidden items-center justify-center rounded-[12px] text-[15px] font-semibold font-nav tracking-[0.5px] text-[#161616] shadow-xl hover:brightness-110 transition-all duration-300 antialiased">
          <span>{c.cta?.mobileLabel || 'HITUNG ESTIMASI HARGA'}</span>
        </Link>

      </div>

      {/* Bottom Decoration Transition */}
      <div className="absolute bottom-0 left-0 w-full h-[140px] md:h-[220px] pointer-events-none">
        <Image 
          src={getImageSrc(c.decorationImage, '/images/home-decoration.png')} 
          alt={c.decorationImage?.alt || 'Decoration'} 
          fill 
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
