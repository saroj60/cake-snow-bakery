import React from 'react';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { cartItems, setIsCartOpen } = useCart();
  
  const totalItems = cartItems.length;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1D0A2D] border-t border-[#EAC2BB]/30 dark:border-[#D4AF37]/30 shadow-[0_-5px_20px_rgba(42,8,69,0.05)] z-[99] md:hidden pb-safe pb-4 pointer-events-auto">
      <div className="flex items-center justify-around h-16">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/') ? 'text-[#D4AF37]' : 'text-[#2A0845] dark:text-[#FDFBF7]/60 hover:text-[#2A0845] dark:text-[#FDFBF7]'}`}
        >
          <Home size={22} className={isActive('/') ? 'fill-current' : ''} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        
        <Link 
          to="/cakes" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/cakes') ? 'text-[#D4AF37]' : 'text-[#2A0845] dark:text-[#FDFBF7]/60 hover:text-[#2A0845] dark:text-[#FDFBF7]'}`}
        >
          <LayoutGrid size={22} className={isActive('/cakes') ? 'fill-current' : ''} />
          <span className="text-[10px] font-bold">Cakes</span>
        </Link>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-[#2A0845] dark:text-[#FDFBF7]/60 hover:text-[#2A0845] dark:text-[#FDFBF7] relative"
        >
          <div className="relative">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Cart</span>
        </button>

      </div>
    </div>
  );
};

export default MobileBottomNav;
