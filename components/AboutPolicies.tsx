'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Coffee, 
  Moon, 
  Droplet, 
  Sun, 
  ArrowRight,
  User,
  Flame,
  Info
} from 'lucide-react';

interface PolicyItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  points: string[];
}

interface PrepStep {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

interface AftercarePhase {
  phase: string;
  timeframe: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  rules: string[];
}

export function AboutPolicies() {
  const [activePhase, setActivePhase] = useState<number>(0);

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

  const policies: PolicyItem[] = [
    {
      id: 'deposit',
      title: 'The Deposit Policy',
      subtitle: 'Securing our creative time together',
      icon: ShieldCheck,
      points: [
        'All bookings require a non-refundable deposit ($100 for flash, $150 for custom pieces).',
        'The deposit is applied directly to the final cost of your tattoo on the day of your session.',
        'If you need to reschedule, you must notify me at least 48 hours before your appointment.',
        'Failure to notify within 48 hours results in deposit forfeiture; a new deposit will be required to rebook.',
      ],
    },
    {
      id: 'inclusivity',
      title: 'Inclusivity & Safe Space',
      subtitle: 'Your body, your autonomy, respected',
      icon: HeartHandshake,
      points: [
        'My studio is an intentionally safe, inclusive environment for all races, body types, gender identities, abilities, and orientations.',
        'No discriminatory language, behavior, or imagery is tolerated under any circumstances.',
        'Specific accommodations (wheelchair access, low-sensory setup, frequent pain breaks) can be requested on your booking form.',
      ],
    },
    {
      id: 'sterile',
      title: 'Sterile & Vegan Standards',
      subtitle: 'Clinical safety paired with ethical tools',
      icon: Sparkles,
      points: [
        'I use hospital-grade autoclave sterilization and strictly single-use, medical-grade disposable needles.',
        'All inks, stencils, glides, skin preps, and aftercare products used in the studio are 100% vegan and cruelty-free.',
        'Cleanliness is absolute. We exceed all local health department standards to ensure zero risk.',
      ],
    },
  ];

  const prepSteps: PrepStep[] = [
    {
      title: 'The Night Before',
      icon: Moon,
      items: [
        'Get at least 7-8 hours of solid sleep to help manage your body\'s adrenaline response.',
        'Do not drink alcohol. Alcohol thins your blood, increases bleeding, dilutes the ink, and complicates healing.',
        'Drink plenty of water to hydrate your skin from the inside out, making it much more receptive to the needle.',
      ],
    },
    {
      title: 'The Day Of',
      icon: Coffee,
      items: [
        'Eat a clean, heavy meal 1-2 hours before your session. High blood sugar prevents lightheadedness.',
        'Wear comfortable, loose clothing that allows easy, clean access to the designated tattoo area.',
        'Bring a water bottle, sugary snacks (fruit, candy, or juice), and headphones if you prefer to zone out.',
      ],
    },
    {
      title: 'Numbing Creams',
      icon: AlertCircle,
      items: [
        'If you plan to use a prescription numbing cream, you must notify me in advance.',
        'Some chemical creams alter skin texture and elasticity, affecting how the skin holds ink.',
        'We will discuss safe application timelines to ensure your final design remains flawless.',
      ],
    },
  ];

  const aftercarePhases: AftercarePhase[] = [
    {
      phase: 'Phase 1',
      timeframe: 'Day 1 - 3',
      title: 'The Fresh Wound',
      icon: Droplet,
      description: 'The first 72 hours are critical for setting the foundation of a clean heal and preventing early infections.',
      rules: [
        'Leave your protective film (Saniderm) on for 24 hours (up to 4 days), unless it leaks fluid or peels back to expose raw skin. If it leaks, remove immediately.',
        'Wash gently with warm water and an unscented, antibacterial liquid soap (like Dial Gold). Use clean hands only—no washcloths.',
        'Pat dry with a clean, single-use paper towel. Do not rub. Let it air dry for 10 minutes.',
        'Apply an incredibly thin layer of Aquaphor or dedicated tattoo ointment. Skin should look slightly damp, never greasy or wet.',
      ],
    },
    {
      phase: 'Phase 2',
      timeframe: 'Day 4 - 14',
      title: 'The Peeling Phase',
      icon: Sun,
      description: 'Your tattoo will begin to dry, flake, peel, and feel intensely itchy. This is completely normal.',
      rules: [
        'Do not scratch, pick, or peel the flaking skin. Pulling flakes off prematurely can pull ink out of the dermis, leaving permanent blank spots.',
        'Switch from heavy ointment to a plain, unscented daily lotion (such as Lubriderm or Aveeno).',
        'Apply a thin layer 2-3 times a day whenever the skin feels tight, dry, or itchy.',
      ],
    },
    {
      phase: 'Phase 3',
      timeframe: 'Week 3 & Beyond',
      title: 'Long-Term Care',
      icon: Flame,
      description: 'Your skin is closed, but the deeper tissue is still settling. Maintenance now preserves brilliance for decades.',
      rules: [
        'Keep the tattoo completely out of direct sunlight for the first 4 weeks.',
        'Once fully healed, always apply a high-SPF sunscreen over the tattoo when outdoors. UV rays break down pigments over time.',
        'Strictly avoid swimming pools, hot tubs, ocean water, or soaking in baths for at least 2-3 weeks. Normal showering is fine.',
      ],
    },
  ];

  return (
    <section 
      id="about-policies" 
      className="relative bg-[#121212] text-[#F5F5F0] py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-[#1C1C1C] overflow-hidden"
    >
      {/* Background Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between px-8">
        <div className="w-[1px] bg-[#F5F5F0] h-full" />
        <div className="w-[1px] bg-[#F5F5F0] h-full" />
        <div className="w-[1px] bg-[#F5F5F0] h-full" />
        <div className="w-[1px] bg-[#F5F5F0] h-full" />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto space-y-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        
        {/* SECTION 1: ABOUT JAKE */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive/Styled Image Container */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 border-2 border-[#C85A17] translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="relative bg-[#1C1C1C] border-2 border-[#F5F5F0] p-3 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1200&auto=format&fit=crop" 
                alt="Jake Llewellyn tattooing in a clean, private studio space"
                className="w-full h-[450px] object-cover grayscale contrast-125 filter hover:grayscale-0 transition-all duration-500"
              />
              <div className="mt-3 flex justify-between items-center font-mono text-xs text-[#C85A17] uppercase tracking-wider">
                <span>[ JAKE LLEWELLYN ]</span>
                <span>EST. 2018</span>
              </div>
            </div>
          </div>

          {/* Right: Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C] border border-neutral-800 text-[#C85A17] font-mono text-xs uppercase tracking-widest">
              <User className="w-3.5 h-3.5" />
              Meet Your Artist
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-none text-[#F5F5F0]">
              Intentionally drawn.<br />
              <span className="italic text-[#C85A17]">Meticulously applied.</span>
            </h2>
            
            <div className="space-y-4 font-sans text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl">
              <p>
                I believe that a tattoo is more than just an image on skin—it is a permanent alteration of your home. My journey began in fine-art illustration and printmaking, which heavily influences my approach to tattooing. I specialize in high-contrast illustrative blackwork, woodcut engraving styles, and saturated neo-traditional color work designed to age beautifully over decades.
              </p>
              <p>
                My practice is built on a foundation of respect, safety, and clear communication. I want to remove the gatekeeper culture from the tattoo industry. Whether this is your first tattoo or your fiftieth, you will receive my complete focus, a quiet and private environment, and a piece of art crafted specifically for the body you live in.
              </p>
            </div>

            <div className="pt-4">
              <a 
                href="#booking-inquiry" 
                className="inline-flex items-center gap-3 bg-[#C85A17] text-[#F5F5F0] hover:bg-[#F5F5F0] hover:text-[#121212] transition-colors duration-300 font-mono uppercase text-sm font-semibold tracking-wider px-6 py-4 border-2 border-[#C85A17] hover:border-[#F5F5F0] shadow-[4px_4px_0px_0px_#1C1C1C] hover:shadow-none focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:outline-none"
              >
                Request a Custom Session
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: STUDIO POLICIES */}
        <motion.div variants={itemVariants} className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C] border border-neutral-800 text-[#C85A17] font-mono text-xs uppercase tracking-widest">
              <span>[ Studio Standards ]</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              Clean lines, sterile spaces, safe practices.
            </h3>
            <p className="text-neutral-400 font-sans text-sm md:text-base">
              Before booking your session, please read through my standard studio policies. These are designed to ensure your physical safety and respect our mutual time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((policy) => {
              const IconComponent = policy.icon;
              return (
                <div 
                  key={policy.id}
                  className="bg-[#1C1C1C] border-2 border-neutral-800 hover:border-[#C85A17] p-6 flex flex-col justify-between transition-colors duration-300 relative group"
                >
                  <div className="absolute top-0 right-0 w-8 h-8 bg-neutral-800 group-hover:bg-[#C85A17] transition-colors duration-300 flex items-center justify-center text-[#121212] font-mono text-xs font-bold">
                    //
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#C85A17]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#F5F5F0]">{policy.title}</h4>
                      <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">{policy.subtitle}</p>
                    </div>
                    <ul className="space-y-3 pt-2 text-sm text-neutral-400 font-sans">
                      {policy.points.map((point, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-[#C85A17] font-mono text-xs select-none mt-1">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* SECTION 3: PREPARATION GUIDE */}
        <motion.div variants={itemVariants} className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C] border border-neutral-800 text-[#C85A17] font-mono text-xs uppercase tracking-widest">
              <span>[ Preparation Guide ]</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              How to prepare for your session.
            </h3>
            <p className="text-neutral-400 font-sans text-sm md:text-base">
              A great tattoo is a collaborative effort. How you prepare your body has a massive impact on your pain tolerance and how well your skin accepts the ink.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {prepSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[#1C1C1C] border-2 border-neutral-800 p-8 space-y-6 relative"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center border border-neutral-800 text-[#C85A17]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="text-xl font-serif font-bold text-[#F5F5F0]">{step.title}</h4>
                    </div>
                    <span className="font-mono text-xs text-neutral-600">0{idx + 1}</span>
                  </div>
                  <ul className="space-y-4 text-sm text-neutral-300 font-sans">
                    {step.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3 items-start">
                        <span className="text-xs font-mono text-[#C85A17] bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 mt-0.5">
                          {itemIdx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* SECTION 4: AFTERCARE TIMELINE */}
        <motion.div variants={itemVariants} className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C] border border-neutral-800 text-[#C85A17] font-mono text-xs uppercase tracking-widest">
              <span>[ Aftercare Protocol ]</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              Caring for your new tattoo.
            </h3>
            <p className="text-neutral-400 font-sans text-sm md:text-base">
              I do my best work in the studio—the rest is up to you. Follow this simple guide to ensure your tattoo heals bright, clean, and sharp.
            </p>
          </div>

          {/* Interactive Timeline Tabs */}
          <div className="bg-[#1C1C1C] border-2 border-neutral-800 p-2 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2">
              {aftercarePhases.map((phase, idx) => {
                const isActive = activePhase === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    className={`p-4 transition-all duration-200 text-center border focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:outline-none ${
                      isActive 
                        ? 'bg-[#C85A17] text-[#F5F5F0] border-[#C85A17]' 
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-[#F5F5F0] hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-mono text-xs uppercase tracking-widest opacity-80">{phase.phase}</div>
                    <div className="font-serif font-bold text-sm md:text-base mt-1">{phase.timeframe}</div>
                  </button>
                );
              })}
            </div>

            {/* Timeline Progress Bar Graphic */}
            <div className="relative h-1 bg-neutral-900 my-4 mx-2">
              <div 
                className="absolute top-0 left-0 h-full bg-[#C85A17] transition-all duration-500"
                style={{ width: `${((activePhase + 1) / aftercarePhases.length) * 100}%` }}
              />
            </div>

            {/* Active Phase details */}
            <div className="p-4 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-950 flex items-center justify-center border border-neutral-800 text-[#C85A17]">
                    {React.createElement(aftercarePhases[activePhase].icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-[#F5F5F0]">
                      {aftercarePhases[activePhase].title}
                    </h4>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      Timeline: {aftercarePhases[activePhase].timeframe}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-xs uppercase">
                  <Info className="w-3.5 h-3.5 text-[#C85A17]" />
                  Follow closely
                </div>
              </div>

              <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed">
                {aftercarePhases[activePhase].description}
              </p>

              <div className="space-y-3">
                <h5 className="font-mono text-xs text-[#C85A17] uppercase tracking-widest">Crucial Steps:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aftercarePhases[activePhase].rules.map((rule, idx) => (
                    <div key={idx} className="bg-neutral-950 p-4 border border-neutral-900 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C85A17] shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-400 font-sans leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FOOTER CALLOUT */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#1C1C1C] border-2 border-[#C85A17] p-8 md:p-12 text-center relative overflow-hidden max-w-4xl mx-auto"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-[#C85A17]" />
          <div className="space-y-6">
            <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#F5F5F0]">
              Ready to collaborate on some permanent art?
            </h4>
            <p className="text-neutral-400 font-sans max-w-xl mx-auto text-sm md:text-base">
              My books are structured to prevent chaotic back-and-forth messaging. Drop an official inquiry to secure a secure date.
            </p>
            <div>
              <a 
                href="#booking-inquiry" 
                className="inline-flex items-center gap-2 bg-[#F5F5F0] text-[#121212] hover:bg-[#C85A17] hover:text-[#F5F5F0] transition-colors duration-300 font-mono uppercase text-sm font-semibold tracking-wider px-6 py-3 border-2 border-transparent hover:border-[#F5F5F0] shadow-[4px_4px_0px_0px_#C85A17] hover:shadow-none focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:outline-none"
              >
                Inquire About a Custom Piece
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}