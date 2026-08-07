import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCelebrations } from '../services/db';

const UpcomingCelebrations = () => {
  const [celebrations, setCelebrations] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const fetchActiveCelebrations = async () => {
      const data = await getCelebrations();
      if (data) {
        // Filter active, homepage-visible, and non-expired celebrations
        const now = new Date();
        const active = data.filter(c => {
          if (!c.isActive || !c.showOnHomepage) return false;
          const deadline = new Date(c.orderDeadline);
          deadline.setHours(23, 59, 59, 999);
          return deadline > now;
        }).sort((a, b) => a.displayOrder - b.displayOrder || new Date(a.orderDeadline) - new Date(b.orderDeadline));
        
        setCelebrations(active);
      }
    };
    fetchActiveCelebrations();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft = {};
      const now = new Date().getTime();
      
      celebrations.forEach(cel => {
        const deadline = new Date(cel.orderDeadline);
        deadline.setHours(23, 59, 59, 999);
        const difference = deadline.getTime() - now;
        
        if (difference > 0) {
          newTimeLeft[cel.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        } else {
          newTimeLeft[cel.id] = null;
        }
      });
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [celebrations]);

  if (celebrations.length === 0) return null;

  const colorVariants = {
    pink: 'from-pink-500/80 to-rose-500/90 text-pink-50 border-pink-200/30',
    blue: 'from-blue-500/80 to-cyan-500/90 text-blue-50 border-blue-200/30',
    amber: 'from-amber-500/80 to-orange-500/90 text-amber-50 border-amber-200/30',
    emerald: 'from-emerald-500/80 to-teal-500/90 text-emerald-50 border-emerald-200/30',
    purple: 'from-purple-500/80 to-fuchsia-500/90 text-purple-50 border-purple-200/30',
  };

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-headline-lg font-bold text-gray-900 mb-4">Upcoming Celebrations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">Don't miss out on our limited-edition themed cakes for these special occasions. Order before the deadline to guarantee your delivery!</p>
        </motion.div>

        {/* Mobile: CSS Scroll Snap Carousel | Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 gap-6">
          {celebrations.map((cel, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={cel.id}
              className="relative w-[85vw] sm:w-[60vw] lg:w-auto shrink-0 snap-center rounded-[24px] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 bg-white dark:bg-[#1D0A2D] flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={cel.desktopBanner || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop'} 
                  alt={cel.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${colorVariants[cel.themeColor] || colorVariants.pink} mix-blend-multiply opacity-60`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Glassmorphism Badge */}
                {timeLeft[cel.id] ? (
                  <div className="absolute top-4 right-4 bg-white dark:bg-[#1D0A2D]/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg">
                    <Clock size={16} />
                    <span>
                      {timeLeft[cel.id].days}d {timeLeft[cel.id].hours}h {timeLeft[cel.id].minutes}m
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-red-500/80 backdrop-blur-md border border-red-400/30 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Order Closed
                  </div>
                )}
                
                {cel.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    Featured
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white font-poppins mb-1">{cel.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <Calendar size={14} />
                    <span>{new Date(cel.occasionDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow bg-white dark:bg-[#1D0A2D]">
                <p className="text-gray-600 text-sm mb-6 flex-grow font-inter line-clamp-3">
                  {cel.shortDescription}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <Link 
                    to={cel.buttonUrl || `/celebration/${cel.slug || cel.id}`}
                    className="flex-1 bg-gray-900 text-white text-center py-3 rounded-xl font-medium hover:bg-brand-pink transition-colors"
                  >
                    {cel.buttonText || 'Order Now'}
                  </Link>
                  <Link 
                    to={`/celebration/${cel.slug || cel.id}`}
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCelebrations;
