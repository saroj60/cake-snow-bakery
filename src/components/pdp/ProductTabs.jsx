import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Leaf, Package, MessageCircle, AlertTriangle } from 'lucide-react';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: <Info className="w-4 h-4" /> },
    { id: 'ingredients', label: 'Ingredients', icon: <Leaf className="w-4 h-4" /> },
    { id: 'delivery', label: 'Delivery', icon: <Package className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-surface rounded-[20px] shadow-sm border border-outline-variant/30 overflow-hidden">
      
      {/* Tab Navigation */}
      <div className="flex border-b border-outline-variant/30 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap relative ${
              activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-on-surface-variant text-sm leading-relaxed"
          >
            
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.description || 'Our signature cake is made with the finest ingredients and baked to perfection.'}</p>
                <div className="flex gap-4 pt-4 border-t border-outline-variant/30">
                  <div>
                    <strong className="block text-on-surface">Storage Instructions</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Store below 5°C</li>
                      <li>Consume within 24 hours</li>
                      <li>Keep refrigerated</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-on-surface mb-3">Premium Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {(product.ingredients || ['Flour', 'Butter', 'Eggs', 'Sugar', 'Vanilla Extract']).map((ing, i) => (
                      <span key={i} className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <strong className="text-orange-900 block mb-1">Allergen Warning</strong>
                    <p className="text-orange-800 text-xs">
                      Contains: {(product.allergens || ['Milk', 'Egg', 'Gluten', 'Nuts']).join(', ')}. 
                      Prepared in a facility that handles nuts and dairy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p><strong>Same Day Delivery</strong> is available for orders placed before 3 PM.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p><strong>Delivery Timings:</strong> 9 AM to 9 PM, carefully delivered in temperature-controlled vehicles.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p><strong>Cancellation Policy:</strong> Orders can be cancelled up to 24 hours before the scheduled delivery date for a full refund.</p>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {[
                  { q: 'How long does delivery take?', a: 'Standard delivery takes 2-4 hours from the time of order confirmation.' },
                  { q: 'Can I customize the design?', a: 'Yes! Please use the "Special Instructions" box or upload an image.' },
                  { q: 'Do you make eggless cakes?', a: 'Absolutely. Just select the "Eggless Option" when customizing your cake.' }
                ].map((faq, i) => (
                  <details key={i} className="group border border-outline-variant/30 rounded-xl bg-surface-container-lowest">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-on-surface">
                      <span>{faq.q}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-on-surface-variant px-4 pb-4 mt-2 border-t border-outline-variant/20 pt-4">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ProductTabs;
