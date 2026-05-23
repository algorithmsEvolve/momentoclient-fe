import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import OpeningSection from "@/components/features/landing/OpeningSection";
import WhySection from "@/components/features/landing/WhySection";
import SeserahanSection from "@/components/features/landing/SeserahanSection";
import MaharSection from "@/components/features/landing/MaharSection";
import InvitationSection from "@/components/features/landing/InvitationSection";
import HighlightSection from "@/components/features/landing/HighlightSection";
import TestimonySection from "@/components/features/landing/TestimonySection";
import ExtraBanner from "@/components/ui/ExtraBanner";
import { getHomeContent } from "@/lib/api/siteContent";

export default async function Home() {
  const { content } = await getHomeContent();

  return (
    <div className="relative min-h-screen bg-[#010101] overflow-hidden selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <OpeningSection content={content.opening} />

      <WhySection content={content.why} />

      <SeserahanSection content={content.seserahan} />

      <MaharSection content={content.mahar} />

      <section className="relative z-20 bg-[#090909]">
        <InvitationSection content={content.invitation} />

        <HighlightSection content={content.highlight} />

        <TestimonySection content={content.testimony} />
      </section>

      <ExtraBanner
        showDecoration={false}
        isHomePage={true}
        title={content.extraBanner?.title}
        buttonText={content.extraBanner?.buttonText}
        buttonHref={content.extraBanner?.buttonHref}
      />

      <Footer />
    </div>
  );
}
