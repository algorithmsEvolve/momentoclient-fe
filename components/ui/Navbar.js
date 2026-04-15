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
  { name: 'Harga', href: '#harga' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[100px] flex items-center ${
        isScrolled ? 'bg-[#090909]/90 backdrop-blur-md border-b border-white/5' : 'bg-[#090909]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-10 flex items-center justify-between">
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
            const isActive = link.name === 'Home';
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
          className="w-[191px] h-[50px] flex items-center justify-center border-2 border-[#D4AF37] rounded-[10px] px-[30px] py-[15px] text-[16px] font-bold font-nav tracking-[0.5px] leading-none text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 antialiased whitespace-nowrap"
        >
          Estimasi Harga
        </Link>

        {/* Mobile Toggle */}
        <div className="lg:hidden text-[#D4AF37] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>
      </div>
    </nav>
  );
}
