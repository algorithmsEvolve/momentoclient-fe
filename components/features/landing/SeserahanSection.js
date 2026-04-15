import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SeserahanSection() {
  return (
    <section className="relative bg-[#090909] min-h-[650px] flex flex-col items-center py-20 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto text-center px-10">
        <h2 className="text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-[65px] antialiased">
          <span className="text-[56px]">S</span>ewa <span className="text-[56px]">S</span>eserahan
        </h2>
        <div className="max-w-[860px] mx-auto mb-[40px]">
          <p className="text-white font-nav text-[16px] leading-[30px] tracking-normal">
            Momento melayani sewa seserahan untuk acara lamaran dan pernikahan di wilayah <span className="font-bold">JADETABEK</span>.<br /> Berlokasi di <span className="font-bold">Tangerang</span>, kami juga menyediakan layanan pengiriman melalui <span className="font-bold">Lalamove</span> dan <span className="font-bold">Gosend Car</span>.
          </p>
        </div>
      </div>

      {/* Infinite Running Images */}
      <div className="relative w-full mb-[40px] flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-5">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-5">
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <div key={`${groupIdx}-${id}`} className="relative w-[300px] h-[200px] flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/5">
                  <Image
                    src={`/images/seserahan-items/seserahan-${id}.png`}
                    alt={`Seserahan ${id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button className="btn-gold w-[210px] h-[50px] flex items-center justify-center gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
        <span className="text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">Selengkapnya</span>
        <ArrowRight size={20} className="text-[#161616] transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
}
