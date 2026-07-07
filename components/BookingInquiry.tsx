'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  Compass, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Upload, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle,
  Clock,
  ShieldCheck,
  Info
} from 'lucide-react';

interface FormData {
  fullName: string;
  pronouns: string;
  email: string;
  phone: string;
  projectType: 'custom' | 'flash';
  selectedFlashId: string;
  concept: string;
  placement: string;
  customPlacement: string;
  size: string;
  budget: string;
  references: { name: string; size: string; preview: string }[];
  preferredDays: string[];
  agreePolicies: boolean;
  agreeDisclaimer: boolean;
}

const INITIAL_STATE: FormData = {
  fullName: '',
  pronouns: '',
  email: '',
  phone: '',
  projectType: 'custom',
  selectedFlashId: '',
  concept: '',
  placement: '',
  customPlacement: '',
  size: '',
  budget: '',
  references: [],
  preferredDays: [],
  agreePolicies: false,
  agreeDisclaimer: false,
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export function BookingInquiry() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please provide a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (formData.projectType === 'flash' && !formData.selectedFlashId) {
        newErrors.selectedFlashId = 'Please select a flash design to continue';
      }
    }

    if (currentStep === 3 && formData.projectType === 'custom') {
      if (!formData.concept.trim()) newErrors.concept = 'Please describe your concept';
      if (!formData.placement) newErrors.placement = 'Please select a body placement';
      if (formData.placement === 'Other' && !formData.customPlacement.trim()) {
        newErrors.customPlacement = 'Please specify the body placement';
      }
      if (!formData.size.trim()) newErrors.size = 'Approximate size is required';
      if (!formData.budget) newErrors.budget = 'Please select your estimated budget';
    }

    if (currentStep === 4) {
      if (formData.preferredDays.length === 0) {
        newErrors.preferredDays = 'Please select at least one preferred day';
      }
    }

    if (currentStep === 5) {
      if (!formData.agreePolicies) newErrors.agreePolicies = 'You must agree to the Studio Policies';
      if (!formData.agreeDisclaimer) newErrors.agreeDisclaimer = 'You must agree to the Skin Tone & Color Disclaimer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const current = [...prev.preferredDays];
      if (current.includes(day)) {
        return { ...prev, preferredDays: current.filter((d) => d !== day) };
      } else {
        return { ...prev, preferredDays: [...current, day] };
      }
    });
    if (errors.preferredDays) {
      setErrors((prev) => ({ ...prev, preferredDays: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(file => file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png'));
      
      if (validFiles.length + formData.references.length > 3) {
        setErrors(prev => ({ ...prev, references: 'Maximum of 3 reference images allowed' }));
        return;
      }

      const newRefs = validFiles.map(file => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        preview: URL.createObjectURL(file)
      }));

      setFormData(prev => ({
        ...prev,
        references: [...prev.references, ...newRefs]
      }));
      setErrors(prev => ({ ...prev, references: '' }));
    }
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    // Simulate API request to Supabase/backend
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setFormData(INITIAL_STATE);
    setStep(1);
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <section 
      id="booking-inquiry" 
      className="relative bg-[#121212] text-[#F5F5F0] py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-[#1C1C1C]"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1c_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Info & Context (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 bg-[#1C1C1C] border-2 border-[#C85A17] px-3 py-1 text-xs font-mono text-[#C85A17] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              Books Open
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-none text-[#F5F5F0]">
                Begin your <br />
                <span className="italic text-[#C85A17]">tattoo journey.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#F5F5F0]/70 font-sans leading-relaxed max-w-xl">
                Please fill out this form completely. The more precise details you provide about your concept, placement, size, and budget, the faster we can approve your project and lock in your date. I review all submissions on Tuesdays and Thursdays.
              </p>
            </div>

            {/* Quick Policy Notes Card */}
            <div className="bg-[#1C1C1C] border-2 border-[#444444] p-6 space-y-4 rounded-none">
              <h3 className="font-serif text-lg tracking-wide text-[#F5F5F0] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C85A17]" />
                Key Booking Terms
              </h3>
              <ul className="space-y-3 font-sans text-sm text-[#F5F5F0]/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A17] font-mono font-bold mt-0.5">01.</span>
                  <span>All bookings require a <strong className="text-[#F5F5F0]">non-refundable deposit</strong> ($100 for flash, $150 for custom pieces) to secure your date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A17] font-mono font-bold mt-0.5">02.</span>
                  <span>We require at least <strong className="text-[#F5F5F0]">48 hours notice</strong> to reschedule without forfeiting your deposit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A17] font-mono font-bold mt-0.5">03.</span>
                  <span>Designs are shown on the morning of your session. We adjust details together in the private studio.</span>
                </li>
              </ul>
              <div className="pt-2">
                <a 
                  href="#about-policies" 
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase text-[#C85A17] hover:underline"
                >
                  Read Full Studio Policies <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Interactive Progress Indicator */}
            {!isSuccess && (
              <div className="hidden lg:block space-y-3">
                <div className="text-xs font-mono text-[#F5F5F0]/50 uppercase tracking-widest">
                  Progress Outline
                </div>
                <div className="space-y-2">
                  {[
                    { num: 1, label: 'Contact Details' },
                    { num: 2, label: 'Project Classification' },
                    { num: 3, label: 'Concept & Placement' },
                    { num: 4, label: 'Scheduling Preferences' },
                    { num: 5, label: 'Agreements & Submission' },
                  ].map((s) => (
                    <div 
                      key={s.num} 
                      className={`flex items-center gap-3 transition-colors duration-200 ${
                        step === s.num 
                          ? 'text-[#C85A17]' 
                          : step > s.num 
                          ? 'text-[#F5F5F0]/80' 
                          : 'text-[#F5F5F0]/30'
                      }`}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center text-xs font-mono border-2 ${
                        step === s.num 
                          ? 'border-[#C85A17] bg-[#C85A17] text-[#F5F5F0]' 
                          : step > s.num 
                          ? 'border-[#F5F5F0]/80 bg-[#F5F5F0]/10 text-[#F5F5F0]' 
                          : 'border-[#444444] text-[#F5F5F0]/30'
                      }`}>
                        {s.num}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-mono">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Form Wizard Container (7 Cols) */}
          <div className="lg:col-span-7 bg-[#1C1C1C] border-2 border-[#444444] p-6 sm:p-10 relative">
            <AnimatePresence mode="wait" custom={direction}>
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8 py-8 text-center"
                  key="success-state"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C85A17]/10 border-2 border-[#C85A17] text-[#C85A17] mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-serif tracking-tight text-[#F5F5F0]">
                      Inquiry Received
                    </h3>
                    <p className="text-base text-[#F5F5F0]/70 max-w-md mx-auto leading-relaxed">
                      Thank you! Your inquiry has been submitted successfully. Jake will review your details within 48 hours. Please check your email inbox (and spam folder) for an automated confirmation.
                    </p>
                  </div>

                  <div className="border-t-2 border-[#444444] pt-8 max-w-md mx-auto text-left space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#C85A17]">What Happens Next?</h4>
                    <div className="space-y-3 font-sans text-sm text-[#F5F5F0]/80">
                      <p><strong>Step 1:</strong> Jake reviews your concept on Tuesday/Thursday to ensure it fits his technical illustrative style.</p>
                      <p><strong>Step 2:</strong> You receive a booking link to choose an open date and pay your secure deposit.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="border-2 border-[#C85A17] hover:bg-[#C85A17] text-[#F5F5F0] transition-colors duration-200 uppercase tracking-widest font-mono text-xs px-6 py-3"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" key="form-steps">
                  
                  {/* Step Header for Mobile */}
                  <div className="lg:hidden flex items-center justify-between border-b-2 border-[#444444] pb-4">
                    <span className="text-xs font-mono text-[#C85A17] uppercase tracking-widest">
                      Step {step} of 5
                    </span>
                    <span className="text-xs font-mono text-[#F5F5F0]/60 uppercase tracking-widest">
                      {step === 1 && 'Contact'}
                      {step === 2 && 'Project Style'}
                      {step === 3 && 'Details'}
                      {step === 4 && 'Schedule'}
                      {step === 5 && 'Verify'}
                    </span>
                  </div>

                  <motion.div
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* STEP 1: CONTACT DETAILS */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="border-b-2 border-[#444444] pb-4 hidden lg:block">
                          <h3 className="text-xl font-serif text-[#F5F5F0]">Step 1: Contact Details</h3>
                          <p className="text-xs text-[#F5F5F0]/50 font-sans mt-1">Provide your primary contact information to start.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                              Full Name <span className="text-[#C85A17]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#F5F5F0]/40">
                                <User className="w-4 h-4" />
                              </span>
                              <input
                                type="text"
                                placeholder="e.g., Avery Vance"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className={`w-full bg-[#121212] border-2 ${errors.fullName ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] pl-10 pr-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                              />
                            </div>
                            {errors.fullName && <p className="text-xs text-red-500 font-mono">{errors.fullName}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                              Pronouns <span className="text-[#F5F5F0]/40">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., they/them, she/her"
                              value={formData.pronouns}
                              onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                              className="w-full bg-[#121212] border-2 border-[#444444] focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                              Email Address <span className="text-[#C85A17]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#F5F5F0]/40">
                                <Mail className="w-4 h-4" />
                              </span>
                              <input
                                type="email"
                                placeholder="e.g., avery@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full bg-[#121212] border-2 ${errors.email ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] pl-10 pr-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                              />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 font-mono">{errors.email}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                              Phone Number <span className="text-[#C85A17]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#F5F5F0]/40">
                                <Phone className="w-4 h-4" />
                              </span>
                              <input
                                type="tel"
                                placeholder="e.g., (555) 019-2834"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`w-full bg-[#121212] border-2 ${errors.phone ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] pl-10 pr-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                              />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 font-mono">{errors.phone}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: PROJECT CLASSIFICATION */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="border-b-2 border-[#444444] pb-4 hidden lg:block">
                          <h3 className="text-xl font-serif text-[#F5F5F0]">Step 2: Project Style</h3>
                          <p className="text-xs text-[#F5F5F0]/50 font-sans mt-1">Select whether you want a custom illustration or an available pre-drawn flash.</p>
                        </div>

                        <div className="space-y-4">
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80 mb-2">
                            What style of project are you booking? <span className="text-[#C85A17]">*</span>
                          </label>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Custom Option */}
                            <label className={`relative border-2 p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                              formData.projectType === 'custom' 
                                ? 'border-[#C85A17] bg-[#C85A17]/5' 
                                : 'border-[#444444] hover:border-[#F5F5F0]/40 bg-[#121212]'
                            }`}>
                              <input
                                type="radio"
                                name="projectType"
                                value="custom"
                                checked={formData.projectType === 'custom'}
                                onChange={() => setFormData({ ...formData, projectType: 'custom', selectedFlashId: '' })}
                                className="sr-only"
                              />
                              <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-[#1C1C1C] border border-[#444444]">
                                  <Sparkles className="w-5 h-5 text-[#C85A17]" />
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.projectType === 'custom' ? 'border-[#C85A17]' : 'border-[#444444]'
                                }`}>
                                  {formData.projectType === 'custom' && <div className="w-2 h-2 rounded-full bg-[#C85A17]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-serif text-lg text-[#F5F5F0]">Custom Design</h4>
                                <p className="text-xs text-[#F5F5F0]/60 font-sans mt-1">
                                  "I want a brand-new illustration drawn specifically for me."
                                </p>
                              </div>
                            </label>

                            {/* Flash Option */}
                            <label className={`relative border-2 p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                              formData.projectType === 'flash' 
                                ? 'border-[#C85A17] bg-[#C85A17]/5' 
                                : 'border-[#444444] hover:border-[#F5F5F0]/40 bg-[#121212]'
                            }`}>
                              <input
                                type="radio"
                                name="projectType"
                                value="flash"
                                checked={formData.projectType === 'flash'}
                                onChange={() => setFormData({ ...formData, projectType: 'flash' })}
                                className="sr-only"
                              />
                              <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-[#1C1C1C] border border-[#444444]">
                                  <Compass className="w-5 h-5 text-[#C85A17]" />
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.projectType === 'flash' ? 'border-[#C85A17]' : 'border-[#444444]'
                                }`}>
                                  {formData.projectType === 'flash' && <div className="w-2 h-2 rounded-full bg-[#C85A17]" />}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-serif text-lg text-[#F5F5F0]">Available Flash Design</h4>
                                <p className="text-xs text-[#F5F5F0]/60 font-sans mt-1">
                                  "I want to claim a pre-drawn design from the catalog."
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Conditional Flash Selection Dropdown */}
                        {formData.projectType === 'flash' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2 pt-2"
                          >
                            <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                              Select Flash Design <span className="text-[#C85A17]">*</span>
                            </label>
                            <select
                              value={formData.selectedFlashId}
                              onChange={(e) => setFormData({ ...formData, selectedFlashId: e.target.value })}
                              className={`w-full bg-[#121212] border-2 ${errors.selectedFlashId ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 rounded-none font-sans`}
                            >
                              <option value="">[Select a design...]</option>
                              <option value="COMPASS-01">COMPASS-01: The Sunken Compass ($400)</option>
                              <option value="LUNA-02">LUNA-02: Skeletal Luna Moth ($350)</option>
                            </select>
                            {errors.selectedFlashId && <p className="text-xs text-red-500 font-mono">{errors.selectedFlashId}</p>}
                            <p className="text-xs text-[#F5F5F0]/50 font-sans mt-1">
                              Note: Flash designs are tattooed with minimal changes only.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* STEP 3: CONCEPT & PLACEMENT */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="border-b-2 border-[#444444] pb-4 hidden lg:block">
                          <h3 className="text-xl font-serif text-[#F5F5F0]">
                            {formData.projectType === 'custom' ? 'Step 3: Custom Design Details' : 'Step 3: Flash Placement Details'}
                          </h3>
                          <p className="text-xs text-[#F5F5F0]/50 font-sans mt-1">
                            {formData.projectType === 'custom' 
                              ? 'Tell me about the subject, placement, size, and your references.'
                              : 'Specify your desired placement and minor size preferences for this flash.'
                            }
                          </p>
                        </div>

                        {formData.projectType === 'custom' ? (
                          <>
                            {/* Custom Concept Textarea */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-end">
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Describe your tattoo concept in detail <span className="text-[#C85A17]">*</span>
                                </label>
                                <span className="text-[10px] font-mono text-[#F5F5F0]/40">Brief but descriptive</span>
                              </div>
                              <textarea
                                rows={4}
                                placeholder="I would love a realistic woodcut-style raven perched on a wild blackberry branch with heavy black shading..."
                                value={formData.concept}
                                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                                className={`w-full bg-[#121212] border-2 ${errors.concept ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                              />
                              {errors.concept && <p className="text-xs text-red-500 font-mono">{errors.concept}</p>}
                            </div>

                            {/* Placement Dropdown */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Where will this be placed? <span className="text-[#C85A17]">*</span>
                                </label>
                                <select
                                  value={formData.placement}
                                  onChange={(e) => setFormData({ ...formData, placement: e.target.value, customPlacement: '' })}
                                  className={`w-full bg-[#121212] border-2 ${errors.placement ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 rounded-none font-sans`}
                                >
                                  <option value="">[Select placement...]</option>
                                  <option value="Forearm">Forearm (Outer/Inner)</option>
                                  <option value="Upper Arm">Upper Arm / Shoulder</option>
                                  <option value="Chest Panel">Chest Panel</option>
                                  <option value="Back">Back (Full/Partial)</option>
                                  <option value="Thigh">Thigh (Outer/Front)</option>
                                  <option value="Calf">Calf / Shin</option>
                                  <option value="Other">Other (Specify below)</option>
                                </select>
                                {errors.placement && <p className="text-xs text-red-500 font-mono">{errors.placement}</p>}
                              </div>

                              {/* Approximate Size */}
                              <div className="space-y-2">
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Approximate size in inches <span className="text-[#C85A17]">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., 6"
                                  value={formData.size}
                                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                  className={`w-full bg-[#121212] border-2 ${errors.size ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                                />
                                {errors.size && <p className="text-xs text-red-500 font-mono">{errors.size}</p>}
                              </div>
                            </div>

                            {/* Conditional Custom Placement Specifier */}
                            {formData.placement === 'Other' && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2"
                              >
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Specify Placement Area <span className="text-[#C85A17]">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., Sternum, Outer Ribs, Ankle"
                                  value={formData.customPlacement}
                                  onChange={(e) => setFormData({ ...formData, customPlacement: e.target.value })}
                                  className={`w-full bg-[#121212] border-2 ${errors.customPlacement ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                                />
                                {errors.customPlacement && <p className="text-xs text-red-500 font-mono">{errors.customPlacement}</p>}
                              </motion.div>
                            )}

                            {/* Budget Range */}
                            <div className="space-y-2">
                              <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                Your estimated budget range <span className="text-[#C85A17]">*</span>
                              </label>
                              <select
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                className={`w-full bg-[#121212] border-2 ${errors.budget ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 rounded-none font-sans`}
                              >
                                <option value="">[Select budget range...]</option>
                                <option value="$300 - $500">$300 - $500</option>
                                <option value="$500 - $800">$500 - $800</option>
                                <option value="$800 - $1,200">$800 - $1,200</option>
                                <option value="$1,200+">$1,200+</option>
                              </select>
                              {errors.budget && <p className="text-xs text-red-500 font-mono">{errors.budget}</p>}
                            </div>

                            {/* Reference Images Upload */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-end">
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Upload Reference Images
                                </label>
                                <span className="text-[10px] font-mono text-[#F5F5F0]/40">Max 3 files, JPEG/PNG under 5MB</span>
                              </div>

                              <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-[#444444] hover:border-[#C85A17] bg-[#121212] p-6 text-center cursor-pointer transition-colors duration-200"
                              >
                                <Upload className="w-8 h-8 text-[#F5F5F0]/40 mx-auto mb-2" />
                                <span className="block text-sm text-[#F5F5F0]/80 font-sans">
                                  Drag & drop or <span className="text-[#C85A17] underline">browse files</span>
                                </span>
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                multiple
                                accept="image/jpeg,image/png"
                                className="hidden"
                              />

                              {errors.references && <p className="text-xs text-red-500 font-mono">{errors.references}</p>}

                              {formData.references.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                  {formData.references.map((ref, idx) => (
                                    <div key={idx} className="relative group border-2 border-[#444444] bg-[#121212] p-2">
                                      <img 
                                        src={ref.preview} 
                                        alt="Preview" 
                                        className="w-full h-20 object-cover"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeReference(idx)}
                                        className="absolute -top-2 -right-2 bg-[#C85A17] text-[#F5F5F0] p-1 border border-[#F5F5F0] hover:bg-[#121212] transition-colors"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                      <span className="block text-[9px] font-mono truncate text-[#F5F5F0]/60 mt-1">{ref.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Flash Placement Area */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Where on your body? <span className="text-[#C85A17]">*</span>
                                </label>
                                <select
                                  value={formData.placement}
                                  onChange={(e) => setFormData({ ...formData, placement: e.target.value, customPlacement: '' })}
                                  className={`w-full bg-[#121212] border-2 ${errors.placement ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 rounded-none font-sans`}
                                >
                                  <option value="">[Select placement...]</option>
                                  <option value="Forearm">Forearm (Outer/Inner)</option>
                                  <option value="Upper Arm">Upper Arm / Shoulder</option>
                                  <option value="Chest Panel">Chest Panel</option>
                                  <option value="Back">Back (Full/Partial)</option>
                                  <option value="Thigh">Thigh (Outer/Front)</option>
                                  <option value="Calf">Calf / Shin</option>
                                  <option value="Other">Other (Specify below)</option>
                                </select>
                                {errors.placement && <p className="text-xs text-red-500 font-mono">{errors.placement}</p>}
                              </div>

                              <div className="space-y-2">
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Preferred Size (Inches)
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., Keep standard size / 6 inches"
                                  value={formData.size}
                                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                  className="w-full bg-[#121212] border-2 border-[#444444] focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans"
                                />
                              </div>
                            </div>

                            {formData.placement === 'Other' && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2"
                              >
                                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                  Specify Placement Area <span className="text-[#C85A17]">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., Sternum, Outer Ribs, Ankle"
                                  value={formData.customPlacement}
                                  onChange={(e) => setFormData({ ...formData, customPlacement: e.target.value })}
                                  className={`w-full bg-[#121212] border-2 ${errors.customPlacement ? 'border-red-600' : 'border-[#444444]'} focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans`}
                                />
                                {errors.customPlacement && <p className="text-xs text-red-500 font-mono">{errors.customPlacement}</p>}
                              </motion.div>
                            )}

                            <div className="space-y-2">
                              <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                                Minor adjustments requested (if any)
                              </label>
                              <textarea
                                rows={3}
                                placeholder="e.g., I would love to place it horizontally instead of vertically..."
                                value={formData.concept}
                                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                                className="w-full bg-[#121212] border-2 border-[#444444] focus:border-[#C85A17] text-[#F5F5F0] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#666666] rounded-none font-sans"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* STEP 4: SCHEDULING */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="border-b-2 border-[#444444] pb-4 hidden lg:block">
                          <h3 className="text-xl font-serif text-[#F5F5F0]">Step 4: Scheduling Preferences</h3>
                          <p className="text-xs text-[#F5F5F0]/50 font-sans mt-1">Select the days of the week that work best for your appointment.</p>
                        </div>

                        <div className="space-y-4">
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F5F0]/80">
                            Preferred days of the week for your session <span className="text-[#C85A17]">*</span>
                          </label>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                              const isChecked = formData.preferredDays.includes(day);
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => handleDayToggle(day)}
                                  className={`border-2 p-4 text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                                    isChecked 
                                      ? 'border-[#C85A17] bg-[#C85A17]/10 text-[#C85A17]' 
                                      : 'border-[#444444] hover:border-[#F5F5F0]/40 bg-[#121212] text-[#F5F5F0]/80'
                                  }`}
                                >
                                  <Calendar className={`w-5 h-5 ${isChecked ? 'text-[#C85A17]' : 'text-[#F5F5F0]/40'}`} />
                                  <span className="text-xs font-mono uppercase tracking-wider">{day.slice(0, 3)}</span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.preferredDays && <p className="text-xs text-red-500 font-mono">{errors.preferredDays}</p>}
                        </div>

                        <div className="bg-[#121212] border border-[#444444] p-4 flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#C85A17] shrink-0 mt-0.5" />
                          <p className="text-xs text-[#F5F5F0]/70 font-sans leading-relaxed">
                            Jake tattoos primarily during daytime hours starting at 11:00 AM. Weekend dates are highly requested and fill up fast.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: AGREEMENTS & SUBMISSION */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="border-b-2 border-[#444444] pb-4 hidden lg:block">
                          <h3 className="text-xl font-serif text-[#F5F5F0]">Step 5: Final Verification & Agreements</h3>
                          <p className="text-xs text-[#F5F5F0]/50 font-sans mt-1">Review policies and submit your inquiry to secure your spot.</p>
                        </div>

                        {/* Summary Block */}
                        <div className="bg-[#121212] border-2 border-[#444444] p-5 space-y-4">
                          <h4 className="font-serif text-base text-[#F5F5F0] border-b border-[#444444] pb-2">Inquiry Summary</h4>
                          <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-sans text-xs text-[#F5F5F0]/80">
                            <div>
                              <span className="text-[#F5F5F0]/40 block font-mono uppercase">Client</span>
                              <strong>{formData.fullName}</strong> {formData.pronouns && `(${formData.pronouns})`}
                            </div>
                            <div>
                              <span className="text-[#F5F5F0]/40 block font-mono uppercase">Project Style</span>
                              <strong className="capitalize">{formData.projectType} Design</strong>
                            </div>
                            {formData.projectType === 'flash' && (
                              <div>
                                <span className="text-[#F5F5F0]/40 block font-mono uppercase">Flash ID</span>
                                <strong>{formData.selectedFlashId}</strong>
                              </div>
                            )}
                            <div>
                              <span className="text-[#F5F5F0]/40 block font-mono uppercase">Placement</span>
                              <strong>{formData.placement === 'Other' ? formData.customPlacement : formData.placement}</strong>
                            </div>
                            <div>
                              <span className="text-[#F5F5F0]/40 block font-mono uppercase">Size Preference</span>
                              <strong>{formData.size} inches</strong>
                            </div>
                            <div>
                              <span className="text-[#F5F5F0]/40 block font-mono uppercase">Preferred Days</span>
                              <strong>{formData.preferredDays.join(', ')}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Checklist & Assents */}
                        <div className="space-y-4">
                          {/* Policy Checkbox */}
                          <div className="space-y-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.agreePolicies}
                                onChange={(e) => setFormData({ ...formData, agreePolicies: e.target.checked })}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 border-2 shrink-0 flex items-center justify-center transition-colors duration-200 ${
                                formData.agreePolicies 
                                  ? 'border-[#C85A17] bg-[#C85A17] text-[#F5F5F0]' 
                                  : errors.agreePolicies ? 'border-red-600' : 'border-[#444444]'
                              }`}>
                                {formData.agreePolicies && <CheckCircle2 className="w-4 h-4" />}
                              </div>
                              <span className="text-xs text-[#F5F5F0]/80 leading-relaxed font-sans select-none">
                                I have read and agree to the <a href="#about-policies" className="text-[#C85A17] underline hover:text-[#C85A17]/80">Studio Policies</a>, including the non-refundable deposit terms, the 48-hour rescheduling policy, and the safety protocols outlined on this website. <span className="text-[#C85A17]">*</span>
                              </span>
                            </label>
                            {errors.agreePolicies && <p className="text-xs text-red-500 font-mono pl-8">{errors.agreePolicies}</p>}
                          </div>

                          {/* Skin Disclaimer Checkbox */}
                          <div className="space-y-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.agreeDisclaimer}
                                onChange={(e) => setFormData({ ...formData, agreeDisclaimer: e.target.checked })}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 border-2 shrink-0 flex items-center justify-center transition-colors duration-200 ${
                                formData.agreeDisclaimer 
                                  ? 'border-[#C85A17] bg-[#C85A17] text-[#F5F5F0]' 
                                  : errors.agreeDisclaimer ? 'border-red-600' : 'border-[#444444]'
                              }`}>
                                {formData.agreeDisclaimer && <CheckCircle2 className="w-4 h-4" />}
                              </div>
                              <span className="text-xs text-[#F5F5F0]/80 leading-relaxed font-sans select-none">
                                I understand that tattoo ink heals differently on different skin pigments, and that Jake will work with me to optimize contrast, line weights, and color palettes to best suit my skin tone. <span className="text-[#C85A17]">*</span>
                              </span>
                            </label>
                            {errors.agreeDisclaimer && <p className="text-xs text-red-500 font-mono pl-8">{errors.agreeDisclaimer}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between border-t-2 border-[#444444] pt-6 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="border-2 border-[#444444] hover:border-[#F5F5F0]/80 hover:bg-[#121212] text-[#F5F5F0] transition-colors duration-200 uppercase tracking-widest font-mono text-xs px-5 py-3 flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 5 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#C85A17] border-2 border-[#C85A17] hover:bg-transparent text-[#F5F5F0] transition-all duration-200 uppercase tracking-widest font-mono text-xs px-6 py-3 flex items-center gap-2"
                      >
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#C85A17] border-2 border-[#C85A17] hover:bg-transparent text-[#F5F5F0] transition-all duration-200 uppercase tracking-widest font-mono text-xs px-6 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#F5F5F0] border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Submit Tattoo Inquiry'
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}