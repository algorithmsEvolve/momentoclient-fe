'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Seserahan', href: '#seserahan' },
  { name: 'Mahar', href: '#mahar' },
  { name: 'Undangan', href: '#undangan' },
  { name: 'Extras', href: '#extras' },
  { name: 'Harga', href: '/harga' },
];

export default function Navbar() {
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] md:h-[100px] flex items-center ${
        isScrolled ? 'bg-[#090909]/90 backdrop-blur-md border-b border-white/5' : 'bg-[#090909]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-[50px] h-[50px]">
          <Image 
            src="/images/momento-logo.png" 
            alt="Momento" 
            fill 
            className="object-contain"
            priority
          />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-[10px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.name === 'Home' && pathname === '/');
            return (
              <div key={link.name} className="relative flex flex-col items-center">
                <Link 
                  href={link.href}
                  className={`px-[20px] py-[8px] text-[16px] font-bold font-nav tracking-[0.5px] leading-none transition-colors duration-200 antialiased ${
                    isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name}
                </Link>
                {/* Active Underline */}
                {isActive && (
                  <div className="absolute -bottom-3 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#CF953C] to-[#D4AF37]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Action Button: Estimasi Harga */}
        <Link 
          href="/estimasi" 
          className="hidden lg:flex w-[191px] h-[50px] items-center justify-center border-2 border-[#D4AF37] rounded-[10px] px-[30px] py-[15px] text-[16px] font-bold font-nav tracking-[0.5px] leading-none text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 antialiased whitespace-nowrap"
        >
          Estimasi Harga
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
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
              className="text-white hover:text-[#D4AF37] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>


          {/* Nav Links Container */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.name === 'Home' && pathname === '/');
              return (
                <div key={link.name}>
                  <div className="relative py-[14px] flex items-center">
                    {isActive && (
                      <div className="absolute left-[0px] w-[2px] h-[30px] bg-[#D4AF37]" />
                    )}
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`pl-5 text-[14px] tracking-[0.5px] font-montserrat transition-all duration-300 ${
                        isActive ? 'text-[#D4AF37] font-bold' : 'text-white font-medium hover:text-[#D4AF37]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                  
                  {/* Seperator Lines based on Design - Line color #A9A9A9 */}
                  {(index === 0 || index === 4) && (
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
              className="w-full h-[56px] flex items-center justify-center border border-[#D4AF37] rounded-[10px] text-[14px] font-bold font-montserrat tracking-[0.5px] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 antialiased"
            >
              Estimasi Harga
            </Link>
          </div>
        </div>
      </div>


    </nav>
  );
}
