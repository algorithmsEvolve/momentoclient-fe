"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OpeningSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const fullText = "Everything For\nYour Special Moments";

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
  }, [text, isDeleting, typingSpeed]);


  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-[100px] flex flex-col items-center justify-center text-center px-6 bg-[#010101] overflow-hidden">
      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-[60] group cursor-pointer">
        <div className="absolute inset-0 bg-[#47AE4B] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative w-[64px] h-[64px] bg-[#47AE4B] flex items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110">
          <Image 
            src="/icons/whatsapp.svg" 
            alt="WhatsApp" 
            width={40} 
            height={40} 
            className="object-contain"
          />
        </div>
      </div>

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
          <div className="flex flex-wrap justify-center gap-[10px]">
            <span>Sewa Seserahan</span>
            <span className="text-white/80">|</span>
            <span>Frame Mahar</span>
            <span className="text-white/80">|</span>
            <span>Undangan Digital</span>
            <span className="text-white/80">|</span>
            <span>Flower Bouquet</span>
            <span className="text-white/80">|</span>
            <span>Wedding Keepsake</span>
          </div>
          <div className="flex flex-wrap justify-center gap-[10px]">
            <span>Wedding Content Creator</span>
            <span className="text-white/80">|</span>
            <span>Master of Ceremony</span>
          </div>
        </div>

        <Link href="/harga" className="btn-gold w-full max-w-[320px] h-[56px] flex items-center justify-center rounded-[12px] text-[15px] font-semibold font-nav tracking-[0.5px] text-[#161616] shadow-xl hover:brightness-110 transition-all duration-300 antialiased">
          <span className="hidden lg:inline">LIHAT HARGA</span>
          <span className="lg:hidden">HITUNG ESTIMASI HARGA</span>
        </Link>

      </div>

      {/* Bottom Decoration Transition */}
      <div className="absolute bottom-0 left-0 w-full h-[140px] md:h-[220px] pointer-events-none">
        <Image 
          src="/images/home-decoration.png" 
          alt="Decoration" 
          fill 
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
