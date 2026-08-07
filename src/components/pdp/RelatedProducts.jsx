import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { getProducts } from '../../services/db';
import { useCart } from '../../context/CartContext';

const RelatedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(allProducts => {
      // Filter out the current product and take 4 random products
      const related = allProducts
        .filter(p => p.id !== currentProductId && p.isActive !== false)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setProducts(related);
    });
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">You Might Also Like</h2>
          <p className="text-on-surface-variant mt-2">Customers who bought this also bought</p>
        </div>
        <Link to="/?category=cakes" className="text-primary font-medium hover:underline hidden sm:block">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-surface rounded-[20px] shadow-sm border border-outline-variant/30 overflow-hidden hover:shadow-md transition-shadow">
            
            <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden block">
              <img 
                src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80'} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // wishlist logic
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface-variant hover:text-red-500 hover:bg-surface transition-colors z-10"
              >
                <Heart className="w-4 h-4" />
              </button>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`} className="block flex-grow">
                <h3 className="font-bold text-on-surface text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 text-sm text-on-surface-variant mb-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-on-surface">4.8</span>
                  <span>(124)</span>
                </div>
              </Link>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
                <span className="font-bold text-lg text-on-surface">Rs. {product.price}</span>
                <button 
                  onClick={() => addToCart({ ...product, quantity: 1, id: `${product.id}-${Date.now()}` })}
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-on-primary p-2.5 rounded-xl transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
