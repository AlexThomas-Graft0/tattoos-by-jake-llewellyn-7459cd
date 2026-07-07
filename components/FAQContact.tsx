'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export function FAQContact() {
  // FAQ state
  const [openId, setOpenId] = useState<string | null>('faq-1');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How do you price your tattoos?',
      answer: (
        <p className="font-sans text-sm md:text-base text-[#F5F5F0]/80 leading-relaxed">
          My tattoos are priced either by a flat piece rate (for pre-drawn flash) or an estimated hourly rate of{' '}
          <strong className="text-[#C85A17] font-semibold">$180/hour</strong> for large custom sessions. When I review your
          custom booking inquiry, I will provide an estimated price range (e.g., $500 - $700) based on the size, detail
          density, and placement. The final price will never exceed the high end of that estimate unless we make major,
          unscheduled design changes on the day of the session.
        </p>
      ),
    },
    {
      id: 'faq-2',
      question: "Do you do cover-ups or touch-ups of other artists' work?",
      answer: (
        <p className="font-sans text-sm md:text-base text-[#F5F5F0]/80 leading-relaxed">
          I do cover-ups on a very limited, case-by-case basis. Cover-ups require highly saturated blacks and specific
          placements to work successfully. I do not touch up or finish other artists&apos; work out of respect for their craft.
          If you have an old tattoo you want covered, please submit a{' '}
          <a href="#booking-inquiry" className="text-[#C85A17] underline hover:text-[#F5F5F0] transition-colors">
            custom inquiry form
          </a>{' '}
          with clear photos of the existing tattoo in bright, natural light.
        </p>
      ),
    },
    {
      id: 'faq-3',
      question: 'What is your policy on touch-ups for your own work?',
      answer: (
        <p className="font-sans text-sm md:text-base text-[#F5F5F0]/80 leading-relaxed">
          I offer <strong className="text-[#C85A17] font-semibold">one free touch-up</strong> within the first 6 months of
          your session to ensure your piece heals flawlessly. However, touch-ups are only free if you have followed the
          recommended aftercare instructions. Touch-ups on hands, feet, fingers, and elbows are not free, as skin on these
          high-friction joint areas naturally sheds ink much faster.
        </p>
      ),
    },
    {
      id: 'faq-4',
      question: 'Can I bring a friend to my appointment?',
      answer: (
        <p className="font-sans text-sm md:text-base text-[#F5F5F0]/80 leading-relaxed">
          You are welcome to bring <strong className="text-[#C85A17] font-semibold">one friend</strong> for moral support.
          Our studio space is private and quiet, so we ask that your guest remains seated in the designated waiting area
          during the active tattooing process to ensure I have a sterile, distraction-free environment to focus on your skin.
        </p>
      ),
    },
    {
      id: 'faq-5',
      question: 'What if I need to cancel or reschedule my appointment?',
      answer: (
        <p className="font-sans text-sm md:text-base text-[#F5F5F0]/80 leading-relaxed">
          If you need to reschedule, you must notify me at least <strong className="text-[#C85A17] font-semibold">48 hours</strong>{' '}
          prior to your appointment time. Your deposit will be transferred to your new date (limit of one reschedule per
          deposit). If you cancel entirely, or request a reschedule with less than 48 hours&apos; notice, your deposit is
          forfeited to cover the lost studio time and prep work.
        </p>
      ),
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate elite API response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const accordionVariants: Variants = {
    open: {
      height: 'auto',
      opacity: 1,
      marginTop: 16,
      transition: {
        height: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      transition: {
        height: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.15 },
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      id="faqcontact"
      className="bg-[#121212] text-[#F5F5F0] py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-[#F5F5F0]/10"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {/* Header Block */}
        <div className="border-b-2 border-[#C85A17] pb-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-[#C85A17] text-xs uppercase tracking-widest font-semibold block mb-3">
              [ 05 / Support &amp; Dialogue ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-none mb-4">
              Answers to your burning questions.
            </h2>
            <p className="font-sans text-base md:text-lg text-[#F5F5F0]/70">
              Everything you need to know about pricing, touch-ups, policies, and more before you get under the needle.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#booking-inquiry"
              className="inline-block bg-[#C85A17] text-[#F5F5F0] font-mono text-xs uppercase tracking-wider font-semibold py-4 px-6 border-2 border-[#C85A17] hover:bg-transparent hover:text-[#C85A17] transition-all duration-200 rounded-none active:translate-y-0.5"
            >
              Ready to Book? Submit Inquiry →
            </a>
          </div>
        </div>

        {/* Two-Column Grid: Left (FAQs) | Right (Fallback Contact Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#1C1C1C] border-2 border-[#F5F5F0]/10 hover:border-[#C85A17]/60 transition-colors duration-200 p-6 rounded-none relative overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-start justify-between gap-4 text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex gap-4 md:gap-6">
                      <span className="font-mono text-xs text-[#C85A17] pt-1">
                        0{index + 1}.
                      </span>
                      <span className="font-serif text-lg md:text-xl lg:text-2xl text-[#F5F5F0] group-hover:text-[#C85A17] transition-colors duration-200">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xl text-[#C85A17] shrink-0 transform transition-transform duration-300 select-none ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      ＋
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={accordionVariants}
                        className="overflow-hidden border-t border-[#F5F5F0]/10 pl-8 md:pl-10"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Fallback Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-[#1C1C1C] border-2 border-[#C85A17] p-8 rounded-none relative">
              {/* Decorative corner tag */}
              <div className="absolute top-0 right-0 bg-[#C85A17] text-[#F5F5F0] font-mono text-[10px] tracking-widest px-3 py-1 uppercase select-none">
                Direct Line
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-[#F5F5F0] mb-3">
                Still have questions? Drop a line.
              </h3>
              <p className="font-sans text-sm text-[#F5F5F0]/70 mb-6 leading-relaxed">
                If you have questions regarding guest spots, artistic collaborations, or media inquiries, please use the form below. For booking requests, please use the primary{' '}
                <a href="#booking-inquiry" className="text-[#C85A17] underline hover:text-[#F5F5F0] transition-colors font-medium">
                  Booking Inquiry form
                </a>.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#121212] border-2 border-[#C85A17] p-6 text-center rounded-none"
                >
                  <span className="text-3xl block mb-3">✉️</span>
                  <p className="font-serif text-lg text-[#F5F5F0] mb-2 font-semibold">
                    Message Sent Successfully
                  </p>
                  <p className="font-sans text-sm text-[#F5F5F0]/70">
                    Your message has been sent. Jake will respond to your inquiry as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 font-mono text-xs text-[#C85A17] hover:text-[#F5F5F0] transition-colors uppercase tracking-wider"
                  >
                    ← Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fallback-name" className="block font-mono text-xs text-[#F5F5F0]/70 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="fallback-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Taylor Grey"
                      className="w-full bg-[#121212] border-2 border-[#F5F5F0]/20 focus:border-[#C85A17] text-[#F5F5F0] font-sans text-sm py-3 px-4 rounded-none outline-none transition-colors placeholder:text-[#F5F5F0]/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="fallback-email" className="block font-mono text-xs text-[#F5F5F0]/70 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="fallback-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., taylor@example.com"
                      className="w-full bg-[#121212] border-2 border-[#F5F5F0]/20 focus:border-[#C85A17] text-[#F5F5F0] font-sans text-sm py-3 px-4 rounded-none outline-none transition-colors placeholder:text-[#F5F5F0]/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="fallback-subject" className="block font-mono text-xs text-[#F5F5F0]/70 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="fallback-subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Guest Spot Inquiry"
                      className="w-full bg-[#121212] border-2 border-[#F5F5F0]/20 focus:border-[#C85A17] text-[#F5F5F0] font-sans text-sm py-3 px-4 rounded-none outline-none transition-colors placeholder:text-[#F5F5F0]/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="fallback-message" className="block font-mono text-xs text-[#F5F5F0]/70 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      id="fallback-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-[#121212] border-2 border-[#F5F5F0]/20 focus:border-[#C85A17] text-[#F5F5F0] font-sans text-sm py-3 px-4 rounded-none outline-none transition-colors placeholder:text-[#F5F5F0]/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C85A17] text-[#F5F5F0] font-mono text-xs uppercase tracking-wider font-semibold py-4 px-6 border-2 border-[#C85A17] hover:bg-transparent hover:text-[#C85A17] transition-all duration-200 rounded-none active:translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Dispatching Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}