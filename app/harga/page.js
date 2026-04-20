import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PricingContent from "@/components/features/pricing/PricingContent";
import ExtraBanner from "@/components/ui/ExtraBanner";

export const metadata = {
  title: "Pricelist | Momento Project",
  description: "Daftar harga produk dan layanan Momento Project - Sewa Seserahan, Mahar, Undangan Digital, dan lainnya.",
};

export default function PricingPage() {
  return (
    <main className="bg-[#090909] min-h-screen relative">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none" />
      
      <Navbar />
      
      <div className="relative z-10 flex flex-col pt-10">
        <PricingContent />
        
        <div className="mt-[180px] md:mt-[250px]">
          <ExtraBanner 
            showDecoration={true}
            title="Penasaran dengan estimasi harga untuk kebutuhanmu? Klik tombol di bawah dan mulai hitung sekarang."
            buttonText="HITUNG ESTIMASI HARGA"
            buttonHref="/estimasi"
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
