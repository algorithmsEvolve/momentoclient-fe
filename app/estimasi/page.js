import EstimationContainer from "@/components/features/estimation/EstimationContainer";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Estimasi Harga | Momento Project",
  description: "Hitung estimasi harga layanan Momento Project dengan mudah dan cepat.",
};

export default function EstimationPage() {
  return (
    <div className="relative min-h-screen bg-[#010101] selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none z-0" />
      
      <main className="relative z-10 pt-[80px]">
        <EstimationContainer />
      </main>

      <Footer />
    </div>
  );
}
