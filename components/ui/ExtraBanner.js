'use client';

import Image from "next/image";
import Link from "next/link";

export default function ExtraBanner({ 
  title = "Kalau kamu masih bingung dengan produk-produk Momento, atau kamu butuh saran tema yang pas dengan pernikahanmu, jangan ragu untuk ngobrol dengan kami ya!", 
  buttonText = "HUBUNGI KAMI", 
  buttonHref = "https://wa.me/628123456789",
  showDecoration = false 
}) {
  return (
    <section className="relative w-full">
      {/* Wave Decoration - Positioned at the very top to bridge the gap with Safari fix */}
      {showDecoration && (
        <div className="absolute top-[-249px] left-0 w-full h-[250px] z-30 pointer-events-none">
          <Image 
            src="/images/testimonies/testimony-bottom-decoration.png" 
            alt="Wave Decoration" 
            fill 
            className="object-cover object-top"
            priority
          />
        </div>
      )}

      {/* Main Banner Body */}
      <div 
        className={`relative overflow-hidden z-20 md:z-0 lg:z-0 ${showDecoration ? 'mt-0' : 'mt-[-1px]'} md:mt-0`}
        style={{
          background: "linear-gradient(90deg, #D4AF37 -30%, #CF953C 0%, #D4AF37 35%, #CF953C 80%, #D4AF37 100%)",
          // Adding a tiny top margin/padding adjustment to seal Safari gap if not using decoration
          paddingTop: !showDecoration ? '1px' : '0'
        }}
      >
        {/* Anti-Gap Seal for Safari (1px overlap) */}
        {!showDecoration && (
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#CF953C] z-30 md:hidden" />
        )}

        <div className="relative z-10 max-w-[1240px] mx-auto pt-[52px] md:pt-[38px] pb-[51px] md:pb-[60px] px-6 md:px-10 text-center">
          <p className="text-[#161616] font-nav font-medium text-[14px] md:text-[20px] mb-8 leading-[20px] md:leading-[32px] max-w-[320px] md:max-w-[850px] mx-auto antialiased tracking-[0.5px] md:tracking-tight">
            {title}
          </p>
          
          <div className="flex justify-center">
            <Link 
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#161616] text-[#D4AF37] min-w-[210px] w-auto px-8 h-[50px] rounded-[10px] flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-[#090909] shadow-[0_10px_30_rgba(0,0,0,0.3)] antialiased"
            >
              <span className="text-[14px] font-nav font-bold uppercase tracking-[0.5px] md:tracking-[1px]">
                {buttonText}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
