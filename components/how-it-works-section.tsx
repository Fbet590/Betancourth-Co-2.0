"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "001",
    title: "Target & Attract",
    description: "We run targeted ad campaigns on ALL platforms so your business is placed in front of homeowners already looking for what you do.",
  },
  {
    number: "002",
    title: "Qualify & Filter",
    description: "We filter out tire-kickers and time-wasters, ensuring you only receive leads that match your ideal customer profile.",
  },
  {
    number: "003",
    title: "Verify & Deliver",
    description: "We verify contact info, confirm address and project budget, and deliver qualified leads to you in real-time.",
  },
  {
    number: "004",
    title: "Appointment Setting",
    description: "We handle the follow-up and book appointments directly on your calendar.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="services" className="py-24 md:py-40 bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Section number as design element */}
          <span className="font-serif text-[80px] md:text-[120px] font-light text-[#1A1A1A]/10 block leading-none mb-4">003</span>
          <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-6">What We Do</p>
          <h2 className="font-serif text-[#1A1A1A] text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em] text-balance">
            You&apos;re good at your <em className="italic">trade.</em><br />
            You shouldn&apos;t have to figure out Ads too.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="border border-[#1A1A1A]/10 p-8 h-full">
                <div className="mb-6">
                  <span className="font-serif text-[48px] font-light text-[#1A1A1A]/10 leading-none">{step.number}</span>
                </div>
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 tracking-[-0.02em]">{step.title}</h3>
                <p className="text-[#1A1A1A]/60 text-sm leading-[1.6]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-[#1A1A1A]/50 text-sm mb-8">
            Result: The only thing left is for you to show up and close the deal.
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
