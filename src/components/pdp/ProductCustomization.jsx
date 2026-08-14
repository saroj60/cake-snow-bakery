import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const FLAVORS = [
  'Black Forest', 'White Forest', 'Vanilla', 'Chocolate', 'Strawberry', 'Blueberry',
  'Butterscotch', 'Mango', 'Orange', 'Pineapple', 'Mocha', 'Kiwi', 'Mix Fruit',
  'Choco Chips', 'Red Velvet', 'Truffle (White)', 'Truffle (Black)', 'Opera',
  'Italian', 'Double Chocolate', 'Tres Leches', 'Cake Snow Special',
  'Sugarpaste with Cream', 'Sugarpaste', 'Brownie Cake', 'Cheesecake (Vanilla)',
  'Cheesecake (All Flavours)', 'Choco Lava Cake'
];

const WEIGHTS = [1, 1.5, 2, 2.5, 3, 4, 5];
const EGGLESS_SURCHARGE_FLAT = 150; // flat 150 extra for eggless

const ProductCustomization = ({ product, basePrice, totalPrice, setTotalPrice }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [weight, setWeight] = useState(1);
  const [flavor, setFlavor] = useState('Chocolate');
  const [shape, setShape] = useState('Round');
  const [isEggless, setIsEggless] = useState(false);
  const [message, setMessage] = useState('');
  const [instructions, setInstructions] = useState('');
  

  // Recalculate price
  useEffect(() => {
    let price = basePrice * weight;
    if (isEggless) {
      price = price + EGGLESS_SURCHARGE_FLAT;
    }
    setTotalPrice(price);
  }, [weight, isEggless, basePrice, setTotalPrice]);



  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`, // unique id for cart
      name: product.name,
      price: totalPrice,
      image: product.images?.[0] || product.image,
      quantity: 1,
      customizations: { weight, flavor, shape, isEggless, message, instructions }
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(true);
  };

  return (
    <div className="bg-surface/60 backdrop-blur-md rounded-[20px] p-6 lg:p-8 shadow-sm border border-outline-variant/30 flex flex-col gap-6">
      
      {/* Product Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-4">
          <span className="flex items-center text-amber-500 font-medium"><span className="mr-1">★</span>{product.rating}</span>
          <span>({product.reviews} Reviews)</span>
          <span>•</span>
          <span>{product.orders}+ Orders</span>
        </div>
        
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-primary">Rs. {totalPrice.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-lg line-through text-on-surface-variant/50">Rs. {product.originalPrice.toLocaleString()}</span>
          )}
          {product.originalPrice && (
            <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md mb-1">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>

      <hr className="border-outline-variant/30" />

      {/* Customization Options */}
      <div className="flex flex-col gap-5">
        
        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Cake Weight (Pounds)</label>
          <select 
            value={weight} 
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
          >
            {WEIGHTS.map(w => (
              <option key={w} value={w}>{w} Pound{w > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Flavor */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Cake Flavor</label>
          <select 
            value={flavor} 
            onChange={(e) => setFlavor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
          >
            {FLAVORS.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Shape */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Cake Shape</label>
          <div className="flex flex-wrap gap-3">
            {['Round', 'Square', 'Heart', 'Rectangle'].map(s => (
              <label key={s} className="cursor-pointer">
                <input 
                  type="radio" 
                  name="shape" 
                  value={s} 
                  checked={shape === s}
                  onChange={() => setShape(s)}
                  className="hidden" 
                />
                <span className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${shape === s ? 'bg-primary/10 border-primary text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}>
                  {s}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Egg Option */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
          <div>
            <p className="text-sm font-medium text-on-surface">Eggless Option</p>
            <p className="text-xs text-on-surface-variant">+ Rs. 150 extra</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isEggless} onChange={(e) => setIsEggless(e.target.checked)} />
            <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-[#1D0A2D] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {/* Cake Message */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Cake Message (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. Happy Birthday Aayush"
            maxLength={40}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          <p className="text-xs text-on-surface-variant mt-1 text-right">{message.length}/40</p>
        </div>



        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Special Instructions</label>
          <textarea 
            rows={3}
            placeholder="e.g. Use less cream, deliver carefully..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
          ></textarea>
        </div>

      </div>

      <hr className="border-outline-variant/30" />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-[0.98]"
        >
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 bg-tertiary text-on-tertiary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-tertiary/90 transition-all shadow-md active:scale-[0.98]"
        >
          <Zap className="w-5 h-5" /> Buy Now
        </button>
        <button className="p-4 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface hover:text-red-500 transition-colors flex items-center justify-center bg-surface-container-lowest">
          <Heart className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

export default ProductCustomization;
