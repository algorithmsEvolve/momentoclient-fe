'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PricingCTABanner() {
  return (
    <section className="relative w-full overflow-hidden mt-10 md:mt-20">
      {/* Decorative Wave Transition Top */}
      <div className="absolute top-0 left-0 w-full h-[100px] md:h-[180px] pointer-events-none z-10 rotate-180">
        <Image 
          src="/images/home-decoration.png" 
          alt="Decoration" 
          fill 
          className="object-contain object-bottom opacity-100"
        />
      </div>

      <div className="bg-[#D4AF37] relative pt-32 pb-24 md:pt-48 md:pb-36 px-6 md:px-10 flex flex-col items-center text-center">
        {/* Background Texture/Pattern */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <Image 
            src="/images/home-decoration.png" 
            alt="Texture" 
            fill 
            className="object-cover scale-150"
          />
        </div>

        <div className="relative z-20 max-w-[860px]">
          <p className="text-[#010101] font-nav text-[14px] md:text-[24px] font-medium leading-[25px] md:leading-[40px] mb-8 md:mb-12 tracking-normal antialiased">
            Penasaran dengan estimasi harga untuk kebutuhanmu? Klik tombol di bawah dan mulai hitung sekarang.
          </p>

          <Link 
            href="/estimasi"
            className="inline-flex items-center justify-center bg-[#161616] text-[#D4AF37] h-[50px] md:h-[60px] px-8 md:px-12 rounded-[12px] font-nav font-bold text-[14px] md:text-[18px] tracking-[0.5px] transition-all duration-300 hover:bg-[#161616]/90 hover:scale-105 shadow-2xl antialiased uppercase"
          >
            HITUNG ESTIMASI HARGA
          </Link>
        </div>
      </div>
    </section>
  );
}
