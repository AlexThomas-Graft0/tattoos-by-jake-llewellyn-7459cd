'use client';

import { motion, type Variants } from 'framer-motion';

interface Step {
  number: string;
  title: string;
  headline: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "THE INQUIRY",
    headline: "Submit Your Concept.",
    description: "Use the structured booking form on this site to share your idea, preferred placement, size, and reference photos. This takes under 5 minutes and eliminates messy email chains."
  },
  {
    number: "02",
    title: "THE DEPOSIT",
    headline: "Lock Your Date.",
    description: "I review your request within 48 hours. If the project matches my artistic style, I will send over open calendar dates and a secure link to pay your non-refundable deposit."
  },
  {
    number: "03",
    title: "THE DESIGN",
    headline: "Crafted for Your Skin.",
    description: "Your design is custom-drawn specifically for your body shape. I do not send designs out early to prevent digital theft, but we will review the artwork together on the morning of your session and make any micro-adjustments on the spot."
  },
  {
    number: "04",
    title: "THE SESSION",
    headline: "A Calm, Sterile Space.",
    description: "We tattoo in a private, highly sterile, welcoming environment. No high-stress shop attitudes. Just focus, comfort, and premium craftsmanship."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 18,
    },
  },
};

export function ProcessTimeline() {
  return (
    <section 
      id="process-timeline" 
      className="bg-[#121212] text-[#F5F5F0] py-24 px-6 md:px-12 lg:px-24 border-b-2 border-[#1C1C1C] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b-2 border-stone-800 pb-12 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C85A17] font-semibold block mb-3">
            [ THE PROCESS ]
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F0]">
            How we build your tattoo.
          </h2>
          <p className="font-sans text-stone-400 text-lg md:text-xl max-w-3xl mt-4 leading-relaxed">
            Getting a tattoo should not feel like an exclusive club. My process is simple, structured, and entirely transparent from the first sketch to the final heal.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="bg-[#1C1C1C] border-2 border-[#F5F5F0] p-8 flex flex-col justify-between rounded-none relative group hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_#C85A17] transition-all duration-300"
            >
              {/* Step indicator arrow for desktop */}
              {idx < 3 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[#C85A17]">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
                  </svg>
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline border-b border-stone-800 pb-4 mb-6">
                  <span className="font-mono text-4xl font-extrabold tracking-tight text-[#C85A17]">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-stone-500 font-bold">
                    {step.title}
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl font-normal text-[#F5F5F0] mb-3">
                  {step.headline}
                </h3>
                
                <p className="font-sans text-stone-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-900/50 flex justify-end">
                <span className="font-mono text-[10px] text-stone-600 tracking-widest uppercase">
                  STAGE_{step.number} // SAFE_PRACTICE
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust & Philosophy Callout */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-28 pt-20 border-t-2 border-stone-800"
        >
          {/* Left: Philosophy Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C85A17] font-semibold block mb-3">
              [ PHILOSOPHY & STANDARDS ]
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#F5F5F0] font-light">
              A safe space for permanent art.
            </h3>
            <p className="font-sans text-stone-300 text-base md:text-lg leading-relaxed mt-6">
              Your body belongs entirely to you. My studio operates under strict principles of bodily autonomy, absolute inclusivity, and clinical safety. Every skin tone, body type, and gender identity is celebrated and respected here. I use only single-use, sterile equipment and premium vegan inks to ensure your experience is as safe as it is artistic.
            </p>
            
            <div className="mt-8">
              <a
                href="#booking-inquiry"
                className="inline-block bg-[#C85A17] text-[#F5F5F0] font-mono uppercase tracking-widest text-xs font-bold px-8 py-5 border-2 border-[#F5F5F0] rounded-none hover:bg-[#F5F5F0] hover:text-[#121212] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#C85A17] transition-all duration-200"
              >
                Request a Custom Session &rarr;
              </a>
            </div>
          </div>

          {/* Right: Testimonial & Visual */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-[#1C1C1C] border-2 border-[#C85A17] p-8 md:p-10 rounded-none relative flex flex-col justify-between h-full">
              <div>
                {/* Visual Quote Icon */}
                <div className="text-[#C85A17] mb-6">
                  <svg className="w-10 h-10 fill-current opacity-80" viewBox="0 0 24 24">
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                </div>
                
                <blockquote className="font-sans italic text-stone-200 text-base md:text-lg leading-relaxed">
                  "Working with Jake was completely different from my past tattoo experiences. The studio was clean and quiet, he explained every step, checked in on my pain levels constantly, and the line work is absolutely flawless. I felt completely safe and respected throughout."
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800">
                <cite className="font-mono text-xs uppercase tracking-wider text-[#C85A17] not-italic font-bold block">
                  — Maya R., custom shoulder piece client
                </cite>
              </div>
            </div>

            {/* Premium Studio Image */}
            <div className="mt-8 border-2 border-[#F5F5F0] overflow-hidden aspect-[16/9] relative rounded-none">
              <img
                src="https://images.unsplash.com/photo-1598214813591-2089db6ff9f9?auto=format&fit=crop&w=1200&q=80"
                alt="Jake Llewellyn's sterile, professional tattoo studio space with premium equipment"
                className="object-cover w-full h-full filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-[#121212] border border-[#F5F5F0] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#F5F5F0]">
                STUDIO_HEAL_STATION
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}