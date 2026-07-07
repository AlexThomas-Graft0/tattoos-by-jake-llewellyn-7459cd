'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface PortfolioItem {
  id: string;
  category: 'Bold Blackwork' | 'Fine-Line Illustrative' | 'Color Neo-Traditional';
  title: string;
  placement: string;
  status: string;
  alt: string;
  imageUrl: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: '01',
    category: 'Bold Blackwork',
    title: 'The Offering',
    placement: 'Sternum / Ribs',
    status: 'Healed (1 Year)',
    alt: 'A heavy blackwork tattoo of a ram skull surrounded by delicate wood anemone flowers, positioned on a client\'s sternum with crisp contrast.',
    imageUrl: 'https://images.unsplash.com/photo-1601662539747-36279f54b40f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '02',
    category: 'Fine-Line Illustrative',
    title: 'Ostrich Fern',
    placement: 'Outer Calf',
    status: 'Healed (6 Months)',
    alt: 'An elegant, fine-line botanical fern tattoo wrapping gently around the outer calf muscle, showing soft shading and precise lines.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '03',
    category: 'Color Neo-Traditional',
    title: 'Sacred Flame',
    placement: 'Upper Arm',
    status: 'Fresh',
    alt: 'A vibrant neo-traditional sacred heart tattoo featuring rich ochre flames, deep crimson velvet textures, and bold outer linework.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '04',
    category: 'Bold Blackwork',
    title: 'Stag Beetle',
    placement: 'Forearm',
    status: 'Healed (2 Years)',
    alt: 'A dark blackwork stag beetle tattoo on a forearm with dense black fill and delicate dot-work texture highlighting the shell.',
    imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '05',
    category: 'Fine-Line Illustrative',
    title: 'The Astronomer\'s Hourglass',
    placement: 'Inner Thigh',
    status: 'Fresh',
    alt: 'An illustrative hourglass tattoo featuring celestial details, crescent moons, and fine stippling to represent falling sand.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '06',
    category: 'Color Neo-Traditional',
    title: 'The Barn Owl',
    placement: 'Chest Panel',
    status: 'Healed (18 Months)',
    alt: 'A neo-traditional chest tattoo of a barn owl in flight, holding a key in its talons, with warm autumn colors and bold framing.',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800'
  }
];

const categories = ['All Work', 'Bold Blackwork', 'Fine-Line Illustrative', 'Color Neo-Traditional'] as const;
type CategoryFilter = typeof categories[number];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.3 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All Work');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = portfolioItems.filter(item => {
    if (activeFilter === 'All Work') return true;
    return item.category === activeFilter;
  });

  return (
    <section 
      id="portfolio-gallery" 
      className="bg-[#121212] text-[#F5F5F0] py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-[#1C1C1C] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#C85A17] font-mono tracking-widest text-xs uppercase block mb-3 font-semibold">
              // portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-[#F5F5F0] mb-6 font-medium">
              A gallery of permanent intentions.
            </h2>
            <p className="text-sm md:text-base text-[#F5F5F0]/80 font-sans leading-relaxed max-w-xl">
              Every line is drawn to last. Filter my recent works by style to see how different techniques translate to the skin. All photos are shown with realistic lighting, clear line-work details, and a mix of fresh and fully healed pieces.
            </p>
          </div>

          {/* Filter System */}
          <div className="flex flex-wrap gap-2 md:self-end">
            {categories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-150 border-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C85A17] focus:ring-offset-2 focus:ring-offset-[#121212] ${
                    isActive
                      ? 'bg-[#C85A17] border-[#C85A17] text-[#F5F5F0]'
                      : 'bg-[#1C1C1C] border-[#1C1C1C] text-[#F5F5F0]/70 hover:border-[#C85A17] hover:text-[#F5F5F0]'
                  }`}
                  aria-pressed={isActive}
                >
                  [ {category} ]
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                layout
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-[#1C1C1C] border-2 border-[#1C1C1C] hover:border-[#C85A17] transition-all duration-300 flex flex-col justify-between h-full relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#121212]">
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    loading="lazy"
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Status Badge overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#121212] border border-[#C85A17] text-[#C85A17] font-mono text-[10px] tracking-wider uppercase px-2 py-1 font-bold">
                      {item.status}
                    </span>
                  </div>
                  {/* Quick-view overlay */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center focus:opacity-100 focus:outline-none"
                    aria-label={`View larger image of ${item.title}`}
                  >
                    <span className="border-2 border-[#C85A17] text-[#F5F5F0] bg-[#1C1C1C] font-mono text-xs uppercase tracking-wider px-4 py-2 font-bold hover:bg-[#C85A17] transition-colors duration-150">
                      Inspect Details
                    </span>
                  </button>
                </div>

                {/* Content Box */}
                <div className="p-6 border-t-2 border-[#121212] flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[#C85A17] font-mono text-xs uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F5F5F0] tracking-tight group-hover:text-[#C85A17] transition-colors duration-200">
                      "{item.title}"
                    </h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#121212]/30 flex justify-between items-center text-xs text-[#F5F5F0]/60 font-mono">
                    <span>Placement:</span>
                    <span className="text-[#F5F5F0]/90 font-sans font-medium">{item.placement}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Grid Footer CTA */}
        <div className="mt-20 border-t-2 border-[#1C1C1C] pt-12 text-center">
          <p className="text-xl md:text-2xl font-serif text-[#F5F5F0] mb-6">
            Ready to discuss your own design? Let’s build something custom.
          </p>
          <a
            href="#booking-inquiry"
            className="inline-block bg-[#C85A17] text-[#F5F5F0] border-2 border-[#C85A17] hover:bg-transparent hover:text-[#C85A17] transition-all duration-200 font-mono text-xs uppercase tracking-widest px-8 py-4 font-bold rounded-none focus:outline-none focus:ring-2 focus:ring-[#C85A17] focus:ring-offset-2 focus:ring-offset-[#121212]"
          >
            Inquire About a Custom Piece
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0 cursor-zoom-out" 
              onClick={() => setSelectedItem(null)} 
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl w-full bg-[#1C1C1C] border-2 border-[#C85A17] rounded-none overflow-hidden z-10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 bg-[#121212] border-2 border-[#C85A17] text-[#F5F5F0] hover:bg-[#C85A17] hover:text-[#F5F5F0] p-2 focus:outline-none transition-colors duration-150"
                aria-label="Close details dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Image */}
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative aspect-[4/5] md:aspect-auto">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.alt}
                  className="object-contain w-full h-full max-h-[80vh]"
                />
              </div>

              {/* Metadata details */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-[#1C1C1C]">
                <div>
                  <span className="text-[#C85A17] font-mono text-xs uppercase tracking-widest block mb-2">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] tracking-tight mb-4">
                    "{selectedItem.title}"
                  </h3>
                  <p className="text-sm text-[#F5F5F0]/80 font-sans leading-relaxed mb-6">
                    {selectedItem.alt}
                  </p>

                  <div className="space-y-3 border-t border-[#121212] pt-6 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#F5F5F0]/50">PLACEMENT:</span>
                      <span className="text-[#F5F5F0] font-sans font-medium">{selectedItem.placement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#F5F5F0]/50">STATUS:</span>
                      <span className="text-[#C85A17] font-bold">{selectedItem.status}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#121212]">
                  <a
                    href="#booking-inquiry"
                    onClick={() => setSelectedItem(null)}
                    className="block text-center bg-[#C85A17] text-[#F5F5F0] border-2 border-[#C85A17] hover:bg-transparent hover:text-[#C85A17] transition-all duration-200 font-mono text-xs uppercase tracking-wider py-3 font-bold rounded-none"
                  >
                    Request Similar Custom Piece
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}