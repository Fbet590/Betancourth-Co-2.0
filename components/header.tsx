"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[60]">
        <div 
          className="h-full bg-[#6B1F2B] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-[2px] left-0 right-0 z-50 bg-[#FAFAF7]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <span className="text-[#1A1A1A] font-serif font-medium text-xl tracking-[-0.02em]">
                NexRoof
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              <Link href="#portfolio" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors duration-400 text-sm tracking-wide">
                Our Work
              </Link>
              <Link href="#faq" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors duration-400 text-sm tracking-wide">
                FAQ
              </Link>
            </nav>

            <div className="hidden md:block">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7] px-6 py-3 text-sm tracking-wide transition-all duration-400"
              >
                Get in touch
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#1A1A1A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t border-[#1A1A1A]/10">
              <nav className="flex flex-col gap-6">
                <Link
                  href="#portfolio"
                  className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-sm tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Work
                </Link>
                <Link
                  href="#faq"
                  className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-sm tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7] py-3 text-sm tracking-wide transition-all duration-400 w-full mt-2"
                >
                  Get in touch
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
