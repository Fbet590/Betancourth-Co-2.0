"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, UserCheck, CalendarCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Target & Attract",
    description: "We run targeted ad campaigns on ALL platforms so your business is placed in front of homeowners already looking for what you do.",
  },
  {
    number: "02",
    icon: Filter,
    title: "Qualify & Filter",
    description: "We filter out tire-kickers and time-wasters, ensuring you only receive leads that match your ideal customer profile.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Verify, Validate & Deliver",
    description: "We verify contact info, confirm address and project budget, and deliver qualified leads to you in real-time.",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Follow Up & Appointment Setting",
    description: "We handle the follow-up and book appointments directly on your calendar.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold mb-3 text-[18px] tracking-wide uppercase">How It Works</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 text-balance">
            You&apos;re good at your trade. You shouldn&apos;t have to figure out Ads too.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-[20px]">
            Our Proven 4-Step System
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
              )}
              
              <div className="relative z-10 bg-card border-[3px] border-black rounded-2xl p-6 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-muted-foreground">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                
                <h3 className="text-[20px] font-extrabold text-foreground mb-3">{step.title}</h3>
                {step.description && <p className="text-muted-foreground text-[18px] leading-relaxed">{step.description}</p>}
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
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-6 py-3 mb-6">
            <span className="text-foreground font-medium">Result:</span>
            <span className="text-muted-foreground">The only thing left is for you to show up and close the deal.</span>
          </div>
          <div>
            <Button 
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 rounded-lg group text-[18px]"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 animate-[bounceX_1s_ease-in-out_infinite]" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
