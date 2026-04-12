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
          <div className="relative bg-[#47AE4B] text-white p-4 rounded-full shadow-2xl transition-transform duration-300 hover:scale-110">
            <MessageCircle size={32} fill="currentColor" />
          </div>
        </div>

        <div className="relative z-10 max-w-[925px] mx-auto flex flex-col items-center">
          <div className="min-h-[150px] flex items-center justify-center mb-10">
            <h1 className="text-[48px] font-bold tracking-[-1px] leading-[65px] font-serif antialiased text-white whitespace-pre-line">
              {text}
              <span className="inline-block w-[3px] h-[45px] bg-white ml-2 animate-pulse align-middle" />
            </h1>
          </div>

          <div className="flex flex-col gap-4 text-[14px] md:text-[18px] font-medium text-white/80 mb-16 leading-tight font-nav antialiased">
            <div className="flex flex-wrap justify-center gap-[15px]">
              <span>Sewa Seserahan</span>
              <span className="text-white/20">|</span>
              <span>Frame Mahar</span>
              <span className="text-white/20">|</span>
              <span>Undangan Digital</span>
              <span className="text-white/20">|</span>
              <span>Flower Bouquet</span>
              <span className="text-white/20">|</span>
              <span>Wedding Keepsake</span>
            </div>
            <div className="flex flex-wrap justify-center gap-[15px]">
              <span>Wedding Content Creator</span>
              <span className="text-white/20">|</span>
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
      <section className="relative grad-gold py-32 px-10 z-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="feature-card">
              <ShieldCheck className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Authentic</h3>
              <p className="text-white/40 text-xs leading-relaxed">Kami menjamin keaslian dan kualitas bahan terbaik untuk setiap produk kami.</p>
            </div>
            <div className="feature-card">
              <Crown className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Professional</h3>
              <p className="text-white/40 text-xs leading-relaxed">Tim ahli berpengalaman yang berdedikasi tinggi untuk kepuasan momen Anda.</p>
            </div>
            <div className="feature-card">
              <Star className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Purity Style</h3>
              <p className="text-white/40 text-xs leading-relaxed">Desain bersih dan elegan yang memberikan kesan suci dan berkelas.</p>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="feature-card flex-1">
              <RefreshCw className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Responsiveness</h3>
              <p className="text-white/40 text-xs leading-relaxed">Layanan cepat tanggap untuk mewujudkan setiap keinginan spesial Anda.</p>
            </div>
            <div className="feature-card flex-1">
              <Settings className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Up-to-date</h3>
              <p className="text-white/40 text-xs leading-relaxed">Selalu menghadirkan tren desain terbaru yang modern dan inovatif.</p>
            </div>
          </div>

          {/* Transition back to black */}
          <div className="absolute -bottom-1 left-0 w-full fill-black">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240" preserveAspectRatio="none" className="w-full h-[150px] md:h-[200px]">
               <path d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,58.7C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
             </svg>
          </div>
        </div>
      </section>

      {/* Main Content (Black Background) */}
      <section className="relative z-20 py-32 space-y-48">
        
        {/* Sewa Seserahan */}
        <div className="max-w-7xl mx-auto px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 uppercase tracking-wider">Sewa Seserahan</h2>
          <p className="text-gray-medium text-xs md:text-sm max-w-3xl mx-auto mb-16 leading-relaxed">
            Menghadirkan kotak hantaran eksklusif dengan sentuhan dekorasi bunga yang memukau untuk melengkapi prosesi lamaran dan pernikahan Anda.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-20 overflow-x-auto pb-8 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group min-w-[150px]">
                <Image 
                   src={`https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop`}
                   alt="Seserahan"
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
          
          <button className="btn-gold">Lihat Selengkapnya</button>
        </div>

        {/* Frame Mahar */}
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <Image src="https://images.unsplash.com/photo-1544928147-7972fc64fa36?q=80&w=400" alt="Mahar 1" fill className="object-cover" />
             </div>
             <div className="space-y-4 pt-12">
               <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1518131394551-99af54cc643c?q=80&w=400" alt="Mahar 2" fill className="object-cover" />
               </div>
               <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400" alt="Mahar 3" fill className="object-cover" />
               </div>
             </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 uppercase tracking-wider">Frame Mahar</h2>
            <p className="text-gray-medium text-sm leading-relaxed mb-12">
              Bingkai mahar custom yang artistik untuk mengabadikan persembahan cinta terbaik Anda dalam balutan desain modern dan elegan.
            </p>
            <button className="btn-gold">Lihat Selengkapnya</button>
          </div>
        </div>

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
