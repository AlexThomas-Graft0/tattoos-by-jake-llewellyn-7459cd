'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

export function Navbar() {
  const [isBooksOpen, setIsBooksOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: 'Process', href: '#process-timeline' },
    { label: 'Portfolio', href: '#portfolio-gallery' },
    { label: 'Available Flash', href: '#flash-catalog' },
    { label: 'Policies', href: '#about-policies' },
    { label: 'FAQ & Contact', href: '#faqcontact' },
  ];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setWaitlistSubmitted(true);
      setTimeout(() => {
        setWaitlistSubmitted(false);
        setEmailInput('');
      }, 4000);
    }
  };

  const bannerVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: 'easeIn' }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col font-sans">
      {/* Dynamic Booking Status Banner */}
      <div 
        className={`w-full transition-colors duration-300 border-b-2 ${
          isBooksOpen ? 'bg-[#1C1C1C] border-[#C85A17]' : 'bg-[#121212] border-[#444444]'
        } relative z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          <AnimatePresence mode="wait">
            {isBooksOpen ? (
              <motion.div
                key="books-open"
                variants={bannerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1"
              >
                <div className="inline-flex items-center gap-1.5 self-start bg-emerald-950/80 text-emerald-400 px-2 py-0.5 border border-emerald-500/30 rounded-none font-mono tracking-wider font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  BOOKS OPEN
                </div>
                <p className="text-[#F5F5F0]/90 font-medium tracking-wide">
                  Jake is currently accepting custom inquiries and flash bookings for the upcoming season.
                </p>
                <a
                  href="#booking-inquiry"
                  className="text-[#C85A17] hover:text-[#e46b23] font-bold tracking-wider underline underline-offset-4 transition-colors uppercase sm:ml-auto"
                >
                  Book Your Session Now →
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="books-closed"
                variants={bannerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 flex-1 w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                  <div className="inline-flex items-center gap-1.5 self-start bg-amber-950/80 text-amber-500 px-2 py-0.5 border border-amber-500/30 rounded-none font-mono tracking-wider font-bold">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    BOOKS CLOSED
                  </div>
                  <p className="text-[#F5F5F0]/80 font-medium tracking-wide">
                    Custom books are currently closed. Secure your spot on the priority notification list.
                  </p>
                </div>
                
                <form onSubmit={handleWaitlistSubmit} className="flex items-center gap-2 w-full lg:w-auto max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 lg:w-64 bg-[#1C1C1C] text-[#F5F5F0] border border-[#444444] px-3 py-1.5 text-xs focus:outline-none focus:border-[#C85A17] placeholder-[#F5F5F0]/40 font-mono rounded-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#C85A17] hover:bg-[#e46b23] text-[#F5F5F0] px-4 py-1.5 font-bold uppercase tracking-wider text-[11px] transition-colors border border-[#C85A17] active:translate-y-[1px] rounded-none shrink-0"
                  >
                    {waitlistSubmitted ? 'Added!' : 'Join Waitlist'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive State Demo Toggle */}
          <div className="hidden xl:flex items-center gap-2 border-l border-[#444444] pl-4 ml-4 shrink-0">
            <span className="text-[10px] text-[#F5F5F0]/40 font-mono uppercase tracking-widest">Demo State:</span>
            <button
              onClick={() => setIsBooksOpen(!isBooksOpen)}
              className="bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white border border-[#444444] text-[10px] font-mono px-2 py-0.5 transition-all active:scale-95 hover:border-[#C85A17]"
            >
              Toggle Books
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 border-b-2 ${
          scrolled 
            ? 'bg-[#121212]/95 backdrop-blur-md py-3 border-[#C85A17]' 
            : 'bg-[#121212] py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand area */}
          <a href="#hero-section" className="flex flex-col group select-none">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-[#F5F5F0] italic group-hover:text-[#C85A17] transition-colors">
              J. Llewellyn
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#F5F5F0]/50 uppercase mt-[-2px] group-hover:text-[#F5F5F0]/80 transition-colors">
              Illustrative Tattooing
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#F5F5F0]/80 hover:text-[#C85A17] text-sm font-medium tracking-wide uppercase transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C85A17] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Call to Action + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#booking-inquiry"
              className="hidden sm:inline-flex bg-transparent hover:bg-[#C85A17] text-[#F5F5F0] border-2 border-[#C85A17] px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:text-white rounded-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              Request Custom
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 border-2 border-[#444444] hover:border-[#C85A17] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-[2px] w-full bg-[#F5F5F0] transition-transform duration-300 origin-left ${mobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`} />
                <span className={`h-[2px] w-full bg-[#F5F5F0] transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-[2px] w-full bg-[#F5F5F0] transition-transform duration-300 origin-left ${mobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden w-full bg-[#1C1C1C] border-b-2 border-[#C85A17] absolute top-full left-0 z-40 shadow-2xl flex flex-col"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#F5F5F0] hover:text-[#C85A17] text-base font-bold uppercase tracking-wider py-2 border-b border-[#444444]/45 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Secondary CTA inside mobile dropdown */}
              <div className="pt-4 flex flex-col gap-4">
                <a
                  href="#booking-inquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[#C85A17] hover:bg-[#e46b23] text-[#F5F5F0] py-3 text-sm font-bold uppercase tracking-widest transition-colors rounded-none"
                >
                  Request Custom Session
                </a>

                {/* State switch visible on mobile for high interactivity */}
                <button
                  onClick={() => setIsBooksOpen(!isBooksOpen)}
                  className="w-full text-center bg-[#121212] hover:bg-black text-[#F5F5F0]/60 hover:text-[#F5F5F0] py-2 text-[11px] font-mono uppercase tracking-widest border border-[#444444] transition-colors"
                >
                  Demo Status Toggle: {isBooksOpen ? 'Books Open' : 'Books Closed'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}