"use client";

import Image from "next/image";
import { Quote, Box, Users, Mail, Smartphone, Flower, SmartphoneIcon } from "lucide-react";

export default function TestimonySection() {
  const stats = [
    { icon: <Box size={24} />, value: "200+", label: "Tray Seserahan disewakan" },
    { icon: <Users size={24} />, value: "50+", label: "Pengantin telah mempercayakan kami" },
    { icon: <Mail size={24} />, value: "25+", label: "Undangan Digital dibuat" },
    { icon: <Smartphone size={24} />, value: "1500+", label: "Undangan telah disebarkan" },
    { icon: <Flower size={24} />, value: "25+", label: "Frame Mahar dirangkai" },
  ];

  const testimonies = [
    {
      name: "Itsna & Rizky",
      date: "Desember 2025",
      img: "/images/testimonies/testimony-pictures/itsna-rizky.png",
      text: "Saya sangat suka dengan layanan Momento untuk desain seserahan dan mahar pernikahan saya. Hasilnya rapi, detailnya terasa premium, dan sesuai dengan tema pernikahan kami. Keluarga dan tamu pun banyak yang memuji tampilannya. Selain itu, pelayanannya ramah, pengerjaannya tepat waktu, dan harganya sangat sebanding dengan kualitas yang diberikan. Untuk calon pengantin yang sedang mencari vendor seserahan dan mahar, saya sangat merekomendasikan Momento. 😊✨"
    },
    {
      name: "Shana & Danang",
      date: "Oktober 2025",
      img: "/images/testimonies/testimony-pictures/shana-danang.png",
      text: "Aku sangat merekomendasikan Momento ini untuk membantu kalian para pejuang halal yang ingin desain mahar, seserahan, dan undangan digital. Pengerjaannya sangat profesional dan apik bgt gess untuk harga paketan pun sangat terjangkau dan banyak free nya. Adminnya juga sangat komunikatif bgt kalau ada yang kurang atau perlu revisi dari kita. Terimakasih banyak Tim Momento 💓✨"
    },
    {
      name: "Rifa & Bayu",
      date: "Februari 2025",
      img: "/images/testimonies/testimony-pictures/rifa-bayu.png",
      text: "Hasilnya sangat bagus, rapi, dan sesuai yang diinginkan. Pelayanannya jg fast respon, cukup baik dan selalu merekomendasikan yg terbaik seperti apaaa. Thank you momento sudah mempercantik Seserahan, Bingkai Mahar, dan Undangan Digitalnya❤️ best!!!❤️️❤️️❤️️"
    },
    {
      name: "Ajeng & Tirta",
      date: "Desember 2024",
      img: "/images/testimonies/testimony-pictures/ajeng-tirta.png",
      text: "Hasilnya sangat bagus, rapi, dan sesuai yang diinginkan. Pelayanannya jg fast respon, cukup baik dan selalu merekomendasikan yg terbaik seperti apaaa. Thank you momento sudah mempercantik Seserahan, Bingkai Mahar, dan Undangan Digitalnya❤️ best!!!❤️️❤️️❤️️"
    },
    {
      name: "Chyntia & Bagus",
      date: "November 2024",
      img: "/images/testimonies/testimony-pictures/chyntia-bagus.png",
      text: "The best mahar frame that you can find ever. Best packaging, best price and best owner. Trust me!!! Hasilnya sesuai sama design yang udah disepakati dan yang kita mau. Beberapa kali ganti konsep/revisi tapi owner nya selalu usahakan yg terbaik. Highly recommended for all bride and groom who want mahar frame with premium results. Sukses selalu Momento"
    },
    {
      name: "Riri & Ari",
      date: "Mei 2024",
      img: "/images/testimonies/testimony-pictures/riri-ari.png",
      text: "Komunikatif dan sabar bgt. Undangan digital ku jadi cantik bgt sesuai dengan color pallete yg ku mau. Kotak seserahan dihias dengan sangat cantik dan rapi, banyak yg muji dan nanyain rent dimana. Rentnya disini ya guys!!! Dijamin rapi dan cantik sesuai tema yg kita mau. Makasih momento project, sukses terus yaaa!!!"
    },
    {
      name: "Viranda & Akbar",
      date: "November 2023",
      img: "/images/testimonies/testimony-pictures/viranda-akbar.png",
      text: "Pengerjaannya cepat, hasilnya bagus banget dan sesuai sama yang direquest, adminnya fast respon dan ramah, pelayanannya juga oke banget!"
    }
  ];

  return (
    <section className="relative bg-[#161616] min-h-[900px] py-24 flex items-center overflow-hidden z-20">
      {/* Blend Gradients removed to avoid clashing with HighlightSection (#161616) */}
      
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-start gap-16 px-10 w-full relative z-20">
        {/* Left Content */}
        <div className="flex-1 pt-10">
          <div className="mb-14 relative">
             <div className="absolute top-[-30px] -left-[61px] w-[95px] h-[71px] z-0">
              <Image 
                src="/images/testimonies/quote-mark.svg" 
                alt="Quote Icon" 
                fill 
                className="object-contain"
              />
            </div>
            <h2 className="text-[40px] font-nav font-bold text-white mb-[8px] tracking-[-0.05em] leading-[45px] antialiased relative z-10 origin-left scale-y-[0.9]">
              Apa Kata Mereka?
            </h2>
            <p className="text-white font-nav text-[18px] leading-[28px] opacity-80 max-w-[488px]">
              Dari mereka yang telah menggunakan jasa Momento sejak 2023.
            </p>
          </div>

          <div className="flex gap-[60px] items-start">
            {/* Left Stats Column (W: 275px) */}
            <div className="flex flex-col gap-[60px] w-[275px]">
              {[
                { icon: "/images/testimonies/icons/008-wedding gift.svg", value: "200+", label: "Tray Seserahan disewakan" },
                { icon: "/images/testimonies/icons/034-wedding invitation.svg", value: "25+", label: "Undangan Digital dibuat" },
                { icon: "/images/testimonies/icons/027-beverage.svg", value: "25+", label: "Frame Mahar dirangkai" },
              ].map((stat, i) => (
                <div key={i} className="flex gap-[21px] items-start">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0 mt-1">
                    <Image src={stat.icon} alt="icon" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <div 
                      className="text-[48px] font-nav font-bold tracking-[-0.05em] leading-none mb-1 text-transparent bg-clip-text origin-left scale-y-[0.85]"
                      style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[16px] font-nav font-medium text-white/90 leading-[22px] tracking-tight origin-left scale-y-[0.9]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Stats Column (W: 261px) */}
            <div className="flex flex-col gap-[100px] w-[261px] mt-[25px]">
              {[
                { icon: "/images/testimonies/icons/025-picture.svg", value: "50+", label: "Pengantin telah mempercayakan kami" },
                { icon: "/images/testimonies/icons/023-message.svg", value: "1500+", label: "Undangan telah disebarkan" },
              ].map((stat, i) => (
                <div key={i} className="flex gap-[21px] items-start">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0 mt-1">
                    <Image src={stat.icon} alt="icon" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <div 
                      className="text-[48px] font-nav font-bold tracking-[-0.05em] leading-none mb-1 text-transparent bg-clip-text origin-left scale-y-[0.85]"
                      style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[16px] font-nav font-medium text-white/90 leading-[22px] tracking-tight max-w-[200px] origin-left scale-y-[0.9]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Vertical Marquee */}
        <div className="flex-1 w-full h-[700px] relative overflow-hidden rounded-[30px] z-10">
          {/* Transition Overlays */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#161616] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#161616] to-transparent z-10 pointer-events-none" />
          
          <div className="flex flex-col animate-marquee-v-up-testimony">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex flex-col gap-6 pb-6">
                {testimonies.map((testi, i) => (
                  <div key={`${groupIdx}-${i}`} className="bg-[#0D0D0D] p-[30px] rounded-[25px] border border-white/5 flex flex-col gap-[20px] shadow-xl">
                    {/* Header: Name and Date */}
                    <div className="text-[#D4AF37] font-bold font-nav text-[16px] leading-[24px]">
                      {testi.name}, {testi.date}
                    </div>
                    
                    {/* Body: Avatar and Testimony Text */}
                    <div className="flex items-start gap-[15px]">
                      <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-[#D4AF37]/20 flex-shrink-0">
                        <Image src={testi.img} alt={testi.name} fill className="object-cover" />
                      </div>
                      <p className="text-white font-nav font-medium text-[14px] leading-[30px] antialiased">
                        {testi.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] z-30 pointer-events-none">
        <Image 
          src="/images/testimonies/testimony-bottom-decoration.png" 
          alt="Wave Decoration" 
          fill 
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
