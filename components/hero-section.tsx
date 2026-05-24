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
  {
    name: "Jose Rosario",
    company: "Home Remodeling",
    text: "Excellent experience from start to finish. The team was responsive, transparent, and clearly cared about the results.",
    rating: 5,
  },
  {
    name: "Mike Torres",
    company: "Welding",
    text: "They actually listen, communicate clearly, and deliver results. The ROI is undeniable!",
    rating: 5,
  },
  {
    name: "Ozzy",
    company: "Landscape & Pool Builders",
    text: "Best of the best, we've worked with Noah the past few months and our sales have grown 50% more.",
    rating: 5,
  },
  {
    name: "David Chen",
    company: "Hardscaper",
    text: "Professional team that understands our industry. Lead quality improved dramatically within weeks.",
    rating: 5,
  },
  {
    name: "Alex Peterson",
    company: "Real Estate",
    text: "This agency has exceeded my expectations. There has been a very noticeable improvement in the number and quality of leads.",
    rating: 5,
  },
  {
    name: "Phil Hendricks",
    company: "Healthcare",
    text: "They actually listen, communicate clearly, and deliver results. The ROI is undeniable!",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    company: "Legal",
    text: "Professional team that understands business growth. Our lead quality improved dramatically within weeks.",
    rating: 5,
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
    // Safeguard: Explicitly check that position matches qualified value
    const position = formData[0];
    if (!position || typeof position !== 'string') return false;
    return position.trim() === QUALIFIED_POSITION;
  };

  const trackFacebookConversion = () => {
    // Double-check qualification before tracking
    if (!isQualifiedLead()) {
      return;
    }
    
    // Track Lead event in Facebook Pixel
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
    // Final safeguard: Only submit if truly qualified
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
        // Track Facebook conversion only after successful webhook submission
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
    // Remove all non-numeric characters and check if we have at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  const isStepValid = () => {
    const value = formData[currentStep];
    if (value === undefined || value.trim() === "") {
      return false;
    }

    // Additional validation for email
    if (currentFormStep.type === "email") {
      return isValidEmail(value);
    }

    // Additional validation for phone
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
    // Only allow numbers
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
      // Check if qualified lead before submitting
      if (isQualifiedLead()) {
        // Submit form to webhook only for qualified leads
        await submitToWebhook();
      } else {
        // Disqualified - show not a good fit message
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
    <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-16 md:pt-24"
          >
            <h1 className="font-[family-name:var(--font-poppins)] text-foreground leading-[1.1] mb-6 text-left">
              <span className="block text-5xl md:text-7xl lg:text-[140px] font-bold">Stop Chasing Cheap,</span>
              <span className="block text-5xl md:text-7xl lg:text-[140px] font-bold">Shared Leads.</span>
              <span className="block text-4xl md:text-5xl lg:text-[64px] font-semibold mt-2">Get Exclusive</span>
              <span className="block text-4xl md:text-5xl lg:text-[64px] font-semibold">$5k-$50k Jobs</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed font-medium">
              More leads, More Sales and Better Systems.
            </p>

            <Button
              size="lg"
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-lg group mb-10"
            >
              Book a Free Discovery Call
              <ArrowRight className="ml-2 w-5 h-5 animate-[bounceX_1s_ease-in-out_infinite]" />
            </Button>

            {/* Reviews Carousel */}
            <div className="mt-6">
              {/* Desktop: Show 4 reviews */}
              <div className="hidden lg:grid grid-cols-4 gap-3">
                {reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-card border-2 border-foreground rounded-xl p-4"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-[18px] leading-relaxed mb-3 line-clamp-3">
                      &quot;{review.text}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground text-sm font-semibold">
                          {review.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-[20px]">{review.name}</p>
                        <p className="text-[16px] text-muted-foreground">{review.company}</p>
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
                    className="bg-card border-2 border-foreground rounded-xl p-4 cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: reviews[currentReviewIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-[18px] leading-relaxed mb-3">
                      &quot;{reviews[currentReviewIndex].text}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground text-sm font-semibold">
                          {reviews[currentReviewIndex].name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-[20px]">{reviews[currentReviewIndex].name}</p>
                        <p className="text-[16px] text-muted-foreground">{reviews[currentReviewIndex].company}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                {/* Navigation controls */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={goToPrevReview}
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {/* Dots indicator */}
                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setUserInteracted(true);
                          setCurrentReviewIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentReviewIndex ? "bg-primary" : "bg-border"
                        }`}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={goToNextReview}
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Review counter */}
                <p className="text-center text-muted-foreground text-sm mt-2">
                  {currentReviewIndex + 1} of {reviews.length} reviews
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Multi-step Form */}
          <motion.div
            id="hero-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border-2 border-foreground rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                {isDisqualified ? (
                  <>
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">🤝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Thanks for Your Interest</h3>
                    <p className="text-muted-foreground">
                      Based on your responses, we may not be the best fit for your needs at this time. We work exclusively with business owners and CEOs who are ready to scale their operations.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                    <p className="text-muted-foreground">
                      We&apos;ve received your information and will be in touch within 24 hours.
                    </p>
                  </>
                )}
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground border border-foreground rounded-full mb-3">
                    <span className="text-background text-[16px] font-medium">🚀Unleash Your Growth Potential</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    CHECK OFF THE OPTION YOU&apos;RE LOOKING FOR BELOW
                  </h3>
                  <p className="text-muted-foreground">And We&apos;ll Do The Rest!</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Step {currentStep + 1} of {formSteps.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      {currentFormStep.question}
                      <span className="text-destructive ml-1">*</span>
                    </h4>

                    {/* Radio Options */}
                    {currentFormStep.type === "radio" && currentFormStep.options && (
                      <div className="space-y-3 mb-6">
                        {currentFormStep.options.map((option, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                              formData[currentStep] === option
                                ? "bg-primary/10 border-primary text-foreground"
                                : "bg-secondary/50 border-border text-foreground hover:border-primary/50 hover:bg-secondary"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              formData[currentStep] === option
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/50"
                            }`}>
                              {formData[currentStep] === option && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 bg-white rounded-full"
                                />
                              )}
                            </div>
                            <span className="font-medium">{option}</span>
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Number Input */}
                    {currentFormStep.type === "number" && (
                      <div className="mb-6">
                        <div className="relative">
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="Enter number of jobs"
                            value={formData[currentStep] || ""}
                            onChange={(e) => handleNumberChange(e.target.value)}
                            className="w-full p-4 text-lg border-2 rounded-xl focus:border-primary focus:ring-primary h-14"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const current = parseInt(formData[currentStep] || "0");
                                if (current > 0) handleNumberChange(String(current - 1));
                              }}
                              className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground font-bold"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const current = parseInt(formData[currentStep] || "0");
                                handleNumberChange(String(current + 1));
                              }}
                              className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dropdown Select */}
                    {currentFormStep.type === "dropdown" && currentFormStep.options && (
                      <div className="mb-6 relative">
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className={`w-full p-4 text-left border-2 rounded-xl flex items-center justify-between transition-all ${
                            formData[currentStep]
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-secondary/50 border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-medium">
                            {formData[currentStep] || (currentFormStep.question.includes("company") ? "Select your company type" : "Select an option")}
                          </span>
                          <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
                            >
                              {currentFormStep.options.map((option, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => {
                                    handleOptionSelect(option);
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full p-4 text-left hover:bg-primary/10 transition-colors flex items-center gap-3 ${
                                    formData[currentStep] === option ? "bg-primary/10 text-primary" : "text-foreground"
                                  }`}
                                >
                                  {formData[currentStep] === option && (
                                    <Check className="w-4 h-4 text-primary" />
                                  )}
                                  <span className={formData[currentStep] === option ? "font-medium" : ""}>
                                    {option}
                                  </span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Text Input (Name) */}
                    {currentFormStep.type === "text" && (
                      <div className="mb-6">
                        <Input
                          type="text"
                          placeholder={currentFormStep.placeholder}
                          value={formData[currentStep] || ""}
                          onChange={(e) => handleTextChange(e.target.value)}
                          className={`w-full p-4 text-lg border-2 rounded-xl h-14 ${
                            showError && !formData[currentStep] ? "border-destructive" : "focus:border-primary"
                          }`}
                        />
                      </div>
                    )}

                    {/* Email Input */}
                    {currentFormStep.type === "email" && (
                      <div className="mb-6">
                        <Input
                          type="email"
                          placeholder={currentFormStep.placeholder}
                          value={formData[currentStep] || ""}
                          onChange={(e) => handleTextChange(e.target.value)}
                          className={`w-full p-4 text-lg border-2 rounded-xl h-14 ${
                            showError && !formData[currentStep] ? "border-destructive" : "focus:border-primary"
                          }`}
                        />
                      </div>
                    )}

                    {/* Phone Input */}
                    {currentFormStep.type === "phone" && (
                      <div className="mb-6">
                        <Input
                          type="tel"
                          placeholder={currentFormStep.placeholder}
                          value={formData[currentStep] || ""}
                          onChange={(e) => handleTextChange(e.target.value)}
                          className={`w-full p-4 text-lg border-2 rounded-xl h-14 ${
                            showError && !formData[currentStep] ? "border-destructive" : "focus:border-primary"
                          }`}
                        />
                      </div>
                    )}

                    {/* Error Message */}
                    {showError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-sm mb-4"
                      >
                        {getValidationErrorMessage()}
                      </motion.p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex-1 py-6 border-2"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 transition-all ${
                      !isStepValid() || isSubmitting ? "opacity-70" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : currentStep === formSteps.length - 1 ? "Submit" : "Next"}
                    {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>

                {/* Experience Badge */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <span className="text-2xl font-bold text-primary">6+</span>
                    <span className="text-sm text-muted-foreground">Years Experience</span>
                  </div>
                </div>

                {/* No commitment text */}
                <p className="text-center text-muted-foreground text-sm mt-4">
                  No commitment required. Just a conversation about your growth.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
