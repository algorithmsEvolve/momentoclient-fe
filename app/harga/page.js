import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PricingContent from "@/components/features/pricing/PricingContent";
import ExtraBanner from "@/components/ui/ExtraBanner";
import { Suspense } from "react";

export const metadata = {
  title: "Pricelist | Momento Project",
  description: "Daftar harga produk dan layanan Momento Project - Sewa Seserahan, Mahar, Undangan Digital, dan lainnya.",
};

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[#010101] selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Background Subtle Gradient - Fixed to stay in place while scrolling */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none z-0" />
      
      <Navbar />
      
      <div className="relative z-10 flex flex-col pt-10">
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-white/50 font-montserrat">Loading pricelist...</div>}>
          <PricingContent />
        </Suspense>
        
        {/* Spacing for ExtraBanner to align with design expectations */}
        <div className="mt-10 md:mt-20">
          <ExtraBanner 
            showDecoration={true}
            title="Penasaran dengan estimasi harga untuk kebutuhanmu? Klik tombol di bawah dan mulai hitung sekarang."
            buttonText="HITUNG ESTIMASI HARGA"
            buttonHref="/estimasi"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
