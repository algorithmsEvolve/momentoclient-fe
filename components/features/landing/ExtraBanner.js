
export default function ExtraBanner() {
  return (
    <section 
      className="relative overflow-hidden z-0 mt-[-250px]"
      style={{
        background: "linear-gradient(90deg, #D4AF37 -30%, #CF953C 0%, #D4AF37 35%, #CF953C 80%, #D4AF37 100%)"
      }}
    >
      <div className="relative z-10 max-w-[1240px] mx-auto pt-[330px] pb-[80px] px-10 text-center">
        <p className="text-[#161616] font-nav font-medium text-[16px] md:text-[20px] mb-8 leading-[32px] max-w-[850px] mx-auto antialiased tracking-tight">
          Kalau kamu masih bingung dengan produk-produk Momento, atau kamu butuh saran tema yang pas dengan pernikahanmu, jangan ragu untuk ngobrol dengan kami ya!
        </p>
        
        <div className="flex justify-center">
          <button className="bg-[#161616] text-[#D4AF37] w-[210px] h-[50px] rounded-[10px] flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-[#090909] shadow-[0_10px_30px_rgba(0,0,0,0.3)] antialiased">
            <span className="text-[14px] font-nav font-bold uppercase tracking-[1px]">HUBUNGI KAMI</span>
          </button>
        </div>
      </div>
    </section>
  );
}
