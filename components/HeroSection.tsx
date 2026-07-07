'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Bell, 
  ShieldAlert,
  Layers
} from 'lucide-react';

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  category: string;
  status: string;
  alt: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560707303-4e980c87f846?auto=format&fit=crop&w=1200&q=80',
    title: 'The Bramble & Rose',
    category: 'Fine-Line Illustrative',
    status: 'Healed 12 months',
    alt: 'Close-up of a detailed botanical thigh piece tattoo representing bramble and rose'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    title: 'The Sentinel Raven',
    category: 'Bold Blackwork',
    status: 'Fresh',
    alt: 'Large raven on a shoulder blade tattoo with deep black shades'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&w=1200&q=80',
    title: "The Adder's Coil",
    category: 'Color Neo-Traditional',
    status: 'Healed 6 months',
    alt: 'Full color snake wrapped around a forearm tattoo with warm ochre and red tones'
  }
];

export function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [emailInput, setEmailInput] = useState<string>('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setWaitlistSubmitted(true);
      setTimeout(() => {
        setWaitlistSubmitted(false);
        setEmailInput('');
      }, 5000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen bg-[#121212] text-[#F5F5F0] overflow-hidden flex flex-col selection:bg-[#C85A17] selection:text-[#F5F5F0] font-sans"
    >
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
        <div className="absolute top-1/4 left-10 w-96 h-96 border-2 border-[#C85A17] rounded-none rotate-12" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 border-2 border-[#F5F5F0] rounded-none -rotate-12" />
      </div>

      {/* DYNAMIC BOOKING STATUS BANNER */}
      <div 
        className={`w-full z-50 transition-colors duration-300 ${
          bookingOpen 
            ? 'bg-[#1C1C1C] border-b-2 border-[#C85A17]' 
            : 'bg-[#121212] border-b-2 border-[#444444]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            {bookingOpen ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85A17] text-[#F5F5F0] text-xs font-mono font-bold tracking-widest uppercase border border-black">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                BOOKS OPEN
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#333333] text-[#F5F5F0] text-xs font-mono font-bold tracking-widest uppercase border border-[#444444]">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                BOOKS CLOSED
              </span>
            )}
            <p className="text-sm font-medium text-[#F5F5F0] tracking-wide max-w-2xl">
              {bookingOpen 
                ? 'Jake is currently accepting custom inquiries and flash bookings for the upcoming season.'
                : 'Custom books are currently closed. Secure your spot on the priority notification list.'}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            {bookingOpen ? (
              <a 
                href="#booking-inquiry" 
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#C85A17] hover:text-[#F5F5F0] transition-colors group"
              >
                Book Your Session Now 
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex w-full sm:w-auto items-center border-2 border-[#444444] bg-[#1C1C1C]">
                {waitlistSubmitted ? (
                  <div className="px-4 py-1.5 text-xs font-mono text-[#C85A17] flex items-center gap-2">
                    <Check className="w-3.5 h-3.5" /> Added to Waitlist!
                  </div>
                ) : (
                  <>
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="bg-transparent px-3 py-1.5 text-xs text-[#F5F5F0] focus:outline-none placeholder:text-[#666666] w-full sm:w-48 font-mono"
                    />
                    <button 
                      type="submit" 
                      className="bg-[#444444] hover:bg-[#C85A17] text-[#F5F5F0] text-xs font-mono font-bold uppercase px-4 py-1.5 border-l-2 border-[#444444] transition-colors whitespace-nowrap"
                    >
                      Join Waitlist
                    </button>
                  </>
                )}
              </form>
            )}

            {/* DEV TOOL TOGGLE BANNER STATE */}
            <button
              onClick={() => setBookingOpen(!bookingOpen)}
              title="Toggle booking status for preview"
              className="p-1 border border-[#444444] hover:border-[#C85A17] text-[#666666] hover:text-[#C85A17] transition-colors"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* GLOBAL NAVIGATION */}
      <nav className="w-full bg-[#121212]/90 backdrop-blur-md border-b-2 border-[#1C1C1C] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <a href="#hero-section" className="group">
                <span className="font-serif text-2xl tracking-wide font-bold text-[#F5F5F0] group-hover:text-[#C85A17] transition-colors">
                  JAKE <span className="italic text-[#C85A17] group-hover:text-[#F5F5F0] transition-colors">LLEWELLYN</span>
                </span>
                <span className="block text-[9px] font-mono tracking-[0.3em] text-[#888888] uppercase">
                  Fine Art & Permanent Tattooing
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#process-timeline" className="text-sm font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase">
                The Process
              </a>
              <a href="#portfolio-gallery" className="text-sm font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase">
                Portfolio
              </a>
              <a href="#flash-catalog" className="text-sm font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase">
                Available Flash
              </a>
              <a href="#about-policies" className="text-sm font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase">
                Policies & Bio
              </a>
              <a href="#faqcontact" className="text-sm font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase">
                FAQ & Contact
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a 
                href="#booking-inquiry" 
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#C85A17] hover:bg-[#B04E12] text-[#F5F5F0] font-mono text-xs uppercase tracking-widest font-bold border-2 border-black hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 shadow-[3px_3px_0px_0px_#F5F5F0] hover:shadow-[5px_5px_0px_0px_#F5F5F0] transition-all"
              >
                Inquire Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 border-2 border-[#1C1C1C] text-[#F5F5F0] hover:border-[#C85A17] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#1C1C1C] border-b-2 border-[#C85A17]"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                <a 
                  href="#process-timeline" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase"
                >
                  The Process
                </a>
                <a 
                  href="#portfolio-gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase"
                >
                  Portfolio
                </a>
                <a 
                  href="#flash-catalog" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase"
                >
                  Available Flash
                </a>
                <a 
                  href="#about-policies" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase"
                >
                  Policies & Bio
                </a>
                <a 
                  href="#faqcontact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-mono tracking-wider hover:text-[#C85A17] transition-colors uppercase"
                >
                  FAQ & Contact
                </a>
                <div className="pt-2">
                  <a 
                    href="#booking-inquiry" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-3 bg-[#C85A17] text-[#F5F5F0] font-mono text-sm uppercase tracking-widest font-bold border-2 border-black"
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO HERO BODY SECTION */}
      <div className="flex-grow flex items-center py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: HERO TEXT */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-8"
            >
              {/* Dynamic decorative badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
                <span className="w-12 h-[1px] bg-[#C85A17]" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C85A17] font-bold">
                  {bookingOpen ? 'Accepting Custom & Flash Projects' : 'Waitlist Now Open'}
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                variants={itemVariants}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#F5F5F0]"
              >
                Illustrative tattooing <br />
                <span className="italic text-[#C85A17] font-normal font-serif">built to last</span> a lifetime.
              </motion.h1>

              {/* Subcopy */}
              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg text-[#D5D5D0] font-sans leading-relaxed max-w-2xl"
              >
                Custom illustrative, bold blackwork, and neo-traditional tattoo art designed specifically for your body. No chaotic DMs. No endless waiting. Just clean lines, a safe studio space, and a streamlined booking process.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <a 
                  href="#booking-inquiry" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#C85A17] hover:bg-[#B04E12] text-[#F5F5F0] font-mono text-sm uppercase tracking-widest font-bold border-2 border-black hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[4px_4px_0px_0px_#F5F5F0] hover:shadow-[6px_6px_0px_0px_#F5F5F0] transition-all text-center"
                >
                  Request a Custom Session
                </a>
                <a 
                  href="#flash-catalog" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-[#1C1C1C] text-[#F5F5F0] font-mono text-sm uppercase tracking-widest font-bold border-2 border-[#C85A17] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[4px_4px_0px_0px_#C85A17] hover:shadow-[6px_6px_0px_0px_#C85A17] transition-all text-center"
                >
                  Browse Available Flash
                </a>
              </motion.div>

              {/* Studio Trust Points */}
              <motion.div 
                variants={itemVariants} 
                className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-[#1C1C1C] max-w-xl"
              >
                <div>
                  <span className="block font-serif text-2xl text-[#C85A17]">100%</span>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#888888]">Vegan Ink & Products</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#C85A17]">Private</span>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#888888]">Quiet Studio Environment</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#C85A17]">Autonomy</span>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#888888]">Safe & Inclusive Space</span>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: RECENT WORKS CAROUSEL */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="relative border-2 border-[#C85A17] bg-[#1C1C1C] p-3 shadow-[8px_8px_0px_0px_#1C1C1C] group">
                {/* Header info bar inside the card frame */}
                <div className="flex items-center justify-between border-b-2 border-[#C85A17] pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C85A17]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F5F5F0] font-bold">
                      Selected Studio Highlight
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#888888]">
                    0{currentSlide + 1} / 0{carouselItems.length}
                  </span>
                </div>

                {/* Main Carousel Image Viewport */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black border border-neutral-800">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={carouselItems[currentSlide].image}
                      alt={carouselItems[currentSlide].alt}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover object-center filter grayscale contrast-115 hover:grayscale-0 transition-all duration-700"
                    />
                  </AnimatePresence>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-[#121212]/95 border-t-2 border-[#C85A17] p-4">
                    <span className="inline-block px-2.5 py-0.5 bg-[#C85A17] text-[#F5F5F0] text-[9px] font-mono tracking-wider uppercase mb-1.5">
                      {carouselItems[currentSlide].category}
                    </span>
                    <h3 className="font-serif text-xl text-[#F5F5F0] tracking-wide">
                      {carouselItems[currentSlide].title}
                    </h3>
                    <p className="font-mono text-[11px] text-[#888888] mt-0.5">
                      Status: <span className="text-[#F5F5F0]">{carouselItems[currentSlide].status}</span>
                    </p>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t-2 border-[#121212]">
                  <p className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                    Recent works from the studio
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevSlide}
                      className="p-1.5 border-2 border-[#C85A17] bg-[#121212] text-[#F5F5F0] hover:bg-[#C85A17] transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="p-1.5 border-2 border-[#C85A17] bg-[#121212] text-[#F5F5F0] hover:bg-[#C85A17] transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary micro-copy underneath carousel */}
              <p className="text-[11px] font-mono text-[#666666] mt-4 text-center leading-relaxed">
                Every piece is custom-tailored to flow naturally with the contours of the body. Saturated blacks, intentional line weights, and clean healing.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}