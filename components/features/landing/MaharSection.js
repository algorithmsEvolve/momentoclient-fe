import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MaharSection() {
  return (
    <section className="relative bg-[#161616] min-h-[600px] flex items-center overflow-hidden z-20 py-20 md:py-[100px]">
      {/* Top Blend Gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090909] to-transparent z-10 pointer-events-none" />
      
      {/* Bottom Blend Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090909] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-[30px] md:gap-[50px] px-6 md:px-10 w-full relative z-20">
        
        {/* Image Grid Collage - Order 2 on Mobile, 1 on Desktop */}
        <div className="w-full max-w-[320px] md:max-w-none md:w-[508px] flex-shrink-0 grid grid-cols-2 gap-[11px] relative order-2 md:order-1 px-4 md:px-0">
           {/* Column 1 */}
           <div className="flex flex-col gap-[11px]">
              <div className="relative w-full aspect-[152/126] md:w-[248px] md:h-[205px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-1.png" alt="Mahar 1" fill className="object-cover" />
              </div>
              <div className="relative w-[75%] md:w-[188px] ml-auto aspect-[115/155] md:h-[252px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-3.png" alt="Mahar 3" fill className="object-cover" />
              </div>
           </div>
           {/* Column 2 */}
           <div className="flex flex-col gap-[11px] pt-4 md:pt-0">
              <div className="relative w-[76%] md:w-[188px] aspect-[116/157] md:h-[258px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-2.png" alt="Mahar 2" fill className="object-cover" />
              </div>
              <div className="relative w-full aspect-[152/126] md:w-[248px] md:h-[188px] rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
                 <Image src="/images/mahar-items/mahar-4.png" alt="Mahar 4" fill className="object-cover" />
              </div>
           </div>
        </div>



        {/* Text Content - Order 1 on Mobile, 2 on Desktop */}
        <div className="w-full md:flex-1 text-center md:text-left order-1 md:order-2">
          <h2 className="text-[24px] md:text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-tight md:leading-[65px] antialiased uppercase md:normal-case">
            <span className="md:text-[56px]">F</span>rame <span className="md:text-[56px]">M</span>ahar
          </h2>
          <div className="max-w-[280px] md:max-w-[568px] mx-auto md:mx-0 mb-[30px] md:mb-[40px]">
            <p className="text-white font-nav text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] tracking-normal outline-none">
              Menghadirkan mahar pernikahan yang dapat kamu simpan selamanya. Bebas request warna sesuai dengan tema pernikahanmu. Pengiriman dari <span className="font-bold">Tangerang</span> tersedia melalui Paxel maupun Gosend untuk layanan instan.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <Link href="/harga" className="btn-gold w-auto h-[36px] md:w-[210px] md:h-[50px] px-6 md:px-0 flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
              <span className="text-[10px] md:text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">Selengkapnya</span>
              <ArrowRight size={14} className="text-[#161616] md:hidden transition-transform group-hover:translate-x-1" />
              <ArrowRight size={20} className="text-[#161616] hidden md:block transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

    </section>

  );
}
