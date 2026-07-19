"use client";

import { motion } from "framer-motion";

export function GrowthCTASection() {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Section number as design element */}
            <span className="font-serif text-[80px] md:text-[120px] font-light text-[#1A1A1A]/10 block leading-none mb-4">004</span>
            <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-6">About Us</p>
            <h2 className="font-serif text-[#1A1A1A] text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em] mb-8">
              Your roof is your home&apos;s
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="border border-[#1A1A1A]/10 p-10">
              <div className="text-center">
                <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-4">What You Get</p>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-10 tracking-[-0.02em]">A Complete Roofing Solution</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-[#1A1A1A]/10 p-6">
                    <p className="font-serif text-3xl text-[#1A1A1A] mb-2">Durable</p>
                    <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-wide">Materials</p>
                  </div>
                  <div className="border border-[#1A1A1A]/10 p-6">
                    <p className="font-serif text-3xl text-[#1A1A1A] mb-2">Fast</p>
                    <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-wide">Installation</p>
                  </div>
                  <div className="border border-[#1A1A1A]/10 p-6">
                    <p className="font-serif text-3xl text-[#1A1A1A] mb-2">Warranty</p>
                    <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-wide">Backed</p>
                  </div>
                  <div className="border border-[#1A1A1A]/10 p-6">
                    <p className="font-serif text-3xl text-[#1A1A1A] mb-2">Done</p>
                    <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-wide">Right</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
