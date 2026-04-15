import Image from "next/image";
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
      className="relative pt-[60px] pb-[69px] flex flex-col items-center justify-center overflow-hidden z-20"
      style={{ background: "#161616" }}
    >
      {/* Top Blend Gradient from InvitationSection (#090909) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090909] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-10 text-center w-full relative z-20">
        <h2
          className="text-[48px] font-serif font-bold mb-[15px] tracking-[-1px] leading-[65px] antialiased text-white"
        >
          <span className="text-[56px]">M</span>ORE <span className="text-[56px]">E</span>XTRAS!
        </h2>
        <p className="text-white font-nav text-[16px] leading-[30px] tracking-normal mb-[50px] max-w-[860px] mx-auto">
          Selain layanan dan produk utama, Momento juga menyediakan berbagai pelengkap pernikahan untuk menyempurnakan hari spesialmu
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[37px]">
          {extras.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#010101] px-[25px] py-[30px] rounded-[20px] flex flex-col items-center text-center transition-all duration-300 hover:translate-y-[-10px] border border-white/10"
            >
              <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden mb-[30px]">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3
                className="text-transparent bg-clip-text text-[18px] font-bold font-nav mb-[10px] tracking-normal"
                style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}
              >
                {item.title}
              </h3>
              <p className="text-white text-[14px] leading-[22px] font-nav font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="w-[210px] h-[50px] flex items-center justify-center gap-[10px] rounded-[10px] transition-all duration-300 hover:brightness-110 group antialiased"
            style={{
              background: "linear-gradient(90deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            }}
          >
            <span className="text-[#010101] text-[14px] font-nav font-semibold tracking-[0.5px]">Selengkapnya</span>
            <ArrowRight size={20} className="text-[#010101] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
