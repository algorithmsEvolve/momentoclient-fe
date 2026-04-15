"use client";

import Image from "next/image";
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

  return (
    <section className="relative bg-[#090909] h-[650px] flex items-center overflow-hidden z-20">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-[50px] px-10 w-full h-full relative z-20">
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left z-30 bg-[#090909] py-10">
          <h2 className="text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-[65px] antialiased">
            <span className="text-[56px]">U</span>ndangan <span className="text-[56px]">D</span>igital
          </h2>
          <div className="max-w-[568px] mx-auto md:mx-0 mb-[40px]">
            <p className="text-white font-nav text-[16px] leading-[30px] tracking-normal outline-none">
              Hadir dengan desain responsif di semua perangkat. Dilengkapi fitur <span className="font-bold">Exclusive Guest Name</span>, <span className="font-bold">Dashboard Kelola Tamu</span> untuk <span className="font-bold">RSVP</span>, <span className="font-bold">Unique Link Invitation</span> untuk dibagikan, dan masih banyak lagi yang dapat kamu sesuaikan dengan kebutuhanmu.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <button className="btn-gold w-[210px] h-[50px] flex items-center justify-center gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
              <span className="text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">Selengkapnya</span>
              <ArrowRight size={20} className="text-[#161616] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right: Vertical Marquee Display */}
        <div className="flex-1 flex gap-6 h-full relative">
          {/* Shadow Gradients */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090909] to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090909] to-transparent z-40 pointer-events-none" />

          {/* Column 1 — Downwards */}
          <div className="relative h-full overflow-hidden">
            <div className="flex flex-col animate-marquee-v-down">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex flex-col gap-6 pb-6">
                  {leftImages.map((src, i) => (
                    <div key={`${groupIdx}-${i}`} className="relative w-[220px] h-[400px] flex-shrink-0 rounded-[30px] overflow-hidden border-[6px] border-[#1a1a1a] shadow-2xl">
                      <Image src={src} alt={`Undangan Left ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 — Upwards */}
          <div className="relative h-full overflow-hidden">
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
