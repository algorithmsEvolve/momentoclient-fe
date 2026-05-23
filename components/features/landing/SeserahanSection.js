import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeDefaults } from "@/lib/site-content/homeDefaults";
import { getImageSrc } from "@/lib/site-content/image";

export default function SeserahanSection({ content = {} }) {
  const c = { ...homeDefaults.seserahan, ...content };
  const images = c.images?.length ? c.images : homeDefaults.seserahan.images;

  const titleText = c.title || 'Sewa seserahan';
  const titleParts = titleText.split(' ');
  const firstWord = titleParts[0];
  const restWords = titleParts.slice(1).join(' ');

  return (
    <section className="relative bg-[#090909] min-h-[500px] md:min-h-[650px] flex flex-col items-center pt-10 pb-4 md:py-20 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto text-center px-6 md:px-10">
        <h2 className="text-[24px] md:text-[48px] font-serif font-bold text-white mb-[15px] tracking-[-1px] leading-tight md:leading-[65px] antialiased uppercase md:normal-case">
          <span className="md:text-[56px]">{firstWord.charAt(0)}</span>{firstWord.slice(1)} {restWords.split(' ').map((word, i) => (
            <span key={i}>
              {i === 0 ? <span className="md:text-[56px]">{word.charAt(0)}</span> : <span className="md:text-[56px]">{word.charAt(0)}</span>}
              {i === 0 ? word.slice(1) : word.slice(1)}{' '}
            </span>
          ))}
        </h2>
        <div className="max-w-[280px] md:max-w-[860px] mx-auto mb-[30px] md:mb-[40px]">
          <p className="text-white font-nav text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] tracking-normal" dangerouslySetInnerHTML={{ __html: c.description || '' }} />
        </div>
      </div>

      {/* Infinite Running Images */}
      <div className="relative w-full mb-[30px] md:mb-[40px] flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-3 md:gap-5">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-3 md:gap-5">
              {images.map((img, id) => (
                <div key={`${groupIdx}-${id}`} className="relative w-[200px] h-[133px] md:w-[300px] md:h-[200px] flex-shrink-0 rounded-[10px] md:rounded-xl overflow-hidden shadow-2xl border border-white/5">
                  <Image
                    src={getImageSrc(img, `/images/seserahan-items/seserahan-${id + 1}.png`)}
                    alt={img.alt || `Seserahan ${id + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Link href={c.cta?.href || '/harga?category=seserahan'} className="btn-gold w-auto h-[36px] md:w-[210px] md:h-[50px] px-6 md:px-0 flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased">        <span className="text-[10px] md:text-[14px] font-nav font-semibold tracking-[0.5px] text-[#161616]">{c.cta?.label || 'Selengkapnya'}</span>
        <ArrowRight size={14} className="text-[#161616] md:hidden transition-transform group-hover:translate-x-1" />
        <ArrowRight size={20} className="text-[#161616] hidden md:block transition-transform group-hover:translate-x-1" />
      </Link>
    </section>

  );
}
