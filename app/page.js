"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import OpeningSection from "@/components/features/landing/OpeningSection";
import WhySection from "@/components/features/landing/WhySection";
import SeserahanSection from "@/components/features/landing/SeserahanSection";
import MaharSection from "@/components/features/landing/MaharSection";
import InvitationSection from "@/components/features/landing/InvitationSection";
import HighlightSection from "@/components/features/landing/HighlightSection";
import TestimonySection from "@/components/features/landing/TestimonySection";
import ExtraBanner from "@/components/features/landing/ExtraBanner";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#010101] overflow-hidden selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <OpeningSection />
      
      <WhySection />

      <SeserahanSection />

      <MaharSection />

      {/* Main Content Sections Wrapper */}
      <section className="relative z-20 bg-[#090909]">
        <InvitationSection />
        
        <HighlightSection />

        <TestimonySection />
      </section>

      <ExtraBanner />

      <Footer />
    </div>
  );
}
