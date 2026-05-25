import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
import { GrowthCTASection } from "@/components/growth-cta-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PricingSection />
      <GrowthCTASection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
