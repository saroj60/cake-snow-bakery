import React from 'react';
import { Link } from 'react-router-dom';

const PromotionalBanner = () => {
  return (
    <section className="py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hot Coffee Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2A0845] to-[#12041C] text-white p-6 md:p-8 flex items-center min-h-[220px] shadow-md border border-white/10 group">
            <div className="absolute right-[-20%] top-[-10%] w-[60%] h-[120%] opacity-90 group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80" 
                alt="Hot Coffee" 
                className="w-full h-full object-cover rounded-full"
                style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}
              />
            </div>
            <div className="relative z-10 w-[60%]">
              <h3 className="text-[#D4AF37] text-2xl font-headline-lg font-bold mb-2">Hot Coffee</h3>
              <p className="text-white/90 text-sm mb-6 font-medium leading-snug">Perfect coffee to make your day amazing.</p>
              <Link to="/coffee" className="inline-block bg-[#FACC15] text-[#2A0845] text-sm font-bold px-5 py-2 rounded-lg hover:bg-white transition-colors">
                Explore Now
              </Link>
            </div>
          </div>

          {/* Pastries Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#2A0845] text-white p-6 md:p-8 flex items-center min-h-[220px] shadow-md border border-white/10 group">
            <div className="absolute right-[-15%] top-[10%] w-[60%] h-[100%] opacity-90 group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&q=80" 
                alt="Pastries" 
                className="w-full h-full object-cover rounded-full"
                style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)' }}
              />
            </div>
            <div className="relative z-10 w-[60%]">
              <h3 className="text-[#D4AF37] text-2xl font-headline-lg font-bold mb-2">Pastries</h3>
              <p className="text-white/90 text-sm mb-6 font-medium leading-snug">Delicious pastries made fresh daily.</p>
              <Link to="/pastries" className="inline-block bg-[#FACC15] text-[#2A0845] text-sm font-bold px-5 py-2 rounded-lg hover:bg-white transition-colors">
                Explore Now
              </Link>
            </div>
          </div>

          {/* Customize Your Cake Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#3D155F] text-white p-6 md:p-8 flex items-center min-h-[220px] shadow-md border border-white/10 group">
            <div className="absolute right-[-15%] top-[10%] w-[65%] h-[100%] opacity-90 group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" 
                alt="Customize Cake" 
                className="w-full h-full object-cover rounded-full"
                style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)' }}
              />
            </div>
            <div className="relative z-10 w-[60%]">
              <h3 className="text-[#D4AF37] text-2xl font-headline-lg font-bold mb-2 leading-tight">Customize<br/>Your Cake</h3>
              <p className="text-white/90 text-sm mb-6 font-medium leading-snug">Make your moments extra special.</p>
              <Link to="/custom-order" className="inline-block bg-[#FACC15] text-[#2A0845] text-sm font-bold px-5 py-2 rounded-lg hover:bg-white transition-colors">
                Order Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
