"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, TrendingUp, DollarSign } from "lucide-react";

const pricingModels = [
  {
    icon: TrendingUp,
    title: "Performance Based",
    subtitle: "Pay for Results",
    description: "We only get paid when you see results. Our success is directly tied to yours.",
    highlights: [
      "Pay per qualified lead generated",
      "No upfront costs or retainers",
      "Transparent reporting on every lead",
      "Scale up or down based on capacity",
      "Risk-free partnership model",
    ],
    cta: "Learn More",
    ideal: "Best for businesses ready to scale quickly with proven ROI",
  },
  {
    icon: DollarSign,
    title: "Flat Fee",
    subtitle: "Predictable Pricing",
    description: "Fixed monthly investment with comprehensive marketing services included.",
    highlights: [
      "Predictable monthly budget",
      "Full-service marketing included",
      "Dedicated account manager",
      "Website, SEO, and paid ads",
      "Monthly strategy sessions",
    ],
    cta: "Get a Quote",
    ideal: "Best for businesses wanting full-service support with clear costs",
    featured: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-40 relative overflow-hidden bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Section number as design element */}
          <span className="font-serif text-[80px] md:text-[120px] font-light text-[#1A1A1A]/10 block leading-none mb-4">002</span>
          <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-6">How We Work</p>
          <h2 className="font-serif text-[#1A1A1A] text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em] mb-6 text-balance">
            Two Ways to <em className="italic">Partner</em> With Us
          </h2>
          <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto text-base leading-[1.6]">
            Choose the pricing model that fits your business goals. Both options deliver measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative border p-10 ${
                model.featured 
                  ? "border-[#1A1A1A]/20" 
                  : "border-[#1A1A1A]/10"
              }`}
            >
              {model.featured && (
                <div className="absolute -top-3 left-8 px-4 py-1 bg-[#FAFAF7] text-[#1A1A1A] text-xs uppercase tracking-[0.15em]">
                  Popular Choice
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-[0.15em] mb-2">{model.subtitle}</p>
                <h3 className="font-serif text-2xl text-[#1A1A1A] tracking-[-0.02em]">{model.title}</h3>
              </div>

              <p className="text-[#1A1A1A]/60 mb-8 leading-[1.6]">
                {model.description}
              </p>

              <ul className="space-y-4 mb-10">
                {model.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#1A1A1A]/40 mt-1 flex-shrink-0" />
                    <span className="text-[#1A1A1A]/70 text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-[#1A1A1A]/40 mb-6 italic">
                {model.ideal}
              </p>

              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`w-full py-4 text-sm tracking-wide transition-all duration-400 flex items-center justify-center group ${
                  model.featured 
                    ? "border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7]" 
                    : "border border-[#1A1A1A]/20 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                }`}
              >
                {model.cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-[#1A1A1A]/40 mt-16 text-sm"
        >
          Not sure which model is right for you? Book a free consultation and we will help you decide.
        </motion.p>
      </div>
    </section>
  );
}
