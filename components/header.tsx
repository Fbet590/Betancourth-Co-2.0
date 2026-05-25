"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-[#1a4a4a] font-sans text-lg font-semibold tracking-tight">
              Betancourth & Co
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#pricing" className="text-gray-600 hover:text-[#1a4a4a] transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="#services" className="text-gray-600 hover:text-[#1a4a4a] transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-[#1a4a4a] transition-colors text-sm font-medium">
              Reviews
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="border-[#1a4a4a] bg-transparent text-[#1a4a4a] hover:bg-[#1a4a4a] hover:text-white rounded-full px-6"
            >
              Get in touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1a4a4a]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-[#1a4a4a] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#services"
                className="text-gray-600 hover:text-[#1a4a4a] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-[#1a4a4a] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Button 
                variant="outline" 
                className="border-[#1a4a4a] bg-transparent text-[#1a4a4a] hover:bg-[#1a4a4a] hover:text-white rounded-full w-full mt-2"
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
