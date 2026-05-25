"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

// Client logos for marquee - using actual client logos
const clientLogos = [
  {
    name: "AZ Elite Granite LLC",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-G6kegAD164ugND1GXJp5JvtQVtzwlz.png",
    width: 120,
    height: 60,
  },
  {
    name: "Desert Valley Patio Covers",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-desert-valley_prev_ui-m7VkBygKrrIxOE6E-aOp0plN2hDuzWstFcSLP63mFIecNuA.png",
    width: 160,
    height: 60,
  },
  {
    name: "Landscaping Perez LLC",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%20copy-eVx7J8BLedihjJMFsLQhz0QBfkEr87.png",
    width: 140,
    height: 70,
  },
  {
    name: "Vibrant Vistas Landscape",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-BZdqK19fjOZy4B9ZmSV9RpmOmLTcZg.png",
    width: 180,
    height: 50,
  },
  {
    name: "Abrusci Interior & Exterior",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura_de_Pantalla_2019-04-09_a_la_s_11.07.45_a._m._360x-8miT5Db211qW5gkO5AoQeJbJDoBMdp.png",
    width: 150,
    height: 50,
  },
  {
    name: "Elegant Landscape Inc.",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elegantlandscape-zNawjRmgECfVmbjmt3d6awGUv7of63.jpg",
    width: 180,
    height: 60,
  },
  {
    name: "Desert Valley Structures",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_7g47uh7g47uh7g47-yNHwZKYa626uG35YqEowGmacLepuRy.png",
    width: 140,
    height: 70,
  },
  {
    name: "AZ Sun Covers LLC",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped-azsuncovers-logo-EPo7JoRQjmntTksuDDwZsYcA3NbbGw.webp",
    width: 120,
    height: 70,
  },
  {
    name: "CV",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2x9THaqCFsJw1KVTsp59JOMtMgU0fF.png",
    width: 70,
    height: 70,
  },
  {
    name: "5th Element Outdoor Creations",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3e0a1862-e2c1-4dd6-80ad-28b34939a073-dboighc4FISsE7mcKKrTAOvP76xN0w.png",
    width: 140,
    height: 70,
  },
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
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

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
        fullName: formData[2],
        email: formData[3],
        phone: formData[4],
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
      {/* Hero Section with Integrated Form */}
      <section className="min-h-screen flex flex-col items-center justify-start pt-24 pb-16 relative overflow-hidden gradient-bg">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f5555] via-[#1a4a4a] to-[#0d2626]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-[#3d8a8a] to-transparent rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-[#2a6666] to-transparent rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#4a9999]/20 to-transparent rounded-full blur-[80px]" 
        />
        
        {/* Accent line decorations */}
        <div className="absolute top-32 left-8 w-px h-24 bg-gradient-to-b from-white/20 to-transparent hidden lg:block" />
        <div className="absolute top-32 right-8 w-px h-24 bg-gradient-to-b from-white/20 to-transparent hidden lg:block" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          {/* Tag line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/60 text-sm uppercase tracking-[0.2em] mb-6"
          >
            A Growth Partner for Home Service Contractors
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight"
          >
            Precision is the<br />strategy.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            We build contractor businesses the way they should be built. With data guiding every decision and nothing left to guesswork.
          </motion.p>

          {/* Form - Always visible below headline */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="max-w-lg mx-auto mt-4"
          >
            {/* Form Card with enhanced styling */}
            <div className="relative">
              {/* Glow effect behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4a9999]/30 via-white/20 to-[#4a9999]/30 rounded-3xl blur-xl opacity-70" />
              
              <div className="relative glass-card rounded-3xl p-6 md:p-8 border border-white/20 backdrop-blur-xl bg-white/[0.08]">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    {isDisqualified ? (
                      <>
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">Thank you</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Thanks for Your Interest</h3>
                        <p className="text-white/60 text-sm">
                          Based on your responses, we may not be the best fit right now. We appreciate your time.
                        </p>
                      </>
                    ) : (
                      <>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30"
                        >
                          <Check className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
                        <p className="text-white/60 text-sm">
                          We will review your application and get back to you within 24-48 hours.
                        </p>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <>
                        {/* Progress indicator with step dots */}
                        <div className="mb-6">
                          <div className="flex items-center justify-center gap-2 mb-3">
                            {formSteps.map((_, index) => (
                              <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                  scale: index === currentStep ? 1.2 : 1,
                                  backgroundColor: index <= currentStep ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)",
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  index === currentStep ? "w-8" : "w-2"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-white/50 text-xs text-center">
                            Step {currentStep + 1} of {formSteps.length}
                          </p>
                        </div>

                        {/* Question */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-5 text-center">
                              {currentFormStep.question}
                            </h3>

                            {/* Radio Options - Enhanced */}
                            {currentFormStep.type === "radio" && currentFormStep.options && (
                              <div className="space-y-2">
                                {currentFormStep.options.map((option, index) => (
                                  <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleOptionSelect(option)}
                                    onMouseEnter={() => setHoveredOption(option)}
                                    onMouseLeave={() => setHoveredOption(null)}
                                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between group ${
                                      formData[currentStep] === option
                                        ? "bg-white text-[#1a4a4a] shadow-lg shadow-white/20"
                                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30"
                                    }`}
                                  >
                                    <span className="font-medium">{option}</span>
                                    <motion.div
                                      initial={false}
                                      animate={{
                                        scale: formData[currentStep] === option ? 1 : 0,
                                        opacity: formData[currentStep] === option ? 1 : 0,
                                      }}
                                      className="w-6 h-6 bg-[#1a4a4a] rounded-full flex items-center justify-center"
                                    >
                                      <Check className="w-4 h-4 text-white" />
                                    </motion.div>
                                  </motion.button>
                                ))}
                              </div>
                            )}

                            {/* Dropdown - Enhanced */}
                            {currentFormStep.type === "dropdown" && currentFormStep.options && (
                              <div className="relative">
                                <button
                                  onClick={() => setDropdownOpen(!dropdownOpen)}
                                  className={`w-full p-4 rounded-xl text-left flex items-center justify-between transition-all duration-200 border ${
                                    dropdownOpen 
                                      ? "bg-white/20 border-white/40" 
                                      : "bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20"
                                  }`}
                                >
                                  <span className={formData[currentStep] ? "text-white font-medium" : "text-white/50"}>
                                    {formData[currentStep] || "Select your industry"}
                                  </span>
                                  <motion.div
                                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronDown className="w-5 h-5 text-white/70" />
                                  </motion.div>
                                </button>
                                <AnimatePresence>
                                  {dropdownOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute top-full left-0 right-0 mt-2 bg-[#1a4a4a]/95 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden z-20 max-h-48 overflow-y-auto shadow-xl"
                                    >
                                      {currentFormStep.options.map((option, index) => (
                                        <motion.button
                                          key={option}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: index * 0.03 }}
                                          onClick={() => {
                                            handleOptionSelect(option);
                                            setDropdownOpen(false);
                                          }}
                                          className={`w-full p-3 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between ${
                                            formData[currentStep] === option ? "bg-white/10" : ""
                                          }`}
                                        >
                                          {option}
                                          {formData[currentStep] === option && (
                                            <Check className="w-4 h-4 text-white/70" />
                                          )}
                                        </motion.button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            {/* Text Input - Enhanced */}
                            {currentFormStep.type === "text" && (
                              <div className="relative">
                                <Input
                                  type="text"
                                  value={formData[currentStep] || ""}
                                  onChange={(e) => handleTextChange(e.target.value)}
                                  placeholder={currentFormStep.placeholder}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-center text-lg focus:bg-white/15 focus:border-white/40 transition-all"
                                />
                              </div>
                            )}

                            {/* Email Input - Enhanced */}
                            {currentFormStep.type === "email" && (
                              <div className="relative">
                                <Input
                                  type="email"
                                  value={formData[currentStep] || ""}
                                  onChange={(e) => handleTextChange(e.target.value)}
                                  placeholder={currentFormStep.placeholder}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-center text-lg focus:bg-white/15 focus:border-white/40 transition-all"
                                />
                              </div>
                            )}

                            {/* Phone Input - Enhanced */}
                            {currentFormStep.type === "phone" && (
                              <div className="relative">
                                <Input
                                  type="tel"
                                  value={formData[currentStep] || ""}
                                  onChange={(e) => handleTextChange(e.target.value)}
                                  placeholder={currentFormStep.placeholder}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl text-center text-lg focus:bg-white/15 focus:border-white/40 transition-all"
                                />
                              </div>
                            )}

                            {/* Error message */}
                            {showError && (
                              <motion.p 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-3 text-center"
                              >
                                {getValidationErrorMessage()}
                              </motion.p>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation - Enhanced */}
                        <div className="flex gap-3 mt-6">
                          {currentStep > 0 && (
                            <Button
                              variant="outline"
                              onClick={handlePrevious}
                              className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 h-12 rounded-xl"
                            >
                              <ArrowLeft className="mr-2 w-4 h-4" />
                              Back
                            </Button>
                          )}
                          <Button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className={`flex-1 bg-white text-[#1a4a4a] hover:bg-white/90 h-12 rounded-xl font-semibold shadow-lg shadow-white/10 ${currentStep === 0 ? "w-full" : ""}`}
                          >
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-[#1a4a4a]/30 border-t-[#1a4a4a] rounded-full"
                              />
                            ) : currentStep === formSteps.length - 1 ? (
                              "Submit Application"
                            ) : (
                              <>
                                Continue
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
        </div>
      </section>

      {/* Logo Marquee - Client Logos */}
      <section className="py-6 bg-[#0d2626] overflow-hidden border-y border-white/5">
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d2626] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d2626] to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center h-16 md:h-20"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain h-12 md:h-16 w-auto brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#0d2626] relative overflow-hidden">
        {/* Accent gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#2a5555]/30 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#1f4545]/40 to-transparent rounded-full blur-[80px]" />
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
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-[#1a4a4a] hover:bg-white/90 rounded-full px-8 py-6 font-medium"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
