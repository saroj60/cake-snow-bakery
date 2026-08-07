import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

// Snowfall Component
const Snowfall = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 8,
      opacity: Math.random() * 0.5 + 0.2,
      drift: Math.random() * 60 - 30,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--snow-opacity);
          }
          90% {
            opacity: var(--snow-opacity);
          }
          100% {
            transform: translateY(100vh) translateX(var(--snow-drift)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            '--snow-opacity': flake.opacity,
            '--snow-drift': `${flake.drift}px`,
            animation: `snowfall ${flake.duration}s ${flake.delay}s linear infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

const heroImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621236378699-8597faf6a176?auto=format&fit=crop&w=800&q=80"
];

const mobileHeroImages = [
  "/hero4.png",
  "/hero3.png",
  "/hero1.png",
  "/hero2.png"
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % Math.max(heroImages.length, mobileHeroImages.length));
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col justify-center overflow-hidden bg-[#2A0845] dark:bg-[#3D155F] pt-32 pb-20">
      
      {/* Starry Background overlay (subtle dots/stars) */}
      <div className="absolute inset-0 opacity-30 hidden lg:block" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4B1A66]/50 via-[#2A0845] to-[#2A0845] opacity-80 hidden lg:block"></div>

      {/* Mobile Background Carousel */}
      <div className="absolute inset-0 lg:hidden overflow-hidden bg-[#2A0845]">
        <AnimatePresence mode="wait">
          <motion.img 
            key={`bg-${currentImageIndex % mobileHeroImages.length}`}
            src={mobileHeroImages[currentImageIndex % mobileHeroImages.length]}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            alt="Hero Background"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0845]/60 via-[#2A0845]/40 to-[#2A0845]/90 dark:from-[#12041C]/80 dark:via-[#12041C]/60 dark:to-[#12041C]"></div>
      </div>

      {/* Snowfall Animation */}
      <Snowfall />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center h-full">
        
        {/* Left Content */}
        <div className="flex flex-col lg:w-1/2 pt-10 lg:pt-0 text-center lg:text-left order-2 lg:order-1">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <span className="font-headline-xl text-2xl md:text-3xl text-[#FACC15] italic tracking-wide">
              Welcome to Cake Snow Bakery
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="font-headline-xl text-5xl md:text-7xl text-white leading-tight mb-4 tracking-tight drop-shadow-lg">
              Where Every Bite <br className="hidden lg:block"/> Tells a Sweet Story
              <span className="text-[#FACC15] text-4xl md:text-5xl ml-2">♥</span>
            </h1>
            <p className="font-body-lg text-[#d1c1d9] max-w-lg mx-auto lg:mx-0 leading-relaxed text-sm md:text-lg mb-8">
              Handcrafted with love in Lalitpur — from dreamy cakes &amp; flaky pastries to aromatic coffee &amp; heartfelt surprise gifts. Every creation is a little piece of happiness, baked just for you.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-row flex-wrap gap-4 justify-center lg:justify-start mb-12"
          >
            <Link 
              to="/cakes"
              className="flex items-center justify-center px-8 py-3 bg-[#FACC15] text-[#2A0845] font-bold rounded-lg transition-all hover:bg-[#e6bb10] shadow-lg hover:-translate-y-1"
            >
              Order Now
            </Link>
            <a 
              href="https://wa.me/9805190278" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white font-bold rounded-lg hover:bg-white dark:bg-[#1D0A2D]/10 transition-all shadow-sm hover:-translate-y-1"
            >
              <MessageCircle size={20} className="text-green-400" />
              <span>WhatsApp Order</span>
            </a>
          </motion.div>

          {/* Feature Badges - Placed here for Desktop, hidden on Mobile to display below cake */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:flex flex-row flex-wrap items-start justify-start gap-8 border-t border-white/20 pt-6 mt-8"
          >
            <div className="flex flex-col items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">
                🌿
              </div>
              <p className="text-xs font-semibold text-center leading-tight">Fresh<br/>Ingredients</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">
                ⭐
              </div>
              <p className="text-xs font-semibold text-center leading-tight">Premium<br/>Quality</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">
                ✨
              </div>
              <p className="text-xs font-semibold text-center leading-tight">Hygienic<br/>Preparation</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">
                🚚
              </div>
              <p className="text-xs font-semibold text-center leading-tight">Fast<br/>Delivery</p>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
        >
          {/* Cake Image Carousel (Desktop Only) */}
          <div className="relative w-[80%] max-w-[500px] aspect-square rounded-full flex items-center justify-center overflow-visible animate-float">
            <div className="relative w-full h-full rounded-full overflow-hidden drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 border-4 border-[#FACC15]/30">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex % heroImages.length}
                  src={heroImages[currentImageIndex % heroImages.length]} 
                  alt="Delicious Cake Showcase"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {/* Soft glow behind the cake */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#FACC15] opacity-30 blur-[100px] rounded-full z-0 animate-pulse-slow"></div>
          </div>
        </motion.div>

        {/* Feature Badges - Mobile Only (Below Cake, Above text in order, but CSS flex order handles it. Wait, the design has them BELOW the cake on mobile. Since text is below cake on mobile, we'll put these below the text.) */}
        <div className="flex lg:hidden flex-row flex-wrap items-center justify-center gap-6 border-t border-white/20 pt-8 mt-4 w-full order-3">
            <div className="flex flex-col items-center gap-2 text-white w-1/3 sm:w-1/5">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">🌿</div>
              <p className="text-[10px] font-semibold text-center leading-tight">Fresh<br/>Ingredients</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-white w-1/3 sm:w-1/5">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">⭐</div>
              <p className="text-[10px] font-semibold text-center leading-tight">Premium<br/>Quality</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-white w-1/3 sm:w-1/5">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">✨</div>
              <p className="text-[10px] font-semibold text-center leading-tight">Hygienic<br/>Preparation</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-white w-1/3 sm:w-1/5">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#FACC15]">🚚</div>
              <p className="text-[10px] font-semibold text-center leading-tight">Fast<br/>Delivery</p>
            </div>
        </div>

      </div>

      {/* Wavy bottom transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.22,194,106.33,237.91,95.8,279.7,78.29,321.39,56.44Z" fill="#FDFBF7"></path>
        </svg>
      </div>
      
    </section>
  );
};

export default Hero;
