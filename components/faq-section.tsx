"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <section id="faq" className="py-20 bg-card/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-[20px] text-primary font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-[20px]">
            Additional information about our lead generation service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4 pb-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-6 text-[22px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-[18px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button 
            onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 rounded-lg group text-[20px]"
          >
            Book a Free Discovery Call
            <ArrowRight className="ml-2 w-5 h-5 animate-[bounceX_1s_ease-in-out_infinite]" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
