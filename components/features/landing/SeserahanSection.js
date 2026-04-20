import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SeserahanSection() {
  return (
    <section className="relative bg-[#090909] min-h-[500px] md:min-h-[650px] flex flex-col items-center py-12 md:py-20 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto text-center px-6 md:px-10">
        <h2 className="text-[24px] md:text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-tight md:leading-[65px] antialiased uppercase md:normal-case">
          <span className="md:text-[56px]">S</span>ewa <span className="md:text-[56px]">s</span>eserahan
        </h2>
        <div className="max-w-[280px] md:max-w-[860px] mx-auto mb-[30px] md:mb-[40px]">
          <p className="text-white font-nav text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] tracking-normal">
            Momento melayani sewa seserahan untuk acara lamaran dan pernikahan di wilayah <span className="font-bold">JADETABEK</span>.<br className="hidden md:block" /> Berlokasi di <span className="font-bold">Tangerang</span>, kami juga menyediakan layanan pengiriman melalui <span className="font-bold">Lalamove</span> dan <span className="font-bold">Gosend Car</span>.
          </p>
        </div>
      </div>

      {/* Infinite Running Images */}
      <div className="relative w-full mb-[30px] md:mb-[40px] flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-3 md:gap-5">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-3 md:gap-5">
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <div key={`${groupIdx}-${id}`} className="relative w-[200px] h-[133px] md:w-[300px] md:h-[200px] flex-shrink-0 rounded-[10px] md:rounded-xl overflow-hidden shadow-2xl border border-white/5">
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

      <Link href="/harga" className="btn-gold w-auto h-[36px] md:w-[210px] md:h-[50px] px-6 md:px-0 flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
        <span className="text-[10px] md:text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">Selengkapnya</span>
        <ArrowRight size={14} className="text-[#161616] md:hidden transition-transform group-hover:translate-x-1" />
        <ArrowRight size={20} className="text-[#161616] hidden md:block transition-transform group-hover:translate-x-1" />
      </Link>
    </section>

  );
}
