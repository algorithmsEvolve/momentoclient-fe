"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { 
  ShieldCheck, 
  Crown, 
  Star, 
  Settings, 
  RefreshCw,
  MessageCircle,
  ArrowRight
} from "lucide-react";

export default function Home() {
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
        // Pause after full text is typed
        setTypingSpeed(5000);
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        // Reset after deleting
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        // Normal typing/deleting speed
        setTypingSpeed(isDeleting ? 40 : 100);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed]);

  return (
    <div className="relative min-h-screen bg-[#010101] overflow-hidden selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
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

      {/* Feature Section (Gold Background) */}
      <section className="relative grad-gold min-h-[700px] flex items-center py-20 px-10 z-20">
        <div className="max-w-[1240px] mx-auto text-center w-full">
          {/* Top Row: 3 Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-[20px] mb-[40px] w-full">
            <div className="feature-card w-[392px] h-[250px] min-w-[392px] max-w-[392px]">
              <Image src="/icons/why/authentic.svg" alt="Authentic" width={40} height={40} className="object-contain" />
              <h3 className="text-[20px] font-bold text-white mt-[10px] mb-[20px] font-nav tracking-normal">Authentic</h3>
              <p className="text-[14px] leading-[22px] text-white font-nav font-normal tracking-normal">
                Momento memberikan sentuhan original di setiap desain, khusus buat Kamu agar beda dari yang lain.
              </p>
            </div>
            <div className="feature-card w-[392px] h-[250px] min-w-[392px] max-w-[392px]">
              <Image src="/icons/why/professional.svg" alt="Professional" width={40} height={40} className="object-contain" />
              <h3 className="text-[20px] font-bold text-white mt-[10px] mb-[20px] font-nav tracking-normal">Professional</h3>
              <p className="text-[14px] leading-[22px] text-white font-nav font-normal tracking-normal">
                Dibuat oleh tim berpengalaman, Momento berkomitmen memberikan hasil sesuai dengan keinginan Kamu.
              </p>
            </div>
            <div className="feature-card w-[392px] h-[250px] min-w-[392px] max-w-[392px]">
              <Image src="/icons/why/as-you-wish.svg" alt="As You Wish" width={40} height={40} className="object-contain" />
              <h3 className="text-[20px] font-bold text-white mt-[10px] mb-[20px] font-nav tracking-normal">As You Wish</h3>
              <p className="text-[14px] leading-[22px] text-white font-nav font-normal tracking-normal">
                Produk Momento dirancang sesuai keinginan Kamu. Dipastikan semua detail pas seperti yang Kita sepakati.
              </p>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="flex flex-col md:flex-row justify-center gap-[20px] w-full">
            <div className="feature-card w-[392px] h-[250px] min-w-[392px] max-w-[392px]">
              <Image src="/icons/why/responsive.svg" alt="Responsive" width={40} height={40} className="object-contain" />
              <h3 className="text-[20px] font-bold text-white mt-[10px] mb-[20px] font-nav tracking-normal">Responsive</h3>
              <p className="text-[14px] leading-[22px] text-white font-nav font-normal tracking-normal">
                Kamu ngga perlu khawatir, Momento siap bantu Kamu kapan pun. Tanya apa saja, dipastikan pengalamanmu bareng Momento lancar hingga hari H.
              </p>
            </div>
            <div className="feature-card w-[392px] h-[250px] min-w-[392px] max-w-[392px]">
              <Image src="/icons/why/up-to-date.svg" alt="Up-to-date" width={40} height={40} className="object-contain" />
              <h3 className="text-[20px] font-bold text-white mt-[10px] mb-[20px] font-nav tracking-normal">Up-to-date</h3>
              <p className="text-[14px] leading-[22px] text-white font-nav font-normal tracking-normal">
                Kami nggak mau momenmu terlihat membosankan. Makanya, Momento selalu bikin desain yang fresh agar acaramu tetap kekinian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seserahan Section */}
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

      {/* Main Content (Black Background) */}
      {/* Frame Mahar Section */}
      <section className="relative bg-[#090909] min-h-[600px] flex items-center py-[63.5px] z-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-[50px] px-10">
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

      {/* Other Features Section */}
      <section className="relative z-20 py-32 space-y-48">
        {/* Undangan Digital */}
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row-reverse items-center gap-20">
          <div className="flex-1 flex justify-center relative scale-110">
             <div className="relative w-48 h-96 rounded-3xl border-4 border-[#1a1a1a] overflow-hidden z-20 shadow-2xl rotate-[-5deg] -mr-8">
                <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400" alt="Invite 1" fill className="object-cover" />
             </div>
             <div className="relative w-48 h-96 rounded-3xl border-4 border-[#1a1a1a] overflow-hidden z-10 shadow-2xl translate-y-10">
                <Image src="https://images.unsplash.com/photo-1549416864-68841621fc42?q=80&w=400" alt="Invite 2" fill className="object-cover" />
             </div>
             <div className="relative w-48 h-96 rounded-3xl border-4 border-[#1a1a1a] overflow-hidden z-0 shadow-2xl rotate-[5deg] -ml-8 translate-y-20">
                <Image src="https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=400" alt="Invite 3" fill className="object-cover" />
             </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 uppercase tracking-wider">Undangan Digital</h2>
            <p className="text-gray-medium text-sm leading-relaxed mb-12">
              Bagikan momen bahagia Anda dengan undangan digital interaktif yang eksklusif, dilengkapi musik dan animasi yang memukau.
            </p>
            <button className="btn-gold">Lihat Selengkapnya</button>
          </div>
        </div>

        {/* More Extras */}
        <div className="max-w-7xl mx-auto px-10 text-center">
           <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 uppercase tracking-wider">More Extras!</h2>
           <p className="text-gray-medium text-sm mb-20">Layanan tambahan untuk menyempurnakan setiap detail acara Anda.</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
             {[
               { title: 'Wedding Keepsake', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400' },
               { title: 'Handbouquet', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400' },
               { title: 'Money Bouquet', img: 'https://images.unsplash.com/photo-1518131394551-99af54cc643c?q=80&w=400' },
               { title: 'Snack Bouquet', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400' }
             ].map((item, i) => (
               <div key={i} className="group">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-white/5">
                    <Image src={item.img} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{item.title}</h3>
               </div>
             ))}
           </div>
           <button className="btn-gold">Lihat Selengkapnya</button>
        </div>

        {/* Testimonials (Apa Kata Mereka?) */}
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div>
              <div className="text-[#D4AF37] mb-8">
                <svg width="60" height="60" viewBox="0 0 60 44" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.895 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H16.017C14.912 8 14.017 7.105 14.017 6V3L20.017 3C21.122 3 22.017 3.895 22.017 5V15C22.017 18.314 19.331 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.895 3.912 16 5.017 16H8.017C8.569 16 9.017 15.552 9.017 15V9C9.017 8.448 8.569 8 8.017 8H5.017C3.912 8 3.017 7.105 3.017 6V3L9.017 3C10.122 3 11.017 3.895 11.017 5V15C11.017 18.314 8.331 21 5.017 21H3.017Z" /></svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-12 leading-tight">Apa Kata Mereka?</h2>
              
              <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                {[
                  { label: 'Happy Clients', value: '200+' },
                  { label: 'Trust Vendor', value: '50+' },
                  { label: 'Years Experience', value: '25+' },
                  { label: 'Project Done', value: '1500+' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
           </div>
           <div className="space-y-6">
              {[
                { name: 'Sarah & Rezky', text: '“Sewa seserahannya bagus banget, box nya kokoh dan dekorasinya estetik parah!”', date: 'Jan 2024' },
                { name: 'Aditya & Putri', text: '“Frame mahar nya rapih banget, pengerjaannya cepet dan sesuai ekspektasi.”', date: 'Feb 2024' },
                { name: 'Rinaldi & Siska', text: '“Undangan digitalnya smooth banget, tamu-tamu pada muji desainnya eksklusif.”', date: 'Mar 2024' }
              ].map((testi, i) => (
                <div key={i} className="bg-[#0D0D0D] p-8 rounded-2xl border border-white/5 relative group">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider">{testi.name}</h4>
                        <span className="text-[10px] text-white/30">{testi.date}</span>
                      </div>
                   </div>
                   <p className="text-sm text-white/60 leading-relaxed italic">{testi.text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pre-footer Banner */}
      <section className="relative py-48 bg-[#D4AF37] overflow-hidden">
        {/* Wavy transition from black to gold */}
        <div className="absolute top-0 left-0 w-full fill-black leading-[0] scale-y-[-1]">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240" preserveAspectRatio="none" className="w-full h-[150px] md:h-[200px]">
             <path d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,58.7C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-10 text-center">
           <p className="text-black font-medium text-sm md:text-lg mb-12 leading-relaxed italic">
             Abadikan setiap detik berharga dengan sentuhan artistik dan kemewahan yang tak lekang oleh waktu. 
             Dari seserahan hingga mahar, kami hadir untuk mewujudkan pernikahan impian Anda.
           </p>
           <button className="px-12 py-4 bg-black text-[#D4AF37] font-bold rounded-full hover:scale-105 transition-transform tracking-widest text-xs uppercase">
             Cek Pricelist
           </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20">
           <div className="max-w-sm">
              <div className="text-[#D4AF37] font-bold text-3xl mb-8 tracking-tighter italic">MOMENTO</div>
              <p className="text-white/40 text-xs leading-relaxed">
                Kami adalah partner terbaik untuk setiap momen spesial Anda. Menghadirkan kualitas premium 
                dalam setiap detail seserahan, mahar, dan undangan.
              </p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
             <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Services</h4>
                <ul className="space-y-4 text-[10px] text-white/50 uppercase tracking-widest">
                  <li><Link href="#">Seserahan</Link></li>
                  <li><Link href="#">Mahar</Link></li>
                  <li><Link href="#">Undangan</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Company</h4>
                <ul className="space-y-4 text-[10px] text-white/50 uppercase tracking-widest">
                  <li><Link href="#">About</Link></li>
                  <li><Link href="#">Portfolio</Link></li>
                  <li><Link href="#">Contact</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Contact</h4>
                <p className="text-[10px] text-white/50 leading-loose">
                  hello@momento.com<br/>
                  +62 812 3456 7890
                </p>
             </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 mt-20">
           <p className="text-[10px] text-white/20 tracking-widest uppercase">© 2024 Momento. All rights reserved.</p>
           <div className="flex gap-8 text-[10px] text-white/20 tracking-widest uppercase">
             <Link href="#">Privacy Policy</Link>
             <Link href="#">Terms & Conditions</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
