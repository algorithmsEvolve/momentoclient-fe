import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PricingContent from "@/components/features/pricing/PricingContent";
import ExtraBanner from "@/components/ui/ExtraBanner";
import { Suspense } from "react";
import { getPricingContent } from "@/lib/api/siteContent";

export async function generateMetadata() {
  const { content } = await getPricingContent();
  const title = content?.seo?.title || "Pricelist | Momento Project";
  const description =
    content?.seo?.description ||
    "Daftar harga produk dan layanan Momento Project - Sewa Seserahan, Mahar, Undangan Digital, dan lainnya.";
  const ogImageUrl = content?.seo?.ogImageUrl;

  return {
    title,
    description,
    openGraph: ogImageUrl ? { images: [ogImageUrl] } : undefined,
  };
}

export default async function PricingPage() {
  const { content } = await getPricingContent();
  const banner = content?.extraBanner || {};

  return (
    <div className="relative min-h-screen bg-[#010101] selection:bg-[#D4AF37]/30 selection:text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none z-0" />

      <Navbar />

      <div className="relative z-10 flex flex-col pt-10">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center text-white/50 font-montserrat">
              Loading pricelist...
            </div>
          }
        >
          <PricingContent content={content} />
        </Suspense>

        <div className="mt-10 md:mt-20">
          <ExtraBanner
            showDecoration={banner.showDecoration !== false}
            title={banner.title}
            buttonText={banner.buttonText}
            buttonHref={banner.buttonHref}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
