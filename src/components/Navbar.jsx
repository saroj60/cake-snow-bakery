import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, MapPin, Phone, X, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { getCartCount, setIsCartOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cakes', path: '/cakes' },
    { name: 'Coffee', path: '/coffee' },
    { name: 'Pastries', path: '/pastries' },
    { name: 'Surprise Gifts', path: '/gifts' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#FACC15] font-semibold border-b-2 border-[#FACC15] pb-1"
      : "text-white hover:text-[#FACC15] font-medium transition-colors";
  };

  const getMobileLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#FACC15] font-bold"
      : "text-white hover:text-[#FACC15]";
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 font-poppins ${isHidden && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}>


        {/* Main Nav */}
        <div className={`bg-[#2A0845] dark:bg-[#3D155F] transition-all duration-300 ${isScrolled ? 'shadow-lg py-1' : 'py-2'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative flex items-center justify-center h-12 md:h-16 hover:scale-105 transition-transform duration-300">
                  <img src="/logo-transparent.png" alt="Cake Snow Logo" className="h-full w-auto object-contain drop-shadow-md" />
                </div>
              </Link>

              {/* Desktop Links */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className={getLinkClass(link.path)}>
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="hidden lg:flex items-center gap-4">
                <button 
                  onClick={toggleTheme}
                  className="text-white hover:text-[#FACC15] transition-colors p-2"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="bg-[#FACC15] text-[#2A0845] dark:text-[#FDFBF7] px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#e6bb10] transition-colors"
                >
                  Order Now
                </button>
              </div>

              {/* Mobile Toggle */}
              <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMobileMenu}>
        <div 
          className={`absolute top-0 right-0 bottom-0 w-64 bg-[#2A0845] dark:bg-[#3D155F] p-6 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button onClick={toggleMobileMenu} className="text-white">
              <X size={28} />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-white text-lg">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={toggleMobileMenu} 
                className={getMobileLinkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => { setIsCartOpen(true); toggleMobileMenu(); }}
              className="mt-4 bg-[#FACC15] text-[#2A0845] dark:text-[#FDFBF7] px-4 py-2 rounded font-bold text-center"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
