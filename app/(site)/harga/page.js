"use client";

import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import Image from "next/image";

// ─── [DISABLED] Original server component pricelist page ───
// import PricingContent from "@/components/features/pricing/PricingContent";
// import ExtraBanner from "@/components/ui/ExtraBanner";
// import { Suspense } from "react";
// import { getPricingContent } from "@/lib/api/siteContent";
//
// export async function generateMetadata() {
//   const { content } = await getPricingContent();
//   const title = content?.seo?.title || "Pricelist | Momento Project";
//   const description =
//     content?.seo?.description ||
//     "Daftar harga produk dan layanan Momento Project - Sewa Seserahan, Mahar, Undangan Digital, dan lainnya.";
//   const ogImageUrl = content?.seo?.ogImageUrl;
//
//   return {
//     title,
//     description,
//     openGraph: ogImageUrl ? { images: [ogImageUrl] } : undefined,
//   };
// }
//
// export default async function PricingPage() {
//   const { content } = await getPricingContent();
//   const banner = content?.extraBanner || {};
//
//   return (
//     <div className="relative min-h-screen bg-[#010101] selection:bg-[#D4AF37]/30 selection:text-white">
//       <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none z-0" />
//
//       <Navbar />
//
//       <div className="relative z-10 flex flex-col pt-10">
//         <Suspense
//           fallback={
//             <div className="min-h-[50vh] flex items-center justify-center text-white/50 font-montserrat">
//               Loading pricelist...
//             </div>
//           }
//         >
//           <PricingContent content={content} />
//         </Suspense>
//
//         <div className="mt-10 md:mt-20">
//           <ExtraBanner
//             showDecoration={banner.showDecoration !== false}
//             title={banner.title}
//             buttonText={banner.buttonText}
//             buttonHref={banner.buttonHref}
//           />
//         </div>
//       </div>
//
//       <Footer />
//     </div>
//   );
// }
// ─── [/DISABLED] ───

const WA_LINK = "https://wa.me/message/ZD27PNJNNSFNF1";

export default function HargaPage() {
  useEffect(() => {
    window.location.href = WA_LINK;
  }, []);

  return (
    <main className="bg-[#090909] min-h-screen relative flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-b from-[#090909] via-[#010101] to-[#090909] pointer-events-none" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center mt-[100px] mb-[100px] min-h-[60vh]">
        <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-8 opacity-80 animate-pulse">
          <Image src="/images/momento-logo.png" alt="Momento" fill className="object-contain" />
        </div>

        <h1
          className="text-[32px] md:text-[56px] font-serif font-bold text-transparent bg-clip-text mb-4 tracking-[-1px] uppercase"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #D4AF37 0%, #CF953C 25%, #D4AF37 68%, #CF953C 100%)",
          }}
        >
          On Progress
        </h1>

        <p className="text-white font-montserrat text-[14px] md:text-[18px] max-w-[500px] mb-12 leading-relaxed">
          Halaman harga sedang dalam pengembangan. Anda akan diarahkan ke WhatsApp kami.
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
