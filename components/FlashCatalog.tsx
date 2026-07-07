'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface FlashItem {
  id: string;
  title: string;
  style: string;
  minSize: string;
  price: string;
  deposit: string;
  status: 'AVAILABLE' | 'PENDING' | 'TATTOOED';
  image: string;
}

const flashDesigns: FlashItem[] = [
  {
    id: 'COMPASS-01',
    title: 'The Sunken Compass',
    style: 'Bold Blackwork',
    minSize: '6 inches (Best suited for forearms, calves, or shoulders)',
    price: '$400 - $500',
    deposit: '$100',
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DAGGER-03',
    title: 'Dagger & Peony',
    style: 'Color Neo-Traditional',
    minSize: '7 inches (Best suited for outer thigh or upper arm)',
    price: '$550 - $700',
    deposit: 'Pending',
    status: 'PENDING',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'LUNA-02',
    title: 'Skeletal Luna Moth',
    style: 'Fine-Line Illustrative',
    minSize: '5 inches (Perfect for sternum, upper back, or inner arm)',
    price: '$350 - $450',
    deposit: '$100',
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'SHEARS-04',
    title: "The Herbalist's Shears",
    style: 'Fine-Line Illustrative',
    minSize: '5 inches',
    price: '$300',
    deposit: 'Retired Design',
    status: 'TATTOOED',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function FlashCatalog() {
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const styles = ['All', 'Bold Blackwork', 'Fine-Line Illustrative', 'Color Neo-Traditional'];
  const statuses = ['All', 'Available', 'Pending / Claimed'];

  const filteredDesigns = flashDesigns.filter((design) => {
    const matchesStyle = selectedStyle === 'All' || design.style.includes(selectedStyle);
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Available' && design.status === 'AVAILABLE') ||
      (selectedStatus === 'Pending / Claimed' && (design.status === 'PENDING' || design.status === 'TATTOOED'));
    return matchesStyle && matchesStatus;
  });

  const handleClaimClick = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <section
      id="flash-catalog"
      className="bg-[#121212] text-[#F5F5F0] py-24 px-6 md:px-12 border-t-2 border-b-2 border-[#C85A17]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono tracking-widest text-[#C85A17] uppercase mb-3">
            // Ready to Claim
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Pre-drawn flash ready for its permanent home.
          </h2>
          <p className="text-lg text-[#F5F5F0]/80 leading-relaxed font-sans">
            Flash designs are pre-drawn pieces that I am highly passionate about tattooing. 
            These pieces are tattooed exactly as drawn, with minimal changes (minor size or placement adjustments only). 
            Booking flash is faster, requires less admin work, and has a fixed, transparent price range.
          </p>
        </div>

        {/* Dynamic Filters Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b-2 border-[#1C1C1C]">
          
          {/* Style Filters */}
          <div className="w-full md:w-auto">
            <span className="block text-xs font-mono text-[#F5F5F0]/60 uppercase mb-3 tracking-wider">
              Filter by Aesthetic Style
            </span>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-4 py-2 text-sm font-mono tracking-tight transition-all uppercase duration-150 border-2 ${
                    selectedStyle === style
                      ? 'bg-[#C85A17] text-[#F5F5F0] border-[#C85A17]'
                      : 'border-[#1C1C1C] hover:border-[#C85A17] text-[#F5F5F0]/80'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="w-full md:w-auto">
            <span className="block text-xs font-mono text-[#F5F5F0]/60 uppercase mb-3 tracking-wider">
              Filter by Availability
            </span>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 text-sm font-mono tracking-tight transition-all uppercase duration-150 border-2 ${
                    selectedStatus === status
                      ? 'bg-[#C85A17] text-[#F5F5F0] border-[#C85A17]'
                      : 'border-[#1C1C1C] hover:border-[#C85A17] text-[#F5F5F0]/80'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Flash Grid */}
        {filteredDesigns.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredDesigns.map((design) => (
              <motion.div
                key={design.id}
                variants={cardVariants}
                className="bg-[#1C1C1C] border-2 border-[#1C1C1C] hover:border-[#C85A17] transition-all duration-300 flex flex-col h-full relative"
              >
                {/* Image Wrap */}
                <div className="relative aspect-square overflow-hidden group border-b-2 border-[#1C1C1C]">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125"
                  />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 z-10">
                    {design.status === 'AVAILABLE' && (
                      <span className="bg-[#C85A17] text-[#F5F5F0] text-xs font-mono uppercase px-3 py-1 font-bold tracking-wider border-2 border-[#121212]">
                        [ Available ]
                      </span>
                    )}
                    {design.status === 'PENDING' && (
                      <span className="bg-[#444444] text-[#F5F5F0]/60 text-xs font-mono uppercase px-3 py-1 font-bold tracking-wider border-2 border-[#121212]">
                        [ Pending Deposit ]
                      </span>
                    )}
                    {design.status === 'TATTOOED' && (
                      <span className="bg-black text-[#F5F5F0]/40 line-through text-xs font-mono uppercase px-3 py-1 font-bold tracking-wider border-2 border-[#121212]">
                        [ Tattooed ]
                      </span>
                    )}
                  </div>

                  {/* ID Tag overlay bottom-right */}
                  <div className="absolute bottom-4 right-4 bg-black/90 text-xs font-mono px-2 py-1 text-[#C85A17] border border-[#C85A17]/30">
                    ID: {design.id}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-mono text-[#C85A17] uppercase mb-1 tracking-wider">
                    {design.style}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#F5F5F0] mb-4">
                    {design.title}
                  </h3>

                  {/* Specs List */}
                  <div className="space-y-3 mb-6 flex-grow text-sm border-t border-[#121212] pt-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[#F5F5F0]/50 font-mono text-xs uppercase">Min Size:</span>
                      <span className="text-[#F5F5F0] text-right font-sans font-medium max-w-[150px] leading-tight">
                        {design.minSize}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#F5F5F0]/50 font-mono text-xs uppercase">Price Range:</span>
                      <span className="text-[#F5F5F0] font-mono font-bold">
                        {design.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#F5F5F0]/50 font-mono text-xs uppercase">Deposit:</span>
                      <span className="text-[#C85A17] font-mono font-bold">
                        {design.status === 'AVAILABLE' ? `Requires ${design.deposit}` : design.deposit}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {design.status === 'AVAILABLE' ? (
                    <div className="space-y-2 mt-auto">
                      <a
                        href="#booking-inquiry"
                        onClick={() => handleClaimClick(design.id)}
                        className="block text-center w-full bg-[#C85A17] hover:bg-transparent hover:text-[#C85A17] text-[#F5F5F0] font-mono text-sm uppercase py-3 border-2 border-[#C85A17] transition-all duration-150 font-bold tracking-wider"
                      >
                        Claim This Design
                      </a>
                      <button
                        onClick={() => handleClaimClick(design.id)}
                        className="w-full text-center text-xs font-mono text-[#F5F5F0]/40 hover:text-[#C85A17] transition-colors"
                      >
                        {copiedId === design.id ? '✓ ID Copied to Clipboard!' : 'Copy ID to clipboard'}
                      </button>
                    </div>
                  ) : design.status === 'PENDING' ? (
                    <button
                      disabled
                      className="w-full mt-auto bg-transparent border-2 border-[#444444] text-[#444444] font-mono text-sm uppercase py-3 cursor-not-allowed font-bold tracking-wider"
                    >
                      Temporarily Locked
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full mt-auto bg-transparent border-2 border-[#121212] text-zinc-700 font-mono text-sm uppercase py-3 cursor-not-allowed font-bold tracking-wider line-through"
                    >
                      Retired Design
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[#1C1C1C]">
            <p className="text-lg font-mono text-[#F5F5F0]/60">
              No pre-drawn designs match your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedStyle('All');
                setSelectedStatus('All');
              }}
              className="mt-4 px-6 py-2 bg-[#C85A17] text-[#F5F5F0] font-mono text-xs uppercase tracking-widest border-2 border-[#C85A17]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Sticky Notice / Next Step */}
        <div className="mt-16 p-8 bg-[#1C1C1C] border-2 border-[#C85A17] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-serif font-bold text-[#F5F5F0] mb-2">
              Have a custom design concept in mind?
            </h4>
            <p className="text-[#F5F5F0]/80 text-sm md:text-base font-sans max-w-2xl">
              If none of these pre-drawn pieces fit your vision, I would love to design a bespoke piece matching your body flow, size parameters, and concept notes.
            </p>
          </div>
          <a
            href="#booking-inquiry"
            className="whitespace-nowrap px-8 py-4 bg-transparent border-2 border-[#F5F5F0] text-[#F5F5F0] hover:bg-[#F5F5F0] hover:text-[#121212] font-mono text-sm uppercase tracking-widest transition-all duration-200"
          >
            Inquire About a Custom Piece →
          </a>
        </div>

      </div>
    </section>
  );
}