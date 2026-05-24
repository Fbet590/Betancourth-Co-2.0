"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Target, FileText, Handshake } from "lucide-react";

const expectations = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery",
    description: "We learn about your current marketing efforts, and growth goals.",
  },
  {
    number: "02",
    icon: Target,
    title: "Analysis",
    description: "We identify gaps in your current strategy and opportunities for growth.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Custom Plan",
    description: "We outline a roadmap specific to your business needs.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Next Steps",
    description: "If we're a good fit, we discuss how to move forward together.",
  },
];

export function StrategySessionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[18px] font-medium text-muted-foreground uppercase tracking-widest mb-4"
          >
            Free Consultation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[50px] font-extrabold text-foreground mb-4 text-balance"
          >
            Growth Strategy Session
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-[20px]"
          >
            A no-pressure, 30-minute call to see if we can help you grow.
          </motion.p>
        </div>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-[30px] font-extrabold text-foreground text-center mb-10">
            What to expect on the call?
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expectations.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-card border-[3px] border-black rounded-2xl p-6 text-center"
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-muted-foreground mb-3">{item.number}</span>
                  <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-background" />
                  </div>
                  <h4 className="text-[22px] font-extrabold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-[18px]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6 rounded-lg group"
          >
            Book Your Free Strategy Session
            <ArrowRight className="ml-2 w-5 h-5 animate-[bounceX_1s_ease-in-out_infinite]" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No commitment required. Just a conversation about your growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
