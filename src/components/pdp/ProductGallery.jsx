import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGallery = ({ images = [], badges = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Hero Image Container */}
      <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-2xl md:rounded-[20px] overflow-hidden bg-surface-container-lowest shadow-sm border border-outline-variant/30 group">
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                badge.toLowerCase() === 'bestseller' ? 'bg-primary text-on-primary' : 
                badge.toLowerCase() === 'new' ? 'bg-secondary text-on-secondary' : 
                'bg-tertiary text-on-tertiary'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Main Image with Hover Zoom on Desktop */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Product Image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 cursor-crosshair"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-on-surface shadow-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden snap-center transition-all ${
                currentIndex === idx ? 'ring-2 ring-primary ring-offset-2 opacity-100' : 'opacity-60 hover:opacity-100 border border-outline-variant'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
