"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    name: "Vladimir Vega",
    company: "Hardscaper",
    text: "We've been working with Noah since June last year, and honestly he took a chance on us as a small business and it's worked out great! His system brings in results, the appointment generation saves us so much time since we handle big projects and I'm busy most the time to talk to most leads! Great experience we're having!",
    rating: 5,
  },
  {
    name: "Carlos",
    company: "Pergola Installation",
    text: "We have been working with Noah these past 5 months and we have had great results. We have had great increase in lead generation. Overall Noah is extremely knowledgeable and helpful, it is a delight to work with him. Definitely recommend.",
    rating: 5,
  },
  {
    name: "Mario Ramirez",
    company: "Home Remodeling",
    text: "Have had a great experience! I've been working with Noah since late September and man since then he has definitely helped our company grow. He's always on top of everything and thanks to that he has helped us bring in lots of customers needing work done at their home this then allows us to take it to the next step and sign contracts with customers. Once again great experience overall.",
    rating: 5,
  },
];

// Client logos for marquee (sizes increased by 25% on desktop, now 25% bigger on mobile too)
const clientLogos = [
  {
    name: "Vibrant Vistas Landscape",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-BZdqK19fjOZy4B9ZmSV9RpmOmLTcZg.png",
    width: 225,
    height: 63,
  },
  {
    name: "Desert Valley Patio Covers",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-desert-valley_prev_ui-m7VkBygKrrIxOE6E-aOp0plN2hDuzWstFcSLP63mFIecNuA.png",
    width: 200,
    height: 75,
  },
  {
    name: "AZ Elite Granite LLC",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20May%2024%2C%202026%20at%2006_16_36%20PM-5nS8Ow08sgZs9FyUk2TgA6vzMcB4o5.png",
    width: 175,
    height: 88,
  },
  {
    name: "5th Element Outdoor Creations",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20May%2024%2C%202026%20at%2006_15_05%20PM-M7d24da4J7zflIL4lOa2zulphLVW54.png",
    width: 175,
    height: 88,
  },
  {
    name: "CV",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20May%2024%2C%202026%20at%2006_19_28%20PM-5FDfsJO1iGLSJmEze6VOYfDlFsVNg1.png",
    width: 100,
    height: 100,
  },
  {
    name: "Desert Valley Structures LLC",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20May%2024%2C%202026%20at%2006_21_06%20PM-TdlOu6IpB8ZmZI0EFZ3yNLAfV12FiI.png",
    width: 200,
    height: 88,
  },
  {
    name: "Landscaping Perez LLC",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20May%2024%2C%202026%20at%2006_18_00%20PM-yGj5qGvn3Td5xog2qZwIFGaH7D6KhC.png",
    width: 200,
    height: 88,
  },
];

export function HeroSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Swipe handlers for mobile review carousel
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      setUserInteracted(true);
    }

    if (isLeftSwipe) {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }
    if (isRightSwipe) {
      setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  const goToNextReview = () => {
    setUserInteracted(true);
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrevReview = () => {
    setUserInteracted(true);
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-rotate reviews (pauses when user interacts)
  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  return (
    <>
      {/* Hero Section - Minimal Editorial Style */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 md:pt-40 md:pb-32 relative bg-[#FAFAF7]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10 w-full text-center">
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-8"
          >
            A Growth Partner
          </motion.p>

          {/* Main headline - Fraunces serif */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-serif text-[#1A1A1A] text-[56px] md:text-[72px] lg:text-[96px] font-medium leading-[1.0] tracking-[-0.03em] mb-8"
          >
            Yeah, you need a <em className="italic">website.</em><br />
            No, you don&apos;t need to spend $3,000.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-[#1A1A1A]/60 text-2xl leading-[1.6] max-w-2xl mx-auto mb-12"
          >
            $300 Flat Pricing instead of overpaying insane prices.
          </motion.p>

          {/* Single CTA Button - Editorial style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
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

      {/* Logo Marquee - Moved below hero, not in it */}
      <section className="py-16 md:py-24 bg-[#FAFAF7] overflow-hidden border-y border-[#1A1A1A]/10">
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAFAF7] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAFAF7] to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-10 md:mx-16 flex items-center justify-center h-24 md:h-28"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain h-20 md:h-24 w-auto opacity-40 hover:opacity-70 transition-opacity duration-400"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-40 bg-[#FAFAF7] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            {/* Section number as design element */}
            <span className="font-serif text-[80px] md:text-[120px] font-light text-[#1A1A1A]/10 block leading-none mb-4">001</span>
            <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-[0.2em] mb-6">Client Wins</p>
            <h2 className="font-serif text-[#1A1A1A] text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em]">
              Results that <em className="italic">speak.</em>
            </h2>
          </motion.div>

          {/* Desktop: Show 3 reviews */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-[#1A1A1A]/10 p-8"
              >
                <p className="text-[#1A1A1A]/70 text-base leading-[1.6] mb-8 line-clamp-4">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1A1A1A]/5 flex items-center justify-center">
                    <span className="text-[#1A1A1A]/60 text-sm font-medium">
                      {review.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A] text-sm">{review.name}</p>
                    <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-wide">{review.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Show 1 review at a time with swipe */}
          <div 
            className="lg:hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-[#1A1A1A]/10 p-8"
              >
                <p className="text-[#1A1A1A]/70 text-base leading-[1.6] mb-8">
                  &quot;{reviews[currentReviewIndex].text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1A1A1A]/5 flex items-center justify-center">
                    <span className="text-[#1A1A1A]/60 text-sm font-medium">
                      {reviews[currentReviewIndex].name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A] text-sm">{reviews[currentReviewIndex].name}</p>
                    <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-wide">{reviews[currentReviewIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={goToPrevReview}
                className="w-12 h-12 border border-[#1A1A1A]/20 text-[#1A1A1A]/60 flex items-center justify-center hover:border-[#1A1A1A]/40 transition-colors duration-400"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-3">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUserInteracted(true);
                      setCurrentReviewIndex(index);
                    }}
                    className={`w-2 h-2 transition-colors duration-400 ${
                      index === currentReviewIndex ? "bg-[#1A1A1A]" : "bg-[#1A1A1A]/20"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNextReview}
                className="w-12 h-12 border border-[#1A1A1A]/20 text-[#1A1A1A]/60 flex items-center justify-center hover:border-[#1A1A1A]/40 transition-colors duration-400"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16 md:mt-24"
          >
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
    </>
  );
}
