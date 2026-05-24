"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-white font-sans text-lg font-medium tracking-tight">
              Betancourth & Co
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#pricing" className="text-white/70 hover:text-white transition-colors text-sm">
              Pricing
            </Link>
            <Link href="#services" className="text-white/70 hover:text-white transition-colors text-sm">
              Services
            </Link>
            <Link href="#testimonials" className="text-white/70 hover:text-white transition-colors text-sm">
              Reviews
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full px-6"
            >
              Get in touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <Link
                href="#pricing"
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#services"
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#testimonials"
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Button 
                variant="outline" 
                className="border-white/30 bg-transparent text-white hover:bg-white/10 rounded-full w-full mt-2"
              >
                Get in touch
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
