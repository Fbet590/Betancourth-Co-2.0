"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-card border border-border rounded-3xl p-8 md:p-16 text-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Get Started</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
              Let&apos;s Ignite Your Lead Generation Engines
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-[20px]">
              Ready to transform your marketing and scale your business? 
              Book a free discovery call and let&apos;s discuss your growth strategy.
            </p>

            <Button
              size="lg"
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-lg group"
            >
              Book a FREE Discovery Call
              <ArrowRight className="ml-2 w-5 h-5 animate-[bounceX_1s_ease-in-out_infinite]" />
            </Button>

            <p className="mt-6 text-muted-foreground text-sm">
              Join hundreds of businesses we&apos;ve worked with worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
