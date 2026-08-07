import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Heart, Clock, Award, Leaf } from 'lucide-react';

const features = [
  {
    title: 'Artisan Crafted',
    description: 'Every single cake is meticulously handcrafted by our master pastry chefs, ensuring a unique masterpiece for your celebration.',
    icon: <Sparkles className="w-8 h-8 text-rose-500" />,
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    delay: 0.1
  },
  {
    title: 'Premium Ingredients',
    description: 'We source only the finest Belgian chocolates, fresh farm eggs, and organic local fruits for an unforgettable taste.',
    icon: <Leaf className="w-8 h-8 text-emerald-500" />,
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    delay: 0.2
  },
  {
    title: 'Bespoke Designs',
    description: 'Your vision, brought to life. From elegant weddings to playful birthdays, our custom designs are limited only by imagination.',
    icon: <Star className="w-8 h-8 text-amber-500" />,
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    delay: 0.3
  },
  {
    title: 'Baked with Love',
    description: 'Baking isn’t just our profession; it’s our passion. You can taste the dedication and love in every single bite.',
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    bgColor: 'bg-pink-50',
    iconBg: 'bg-pink-100',
    delay: 0.4
  },
  {
    title: 'On-Time Delivery',
    description: 'Your celebrations can’t wait. We guarantee pristine, on-time delivery right to your venue or doorstep in perfect condition.',
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    delay: 0.5
  },
  {
    title: 'Award Winning',
    description: 'Recognized locally and nationally for our exquisite flavors and stunning presentations that consistently wow our clients.',
    icon: <Award className="w-8 h-8 text-purple-500" />,
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    delay: 0.6
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container-custom mx-auto px-4 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label-lg text-sm text-secondary uppercase tracking-[0.2em] mb-4 block"
          >
            The Cake Snow Difference
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2A1B18] mb-6 leading-tight"
          >
            Why we are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-500 italic font-serif">sweetest choice</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#5C4D4A] max-w-2xl mx-auto"
          >
            We don't just bake cakes; we craft edible centerpieces for your most cherished moments, elevating the art of celebration.
          </motion.p>
        </div>

        {/* Mobile Carousel / Desktop Grid */}
        <div className="relative w-full overflow-hidden">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-8 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`
                  group relative flex flex-col p-6 md:p-8 rounded-[20px] bg-white dark:bg-[#1D0A2D] border border-gray-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-${feature.bgColor.split('-')[1]}-900/5
                  w-[80vw] min-w-[280px] max-w-[320px] md:w-auto md:min-w-0 md:max-w-none shrink-0 snap-center md:snap-align-none
                `}
              >
                {/* Decorative subtle pattern (top right) */}
                <div className={`absolute -right-8 -top-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 text-${feature.bgColor.split('-')[1]}-600`}>
                  <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
                     <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="10 10"/>
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 ${feature.iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-bold text-[#2A1B18] mb-3 text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-[#5C4D4A] leading-relaxed text-sm flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
