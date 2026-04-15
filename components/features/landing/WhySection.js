import Image from "next/image";

export default function WhySection() {
  return (
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
  );
}
