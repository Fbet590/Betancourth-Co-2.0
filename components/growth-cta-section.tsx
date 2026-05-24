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
    <section className="py-20 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[65px] font-extrabold mb-6 text-balance leading-[1.1]">
              Unlock Predictable Growth with a Proven Marketing Engine
            </h1>
            <p className="text-background/70 text-[18px] mb-8">
              Stop chasing leads. Start closing deals. Our system delivers qualified prospects ready to buy, so you can focus on what you do best.
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
                  <CheckCircle className="w-5 h-5 text-background/80 flex-shrink-0" />
                  <span className="text-background/90 text-[20px]">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              size="lg"
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-background text-foreground hover:bg-background/90 text-[22px] px-8 py-6 rounded-lg group"
            >
              Book a Free Discovery Call
              <ArrowRight className="ml-2 w-6 h-6 animate-[bounceX_1s_ease-in-out_infinite]" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background/10 border-[3px] border-background/30 rounded-2xl p-8">
              <div className="text-center">
                <p className="text-background/60 text-[18px] uppercase tracking-wide mb-2">What You Get</p>
                <h3 className="text-2xl font-extrabold mb-6">A Complete Growth System</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/10 rounded-xl p-4">
                    <p className="text-3xl font-bold mb-1">24/7</p>
                    <p className="text-background/70 text-sm">Lead Capture</p>
                  </div>
                  <div className="bg-background/10 rounded-xl p-4">
                    <p className="text-3xl font-bold mb-1">100%</p>
                    <p className="text-background/70 text-sm">Verified Leads</p>
                  </div>
                  <div className="bg-background/10 rounded-xl p-4">
                    <p className="text-3xl font-bold mb-1">Auto</p>
                    <p className="text-background/70 text-sm">Follow-Up</p>
                  </div>
                  <div className="bg-background/10 rounded-xl p-4">
                    <p className="text-3xl font-bold mb-1">Done</p>
                    <p className="text-background/70 text-sm">For You</p>
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
