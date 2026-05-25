"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What industries do you work with?",
    answer: "We specialize in home service contractors including welding, hardscape, patio covers, remodeling, and concrete companies. Our proven 4-step system is specifically designed for trades businesses looking to generate more qualified leads.",
  },
  {
    question: "What's the difference between Performance Based and Flat Fee?",
    answer: "With Performance Based pricing, you only pay per qualified lead generated - no upfront costs or retainers. With Flat Fee, you get predictable monthly pricing with full-service marketing included. Both models deliver measurable results, and we'll help you choose the right fit during your free strategy session.",
  },
  {
    question: "How does your lead qualification process work?",
    answer: "Every lead goes through our proven 4-step system: We target and attract homeowners through ads on ALL platforms, qualify and filter out tire-kickers, verify contact info, address and project budget, then handle follow-up and appointment setting. You just show up and close the deal.",
  },
  {
    question: "Do you set appointments for me?",
    answer: "Yes. Our service includes follow-up and appointment setting directly on your calendar. We handle the lead nurturing and scheduling so you can focus on what you do best - your trade.",
  },
  {
    question: "How long before I see results?",
    answer: "Most clients start seeing qualified leads within 1-4 weeks of campaign launch. We run targeted ad campaigns on all platforms to place your business in front of homeowners already looking for what you do.",
  },
  {
    question: "What happens on the free strategy session?",
    answer: "We'll discuss your current situation, analyze your market opportunity, create a custom growth plan tailored to your business, and outline clear next steps. No commitment required - just a conversation about your growth.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-40 bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Section number as design element */}
          <span className="font-serif text-[80px] md:text-[120px] font-light text-[#1A1A1A]/10 block leading-none mb-4">005</span>
          <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-6">FAQ</p>
          <h2 className="font-serif text-[#1A1A1A] text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em] mb-6">
            Frequently Asked <em className="italic">Questions</em>
          </h2>
          <p className="text-[#1A1A1A]/60 text-base leading-[1.6]">
            Additional information about our lead generation service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-[#1A1A1A]/10 px-8 data-[state=open]:border-[#1A1A1A]/20"
              >
                <AccordionTrigger className="text-left text-[#1A1A1A] font-medium hover:no-underline py-6 text-base tracking-[-0.01em]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/60 pb-6 leading-[1.6]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-24"
        >
          <p className="text-[#1A1A1A]/50 mb-8 text-sm">Still have questions?</p>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7] px-10 py-4 text-sm tracking-wide transition-all duration-400 group"
          >
            Book a Free Discovery Call
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
