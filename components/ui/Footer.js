import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-xs">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white block mb-6">
              MOMENTO<span className="text-accent">.</span>
            </Link>
            <p className="text-gray-medium text-sm leading-relaxed">
              We preserve the essence of your most cherished experiences with cinematic 
              precision and artistic vision. Welcome to the elite standard of event memory.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white">Services</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-medium">
                <li><Link href="#seserahan" className="hover:text-accent transition-colors">Seserahan</Link></li>
                <li><Link href="#mahar" className="hover:text-accent transition-colors">Mahar</Link></li>
                <li><Link href="#undangan" className="hover:text-accent transition-colors">Undangan</Link></li>
                <li><Link href="#extras" className="hover:text-accent transition-colors">Extras</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white">Company</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-medium">
                <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Portfolios</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white">Social</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-medium">
                <li><Link href="#" className="hover:text-accent transition-colors">Instagram</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">WhatsApp</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Pinterest</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30 tracking-widest uppercase">
            © 2024 Momento Projects. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent">Privacy Policy</Link>
            <Link href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
