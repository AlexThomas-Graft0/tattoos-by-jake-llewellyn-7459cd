import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { FlashCatalog } from "@/components/FlashCatalog";
import { AboutPolicies } from "@/components/AboutPolicies";
import { BookingInquiry } from "@/components/BookingInquiry";
import { FAQContact } from "@/components/FAQContact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Tattoos by Jake Llewellyn\",\"description\":\"Tattoos by Jake Llewellyn\",\"url\":\"https://tattoos-by-jake-llewellyn-7459cd.duckbyte.co\"}" }} />
      <Navbar />
      <div id="hero-section" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <HeroSection />
        </Suspense>
      </div>
      <div id="process-timeline" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <ProcessTimeline />
        </Suspense>
      </div>
      <div id="portfolio-gallery" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <PortfolioGallery />
        </Suspense>
      </div>
      <div id="flash-catalog" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <FlashCatalog />
        </Suspense>
      </div>
      <div id="about-policies" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AboutPolicies />
        </Suspense>
      </div>
      <div id="booking-inquiry" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <BookingInquiry />
        </Suspense>
      </div>
      <div id="faqcontact" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <FAQContact />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
