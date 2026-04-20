"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InvitationSection() {
  const leftImages = [
    "/images/undangan-items/left/invitation-left-1.png",
    "/images/undangan-items/left/invitation-left-2.png",
    "/images/undangan-items/left/invitation-left-3.png",
    "/images/undangan-items/left/invitation-left-4.png",
  ];

  const rightImages = [
    "/images/undangan-items/right/invitation-right-1.png",
    "/images/undangan-items/right/invitation-rigth-2.png",
    "/images/undangan-items/right/invitation-rigth-3.png",
    "/images/undangan-items/right/invitation-rigth-4.png",
  ];
  const allImages = [...leftImages, ...rightImages];

  return (
    <section className="relative bg-[#090909] min-h-0 md:h-[650px] flex items-center overflow-hidden z-20 md:py-0 py-0">
      <div className="max-w-[1240px] mx-auto flex flex-row items-start md:items-center gap-4 md:gap-[50px] px-6 md:px-10 w-full relative z-20">
        {/* Left: Text Content */}
        <div className="flex-1 text-left z-30 bg-[#090909] pt-10 pb-[158px] md:py-10">
          <h2 className="text-[24px] md:text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-tight md:leading-[65px] antialiased uppercase">
            <span className="md:text-[56px]">U</span>ndangan <br className="md:hidden" />
            <span className="md:text-[56px]">D</span>igital
          </h2>
          <div className="max-w-[165px] md:max-w-[568px] mb-[30px] md:mb-[40px]">
            <p className="text-white font-nav text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] tracking-normal outline-none">
              Hadir dengan desain responsif di semua perangkat. Dilengkapi fitur <span className="font-bold whitespace-nowrap md:whitespace-normal">Exclusive Guest Name</span>, <span className="font-bold">Dashboard Kelola Tamu</span> untuk <span className="font-bold">RSVP</span>, <span className="font-bold">Unique Link Invitation</span> untuk dibagikan, dan masih banyak lagi yang dapat kamu sesuaikan dengan kebutuhanmu.
            </p>
          </div>
          <div className="flex justify-start">
            <Link href="/harga" className="btn-gold w-auto h-[36px] md:w-[210px] md:h-[50px] px-6 md:px-0 flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
              <span className="text-[10px] md:text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">Selengkapnya</span>
              <ArrowRight size={14} className="text-[#161616] md:hidden transition-transform group-hover:translate-x-1" />
              <ArrowRight size={20} className="text-[#161616] hidden md:block transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right: Vertical Marquee Display */}
        <div className="flex-1 flex gap-3 md:gap-6 relative h-[520px] md:h-full mt-5 md:mt-0">



          {/* Shadow Gradients */}
          <div className="absolute inset-x-0 top-0 h-16 md:h-24 bg-gradient-to-b from-[#090909] to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-[#090909] to-transparent z-40 pointer-events-none" />

          {/* Column 1 — Downwards */}
          <div className="relative h-full overflow-hidden">
            <div className="flex flex-col animate-marquee-v-down">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex flex-col gap-3 md:gap-6 pb-3 md:pb-6">
                  {/* On Mobile: All Images, On Desktop: Left Images only */}
                  <div className="md:hidden flex flex-col gap-3">
                    {allImages.map((src, i) => (
                      <div key={`all-${groupIdx}-${i}`} className="relative w-[114px] h-[229px] flex-shrink-0 rounded-[20px] overflow-hidden border-[3px] border-[#1a1a1a] shadow-2xl">
                        <Image src={src} alt={`Undangan All ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:flex flex-col gap-6">
                    {leftImages.map((src, i) => (
                      <div key={`left-${groupIdx}-${i}`} className="relative md:w-[220px] md:h-[400px] flex-shrink-0 md:rounded-[30px] overflow-hidden md:border-[6px] border-[#1a1a1a] shadow-2xl">
                        <Image src={src} alt={`Undangan Left ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 — Upwards (Desktop Only) */}
          <div className="relative h-full overflow-hidden hidden md:block">
            <div className="flex flex-col animate-marquee-v-up">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex flex-col gap-6 pb-6">
                  {rightImages.map((src, i) => (
                    <div key={`${groupIdx}-${i}`} className="relative w-[220px] h-[400px] flex-shrink-0 rounded-[30px] overflow-hidden border-[6px] border-[#1a1a1a] shadow-2xl">
                      <Image src={src} alt={`Undangan Right ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
