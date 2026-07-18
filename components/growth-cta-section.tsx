"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Durable materials built to last for decades",
  "Professional installation done right the first time",
  "Protection from leaks, storms, and harsh weather",
  "Backed by warranty and ongoing support",
];

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
              Your roof is your home&apos;s{" "}
              <em className="italic">first line of defense.</em>
            </h2>
            <p className="text-[#1A1A1A]/60 text-base leading-[1.6] mb-10">
              A strong, well-built roof protects everything underneath it. Our expert installations shield your home from leaks, storms, and weather damage — giving you lasting protection and peace of mind for years to come.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <Check className="w-4 h-4 text-[#1A1A1A]/40 flex-shrink-0" />
                  <span className="text-[#1A1A1A]/70">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7] px-10 py-4 text-sm tracking-wide transition-all duration-400 group"
            >
              Apply Now
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
            </button>
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
