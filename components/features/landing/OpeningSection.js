"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function OpeningSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const fullText = "Everything For\nYour Special Moments";

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const currentText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(currentText);

      if (!isDeleting && currentText === fullText) {
        setTypingSpeed(5000);
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 40 : 100);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed]);

  return (
    <section className="relative h-[720px] flex flex-col items-center justify-center text-center px-6 bg-[#010101] overflow-hidden">
      {/* Floating WhatsApp */}
      <div className="fixed bottom-10 right-10 z-[60] group cursor-pointer">
        <div className="absolute inset-0 bg-[#47AE4B] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative w-[70px] h-[70px] bg-[#47AE4B] flex items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110">
          <Image 
            src="/icons/whatsapp.svg" 
            alt="WhatsApp" 
            width={50} 
            height={50} 
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[925px] mx-auto flex flex-col items-center">
        <div className="min-h-[150px] flex items-center justify-center mb-10 text-center w-full">
          <h1 className="text-[48px] font-bold tracking-[-1px] leading-[65px] font-serif antialiased text-white whitespace-pre-line relative inline-block" style={{ transform: 'translate3d(0,0,0)' }}>
            {text}
            <span className="inline-block w-[3px] h-[45px] bg-white ml-2 animate-pulse align-middle" style={{ transform: 'translate3d(0,0,0)' }} />
          </h1>
        </div>

        <div className="flex flex-col gap-2 text-[18px] font-medium text-white/80 mb-16 leading-none font-nav tracking-tighter">
          <div className="flex flex-wrap justify-center gap-[15px]">
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
          <div className="flex flex-wrap justify-center gap-[15px]">
            <span>Wedding Content Creator</span>
            <span className="text-white/80">|</span>
            <span>Master of Ceremony</span>
          </div>
        </div>

        <button className="btn-gold w-[280px] h-[57px] flex items-center justify-center rounded-[10px] text-[14px] font-semibold font-nav tracking-[0.5px] text-[#161616] shadow-lg hover:brightness-110 transition-all duration-300 antialiased">
          LIHAT HARGA
        </button>
      </div>

      {/* Bottom Decoration Transition */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] md:h-[220px] pointer-events-none">
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
