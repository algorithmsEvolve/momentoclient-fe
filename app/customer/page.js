import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Customer | Momento Project",
  description: "Halaman Customer Momento Project sedang dalam pengembangan.",
};

export default function CustomerPage() {
  return (
    <main className="bg-[#090909] min-h-screen relative flex flex-col">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none" />
      
      <Navbar />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center mt-[100px] mb-[100px] min-h-[60vh]">
        <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-8 opacity-80 animate-pulse">
          <Image 
            src="/images/momento-logo.png" 
            alt="Momento" 
            fill 
            className="object-contain"
          />
        </div>
        
        <h1 className="text-[32px] md:text-[56px] font-serif font-bold text-transparent bg-clip-text mb-4 tracking-[-1px] uppercase"
            style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)" }}>
          On Progress
        </h1>
        
        <p className="text-white font-montserrat text-[14px] md:text-[18px] max-w-[500px] mb-12 leading-relaxed">
          Sistem portal Customer kami saat ini sedang dibangun untuk memberikan kemudahan pelayanan yang lebih baik. Silakan cek kembali nanti!
        </p>
        
        <Link 
          href="/" 
          className="btn-gold h-[50px] px-8 flex items-center justify-center rounded-[10px] text-[14px] font-bold font-nav tracking-[0.5px] text-[#161616] transition-all duration-300 hover:brightness-110 antialiased uppercase"
        >
          Kembali ke Beranda
        </Link>
      </div>

      <Footer />
    </main>
  );
}
