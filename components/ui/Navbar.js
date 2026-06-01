"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

// ... (keep existing navLinks)

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Info Produk", href: "/info-produk" },
  { name: "Harga", href: "/harga" },
  { name: "Customer", href: "/customer" },
];

export default function Navbar({ onOpenCart, cartItemCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 box-border h-[80px] min-h-[80px] md:h-[100px] md:min-h-[100px] flex items-center transition-all duration-300 ${
        isScrolled ? 'bg-[#090909]/90 backdrop-blur-md border-b border-white/5' : 'bg-[#090909]/50'
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 md:px-10">
        {/* Logo */}
        <Link href="/" className="relative h-[50px] w-[50px] shrink-0 transition-transform duration-300 hover:scale-[1.04] active:scale-[0.96]">
          <Image 
            src="/images/momento-logo.png" 
            alt="Momento" 
            fill 
            className="object-contain"
            priority
          />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden shrink-0 items-center gap-[10px] lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.name === "Home" && pathname === "/");
            return (
              <div key={link.name} className="relative flex flex-col items-center">
                <Link 
                  href={link.href}
                  className={`group relative overflow-hidden px-[20px] py-[8px] text-[16px] font-bold font-nav tracking-[0.5px] leading-none transition-all duration-300 active:scale-[0.96] antialiased ${
                    isActive ? "" : "text-white hover:text-[#D4AF37]"
                  }`}
                >
                  {isActive ? (
                    <span className="relative z-10 text-gold">{link.name}</span>
                  ) : (
                    <span className="relative z-10">{link.name}</span>
                  )}
                </Link>
                {isActive && (
                  <div className="navbar-active-line absolute -bottom-3 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#CF953C] to-[#D4AF37]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-[16px]">
            {/* Desktop Only: Estimasi Button */}
            <Link 
              href="/estimasi" 
              className="group relative hidden h-[50px] w-[191px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border-2 border-[#D4AF37] px-[30px] py-[15px] text-[16px] font-bold font-nav tracking-[0.5px] leading-none shadow-[0_0_0_rgba(212,175,55,0)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#D4AF37]/10 hover:shadow-[0_14px_38px_rgba(212,175,55,0.16)] active:translate-y-0 active:scale-[0.97] antialiased whitespace-nowrap lg:flex"
            >
              <span className="relative z-10 text-gold">Estimasi Harga</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/18 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            {/* Mobile Only: Cart Trigger */}
            {pathname === '/estimasi' && (
                <button
                  onClick={onOpenCart}
                  className="relative lg:hidden rounded-full p-2 text-white transition-all duration-300 hover:bg-white/10 hover:text-gold active:scale-[0.9]"
                  aria-label={`Buka cart estimasi${cartItemCount > 0 ? `, ${cartItemCount} item` : ''}`}
                >
                    <ShoppingCart className="w-6 h-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -right-[8px] -top-[8px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#D4AF37] px-[5px] font-montserrat text-[10px] font-bold leading-none text-black">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                </button>
            )}

            {/* Mobile Toggle */}
            <button
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-all duration-300 active:scale-[0.9]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {menuOpen ? (
                        <>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                    ) : (
                        <>
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </>
                    )}
                </svg>
            </button>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Drawer */}
      <div 
        className={`lg:hidden fixed inset-0 z-[100] transition-all duration-500 overflow-hidden ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div 
          className={`absolute top-0 right-0 w-[85%] max-w-[400px] h-full bg-[#010101] shadow-2xl transition-transform duration-500 ease-out flex flex-col p-6 pt-10 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-end mb-12">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="rounded-full p-1 text-white transition-all duration-300 hover:bg-white/10 hover:text-gold active:scale-[0.9]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>


          {/* Nav Links Container */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.name === 'Home' && pathname === '/');
              return (
                <div key={link.name}>
                  <div className="relative py-[14px] flex items-center">
                    {isActive && (
                      <div className="absolute left-[0px] w-[2px] h-[30px] grad-gold" />
                    )}
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-[8px] py-1 pl-5 text-[14px] tracking-[0.5px] font-montserrat transition-all duration-300 active:scale-[0.98] ${
                        isActive ? 'text-gold font-bold' : 'text-white font-medium hover:translate-x-1 hover:text-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                  
                  {/* Seperator Lines based on Design - Line color #A9A9A9 */}
                  {(link.name === 'Info Produk' || link.name === 'Harga') && (
                    <div className="w-full h-[1px] bg-[#A9A9A9]/30 my-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Button */}
          <div className="mt-auto pb-10 flex justify-center">
            <Link 
              href="/estimasi"
              onClick={() => setMenuOpen(false)}
              className="group relative w-full h-[56px] flex items-center justify-center overflow-hidden border border-[#D4AF37] rounded-[10px] text-[14px] font-bold font-montserrat tracking-[0.5px] text-gold hover:bg-[#D4AF37]/10 transition-all duration-300 active:scale-[0.97] antialiased"
            >
              <span className="relative z-10">Estimasi Harga</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/18 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
