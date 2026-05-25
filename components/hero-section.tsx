"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
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

// Portfolio examples - websites we've made (scrollable screenshots)
const portfolioExamples = [
  {
    title: "Aluma Covers",
    category: "Patio Covers",
    image: "/portfolio/aluma-covers.jpg",
  },
  {
    title: "360 Backyards",
    category: "Patio Covers",
    image: "/portfolio/360-backyards.jpg",
  },
  {
    title: "Luis Painting",
    category: "House Painting",
    image: "/portfolio/luis-painting.jpg",
  },
  {
    title: "Deco Abrusci",
    category: "Patio Covers",
    image: "/portfolio/deco-abrusci.jpg",
  },
  {
    title: "Deluxe Blinds",
    category: "Awnings & Outscreens",
    image: "/portfolio/deluxe-blinds.jpg",
  },
  {
    title: "Swanson",
    category: "Kitchen & Bath Remodeling",
    image: "/portfolio/swanson.jpg",
  },
  {
    title: "Saucedo's Landscape",
    category: "Landscaping",
    image: "/portfolio/saucedo-landscape.jpg",
  },
  {
    title: "CV Property Solutions",
    category: "Patio Covers",
    image: "/portfolio/cv-property-solutions.jpg",
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
  question: "What kind of company do you own?",
  type: "dropdown",
  options: ["Hardscape", "Photography", "Carpet Cleaning", "Jewelry Brand", "Clothing Brand", "Plumbing", "Vet Clinic", "Restaurant"],
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
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [portfolioUserInteracted, setPortfolioUserInteracted] = useState(false);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<string[]>(new Array(formSteps.length).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (dropdownOpen && !target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

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

  // Auto-rotate portfolio (pauses when user interacts)
  useEffect(() => {
    if (portfolioUserInteracted) return;
    const interval = setInterval(() => {
      setCurrentPortfolioIndex((prev) => (prev + 1) % portfolioExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [portfolioUserInteracted]);

  const goToNextPortfolio = () => {
    setPortfolioUserInteracted(true);
    setCurrentPortfolioIndex((prev) => (prev + 1) % portfolioExamples.length);
  };

  const goToPrevPortfolio = () => {
    setPortfolioUserInteracted(true);
    setCurrentPortfolioIndex((prev) => (prev - 1 + portfolioExamples.length) % portfolioExamples.length);
  };
  
  // Lightbox functions
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const goToNextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % portfolioExamples.length);
  };
  
  const goToPrevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + portfolioExamples.length) % portfolioExamples.length);
  };
  
  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goToNextLightbox();
      else if (e.key === 'ArrowLeft') goToPrevLightbox();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);
  
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

    try {
      // Send data to webhook
      const response = await fetch('https://services.leadconnectorhq.com/hooks/u1wGvQAHeabFrjX36spu/webhook-trigger/XAlQRcw3h4inHUwFTNz0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: formData[0],
          companyType: formData[1],
          fullName: formData[2],
          email: formData[3],
          phone: formData[4],
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook submission failed');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      // Still mark as submitted even if webhook fails to not block user
    }

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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08, type: "spring", stiffness: 300 }}
                onClick={() => {
                  handleInputChange(option);
                  // Auto-advance after selection with a slight delay
                  setTimeout(() => {
                    if (currentStep < formSteps.length - 1) {
                      setCurrentStep(currentStep + 1);
                      setError("");
                    }
                  }, 400);
                }}
                onMouseEnter={() => setHoveredOption(option)}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ scale: 1.03, x: 8, boxShadow: "0 8px 25px rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.97 }}
                className={`w-full px-5 py-4 text-left border rounded-xl transition-all duration-300 flex items-center justify-between group ${
                  currentValue === option
                    ? "border-white bg-white text-[#1a4a4a] shadow-lg"
                    : hoveredOption === option
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/20 bg-white/5 text-white"
                }`}
              >
                <span className="text-sm font-medium">{option}</span>
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: currentValue === option ? 1 : 0,
                    opacity: currentValue === option ? 1 : 0,
                    rotate: currentValue === option ? 0 : -90
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              </motion.button>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <div className="relative dropdown-container">
            <motion.button
              whileTap={{ scale: 0.99 }}
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.6)" }}
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
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <ChevronDown className={`w-5 h-5 ${dropdownOpen ? "text-white" : "text-white/50"}`} />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute left-0 right-0 mt-2 border border-white/20 bg-[#1a4a4a] rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto"
                >
                  {step.options?.map((option, idx) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.03 }}
                      onClick={() => {
                        handleInputChange(option);
                        setDropdownOpen(false);
                        // Auto-advance after selection
                        setTimeout(() => {
                          if (currentStep < formSteps.length - 1) {
                            setCurrentStep(currentStep + 1);
                            setError("");
                          }
                        }, 300);
                      }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", x: 4 }}
                      className={`w-full px-5 py-3.5 text-left text-sm transition-all duration-200 ${
                        currentValue === option
                          ? "bg-white text-[#1a4a4a] font-medium"
                          : "text-white hover:text-white"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type={step.type}
              value={currentValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={step.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentValue.trim()) {
                  handleNext();
                }
              }}
              className="w-full px-5 py-4 border border-white/20 bg-white/5 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:bg-white/10 transition-all duration-300"
              autoFocus
            />
          </motion.div>
        );

      case "phone":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="tel"
              value={currentValue}
              onChange={(e) => handleInputChange(formatPhoneNumber(e.target.value))}
              placeholder={step.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentValue.trim()) {
                  handleNext();
                }
              }}
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
            Yeah, you need a <em className="italic">website.</em>
            <span className="block h-4 md:h-6" />
            No, you{" "}
            <span className="relative inline-block">
              <span className="relative z-10">don&apos;t</span>
              {/* Hand-drawn marker underline - graffiti style */}
              <svg
                className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-3 md:h-4 pointer-events-none"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 2 7 
                     C 8 5, 15 8, 25 6 
                     C 35 4, 45 7, 55 5 
                     C 65 3, 75 6, 85 4 
                     C 92 3, 96 5, 98 6"
                  stroke="#5EE085"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                />
              </svg>
            </span>
            {" "}need to spend $3,000.
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

          {/* Multi-step Form - Solid Dark Teal Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="max-w-lg mx-auto mt-4"
          >
            {/* Form with solid teal background */}
            <div className="relative">
              <motion.div 
                className="relative bg-gradient-to-br from-[#1a4a4a] to-[#0d2626] rounded-2xl p-8 md:p-10 border-2 border-[#3d8a8a]/50"
                whileHover={{ borderColor: "rgba(61, 138, 138, 0.7)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background orbs - teal themed */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3d8a8a]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#2a6666]/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
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
                    <h2 className="font-serif text-2xl md:text-[36px] text-white text-center mb-2 leading-tight">
                      Get Your Website Made ASAP - Forget Overpaying!
                    </h2>
                    
                    {/* Form subheadline */}
                    <p className="text-white/50 text-sm text-center mb-6">
                      Fill Out our quick form! Less than 12 seconds
                    </p>

                    {/* Animated step dots - white themed */}
                    <div className="flex justify-center gap-3 mb-6">
                      {formSteps.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            if (index < currentStep) {
                              setCurrentStep(index);
                            }
                          }}
                          animate={{
                            scale: index === currentStep ? 1.2 : 1,
                          }}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentStep 
                              ? "w-10 bg-white" 
                              : index < currentStep 
                              ? "w-2.5 bg-white/70 hover:bg-white" 
                              : "w-2.5 bg-white/30"
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
                        <h3 className="font-serif text-xl md:text-[28px] text-white mb-6 text-center">
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
                          className="flex items-center text-white/60 hover:text-white text-sm transition-colors duration-300"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(255, 255, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Marquee - Black background for contrast */}
      <section className="py-6 md:py-12 bg-black overflow-hidden">
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="flex animate-marquee w-max">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 md:mx-16 flex items-center justify-center h-10 md:h-20"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={Math.round(logo.width * 1.3)}
                  height={Math.round(logo.height * 1.3)}
                  className="object-contain h-8 md:h-[84px] w-auto brightness-0 invert opacity-50 hover:opacity-80 transition-opacity duration-400"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples of Our Work Section */}
      <section id="portfolio" className="py-24 md:py-40 bg-[#0d1a1a] relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a4a]/20 via-transparent to-[#6B1F2B]/10" />
        
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            {/* Section number as design element */}
            <span className="font-serif text-[80px] md:text-[120px] font-light text-white/5 block leading-none mb-4">001</span>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-6">Our Portfolio</p>
            <h2 className="font-serif text-white text-[40px] md:text-[64px] font-medium leading-[1.0] tracking-[-0.03em]">
              Examples of Our <em className="italic">Work.</em>
            </h2>
          </motion.div>

          {/* Desktop: Show all portfolio items in a grid - Scrollable screenshots */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {portfolioExamples.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -8 }}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-[2.5rem] border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-xl cursor-pointer transition-all duration-500"
              >
                {/* Animated glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/20 to-green-600/20" />
                
                {/* Screenshot preview in phone frame */}
                <div className="relative aspect-[9/19] bg-white overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={800}
                    className="w-full h-auto object-cover object-top"
                  />
                  
                  {/* Phone notch/dynamic island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                  
                  {/* Click to expand hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to expand</span>
                  </div>
                </div>
                
                {/* Info overlay */}
                <div className="p-4 bg-black/60 backdrop-blur-sm relative z-10">
                  <h3 className="text-white font-medium text-sm mb-1 truncate">{item.title}</h3>
                  <p className="text-white/50 text-xs uppercase tracking-wide truncate">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Show 1 portfolio item at a time - Scrollable screenshot */}
          <div className="lg:hidden flex justify-center px-4">
            <div className="w-full max-w-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPortfolioIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openLightbox(currentPortfolioIndex)}
                  className="relative overflow-hidden rounded-[2rem] border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-xl cursor-pointer"
                >
                  {/* Screenshot preview in phone frame */}
                  <div className="relative aspect-[9/16] bg-white overflow-hidden">
                    <Image
                      src={portfolioExamples[currentPortfolioIndex].image}
                      alt={portfolioExamples[currentPortfolioIndex].title}
                      width={300}
                      height={600}
                      className="w-full h-auto object-cover object-top"
                    />
                    
                    {/* Phone notch/dynamic island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10" />
                    
                    {/* Tap to expand hint */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                      <span className="text-black/50 text-xs">Tap to expand</span>
                    </div>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="p-3 bg-black/60 backdrop-blur-sm relative z-10">
                    <h3 className="text-white font-medium text-sm mb-1">{portfolioExamples[currentPortfolioIndex].title}</h3>
                    <p className="text-white/50 text-xs uppercase tracking-wide">{portfolioExamples[currentPortfolioIndex].category}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile navigation controls */}
          <div className="lg:hidden flex items-center justify-center gap-6 mt-8">
              <button
                onClick={goToPrevPortfolio}
                className="w-12 h-12 border border-white/20 text-white/60 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-400 rounded-full"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-3">
                {portfolioExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPortfolioUserInteracted(true);
                      setCurrentPortfolioIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      index === currentPortfolioIndex 
                        ? "w-8 bg-emerald-500" 
                        : "w-2 bg-white/20"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNextPortfolio}
                className="w-12 h-12 border border-white/20 text-white/60 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-400 rounded-full"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevLightbox();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-white/80 transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Next arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextLightbox();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:text-white/80 transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Phone frame with scrollable screenshot */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-[280px] md:w-[320px] max-h-[85vh] rounded-[2.5rem] border-4 border-gray-800 bg-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phone notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />
              
              {/* Scrollable screenshot container */}
              <div className="h-[70vh] md:h-[75vh] overflow-y-auto scrollbar-hide">
                <Image
                  src={portfolioExamples[lightboxIndex].image}
                  alt={portfolioExamples[lightboxIndex].title}
                  width={400}
                  height={2500}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Info bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                <h3 className="text-white font-medium text-base">{portfolioExamples[lightboxIndex].title}</h3>
                <p className="text-white/60 text-sm">{portfolioExamples[lightboxIndex].category}</p>
              </div>
            </motion.div>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {portfolioExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === lightboxIndex ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
