"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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

// Form step types
interface FormStep {
  question: string;
  type: "radio" | "dropdown" | "text" | "email" | "phone";
  options?: string[];
  placeholder?: string;
  required: boolean;
}

const formSteps: FormStep[] = [
  {
    question: "What's your position?",
    type: "radio",
    options: ["CEO/Owner", "Manager", "Sales Rep"],
    required: true,
  },
  {
    question: "What kind of company do you own?",
    type: "dropdown",
    options: ["Welding", "Hardscape", "Patio Covers", "Home Remodeling", "Concrete", "Plumbing", "Fencing", "Roofing", "Painting"],
    required: true,
  },
  {
    question: "What's your full name?",
    type: "text",
    placeholder: "John Smith",
    required: true,
  },
  {
    question: "What's your email address?",
    type: "email",
    placeholder: "john@company.com",
    required: true,
  },
  {
    question: "What's your phone number?",
    type: "phone",
    placeholder: "(555) 123-4567",
    required: true,
  },
];

export function HeroSection() {
  // Review carousel state
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<string[]>(new Array(formSteps.length).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

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

  // Form handlers
  const handleInputChange = (value: string) => {
    const newFormData = [...formData];
    newFormData[currentStep] = value;
    setFormData(newFormData);
    setError("");
  };

  const validateCurrentStep = (): boolean => {
    const currentValue = formData[currentStep];
    const step = formSteps[currentStep];

    if (step.required && !currentValue.trim()) {
      setError("This field is required");
      return false;
    }

    if (step.type === "email" && currentValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentValue)) {
        setError("Please enter a valid email address");
        return false;
      }
    }

    if (step.type === "phone" && currentValue) {
      const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
      if (!phoneRegex.test(currentValue.replace(/\s/g, ""))) {
        setError("Please enter a valid phone number");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setError("");
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    // Simulate submission delay (no webhook)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log form data to console for debugging/testing
    console.log("Form submitted:", {
      position: formData[0],
      companyType: formData[1],
      fullName: formData[2],
      email: formData[3],
      phone: formData[4],
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const renderFormStep = () => {
    const step = formSteps[currentStep];
    const currentValue = formData[currentStep];

    switch (step.type) {
      case "radio":
        return (
          <div className="space-y-3">
            {step.options?.map((option, idx) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleInputChange(option)}
                onMouseEnter={() => setHoveredOption(option)}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-5 py-4 text-left border rounded-xl transition-all duration-300 flex items-center justify-between group ${
                  currentValue === option
                    ? "border-white bg-white text-[#1a4a4a]"
                    : hoveredOption === option
                    ? "border-white/40 bg-white/10"
                    : "border-white/20 bg-white/5 text-white"
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: currentValue === option ? 1 : 0,
                    opacity: currentValue === option ? 1 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              </motion.button>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full px-5 py-4 text-left border rounded-xl transition-all duration-300 flex items-center justify-between ${
                dropdownOpen ? "border-white/60 bg-white/10" : "border-white/20 bg-white/5"
              }`}
            >
              <span className={`text-sm ${currentValue ? "text-white" : "text-white/50"}`}>
                {currentValue || "Select an option"}
              </span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-white/50" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 border border-white/20 bg-[#1a4a4a] rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto overflow-hidden"
                >
                  {step.options?.map((option, idx) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      onClick={() => {
                        handleInputChange(option);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm transition-all duration-200 ${
                        currentValue === option
                          ? "bg-white text-[#1a4a4a] font-medium"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "text":
      case "email":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type={step.type}
              value={currentValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={step.placeholder}
              className="w-full px-5 py-4 border border-white/20 bg-white/5 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/10 transition-all duration-300"
              autoFocus
            />
          </motion.div>
        );

      case "phone":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="tel"
              value={currentValue}
              onChange={(e) => handleInputChange(formatPhoneNumber(e.target.value))}
              placeholder={step.placeholder}
              className="w-full px-5 py-4 border border-white/20 bg-white/5 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/10 transition-all duration-300"
              autoFocus
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

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

          {/* Multi-step Form - Dark Teal Contrast Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="max-w-lg mx-auto mt-4"
          >
            {/* Form with border outline instead of glow */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#1a4a4a] to-[#0d2626] rounded-2xl p-8 md:p-10 border-2 border-[#3d8a8a] overflow-hidden">
                {/* Animated background orbs */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3d8a8a] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#2a6666] to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
                />

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="font-serif text-2xl text-white mb-3">Application Received!</h3>
                    <p className="text-white/60 text-sm">
                      We&apos;ll review your application and get back to you within 24-48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <div className="relative z-10">
                    {/* Form headline */}
                    <h2 className="font-serif text-xl md:text-[30px] text-white text-center mb-6 leading-tight">
                      Get Your Website Made ASAP Without Overpaying for It!
                    </h2>

                    {/* Animated step dots */}
                    <div className="flex justify-center gap-3 mb-8">
                      {formSteps.map((_, index) => (
                        <motion.div
                          key={index}
                          animate={{
                            scale: index === currentStep ? 1 : 0.8,
                            opacity: index === currentStep ? 1 : index < currentStep ? 0.7 : 0.3,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index === currentStep 
                              ? "w-10 bg-white" 
                              : index < currentStep 
                              ? "w-2 bg-white/70" 
                              : "w-2 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step counter with animation */}
                    <motion.p 
                      key={`step-${currentStep}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 text-center"
                    >
                      Step {currentStep + 1} of {formSteps.length}
                    </motion.p>

                    {/* Question with slide animation */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 30, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -30, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <h3 className="font-serif text-xl md:text-2xl text-white mb-6 text-center">
                          {formSteps[currentStep].question}
                        </h3>

                        {renderFormStep()}

                        {/* Error message */}
                        <AnimatePresence>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="text-red-400 text-xs mt-4 text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20"
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-10">
                      {currentStep > 0 ? (
                        <motion.button
                          whileHover={{ x: -3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleBack}
                          className="flex items-center text-white/60 text-sm hover:text-white transition-colors duration-300"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="inline-flex items-center bg-white text-[#1a4a4a] hover:bg-white/90 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 shadow-lg shadow-black/20"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-[#1a4a4a]/30 border-t-[#1a4a4a] rounded-full mr-2"
                            />
                            Submitting...
                          </span>
                        ) : (
                          <>
                            {currentStep === formSteps.length - 1 ? "Submit Application" : "Continue"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Marquee - Black background for contrast */}
      <section className="py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
          
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
                  className="object-contain h-20 md:h-24 w-auto brightness-0 invert opacity-50 hover:opacity-80 transition-opacity duration-400"
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
