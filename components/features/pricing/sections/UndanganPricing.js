"use client";

import Image from "next/image";

export default function UndanganPricing() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[400px]">
      <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-8 opacity-80 animate-pulse">
        <Image 
          src="/images/momento-logo.png" 
          alt="Momento" 
          fill 
          className="object-contain"
        />
      </div>
      <h2 className="text-[28px] md:text-[40px] font-serif font-bold text-transparent bg-clip-text mb-4 tracking-[-1px] uppercase"
          style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}>
        On Progress
      </h2>
      <p className="text-white font-montserrat text-[14px] md:text-[16px] max-w-[400px] leading-relaxed">
        Kami sedang meracik konten terbaik untuk Pricelist Undangan Digital. Nantikan pembaruan dari kami segera!
      </p>
    </div>
  );
}
