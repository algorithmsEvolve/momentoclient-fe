import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HighlightSection() {
  const extras = [
    {
      title: "Wedding Keepsake",
      desc: "Properti pernikahan seperti vow, surat, amplop, dsb. yang dapat disimpan sebagai kenangan dan dokumentasi",
      img: "/images/extras/keepsake.png",
    },
    {
      title: "Flower Bouqet",
      desc: "Buket bunga untuk pengantin wanita yang dibawa selama acara pernikahan, dan dapat disesuaikan dengan tema",
      img: "/images/extras/bouqet.png",
    },
    {
      title: "Wedding Content Creator",
      desc: "Jasa pembuatan konten selama acara menggunakan iphone, yang siap dibagikan ke media sosial secara lifetime",
      img: "/images/extras/wcc.png",
    },
    {
      title: "Master of Ceremony",
      desc: "Jasa pembawa acara yang memandu jalannya acara lamaran, dan memastikan acara berjalan dengan lancar",
      img: "/images/extras/mc.png",
    },
  ];

  return (
    <section
      className="relative pt-[60px] md:pt-[60px] pb-[69px] flex flex-col items-center justify-center overflow-hidden z-20"
      style={{ background: "#161616" }}
    >
      {/* Top Blend Gradient from InvitationSection (#090909) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090909] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 text-center w-full relative z-20">
        <h2
          className="text-[24px] md:text-[48px] font-serif font-bold mb-[15px] tracking-[-1px] leading-tight md:leading-[65px] antialiased text-white uppercase"
        >
          <span className="md:text-[56px]">M</span>ore <span className="md:text-[56px]">E</span>xtras!
        </h2>
        <p className="text-white font-nav text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] tracking-normal mb-8 md:mb-[50px] max-w-[300px] md:max-w-[860px] mx-auto">
          Selain layanan dan produk utama, Momento juga menyediakan berbagai pelengkap pernikahan untuk menyempurnakan hari spesialmu
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[20px] mb-[37px]">
          {extras.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#050505] px-3 py-4 md:px-[25px] md:py-[30px] rounded-[15px] md:rounded-[20px] flex flex-col items-center text-center transition-all duration-300 hover:translate-y-[-10px] border border-white/10"
            >
              <div className="relative w-full aspect-[134/100] md:aspect-[4/3] rounded-[10px] overflow-hidden mb-4 md:mb-[30px]">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3
                className="text-transparent bg-clip-text text-[12px] md:text-[18px] font-bold font-nav mb-2 md:mb-[10px] tracking-normal leading-tight md:leading-normal"
                style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}
              >
                {item.title}
              </h3>
              <p className="text-white text-[10px] md:text-[14px] leading-[16px] md:leading-[22px] font-nav font-normal opacity-80 md:opacity-100">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/harga"
            className="btn-gold w-auto h-[36px] md:w-[210px] md:h-[50px] px-6 md:px-0 flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased"
          >
            <span className="text-[#010101] text-[10px] md:text-[14px] font-nav font-semibold tracking-[0.5px]">Selengkapnya</span>
            <ArrowRight size={14} className="text-[#010101] md:hidden transition-transform group-hover:translate-x-1" />
            <ArrowRight size={20} className="text-[#010101] hidden md:block transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>

  );
}
