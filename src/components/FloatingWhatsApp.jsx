import React from 'react';
import { MessageCircle, MapPin } from 'lucide-react';

const ADMIN_PHONE = '9779860568012';

const FloatingSidebar = () => {
  const handleWhatsApp = () => {
    const message = "Hello Snow Cakes! I have a question regarding my order.";
    const whatsappUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-40 flex flex-col gap-3 items-center">
      {/* Map Button */}
      <a 
        href="https://maps.app.goo.gl/Ubvbwza5DjWdAv3UA"
        target="_blank" rel="noreferrer"
        className="bg-blue-600 text-white p-3 rounded-full shadow-[0_4px_10px_rgba(37,99,235,0.4)] hover:scale-110 hover:shadow-[0_8px_20px_rgba(37,99,235,0.6)] transition-all duration-300 flex items-center justify-center group"
        aria-label="View on Map"
      >
        <MapPin className="w-5 h-5 md:w-6 md:h-6" />
        <span className="absolute right-full mr-4 bg-surface text-on-surface px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Find us on Map
        </span>
      </a>

      {/* Instagram Button */}
      <a 
        href="https://www.instagram.com/cakesnowbakery/" 
        target="_blank" rel="noreferrer"
        className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-3 rounded-full shadow-[0_4px_10px_rgba(220,39,67,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        <span className="absolute right-full mr-4 bg-surface text-on-surface px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Follow us on Instagram
        </span>
      </a>

      {/* TikTok Button */}
      <a 
        href="https://www.tiktok.com/@cakesnowbekary" 
        target="_blank" rel="noreferrer"
        className="bg-black text-white p-3 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="TikTok"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
        <span className="absolute right-full mr-4 bg-surface text-on-surface px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Follow us on TikTok
        </span>
      </a>

      {/* Facebook Button */}
      <a 
        href="https://www.facebook.com/cakesnowbakery" 
        target="_blank" rel="noreferrer"
        className="bg-[#1877F2] text-white p-3 rounded-full shadow-[0_4px_10px_rgba(24,119,242,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        <span className="absolute right-full mr-4 bg-surface text-on-surface px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Join us on Facebook
        </span>
      </a>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
        <span className="absolute right-full mr-4 bg-surface text-on-surface px-4 py-2 rounded-xl text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Chat with us!
        </span>
      </button>
    </div>
  );
};

export default FloatingSidebar;
