import logo from '../assets/logo.jpg';
import { MapPin, Mail, Phone, Clock, Star, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-24 md:pb-8 bg-[#2A0845] dark:bg-[#3D155F] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-left">
        
        {/* Column 1: Brand & Social */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-white dark:bg-[#1D0A2D] rounded-full p-1 overflow-hidden">
               <img src={logo} alt="Cake Snow Logo" className="w-full h-full object-cover rounded-full mix-blend-multiply" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight">Cake</span>
              <span className="font-bold text-[#FACC15] text-xl leading-tight">Snow</span>
            </div>
          </div>
          <p className="text-white/80 text-sm mb-6 pr-4">
            Elevating the simple joy of artisan baking with premium ingredients and time-honored techniques in Lalitpur.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/cakesnowbakery/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-[#1D0A2D]/10 flex items-center justify-center text-[#2A0845] dark:text-white hover:bg-[#FACC15] hover:text-[#2A0845] transition-colors shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/cakesnowbakery" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-[#1D0A2D]/10 flex items-center justify-center text-[#2A0845] dark:text-white hover:bg-[#FACC15] hover:text-[#2A0845] transition-colors shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@cakesnowbekary" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-[#1D0A2D]/10 flex items-center justify-center text-[#2A0845] dark:text-white hover:bg-[#FACC15] hover:text-[#2A0845] transition-colors shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-[#FACC15] text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link to="/menu" className="text-white/80 hover:text-white transition-colors text-sm">Menu</Link></li>
            <li><Link to="/gifts" className="text-white/80 hover:text-white transition-colors text-sm">Gifts</Link></li>
            <li><Link to="/offers" className="text-white/80 hover:text-white transition-colors text-sm">Offers</Link></li>
            <li><Link to="/location" className="text-white/80 hover:text-white transition-colors text-sm">Location</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors text-sm">Contact</Link></li>
            <li className="pt-2 mt-2 border-t border-white/10"><Link to="/admin/login" className="text-[#FACC15]/80 hover:text-[#FACC15] transition-colors text-xs font-medium">Admin Login</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="text-[#FACC15] text-lg font-bold mb-6">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#FACC15] mt-1 shrink-0" />
              <div>
                <a 
                  href="https://maps.app.goo.gl/Ubvbwza5DjWdAv3UA"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium hover:text-[#FACC15] transition-colors hover:underline cursor-pointer"
                >
                  Our Outlets: Tikathali / Balkot
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <Phone size={18} className="text-[#FACC15] mt-1 shrink-0" />
              <div>
                <p className="text-sm">015904342 | 9860568012, 9763443555</p>
                <p className="text-sm text-white/70 mt-0.5">Available 9 AM - 9 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <Mail size={18} className="text-[#FACC15] mt-1 shrink-0" />
              <div>
                <p className="text-sm">cakesnowbakery@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-[#FACC15] text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-white/80 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="flex bg-white dark:bg-[#1D0A2D]/10 rounded-xl overflow-hidden border border-white/20 p-1">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-none text-white px-3 py-2 text-sm w-full outline-none placeholder:text-white/50"
            />
            <button className="bg-[#FACC15] text-[#2A0845] dark:text-[#FDFBF7] p-2 rounded-lg hover:bg-white dark:bg-[#1D0A2D] transition-colors flex items-center justify-center">
              <Send size={16} />
            </button>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <a 
              href="https://maps.app.goo.gl/Ubvbwza5DjWdAv3UA" 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-3 bg-white dark:bg-[#1D0A2D] text-[#2A0845] dark:text-[#FDFBF7] border border-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#FACC15] transition-colors shadow-sm"
            >
              <Star size={16} className="text-[#2A0845] dark:text-[#FDFBF7] fill-[#2A0845]" /> Rate us on Google
            </a>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Cake Snow Bakery. Handcrafted with love.</p>
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
