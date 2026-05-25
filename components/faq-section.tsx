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
    question: "Why does my business need a website?",
    answer: "Your website is your digital storefront that works 24/7. It builds credibility, helps customers find you online, and converts visitors into paying customers. Studies show that 75% of consumers judge a company's credibility based on their website design.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most websites are completed within 1-2 weeks depending on complexity. We handle everything from design to development to launch, so you can focus on running your business while we build your online presence.",
  },
  {
    question: "What's included in the website package?",
    answer: "Every website includes custom design, mobile optimization, SEO setup, fast hosting, contact forms, and ongoing support. We also integrate with your existing tools and can add features like appointment booking, galleries, and more.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer: "Absolutely. All our websites are built mobile-first, meaning they look and function perfectly on smartphones, tablets, and desktops. With over 60% of web traffic coming from mobile devices, this is essential for your business.",
  },
  {
    question: "Do you help with content and images?",
    answer: "Yes! We can help with copywriting, source professional stock images, or work with photos you provide. Our goal is to make the process as easy as possible for you.",
  },
  {
    question: "What happens after my website is live?",
    answer: "We provide ongoing support and maintenance to keep your site secure and up-to-date. We're always available to make updates, add new features, or answer questions as your business grows.",
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
            Additional information about our website building service.
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
