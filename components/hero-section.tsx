"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Star, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormStep = {
  question: string;
  type: "radio" | "number" | "dropdown" | "text" | "email" | "phone";
  options?: string[];
  placeholder?: string;
  required: boolean;
};

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
    question: "What is the average number of jobs you handle each month?",
    type: "number",
    required: true,
  },
  {
    question: "What is your total annual revenue?",
    type: "dropdown",
    options: ["$300K - $500K", "$500K - $1M", "$1M - $5M", "$5M - $10M", "$10M - $20M"],
    required: true,
  },
  {
    question: "What monthly amount are you looking to dedicate to your marketing?",
    type: "radio",
    options: ["$1,500 - $2,000", "$2,000 - $4,000", "$5,000+"],
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

// Client logos for marquee
const clientLogos = [
  "Trusted Company",
  "Growth Partners",
  "Scale Builders",
  "Lead Masters",
  "Revenue Pro",
  "Sales Engine",
];

export function HeroSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<number, string>>({});
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

  const QUALIFIED_POSITION = "CEO/Owner";

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

  const isQualifiedLead = (): boolean => {
    const position = formData[0];
    if (!position || typeof position !== 'string') return false;
    return position.trim() === QUALIFIED_POSITION;
  };

  const trackFacebookConversion = () => {
    if (!isQualifiedLead()) {
      return;
    }
    
    if (typeof window !== 'undefined' && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead', {
        content_name: 'Form Submission',
        content_category: formData[1] || 'Unknown',
        value: formData[3] || 'Unknown',
        currency: 'USD',
      });
    }
  };

  const submitToWebhook = async () => {
    if (!isQualifiedLead()) {
      setIsDisqualified(true);
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        position: formData[0],
        companyType: formData[1],
        jobsPerMonth: formData[2],
        annualRevenue: formData[3],
        marketingBudget: formData[4],
        fullName: formData[5],
        email: formData[6],
        phone: formData[7],
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        trackFacebookConversion();
        setIsSubmitted(true);
      } else {
        console.error('Submission failed:', result.error);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-rotate reviews (pauses when user interacts)
  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const currentFormStep = formSteps[currentStep];

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const isValidPhone = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const isStepValid = () => {
    const value = formData[currentStep];
    if (value === undefined || value.trim() === "") {
      return false;
    }

    if (currentFormStep.type === "email") {
      return isValidEmail(value);
    }

    if (currentFormStep.type === "phone") {
      return isValidPhone(value);
    }

    return true;
  };

  const getValidationErrorMessage = () => {
    const value = formData[currentStep];
    
    if (!value || value.trim() === "") {
      return "Please fill in all required fields before continuing.";
    }

    if (currentFormStep.type === "email" && !isValidEmail(value)) {
      return "Please enter a valid email address (e.g., john@company.com).";
    }

    if (currentFormStep.type === "phone" && !isValidPhone(value)) {
      return "Please enter a valid phone number with at least 10 digits.";
    }

    return "Please fill in all required fields before continuing.";
  };

  const handleOptionSelect = (option: string) => {
    setFormData({ ...formData, [currentStep]: option });
    setShowError(false);
  };

  const handleNumberChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setFormData({ ...formData, [currentStep]: numericValue });
    setShowError(false);
  };

  const handleTextChange = (value: string) => {
    setFormData({ ...formData, [currentStep]: value });
    setShowError(false);
  };

  const handleNext = async () => {
    if (!isStepValid()) {
      setShowError(true);
      return;
    }
    
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
    } else {
      if (isQualifiedLead()) {
        await submitToWebhook();
      } else {
        setIsDisqualified(true);
        setIsSubmitted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowError(false);
    }
  };

  const progress = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 relative overflow-hidden gradient-bg">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f5555] via-[#1a4a4a] to-[#0d2626]" />
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#2a6a6a]/30 to-transparent rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          {/* Tag line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/60 text-sm uppercase tracking-[0.2em] mb-8"
          >
            A Growth Partner for Home Service Contractors
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight"
          >
            Precision is the<br />strategy.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We build contractor businesses the way they should be built. With data guiding every decision and nothing left to guesswork.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#1a4a4a] hover:bg-white/90 text-base px-8 py-6 rounded-full group font-medium"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="py-8 bg-[#0d2626] overflow-hidden border-y border-white/5">
        <div className="relative">
          <div className="flex animate-marquee">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-12 text-white/30 text-lg font-medium tracking-wide"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#0d2626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-4">Client Wins</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold">Results that speak.</h2>
          </motion.div>

          {/* Desktop: Show 3 reviews */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-white/80 text-base leading-relaxed mb-6 line-clamp-4">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-white/70 text-sm font-semibold">
                      {review.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{review.name}</p>
                    <p className="text-xs text-white/50">{review.company}</p>
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
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  &quot;{reviews[currentReviewIndex].text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-white/70 text-sm font-semibold">
                      {reviews[currentReviewIndex].name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{reviews[currentReviewIndex].name}</p>
                    <p className="text-xs text-white/50">{reviews[currentReviewIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={goToPrevReview}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUserInteracted(true);
                      setCurrentReviewIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentReviewIndex ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNextReview}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#1a4a4a] hover:bg-white/90 rounded-full px-8 py-6 font-medium"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section id="hero-form" className="py-20 bg-[#0d2626]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                {isDisqualified ? (
                  <>
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">Thank you</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Thanks for Your Interest</h3>
                    <p className="text-white/60">
                      Based on your responses, we may not be the best fit right now. We appreciate your time.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Application Received!</h3>
                    <p className="text-white/60">
                      We will review your application and get back to you within 24-48 hours.
                    </p>
                  </>
                )}
              </motion.div>
            ) : (
              <>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-white/50 mb-2">
                    <span>Step {currentStep + 1} of {formSteps.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-6">
                      {currentFormStep.question}
                    </h3>

                    {/* Radio Options */}
                    {currentFormStep.type === "radio" && currentFormStep.options && (
                      <div className="space-y-3">
                        {currentFormStep.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full p-4 rounded-xl text-left transition-all ${
                              formData[currentStep] === option
                                ? "bg-white text-[#1a4a4a]"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Dropdown */}
                    {currentFormStep.type === "dropdown" && currentFormStep.options && (
                      <div className="relative">
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full p-4 rounded-xl bg-white/10 text-white text-left flex items-center justify-between hover:bg-white/20 transition-colors"
                        >
                          <span className={formData[currentStep] ? "text-white" : "text-white/50"}>
                            {formData[currentStep] || "Select an option"}
                          </span>
                          <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        {dropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a4a4a] border border-white/20 rounded-xl overflow-hidden z-10 max-h-60 overflow-y-auto">
                            {currentFormStep.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  handleOptionSelect(option);
                                  setDropdownOpen(false);
                                }}
                                className="w-full p-4 text-left text-white hover:bg-white/10 transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Number Input */}
                    {currentFormStep.type === "number" && (
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData[currentStep] || ""}
                        onChange={(e) => handleNumberChange(e.target.value)}
                        placeholder="Enter a number"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl"
                      />
                    )}

                    {/* Text Input */}
                    {currentFormStep.type === "text" && (
                      <Input
                        type="text"
                        value={formData[currentStep] || ""}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={currentFormStep.placeholder}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl"
                      />
                    )}

                    {/* Email Input */}
                    {currentFormStep.type === "email" && (
                      <Input
                        type="email"
                        value={formData[currentStep] || ""}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={currentFormStep.placeholder}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl"
                      />
                    )}

                    {/* Phone Input */}
                    {currentFormStep.type === "phone" && (
                      <Input
                        type="tel"
                        value={formData[currentStep] || ""}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={currentFormStep.placeholder}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl"
                      />
                    )}

                    {/* Error message */}
                    {showError && (
                      <p className="text-red-400 text-sm mt-3">{getValidationErrorMessage()}</p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 h-14 rounded-xl"
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`flex-1 bg-white text-[#1a4a4a] hover:bg-white/90 h-14 rounded-xl ${currentStep === 0 ? "w-full" : ""}`}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : currentStep === formSteps.length - 1 ? (
                      "Submit Application"
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
