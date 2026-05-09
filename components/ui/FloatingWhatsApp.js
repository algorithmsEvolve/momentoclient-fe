import Image from "next/image";

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/message/ZD27PNJNNSFNF1" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] group cursor-pointer"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[#47AE4B] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
      
      {/* Icon Container */}
      <div className="relative w-[64px] h-[64px] bg-[#47AE4B] flex items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110">
        <Image 
          src="/icons/whatsapp.svg" 
          alt="WhatsApp" 
          width={40} 
          height={40} 
          className="object-contain"
        />
      </div>
    </a>
  );
}
