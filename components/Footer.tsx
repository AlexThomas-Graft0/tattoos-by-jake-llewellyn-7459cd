'use client';

import React, { useState, type FormEvent } from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#121212] text-[#F5F5F0] font-sans border-t-4 border-[#C85A17] overflow-hidden">
      {/* Decorative Neo-Brutalist Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1c_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b-2 border-[#1C1C1C]"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <a 
                href="#hero-section" 
                className="inline-block text-3xl sm:text-4xl font-serif tracking-tight text-[#F5F5F0] hover:text-[#C85A17] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C85A17]"
              >
                JAKE LLEWELLYN
              </a>
              <p className="text-sm font-mono text-[#C85A17] tracking-widest uppercase">
                • Intentionally drawn. Meticulously applied.
              </p>
            </div>
            
            <p className="text-[#F5F5F0]/80 text-base max-w-md leading-relaxed">
              Custom illustrative, bold blackwork, and neo-traditional tattoo art designed specifically for your body. Operating from a private, sterile, and fully inclusive studio space.
            </p>

            {/* Social Icons with Neo-Brutalist Shadow Hover Effect */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { name: 'Instagram', url: 'https://instagram.com' },
                { name: 'Pinterest', url: 'https://pinterest.com' },
                { name: 'Thread', url: 'https://threads.net' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-4 py-2 bg-[#1C1C1C] border-2 border-[#F5F5F0] text-sm font-mono uppercase tracking-wider text-[#F5F5F0] hover:text-[#121212] transition-colors duration-200"
                >
                  <span className="relative z-10">{social.name}</span>
                  <div className="absolute inset-0 bg-[#C85A17] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-mono uppercase tracking-widest text-[#C85A17] border-b-2 border-[#1C1C1C] pb-2">
              Studio Map
            </h3>
            <ul className="space-y-3 font-mono text-sm">
              {[
                { name: 'Back to Top', href: '#hero-section' },
                { name: 'Our Process', href: '#process-timeline' },
                { name: 'Portfolio Gallery', href: '#portfolio-gallery' },
                { name: 'Available Flash', href: '#flash-catalog' },
                { name: 'Studio Policies', href: '#about-policies' },
                { name: 'Booking Inquiry', href: '#booking-inquiry' },
                { name: 'FAQ & Contact', href: '#faqcontact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center group text-[#F5F5F0]/80 hover:text-[#C85A17] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C85A17]"
                  >
                    <span className="mr-2 text-[#C85A17] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1 group-hover:translate-x-0 duration-200">
                      →
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Priority Waitlist Card */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <div className="bg-[#1C1C1C] border-2 border-[#C85A17] p-6 relative overflow-hidden">
              {/* Top Banner Status */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono tracking-widest uppercase text-emerald-400">
                  Books Status: Open
                </span>
              </div>

              <h4 className="font-serif text-xl text-[#F5F5F0] mb-2">
                Join the Priority Waitlist
              </h4>
              <p className="text-xs text-[#F5F5F0]/70 mb-4 leading-relaxed">
                Be the first to receive notifications when custom books open, guest spots are announced, and new pre-drawn flash collections drop.
              </p>

              {submitted ? (
                <div className="bg-[#121212] border border-emerald-500/30 p-4 text-center">
                  <p className="text-xs font-mono text-emerald-400">
                    ✓ SECURED. YOU ARE ON THE PRIORITY LIST.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#121212] text-[#F5F5F0] placeholder-[#F5F5F0]/40 border-2 border-[#F5F5F0] px-4 py-3 text-sm rounded-none focus:outline-none focus:border-[#C85A17] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C85A17] hover:bg-[#b04e12] active:bg-[#96420f] text-[#F5F5F0] font-mono text-xs uppercase tracking-widest py-3 border-2 border-[#C85A17] hover:border-[#b04e12] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5F5F0]"
                  >
                    {loading ? 'Securing...' : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="text-xs font-mono text-[#F5F5F0]/50">
              © 2025 JAKE LLEWELLYN. ALL RIGHTS PERMANENT.
            </p>
            <p className="text-[10px] font-mono text-[#F5F5F0]/30 tracking-wider uppercase">
              Hospital-Grade Sterilization • 100% Vegan & Cruelty-Free Inks
            </p>
          </div>

          {/* Quick Navigation Anchors */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#F5F5F0]/50">
            <a href="#about-policies" className="hover:text-[#C85A17] transition-colors">
              Deposit Terms
            </a>
            <span className="text-[#1C1C1C] hidden md:inline">|</span>
            <a href="#about-policies" className="hover:text-[#C85A17] transition-colors">
              Health & Safety
            </a>
            <span className="text-[#1C1C1C] hidden md:inline">|</span>
            <a href="#booking-inquiry" className="hover:text-[#C85A17] transition-colors">
              Custom Inquiry
            </a>
          </div>

          {/* Back to top dynamic scroll button */}
          <a
            href="#hero-section"
            aria-label="Scroll back to top"
            className="group p-3 bg-[#1C1C1C] border-2 border-[#F5F5F0] text-[#F5F5F0] hover:bg-[#C85A17] hover:border-[#C85A17] hover:text-[#121212] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C85A17]"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}