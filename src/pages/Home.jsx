import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/db';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, ArrowRight, Sparkles, MessageCircle, Clock, Heart, BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import UpcomingCelebrations from '../components/UpcomingCelebrations';
import PromotionalBanner from '../components/PromotionalBanner';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';

const SHOWCASE_CAKES = [
  {
    id: 'chocolate',
    name: 'Royal Chocolate Fudge',
    tag: 'Signature',
    description: 'Decadent dark chocolate layers filled with rich Belgian ganache, finished with a smooth chocolate glaze.',
    rating: '4.9',
    reviews: '480',
    price: '1,200',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    bgColor: 'from-amber-950/20 to-amber-900/5',
    accentColor: 'text-amber-800 bg-amber-100 dark:bg-amber-950 dark:text-amber-200'
  },
  {
    id: 'strawberry',
    name: 'Strawberry Cream Dream',
    tag: 'Best Seller',
    description: 'Fresh organic strawberries layered with light vanilla sponge, homemade strawberry compote, and sweet whipped cream.',
    rating: '4.8',
    reviews: '395',
    price: '1,400',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
    bgColor: 'from-rose-950/20 to-rose-900/5',
    accentColor: 'text-rose-800 bg-rose-100 dark:bg-rose-950 dark:text-rose-200'
  },
  {
    id: 'redvelvet',
    name: 'Red Velvet Rosette',
    tag: 'Trending',
    description: 'Classic velvety cocoa crumb layers with rich cream cheese frosting, decorated with beautiful chocolate rosettes.',
    rating: '4.9',
    reviews: '312',
    price: '1,500',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800',
    bgColor: 'from-red-950/20 to-red-900/5',
    accentColor: 'text-red-800 bg-red-100 dark:bg-red-950 dark:text-red-200'
  }
];

const FEATURED_COLLECTIONS = [
  { id: 'birthday', title: 'Birthday Specials', query: 'birthday', image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80' },
  { id: 'anniversary', title: 'Anniversary Cakes', query: 'anniversary', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80' },
  { id: 'photo', title: 'Custom Photo Cakes', query: 'photo', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800&q=80' },
  { id: 'kids', title: 'Kids Favorites', query: 'kids', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80' },
  { id: 'premium', title: 'Premium Designs', query: 'premium', image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?w=800&q=80' }
];

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category');
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedShowcaseIndex, setSelectedShowcaseIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedCakeForCustomization, setSelectedCakeForCustomization] = useState(null);
  const [selectedCakeForDetails, setSelectedCakeForDetails] = useState(null);
  const [customOptions, setCustomOptions] = useState({
    weight: 1,
    isEggless: false,
    message: '',
    message: '',
    flavor: 'Default / As Displayed',
    shape: 'Round'
  });
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [stamps, setStamps] = useState(() => {
    const saved = localStorage.getItem('loyaltyStamps');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('loyaltyStamps', stamps.toString());
  }, [stamps]);

  useEffect(() => {
    const handleLoyaltyUpdate = () => {
      const saved = localStorage.getItem('loyaltyStamps');
      if (saved) {
        setStamps(parseInt(saved, 10));
      }
    };
    window.addEventListener('loyalty-updated', handleLoyaltyUpdate);
    return () => window.removeEventListener('loyalty-updated', handleLoyaltyUpdate);
  }, []);

  const handleAddStamp = () => {
    if (stamps < 9) {
      setStamps(prev => prev + 1);
      toast.success('Stamp added! 🍰');
    }
  };

  const handleRedeem = () => {
    if (stamps === 9) {
      setStamps(0);
      setShowLoyaltyModal(false);
      toast.success('🎉 Free Cake coupon added to your cart!');
    }
  };

  const filters = ['All', 'Birthdays', 'Weddings', 'Engagement parties', 'Anniversaries', 'Baby showers', 'Job promotions', 'Passing an exam', 'Completing a major project', 'Opening a new business', 'Buying a new home'];

  const handleCollectionClick = (query) => {
    setSearchParams({ q: query });
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts().then(products => {
      const activeProducts = products.filter(p => p.isActive !== false);
      setCakes(activeProducts.map(p => ({
        ...p,
        tags: p.tags && p.tags.length > 0 && p.tags[0] ? p.tags : (p.occasion && p.occasion !== 'General / Any' ? [p.occasion] : [])
      })));
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedShowcaseIndex((prev) => (prev + 1) % SHOWCASE_CAKES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedCakeForCustomization(product);
    setCustomOptions({ weight: 1, isEggless: false, message: '', flavor: 'Default / As Displayed', shape: 'Round' });
  };

  const handleConfirmAddToCart = () => {
    if (!selectedCakeForCustomization) return;
    
    const { isEggless, message, flavor, shape } = customOptions;
    const weight = parseFloat(customOptions.weight) || 0;
    const isCustomDesign = selectedCakeForCustomization.isCustomDesign;
    const basePrice = typeof selectedCakeForCustomization.price === 'string' 
        ? parseFloat(selectedCakeForCustomization.price.replace(/,/g, '')) 
        : selectedCakeForCustomization.price;
    const finalPrice = isCustomDesign ? 'TBD' : ((basePrice * weight) + (isEggless ? 150 : 0));

    const customItem = {
      ...selectedCakeForCustomization,
      id: `${selectedCakeForCustomization.id}-${weight}lb-${isEggless ? 'eggless' : 'reg'}-${flavor.replace(/\s+/g, '')}-${shape}`,
      name: `${selectedCakeForCustomization.name} (${weight} lb${isEggless ? ', Eggless' : ''})`,
      price: finalPrice,
      messageOnCake: message,
      flavor: flavor,
      shape: shape
    };

    addToCart(customItem);
    setSelectedCakeForCustomization(null);
    toast.success('Cake added! Would you like some decorations?');
    setShowUpsellModal(true);
  };

  const handleAddDecorationToCart = (decoration) => {
    addToCart({
      ...decoration,
      id: `${decoration.id}-1`,
      name: decoration.name,
      price: decoration.price,
      messageOnCake: '',
      flavor: 'N/A',
      shape: 'N/A'
    });
    toast.success('Added to cart!');
  };

  const cakesData = cakes.filter(c => c.category === 'Cakes').slice(0, 12);
  const coffeeData = cakes.filter(c => c.category === 'Coffee').slice(0, 12);
  const pastriesData = cakes.filter(c => c.category === 'Pastries').slice(0, 12);
  const giftsData = cakes.filter(c => c.category === 'Gifts').slice(0, 12);
  const filteredDecorations = cakes.filter(c => c.category === 'Decorations');


  const bestSellersData = cakes.filter(c => c.isBestSeller).slice(0, 4);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Cake Snow Bakery",
    "image": "https://cakesnowbakery.com/cakesnow-logo.jpg",
    "description": "Order fresh, custom-designed cakes, pastries, and bakery items from Cake Snow Bakery. Specializing in birthdays, weddings, and celebrations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "addressCountry": "NP"
    },
    "telephone": "+977-9860568012",
    "priceRange": "$$",
    "servesCuisine": "Bakery, Cakes, Pastries"
  };

  return (
    <main>
      <SEO 
        title="Home" 
        description="Welcome to Cake Snow Bakery. Order custom cakes, pastries, and gifts in Tikathali and Balkot." 
        keywords="home, Cake Snow Bakery, fresh bakery, best cake shop Kathmandu, bakery near me, cakes in kathmandu, cake in Nepal, online cake"
        schema={localBusinessSchema}
      />
      <Hero />
      
      {/* 1. Today's Best Seller Section */}
      {bestSellersData.length > 0 && (
        <section className="py-12 bg-[#FDFBF7] dark:bg-[#12041C] relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fadeUp">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="flex items-center gap-4 justify-center mb-2">
                <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] dark:text-[#FDFBF7] font-bold">Today's Best Seller</h2>
                <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              </div>
              <Link to="/menu" className="text-sm font-medium text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] self-end hidden md:block">View All</Link>
            </div>
            </ScrollReveal>

            <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-4 gap-4 md:gap-6">
              {bestSellersData.map((cake) => (
                <div key={cake.id} className="min-w-[240px] md:min-w-0 snap-center bg-white dark:bg-[#1D0A2D] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#EAC2BB]/20 dark:border-[#D4AF37]/20 group cursor-pointer" onClick={() => handleAddToCartClick(cake)}>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#f9f5ed] dark:bg-[#12041C]">
                    <img src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80'} alt={cake.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-[#2A0845] dark:text-[#FDFBF7] text-lg leading-tight mb-2 min-h-[44px]">{cake.name}</h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-bold text-[#2A0845] dark:text-[#FDFBF7]">Rs. {cake.price}</span>
                      <div className="flex items-center gap-1 text-[#FACC15] text-sm">
                        <Star size={14} fill="currentColor" />
                        <span className="text-[#2A0845] dark:text-[#FDFBF7] font-medium">{cake.rating || '4.8'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/menu" className="text-sm font-medium text-[#D4AF37] block text-center mt-4 md:hidden">View All</Link>
          </div>
        </section>
      )}

      {/* Our Cakes Showcase */}
      <section className="py-12 bg-[#FDFBF7] dark:bg-[#12041C] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeLeft">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] dark:text-[#FDFBF7] font-bold">Our Signature Cakes</h2>
            </div>
            <Link to="/cakes" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-sm md:text-base text-[#504441] dark:text-[#d1c1d9] mb-6 -mt-4 max-w-2xl">Every layer tells a story of passion — baked fresh daily with the finest ingredients and a sprinkle of love.</p>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={150}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cakesData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1D0A2D] rounded-2xl p-4 shadow-sm hover:shadow-md border border-[#EAC2BB]/20 dark:border-[#D4AF37]/20 group flex flex-col">
              <Link 
                className="aspect-square overflow-hidden rounded-xl mb-4 bg-[#f9f5ed] dark:bg-[#12041C] cursor-pointer block relative"
                to={`/product/${item.id}`}
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={item.name} 
                  src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                />
              </Link>
              <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-1 md:gap-0 min-h-[44px]">
                <Link 
                  className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] line-clamp-2 cursor-pointer hover:text-[#D4AF37] transition-colors leading-tight"
                  to={`/product/${item.id}`}
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center justify-between mb-4 mt-auto">
                <span className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] whitespace-nowrap">Rs. {item.price}</span>
                <div className="flex items-center gap-1 text-[#FACC15] text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[#2A0845] dark:text-[#FDFBF7] font-medium">{item.rating || '4.8'}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCartClick(item)}
                className="w-full py-2.5 rounded-xl bg-[#2A0845] dark:bg-[#3D155F] text-white font-bold text-sm hover:bg-[#FACC15] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
))}
            {cakesData.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-10">
                <p className="text-[#2A0845] dark:text-[#FDFBF7]/70">No items available right now.</p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/cakes" className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Hot Coffee Showcase */}
      <section className="py-12 bg-[#FDFBF7] dark:bg-[#12041C] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeRight">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] dark:text-[#FDFBF7] font-bold">Brewed to Perfection</h2>
            </div>
            <Link to="/coffee" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-sm md:text-base text-[#504441] dark:text-[#d1c1d9] mb-6 -mt-4 max-w-2xl">Rich, aromatic, and crafted for coffee lovers — the perfect companion to your sweet indulgence.</p>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={150}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {coffeeData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1D0A2D] rounded-2xl p-4 shadow-sm hover:shadow-md border border-[#EAC2BB]/20 dark:border-[#D4AF37]/20 group flex flex-col">
              <Link 
                className="aspect-square overflow-hidden rounded-xl mb-4 bg-[#f9f5ed] dark:bg-[#12041C] cursor-pointer block relative"
                to={`/product/${item.id}`}
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={item.name} 
                  src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                />
              </Link>
              <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-1 md:gap-0 min-h-[44px]">
                <Link 
                  className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] line-clamp-2 cursor-pointer hover:text-[#D4AF37] transition-colors leading-tight"
                  to={`/product/${item.id}`}
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center justify-between mb-4 mt-auto">
                <span className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] whitespace-nowrap">Rs. {item.price}</span>
                <div className="flex items-center gap-1 text-[#FACC15] text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[#2A0845] dark:text-[#FDFBF7] font-medium">{item.rating || '4.8'}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCartClick(item)}
                className="w-full py-2.5 rounded-xl bg-[#2A0845] dark:bg-[#3D155F] text-white font-bold text-sm hover:bg-[#FACC15] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
))}
            {coffeeData.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-10">
                <p className="text-[#2A0845] dark:text-[#FDFBF7]/70">No items available right now.</p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/coffee" className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Fresh Pastries Showcase */}
      <section className="py-12 bg-[#FDFBF7] dark:bg-[#12041C] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeLeft">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] dark:text-[#FDFBF7] font-bold">Freshly Baked Pastries</h2>
            </div>
            <Link to="/pastries" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-sm md:text-base text-[#504441] dark:text-[#d1c1d9] mb-6 -mt-4 max-w-2xl">Golden, flaky, and irresistible — each pastry is a buttery masterpiece made to melt in your mouth.</p>
          </ScrollReveal>
          <ScrollReveal animation="scaleUp" delay={150}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {pastriesData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1D0A2D] rounded-2xl p-4 shadow-sm hover:shadow-md border border-[#EAC2BB]/20 dark:border-[#D4AF37]/20 group flex flex-col">
              <Link 
                className="aspect-square overflow-hidden rounded-xl mb-4 bg-[#f9f5ed] dark:bg-[#12041C] cursor-pointer block relative"
                to={`/product/${item.id}`}
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={item.name} 
                  src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                />
              </Link>
              <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-1 md:gap-0 min-h-[44px]">
                <Link 
                  className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] line-clamp-2 cursor-pointer hover:text-[#D4AF37] transition-colors leading-tight"
                  to={`/product/${item.id}`}
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center justify-between mb-4 mt-auto">
                <span className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] whitespace-nowrap">Rs. {item.price}</span>
                <div className="flex items-center gap-1 text-[#FACC15] text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[#2A0845] dark:text-[#FDFBF7] font-medium">{item.rating || '4.8'}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCartClick(item)}
                className="w-full py-2.5 rounded-xl bg-[#2A0845] dark:bg-[#3D155F] text-white font-bold text-sm hover:bg-[#FACC15] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
))}
            {pastriesData.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-10">
                <p className="text-[#2A0845] dark:text-[#FDFBF7]/70">No items available right now.</p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/pastries" className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>


      <ScrollReveal animation="scaleUp">
      <PromotionalBanner />
      </ScrollReveal>

      {/* Surprise Gifts Showcase */}
      <section className="py-12 bg-[#FDFBF7] dark:bg-[#12041C] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeRight">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] dark:text-[#FDFBF7] font-bold">Surprise Gifts & Hampers</h2>
            </div>
            <Link to="/gifts" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-sm md:text-base text-[#504441] dark:text-[#d1c1d9] mb-6 -mt-4 max-w-2xl">Make someone's day extra special — thoughtfully curated gift boxes for birthdays, anniversaries, and every occasion worth celebrating.</p>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={150}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {giftsData.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1D0A2D] rounded-2xl p-4 shadow-sm hover:shadow-md border border-[#EAC2BB]/20 dark:border-[#D4AF37]/20 group flex flex-col">
              <Link 
                className="aspect-square overflow-hidden rounded-xl mb-4 bg-[#f9f5ed] dark:bg-[#12041C] cursor-pointer block relative"
                to={`/product/${item.id}`}
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={item.name} 
                  src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                />
              </Link>
              <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-1 md:gap-0 min-h-[44px]">
                <Link 
                  className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] line-clamp-2 cursor-pointer hover:text-[#D4AF37] transition-colors leading-tight"
                  to={`/product/${item.id}`}
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center justify-between mb-4 mt-auto">
                <span className="font-bold text-sm md:text-md text-[#2A0845] dark:text-[#FDFBF7] whitespace-nowrap">Rs. {item.price}</span>
                <div className="flex items-center gap-1 text-[#FACC15] text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[#2A0845] dark:text-[#FDFBF7] font-medium">{item.rating || '4.8'}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCartClick(item)}
                className="w-full py-2.5 rounded-xl bg-[#2A0845] dark:bg-[#3D155F] text-white font-bold text-sm hover:bg-[#FACC15] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
))}
            {giftsData.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-10">
                <p className="text-[#2A0845] dark:text-[#FDFBF7]/70">No items available right now.</p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/gifts" className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] dark:text-[#FDFBF7] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>


      {/* 4. Loyalty Card Offer */}
      <section className="py-8 bg-[#FDFBF7] dark:bg-[#12041C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeUp">
          <div className="bg-[#2A0845] dark:bg-[#3D155F] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/10 rounded-full blur-[80px]"></div>
            
            <div className="z-10 flex flex-col mb-6 md:mb-0 w-full md:w-1/3">
              <h3 className="font-headline-xl text-2xl font-bold mb-1 text-center md:text-left">Loyalty Card</h3>
              <p className="text-xs text-white/80 mb-6 text-center md:text-left">Because You Deserve Something Sweet!</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[1,2,3,4,5,6,7,8].map(num => (
                  <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${num <= stamps ? 'bg-[#D4AF37] text-white' : 'bg-white dark:bg-[#1D0A2D] text-[#2A0845] dark:text-[#FDFBF7]'}`}>
                    {num <= stamps ? '✓' : num}
                  </div>
                ))}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${stamps === 9 ? 'bg-[#D4AF37] text-white' : 'bg-white dark:bg-[#1D0A2D]/30 text-white'}`}>
                  {stamps === 9 ? '✓' : '9'}
                </div>
                <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center font-bold text-[8px] leading-tight shadow-md ml-1 -mt-1 transform -rotate-12 border-2 border-white transition-all ${stamps === 9 ? 'bg-[#FACC15] text-[#2A0845] dark:text-[#FDFBF7] scale-110 animate-bounce' : 'bg-[#FACC15]/50 text-[#2A0845]/50 dark:text-[#FDFBF7]/50'}`}>
                  <span>FREE</span>
                  <span>CAKE</span>
                </div>
              </div>
            </div>

            <div className="z-10 text-center w-full md:w-1/3 border-y md:border-y-0 md:border-x border-white/20 py-6 md:py-0 md:px-8 mb-6 md:mb-0">
              <p className="text-lg mb-1">Collect 9 Stamps</p>
              <h3 className="text-2xl font-bold text-[#FACC15] mb-4">Get 1 Regular Cake <br/><span className="text-3xl text-white">FREE!</span></h3>
              <button 
                onClick={() => setShowLoyaltyModal(true)}
                className="bg-[#FACC15] text-[#2A0845] dark:text-[#FDFBF7] font-bold px-6 py-2 rounded-lg hover:bg-white dark:bg-[#1D0A2D] transition-colors text-sm"
              >
                {stamps === 9 ? 'Redeem Now' : 'Learn More'}
              </button>
            </div>

            <div className="z-10 w-full md:w-1/3 flex justify-center items-center">
               <div 
                 onClick={handleAddStamp}
                 className="w-24 h-24 border-2 border-[#D4AF37] rounded-full p-2 flex flex-col items-center justify-center bg-[#2A0845] dark:bg-[#3D155F] cursor-pointer hover:bg-[#3D155F] transition-colors group relative"
                 title="Click to add a stamp (Demo)"
               >
                  <span className="text-white font-headline-md font-bold text-sm tracking-wider group-hover:scale-105 transition-transform">Cake</span>
                  <span className="text-[#FACC15] font-headline-md font-bold text-sm tracking-wider group-hover:scale-105 transition-transform">Snow</span>
                  <span className="absolute -bottom-6 text-[10px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Tap to stamp (Demo)</span>
               </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Customer Reviews (Customer Love) */}
      <section className="py-12 bg-[#FDFBF7] dark:bg-[#12041C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeUp">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex items-center gap-4 justify-center mb-2">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] dark:text-[#FDFBF7] font-bold">What Our Customers Say</h2>
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={200}>
          <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'Sunita K.', text: 'Amazing cakes and excellent service. Cake Snow never disappoints!', rating: 5, avatar: 'https://i.pravatar.cc/150?img=44' },
              { name: 'Ramesh P.', text: 'The best bakery in town! Love their taste and staff behavior.', rating: 5, avatar: 'https://i.pravatar.cc/150?img=33' },
              { name: 'Anjali M.', text: 'Surprise gifts are so beautiful. Highly recommended!', rating: 5, avatar: 'https://i.pravatar.cc/150?img=5' }
            ].map((review, i) => (
              <div key={i} className="min-w-[280px] md:min-w-0 snap-center bg-white dark:bg-[#1D0A2D] p-6 rounded-2xl shadow-sm border border-[#EAC2BB]/20 dark:border-[#D4AF37]/20 relative flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-[#2A0845] dark:text-[#FDFBF7] text-sm">{review.name}</h5>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => <Star key={star} size={10} className="fill-amber-500 text-amber-500" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#2A0845] dark:text-[#FDFBF7]/80 italic leading-relaxed font-medium">"{review.text}"</p>
                <div className="absolute bottom-4 right-4 text-blue-500 font-bold text-lg font-serif">G</div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cakes section moved to top */}

      {/* Customization Modal */}
      {selectedCakeForCustomization && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
            <div className="relative h-40 bg-surface-variant">
              <img 
                src={selectedCakeForCustomization.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                alt={selectedCakeForCustomization.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="text-white font-headline-md text-2xl font-bold">{selectedCakeForCustomization.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedCakeForCustomization(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block font-medium text-on-surface mb-2">Select Pound (lbs)</label>
                <input 
                  type="number" 
                  min="0.5" 
                  step="0.5"
                  placeholder="e.g., 1.5"
                  value={customOptions.weight === '' ? '' : customOptions.weight}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, weight: e.target.value === '' ? '' : parseFloat(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/50 transition-colors">
                  <input 
                    type="checkbox"
                    checked={customOptions.isEggless}
                    onChange={(e) => setCustomOptions(prev => ({ ...prev, isEggless: e.target.checked }))}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                  />
                  <div className="flex-1">
                    <span className="block font-medium text-on-surface">Make it Eggless</span>
                    <span className="block text-xs text-on-surface-variant">+ Rs. 150 per cake</span>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-on-surface mb-2">Flavor</label>
                  <select 
                    value={customOptions.flavor}
                    onChange={(e) => setCustomOptions(prev => ({ ...prev, flavor: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                  >
                    <option value="Default / As Displayed">As Displayed</option>
                    <option value="Black Forest">Black Forest</option>
                    <option value="White Forest">White Forest</option>
                    <option value="Vanilla">Vanilla</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Strawberry">Strawberry</option>
                    <option value="Blueberry">Blueberry</option>
                    <option value="Butterscotch">Butterscotch</option>
                    <option value="Mango">Mango</option>
                    <option value="Orange">Orange</option>
                    <option value="Pineapple">Pineapple</option>
                    <option value="Mocha">Mocha</option>
                    <option value="Kiwi">Kiwi</option>
                    <option value="Mix Fruit">Mix Fruit</option>
                    <option value="Choco Chips">Choco Chips</option>
                    <option value="Red Velvet">Red Velvet</option>
                    <option value="Truffle (White)">Truffle (White)</option>
                    <option value="Truffle (Black)">Truffle (Black)</option>
                    <option value="Opera">Opera</option>
                    <option value="Italian">Italian</option>
                    <option value="Double Chocolate">Double Chocolate</option>
                    <option value="Tres Leches">Tres Leches</option>
                    <option value="Cake Snow Special">Cake Snow Special</option>
                    <option value="Sugarpaste with Cream">Sugarpaste with Cream</option>
                    <option value="Sugarpaste">Sugarpaste</option>
                    <option value="Brownie Cake">Brownie Cake</option>
                    <option value="Cheesecake (Vanilla)">Cheesecake (Vanilla)</option>
                    <option value="Cheesecake (All Flavours)">Cheesecake (All Flavours)</option>
                    <option value="Choco Lava Cake">Choco Lava Cake</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-on-surface mb-2">Shape</label>
                  <select 
                    value={customOptions.shape}
                    onChange={(e) => setCustomOptions(prev => ({ ...prev, shape: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                  >
                    <option value="Round">Round</option>
                    <option value="Square">Square</option>
                    <option value="Heart">Heart-shaped</option>
                    <option value="Rectangle">Rectangle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-2">Message on Cake (Optional)</label>
                <input 
                  type="text"
                  maxLength={30}
                  placeholder="e.g., Happy Birthday John"
                  value={customOptions.message}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <div className="text-right mt-1 text-xs text-on-surface-variant">{customOptions.message.length}/30</div>
              </div>
              
              <div className="bg-surface-container-low p-4 rounded-xl flex justify-between items-center">
                <span className="font-medium text-on-surface-variant">Total Price:</span>
                <span className="font-bold text-xl text-primary">
                  {selectedCakeForCustomization.isCustomDesign 
                    ? 'To Be Determined' 
                    : `Rs. ${(((typeof selectedCakeForCustomization.price === 'string' ? parseFloat(selectedCakeForCustomization.price.replace(/,/g, '')) : selectedCakeForCustomization.price) * (customOptions.weight || 0)) + (customOptions.isEggless ? 150 : 0)).toFixed(2)}`
                  }
                </span>
              </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant/30 bg-surface">
              <button 
                onClick={handleConfirmAddToCart}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-md flex justify-center items-center gap-2"
              >
                <ShoppingBag size={20} />
                Confirm & Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedCakeForDetails && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
            <div className="relative h-64 bg-surface-variant">
              <img 
                src={selectedCakeForDetails.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                alt={selectedCakeForDetails.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedCakeForDetails(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-headline-lg text-2xl font-bold text-primary">{selectedCakeForDetails.name}</h3>
                  <span className="font-bold text-xl text-secondary whitespace-nowrap">Rs. {selectedCakeForDetails.price}</span>
                </div>
                {selectedCakeForDetails.tags && selectedCakeForDetails.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCakeForDetails.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-outline-variant/30">
                <h4 className="font-medium text-on-surface mb-2">Description</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedCakeForDetails.description || 'No description available for this delicious cake.'}
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setSelectedCakeForDetails(null)}
                  className="flex-1 py-3.5 rounded-xl border-2 border-outline-variant font-medium text-on-surface hover:border-primary/50 hover:bg-surface-container-low transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setSelectedCakeForDetails(null);
                    handleAddToCartClick(selectedCakeForDetails);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Customize & Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface rounded-3xl w-full max-w-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="bg-primary/10 p-6 text-center border-b border-primary/20 relative">
              <h2 className="font-headline-md text-2xl text-primary font-bold">Make It Extra Special! ✨</h2>
              <p className="text-on-surface-variant mt-2 font-medium">Your cake is in the cart. Add these popular party items to complete your celebration.</p>
              <button 
                onClick={() => setShowUpsellModal(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors bg-white dark:bg-[#1D0A2D] p-2 rounded-full shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-surface-container-low/30">
              {filteredDecorations.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredDecorations.slice(0, 8).map((item) => (
                    <div key={item.id} className="bg-white dark:bg-[#1D0A2D] rounded-xl p-3 shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
                      <img 
                        src={item.image || 'https://via.placeholder.com/150'} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg mb-3 mix-blend-multiply"
                      />
                      <h4 className="font-bold text-sm text-primary line-clamp-2 leading-tight mb-1">{item.name}</h4>
                      <p className="text-secondary font-bold mb-3">Rs. {item.price}</p>
                      <button 
                        onClick={() => handleAddDecorationToCart(item)}
                        className="w-full mt-auto py-2 rounded-lg bg-surface-variant text-on-surface font-medium hover:bg-primary hover:text-white transition-colors text-xs flex items-center justify-center gap-1"
                      >
                        <ShoppingBag size={12} /> Add
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-on-surface-variant py-8">No decorations available right now.</p>
              )}
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-white dark:bg-[#1D0A2D] flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowUpsellModal(false)}
                className="flex-1 py-3 rounded-xl border border-outline-variant font-medium text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => {
                  setShowUpsellModal(false);
                  setIsCartOpen(true);
                }}
                className="flex-1 py-3 rounded-xl bg-secondary text-white font-bold hover:bg-secondary/90 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Go to Cart <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Loyalty Modal */}
      {showLoyaltyModal && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface rounded-3xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-[#2A0845] dark:bg-[#3D155F] p-6 text-center border-b border-[#D4AF37]/20 relative">
              <h2 className="font-headline-md text-2xl text-[#FACC15] font-bold">Loyalty Program</h2>
              <p className="text-white/80 mt-2 font-medium">Because you deserve something sweet!</p>
              <button 
                onClick={() => setShowLoyaltyModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 text-on-surface-variant mb-6 text-sm">
                <p><strong>1.</strong> Earn one stamp for every regular cake purchased online or in-store.</p>
                <p><strong>2.</strong> Collect 9 stamps to get your 10th regular cake for FREE!</p>
                <p><strong>3.</strong> Stamps cannot be transferred or exchanged for cash.</p>
                <p><strong>4.</strong> For demonstration purposes, you can tap the "Cake Snow" stamp on the homepage to add stamps.</p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl text-center mb-6">
                <p className="text-sm font-medium text-on-surface-variant mb-1">Your Current Stamps</p>
                <p className="text-3xl font-bold text-primary">{stamps} / 9</p>
                {stamps === 9 && <p className="text-green-600 font-bold mt-2 animate-pulse">You have a Free Cake waiting!</p>}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowLoyaltyModal(false)}
                  className="flex-1 py-3 rounded-xl border border-outline-variant text-on-surface font-medium hover:bg-surface-container transition-colors"
                >
                  Close
                </button>
                {stamps === 9 ? (
                  <button 
                    onClick={handleRedeem}
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-md"
                  >
                    Redeem Now
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      handleAddStamp();
                      if (stamps === 8) {
                        setShowLoyaltyModal(false);
                      }
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#FACC15] text-[#2A0845] font-bold hover:bg-[#FACC15]/90 transition-colors shadow-md"
                  >
                    Add Stamp (Demo)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default Home;
