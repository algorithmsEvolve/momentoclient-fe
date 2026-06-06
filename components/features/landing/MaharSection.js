import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeDefaults } from "@/lib/site-content/homeDefaults";
import MaharImageCollage from "./MaharImageCollage";

export default function MaharSection({ content = {} }) {
  const c = { ...homeDefaults.mahar, ...content };

  const titleText = c.title || 'Frame Mahar';
  const titleParts = titleText.split(' ');

  return (
    <section className="relative bg-[#161616] min-h-[600px] flex items-center overflow-hidden z-20 pt-4 pb-10 md:py-[100px]">
      {/* Top Blend Gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090909] to-transparent z-10 pointer-events-none" />
      
      {/* Bottom Blend Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090909] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-[30px] md:gap-[50px] px-6 md:px-10 w-full relative z-20">
        
        <MaharImageCollage images={c.images} />



        {/* Text Content - Order 1 on Mobile, 2 on Desktop */}
        <div className="w-full md:flex-1 text-center md:text-left order-1 md:order-2">
          <h2 className="text-[24px] md:text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-tight md:leading-[65px] antialiased uppercase md:normal-case">
            <span className="md:text-[56px]">{titleParts[0]?.charAt(0) || 'F'}</span>{titleParts[0]?.slice(1) || 'rame'}{' '}
            {titleParts[1] && <><span className="md:text-[56px]">{titleParts[1].charAt(0)}</span>{titleParts[1].slice(1)}</>}
          </h2>
          <div className="max-w-[280px] md:max-w-[568px] mx-auto md:mx-0 mb-[30px] md:mb-[40px]">
            <p className="text-white font-nav text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] tracking-normal outline-none" dangerouslySetInnerHTML={{ __html: c.description || '' }} />
          </div>
          <div className="flex justify-center md:justify-start">
            <Link href={c.cta?.href || '/harga?category=mahar'} className="btn-gold w-auto h-[36px] md:w-[210px] md:h-[50px] px-6 md:px-0 flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">
              <span className="text-[10px] md:text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">{c.cta?.label || 'Selengkapnya'}</span>
              <ArrowRight size={14} className="text-[#161616] md:hidden transition-transform group-hover:translate-x-1" />
              <ArrowRight size={20} className="text-[#161616] hidden md:block transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

    </section>

  );
}
