import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-20 py-[100px] px-10" style={{ background: "#090909" }}>
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        
        {/* Left Column: Brand & Description */}
        <div className="flex flex-col max-w-[459px]">
          <div className="relative w-[200px] h-[32px] mb-[30px]">
            <Image 
              src="/images/footer/momento-logo.png" 
              alt="Momento Logo" 
              fill 
              className="object-contain"
            />
          </div>
          
          <p className="text-white font-nav text-[14px] leading-[24px] tracking-[0.5px] font-normal mb-[60px] antialiased">
            Berdiri sejak 2023, Momento Project memiliki berbagai produk seperti Undangan Digital, Mahar dan Sewa Seserahan. Semua dibuat sendiri secara premium sesuai dengan keinginan client.
          </p>
          
          <p className="text-white font-nav text-[14px] leading-[17px] tracking-normal font-normal opacity-100 antialiased">
            © 2026 Powered by Momento Project
          </p>
        </div>

        {/* Right Column: Contact info */}
        <div className="flex flex-col gap-[20px] pt-1">
          {/* Instagram */}
          <div className="flex items-center gap-[15px]">
            <div className="relative w-[24px] h-[24px]">
              <Image 
                src="/icons/footer/instagram-white-icon.svg" 
                alt="Instagram" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-white font-nav text-[14px] tracking-normal font-normal antialiased">
              @momentoprjct
            </span>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-[15px]">
            <div className="relative w-[24px] h-[24px]">
              <Image 
                src="/icons/footer/whatsapp-white-icon.svg" 
                alt="WhatsApp" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-white font-nav text-[14px] tracking-normal font-normal antialiased">
              +62 851-1779-7966
            </span>
          </div>

          {/* Address / Location */}
          <div className="flex items-start gap-[15px]">
            <div className="relative w-[24px] h-[24px] flex-shrink-0 mt-0.5">
              <Image 
                src="/icons/footer/mail-white-icon.svg" 
                alt="Location" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-white font-nav text-[14px] leading-[18px] font-normal antialiased">
              <span className="font-bold mb-1">Momento Project</span>
              <span className="max-w-[410px] opacity-100 uppercase text-[12px] leading-[18px]">
                Jl. Dadap 11 No.145, RT.004/RW.008, Periuk Jaya Permai, Kota Tangerang, Banten 15131
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

