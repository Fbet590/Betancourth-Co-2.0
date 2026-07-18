"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 md:py-40 bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Section number as design element */}
          <span className="font-serif text-[80px] md:text-[120px] font-light text-[#1A1A1A]/10 block leading-none mb-4">006</span>
          <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-8">Learn More</p>
          
          <h2 className="font-serif text-[#1A1A1A] text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em] mb-8 text-balance">
            Ready to protect your home with a <em className="italic">new roof?</em>
          </h2>

          <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto mb-12 text-base leading-[1.6]">
            Book a free roof inspection and let&apos;s discuss your options. 
            No commitment required.
          </p>

          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7] px-10 py-4 text-sm tracking-wide transition-all duration-400 group"
          >
            Apply Now
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
