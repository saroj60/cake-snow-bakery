import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductGallery from '../components/pdp/ProductGallery';
import ProductCustomization from '../components/pdp/ProductCustomization';
import DeliveryCheck from '../components/pdp/DeliveryCheck';
import ProductTabs from '../components/pdp/ProductTabs';
import RelatedProducts from '../components/pdp/RelatedProducts';
import { getProducts } from '../services/db';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // For real-time price calculation
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Fetch product details
    setLoading(true);
    getProducts().then(products => {
      const found = products.find(p => p.id === id || p.id === parseInt(id));
      if (found) {
        setProduct(found);
        setBasePrice(parseFloat(found.price?.toString().replace(/,/g, '') || 0));
        setTotalPrice(parseFloat(found.price?.toString().replace(/,/g, '') || 0));
      } else {
        // Fallback mock data if product not found in DB
        const mockProduct = {
          id: id,
          name: 'Chocolate Birthday Cake',
          category: 'Signature Cakes',
          rating: 4.9,
          reviews: 524,
          orders: 2100,
          code: 'CSB-1024',
          price: 1350,
          originalPrice: 1500,
          availability: 'In Stock',
          images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&q=80',
            'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1000&q=80',
            'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1000&q=80',
            'https://images.unsplash.com/photo-1557925923-33b251d59286?w=1000&q=80'
          ],
          badges: ['Bestseller', 'Same Day Delivery'],
          description: 'Our signature Royal Chocolate Fudge cake features decadent dark chocolate layers filled with rich Belgian ganache, finished with a smooth chocolate glaze.',
          ingredients: ['Premium Flour', 'Belgian Cocoa', 'Farm Fresh Eggs', 'Heavy Cream', 'Madagascar Vanilla'],
          allergens: ['Milk', 'Egg', 'Gluten']
        };
        setProduct(mockProduct);
        setBasePrice(mockProduct.price);
        setTotalPrice(mockProduct.price);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) return <div className="pt-24 text-center">Product not found.</div>;

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-20 pb-24 lg:pb-12 text-on-surface font-sans">
      
      {/* Breadcrumbs */}
      <div className="container-custom mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-on-surface-variant/70 gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/?category=cakes" className="hover:text-primary transition-colors">Cakes</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-on-surface font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="container-custom mx-auto px-4 pb-12">
        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Column: Gallery & Mobile Info */}
          <div className="lg:w-[55%] xl:w-[60%] flex flex-col gap-8">
            <ProductGallery images={product.images || [product.image]} badges={product.badges} />
            
            <div className="hidden lg:block">
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Right Column: Customization, Delivery, Purchase */}
          <div className="lg:w-[45%] xl:w-[40%] flex flex-col gap-6 sticky top-24 self-start">
            <ProductCustomization 
              product={product} 
              basePrice={basePrice}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            

          </div>

        </div>

        {/* Mobile Tabs */}
        <div className="mt-8 block lg:hidden">
          <ProductTabs product={product} />
        </div>

        {/* Related Products Section */}
        <div className="mt-16 xl:mt-24">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
