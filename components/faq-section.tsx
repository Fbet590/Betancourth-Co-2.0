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
    question: "Why should I replace my roof?",
    answer: "Your roof is your home's first line of defense against the elements. Replacing an aging or damaged roof protects your home from leaks, water damage, and costly structural repairs, while also boosting your property value and curb appeal.",
  },
  {
    question: "How long does a roof replacement take?",
    answer: "Most roof replacements are completed within 1-3 days depending on the size and complexity of your home. We handle everything from tear-off to cleanup, so you can get back to normal as quickly as possible.",
  },
  {
    question: "What's included in a new roof?",
    answer: "Every roofing project includes removal of your old roof, premium materials, professional installation, thorough cleanup, and a workmanship warranty. We walk you through your material and color options so you get exactly the look you want.",
  },
  {
    question: "Do you offer warranties on your work?",
    answer: "Absolutely. We back every installation with both manufacturer material warranties and our own workmanship warranty, so you can have complete peace of mind that your new roof is built to last.",
  },
  {
    question: "Do you help with insurance claims?",
    answer: "Yes! If your roof was damaged by a storm or other covered event, we can help guide you through the insurance claim process and work directly with your adjuster to make everything as smooth as possible.",
  },
  {
    question: "What happens after my roof is installed?",
    answer: "We perform a final inspection, complete a full site cleanup, and make sure you're happy with the finished result. We're always available afterward for any questions, maintenance, or support you may need down the road.",
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
            Additional information about our roofing service.
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center border border-[#6B1F2B] bg-transparent text-[#6B1F2B] hover:bg-[#6B1F2B] hover:text-[#FAFAF7] px-10 py-4 text-sm tracking-wide transition-all duration-400 group"
          >
            Get Started
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
