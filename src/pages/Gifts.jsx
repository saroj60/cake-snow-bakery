import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../services/db';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Gift as GiftIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Gifts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(3000);

  const filters = ['All', 'Chocolates', 'Combos', 'Customized', 'Birthday', 'Anniversary'];

  useEffect(() => {
    setIsLoading(true);
    getProducts().then(products => {
      const activeProducts = products.filter(p => p.isActive !== false && p.category === 'Gifts');
      setGifts(activeProducts);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const handleAddToCartClick = (gift) => {
    addToCart({
      ...gift,
      id: `${gift.id}-1`,
      price: typeof gift.price === 'string' ? parseFloat(gift.price.replace(/,/g, '')) : gift.price,
      messageOnCake: '',
      flavor: 'Default',
      shape: 'Regular'
    });
    toast.success('Added to cart!');
  };

  const filteredGifts = gifts.filter(gift => {
    const matchesFilter = activeFilter === 'All' || (gift.tags && gift.tags.includes(activeFilter));
    const giftPrice = parseFloat(String(gift.price).replace(/,/g, '')) || 0;
    const matchesPrice = giftPrice <= priceRange;
    const matchesSearch = !searchQuery || 
      gift.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (gift.description && gift.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesFilter && matchesPrice && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7] dark:bg-[#12041C] pt-36 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GiftIcon size={40} className="text-[#0D47A1]" />
            <h1 className="font-headline-xl text-3xl md:text-5xl text-[#0D47A1] font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Surprise Gifts"}
            </h1>
          </div>
          <p className="text-[#6B1FA6] max-w-2xl mx-auto">Make their day extra special with our thoughtfully curated surprise gifts and combos.</p>
        </div>

        <div className="flex flex-col items-center gap-6 bg-white dark:bg-[#1D0A2D] p-6 rounded-2xl shadow-sm border border-[#0D47A1]/10 mb-12">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter 
                    ? 'bg-[#6B1FA6] text-white shadow-md' 
                    : 'bg-[#FDFBF7] dark:bg-[#12041C] text-[#0D47A1] hover:bg-[#F5C242] hover:text-[#0D47A1] border border-[#0D47A1]/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Price Range */}
          <div className="w-full max-w-md flex flex-col items-center pt-4 border-t border-[#0D47A1]/10">
            <label className="text-sm font-bold text-[#6B1FA6] mb-2 flex justify-between w-full">
              <span>Max Price</span>
              <span className="text-[#0D47A1]">Rs. {priceRange}</span>
            </label>
            <input 
              type="range" 
              min="200" 
              max="5000" 
              step="100" 
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#0D47A1]"
            />
          </div>
        </div>
        
        {/* Gifts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredGifts.map((gift) => (
            <div key={gift.id} className="bg-white dark:bg-[#1D0A2D] rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all border border-[#0D47A1]/10 group flex flex-col">
              <div className="aspect-square overflow-hidden rounded-xl mb-4 bg-[#FDFBF7] dark:bg-[#12041C] relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={gift.name} 
                  src={gift.image || 'https://images.unsplash.com/photo-1549122728-f519709caa9c?w=800&q=80'} 
                />
                {gift.tags && gift.tags[0] && (
                  <span className="absolute top-2 left-2 bg-[#F5C242] text-[#0D47A1] text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    {gift.tags[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start mb-2">
                <h3 className="font-bold text-lg text-[#0D47A1] line-clamp-2 leading-tight">
                  {gift.name}
                </h3>
                <p className="text-xs text-[#6B1FA6] mt-1 line-clamp-2 min-h-[32px]">{gift.description}</p>
              </div>
              <div className="flex items-center justify-between mb-4 mt-auto">
                <span className="font-bold text-lg text-[#6B1FA6] whitespace-nowrap">Rs. {gift.price}</span>
                <div className="flex items-center gap-1 text-[#F5C242] text-sm">
                  <Star size={14} fill="currentColor" />
                  <span className="text-[#0D47A1] font-medium">{gift.rating || '4.9'}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCartClick(gift)}
                className="w-full py-3 rounded-xl bg-[#0D47A1] text-white font-bold text-sm hover:bg-[#6B1FA6] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
          {filteredGifts.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-12">
              <p className="text-[#6B1FA6] text-xl font-medium">No gifts found matching your criteria.</p>
              <button 
                onClick={() => { setActiveFilter('All'); setPriceRange(3000); }}
                className="mt-4 px-6 py-2 bg-[#F5C242] text-[#0D47A1] font-bold rounded-full hover:bg-[#0D47A1] hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
          {isLoading && (
            <div className="col-span-full text-center py-12">
              <p className="text-[#0D47A1] text-xl font-medium animate-pulse">Wrapping up the gifts...</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Gifts;
