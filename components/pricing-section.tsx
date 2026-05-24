"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <section id="pricing" className="py-24 bg-[#143838]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-4">How We Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Two Ways to Partner With Us
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Choose the pricing model that fits your business goals. Both options deliver measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pricingModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative glass-card rounded-2xl p-8 ${
                model.featured 
                  ? "border border-white/30" 
                  : "border border-white/10"
              }`}
            >
              {model.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-[#1a4a4a] text-xs font-semibold rounded-full uppercase tracking-wide">
                  Popular Choice
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <model.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wide">{model.subtitle}</p>
                  <h3 className="text-xl font-bold text-white">{model.title}</h3>
                </div>
              </div>

              <p className="text-white/60 mb-6 leading-relaxed">
                {model.description}
              </p>

              <ul className="space-y-3 mb-8">
                {model.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-white/40 mb-4 italic">
                {model.ideal}
              </p>

              <Button 
                onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-6 group rounded-full ${
                  model.featured 
                    ? "bg-white text-[#1a4a4a] hover:bg-white/90" 
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {model.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-white/40 mt-12 text-sm"
        >
          Not sure which model is right for you? Book a free consultation and we will help you decide.
        </motion.p>
      </div>
    </section>
  );
}
