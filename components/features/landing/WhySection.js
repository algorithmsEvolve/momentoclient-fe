import Image from "next/image";

export default function WhySection() {
  return (
    <section className="relative grad-gold min-h-[600px] flex items-center py-12 md:py-20 px-4 md:px-10 z-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto text-center w-full">
        {/* Top Row: Authentic, Professional, As You Wish */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-2 md:gap-[20px] mb-2 md:mb-[40px] w-full">
          {/* Card 1: Authentic */}
          <div className="feature-card col-span-1 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px]">
            <Image src="/icons/why/authentic.svg" alt="Authentic" width={24} height={24} className="object-contain mx-auto mb-[5px]" />
            <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">Authentic</h3>
            <p className="text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal">
              Momento memberikan sentuhan original di setiap desain, khusus buat Kamu agar beda dari yang lain.
            </p>
          </div>
          {/* Card 2: Professional */}
          <div className="feature-card col-span-1 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px]">
            <Image src="/icons/why/professional.svg" alt="Professional" width={24} height={24} className="object-contain mx-auto mb-[5px]" />
            <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">Professional</h3>
            <p className="text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal">
              Dibuat oleh tim berpengalaman, Momento berkomitmen memberikan hasil sesuai dengan keinginan Kamu.
            </p>
          </div>
          {/* Card 3: As You Wish (Full width on mobile) */}
          <div className="feature-card col-span-2 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px]">
            <Image src="/icons/why/as-you-wish.svg" alt="As You Wish" width={24} height={24} className="object-contain mx-auto mb-[5px]" />
            <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">As You Wish</h3>
            <p className="text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal max-w-[320px] mx-auto">
              Produk Momento dirancang sesuai keinginan Kamu. Dipastikan semua detail pas seperti yang Kita sepakati.
            </p>
          </div>
        </div>

        {/* Bottom Row: Responsive, Up-to-date */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-2 md:gap-[20px] w-full">
          {/* Card 4: Responsive */}
          <div className="feature-card col-span-1 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px]">
            <Image src="/icons/why/responsive.svg" alt="Responsive" width={24} height={24} className="object-contain mx-auto mb-[5px]" />
            <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">Responsive</h3>
            <p className="text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal">
              Kamu ngga perlu khawatir, Momento siap bantu Kamu kapan pun. Tanya apa saja, dipastikan pengalamanmu bareng Momento lancar hingga hari H.
            </p>
          </div>
          {/* Card 5: Up-to-date */}
          <div className="feature-card col-span-1 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px]">
            <Image src="/icons/why/up-to-date.svg" alt="Up-to-date" width={24} height={24} className="object-contain mx-auto mb-[5px]" />
            <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">Up-to-date</h3>
            <p className="text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal">
              Kami nggak mau momenmu terlihat membosankan. Makanya, Momento selalu bikin desain yang fresh agar acaramu tetap kekinian.
            </p>
          </div>
        </div>
      </div>
    </section>


  );
}
