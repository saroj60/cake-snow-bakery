import React, { useEffect } from 'react';
import { Award, Users, Heart, Coffee } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] dark:bg-[#12041C] pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A0845] dark:text-[#FDFBF7] mb-4 font-playfair">Our Story</h1>
          <p className="text-lg text-[#2A0845] dark:text-[#FDFBF7]/70 max-w-2xl mx-auto">
            Bringing sweetness to your special moments since 2018. We believe every cake tells a story.
          </p>
        </div>

        {/* Hero Image / Video Section */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" 
            alt="Baker working on a cake" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/80 to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-2">Crafted with Love</h2>
              <p className="text-white/90 max-w-xl">Every ingredient is carefully selected to ensure the highest quality and perfect taste for your celebrations.</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#EAC2BB]/30 dark:border-[#D4AF37]/30 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2A0845] dark:text-[#FDFBF7] mb-3">Passion</h3>
            <p className="text-[#2A0845] dark:text-[#FDFBF7]/70 text-sm">Baking is our passion, and we pour our hearts into every creation that leaves our kitchen.</p>
          </div>
          <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#EAC2BB]/30 dark:border-[#D4AF37]/30 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2A0845] dark:text-[#FDFBF7] mb-3">Quality</h3>
            <p className="text-[#2A0845] dark:text-[#FDFBF7]/70 text-sm">We never compromise on ingredients. Only the finest butter, chocolate, and fresh produce.</p>
          </div>
          <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#EAC2BB]/30 dark:border-[#D4AF37]/30 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2A0845] dark:text-[#FDFBF7] mb-3">Community</h3>
            <p className="text-[#2A0845] dark:text-[#FDFBF7]/70 text-sm">We are proud to serve our local community and be a part of your families' milestones.</p>
          </div>
          <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#EAC2BB]/30 dark:border-[#D4AF37]/30 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <Coffee size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2A0845] dark:text-[#FDFBF7] mb-3">Innovation</h3>
            <p className="text-[#2A0845] dark:text-[#FDFBF7]/70 text-sm">Constantly exploring new flavors and designs to bring you the latest in bakery trends.</p>
          </div>
        </div>

        {/* The Team / Founder Section */}
        <div className="bg-white dark:bg-[#1D0A2D] rounded-3xl p-8 md:p-12 shadow-lg border border-[#EAC2BB]/30 dark:border-[#D4AF37]/30 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" 
              alt="Head Baker" 
              className="w-full h-[400px] object-cover rounded-2xl shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-[#2A0845] dark:text-[#FDFBF7] mb-6 font-playfair">Meet The Baker</h2>
            <p className="text-[#2A0845] dark:text-[#FDFBF7]/70 mb-4 leading-relaxed">
              What started as a small home kitchen project quickly blossomed into Cake Snow. Our founder envisioned a place where traditional baking methods met modern, stunning aesthetics. 
            </p>
            <p className="text-[#2A0845] dark:text-[#FDFBF7]/70 mb-8 leading-relaxed">
              With years of culinary training and an unyielding love for pastry, we established this bakery to share joy through food. Every cake we make is a testament to our dedication to the craft.
            </p>
            <div className="inline-block bg-[#FDFBF7] dark:bg-[#12041C] p-6 rounded-xl border border-[#D4AF37]/30">
              <p className="italic text-[#2A0845] dark:text-[#FDFBF7] font-playfair text-lg">
                "Our mission isn't just to bake cakes; it's to create memories that you and your loved ones will cherish forever."
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default About;
