import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-20 px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20">
         <div className="max-w-sm">
            <div className="text-[#D4AF37] font-bold text-3xl mb-8 tracking-tighter italic">MOMENTO</div>
            <p className="text-white/40 text-xs leading-relaxed">
              Kami adalah partner terbaik untuk setiap momen spesial Anda. Menghadirkan kualitas premium 
              dalam setiap detail seserahan, mahar, dan undangan.
            </p>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
           <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Services</h4>
              <ul className="space-y-4 text-[10px] text-white/50 uppercase tracking-widest">
                <li><Link href="#">Seserahan</Link></li>
                <li><Link href="#">Mahar</Link></li>
                <li><Link href="#">Undangan</Link></li>
              </ul>
           </div>
           <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Company</h4>
              <ul className="space-y-4 text-[10px] text-white/50 uppercase tracking-widest">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Portfolio</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
           </div>
           <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Contact</h4>
              <p className="text-[10px] text-white/50 leading-loose">
                hello@momento.com<br/>
                +62 812 3456 7890
              </p>
           </div>
         </div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 mt-20">
         <p className="text-[10px] text-white/20 tracking-widest uppercase">© 2024 Momento. All rights reserved.</p>
         <div className="flex gap-8 text-[10px] text-white/20 tracking-widest uppercase">
           <Link href="#">Privacy Policy</Link>
           <Link href="#">Terms & Conditions</Link>
         </div>
      </div>
    </footer>
  );
}
