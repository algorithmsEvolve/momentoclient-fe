import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function MaharSection() {
  return (
    <section className="relative bg-[#161616] min-h-[600px] flex items-center overflow-hidden z-20 py-[63.5px]">
      {/* Top Blend Gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090909] to-transparent z-10 pointer-events-none" />
      
      {/* Bottom Blend Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090909] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-[50px] px-10 w-full relative z-20">
        {/* Left: Image Grid Collage (W 508 H 473) */}
        <div className="w-[508px] h-[473px] flex-shrink-0 grid grid-cols-2 gap-[11px] relative">
           <div className="space-y-[11px]">
              <div className="relative w-[248px] h-[205px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-1.png" alt="Mahar 1" fill className="object-cover" />
              </div>
              <div className="relative w-[188px] h-[252px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl ml-auto">
                 <Image src="/images/mahar-items/mahar-3.png" alt="Mahar 3" fill className="object-cover" />
              </div>
           </div>
           <div className="space-y-[11px]">
              <div className="relative w-[188px] h-[258px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-2.png" alt="Mahar 2" fill className="object-cover" />
              </div>
              <div className="relative w-[248px] h-[188px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-4.png" alt="Mahar 4" fill className="object-cover" />
              </div>
           </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 pt-10 md:pt-[20px] text-center md:text-left">
          <h2 className="text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-[65px] antialiased">
            <span className="text-[56px]">F</span>rame <span className="text-[56px]">M</span>ahar
          </h2>
          <div className="max-w-[568px] mx-auto md:mx-0 mb-[40px]">
            <p className="text-white font-nav text-[16px] leading-[30px] tracking-normal outline-none">
              Menghadirkan mahar pernikahan yang dapat kamu simpan selamanya. Bebas request warna sesuai dengan tema pernikahanmu. Pengiriman dari <span className="font-bold">Tangerang</span> tersedia melalui Paxel maupun Gosend untuk layanan instan.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <button className="btn-gold w-[210px] h-[50px] flex items-center justify-center gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
              <span className="text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">Selengkapnya</span>
              <ArrowRight size={20} className="text-[#161616] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
