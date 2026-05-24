"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-[#0d2626]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-6">Learn More</p>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Ready to transform your lead generation?
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">
            Book a free discovery call and let&apos;s discuss your growth strategy. 
            No commitment required.
          </p>

          <Button
            size="lg"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#1a4a4a] hover:bg-white/90 px-8 py-6 rounded-full group"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
