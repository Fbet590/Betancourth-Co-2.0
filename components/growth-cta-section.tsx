"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Consistent flow of qualified leads",
  "Appointments booked for you",
  "Transparent reporting",
  "No long-term contracts",
];

export function GrowthCTASection() {
  return (
    <section className="py-24 bg-[#143838]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-4">About Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              A small team obsessed with{" "}
              <span className="italic font-serif">compounding growth.</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Majority of the brand owners we talk to face the same problems. Tons of marketing, but no real results. We fix that.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-white/60 flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              size="lg"
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#1a4a4a] hover:bg-white/90 px-8 py-6 rounded-full group"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <p className="text-white/50 text-sm uppercase tracking-wide mb-2">What You Get</p>
                <h3 className="text-2xl font-bold text-white mb-6">A Complete Growth System</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">24/7</p>
                    <p className="text-white/50 text-sm">Lead Capture</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">100%</p>
                    <p className="text-white/50 text-sm">Verified Leads</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">Auto</p>
                    <p className="text-white/50 text-sm">Follow-Up</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">Done</p>
                    <p className="text-white/50 text-sm">For You</p>
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
