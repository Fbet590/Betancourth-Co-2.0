"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, UserCheck, CalendarCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "001",
    icon: Search,
    title: "Target & Attract",
    description: "We run targeted ad campaigns on ALL platforms so your business is placed in front of homeowners already looking for what you do.",
  },
  {
    number: "002",
    icon: Filter,
    title: "Qualify & Filter",
    description: "We filter out tire-kickers and time-wasters, ensuring you only receive leads that match your ideal customer profile.",
  },
  {
    number: "003",
    icon: UserCheck,
    title: "Verify & Deliver",
    description: "We verify contact info, confirm address and project budget, and deliver qualified leads to you in real-time.",
  },
  {
    number: "004",
    icon: CalendarCheck,
    title: "Appointment Setting",
    description: "We handle the follow-up and book appointments directly on your calendar.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="services" className="py-24 bg-[#0d2626]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            You&apos;re good at your trade.<br />You shouldn&apos;t have to figure out Ads too.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-6 h-full border border-white/10">
                <div className="mb-4">
                  <span className="text-white/30 text-sm font-mono">[{step.number}]</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm mb-6">
            Result: The only thing left is for you to show up and close the deal.
          </p>
          <Button 
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
