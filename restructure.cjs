const fs = require('fs');

const path = 'src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

const productCardHtml = `
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-[#EAC2BB]/20 group flex flex-col">
              <Link 
                className="aspect-square overflow-hidden rounded-xl mb-4 bg-[#f9f5ed] cursor-pointer block relative"
                to={\`/product/\${item.id}\`}
              >
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={item.name} 
                  src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                />
              </Link>
              <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-1 md:gap-0 min-h-[44px]">
                <Link 
                  className="font-bold text-sm md:text-md text-[#2A0845] line-clamp-2 cursor-pointer hover:text-[#D4AF37] transition-colors leading-tight"
                  to={\`/product/\${item.id}\`}
                >
                  {item.name}
                </Link>
              </div>
              <div className="flex items-center justify-between mb-4 mt-auto">
                <span className="font-bold text-sm md:text-md text-[#2A0845] whitespace-nowrap">Rs. {item.price}</span>
                <div className="flex items-center gap-1 text-[#FACC15] text-xs">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[#2A0845] font-medium">{item.rating || '4.8'}</span>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCartClick(item)}
                className="w-full py-2.5 rounded-xl bg-[#2A0845] text-white font-bold text-sm hover:bg-[#FACC15] hover:text-[#2A0845] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
`;

const getShowcaseHtml = (title, itemsVar, linkTo) => `
      {/* ${title} Showcase */}
      <section className="py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-[#2A0845] font-bold">${title}</h2>
            </div>
            <Link to="${linkTo}" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {${itemsVar}.map((item) => (${productCardHtml}))}
            {${itemsVar}.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-10">
                <p className="text-[#2A0845]/70">No items available right now.</p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="${linkTo}" className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#2A0845] transition-colors">
              View More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
`;

const productsGridRegex = /(\s*\/\* Products Grid \*\/[\s\S]*?<\/section>)/;
const categoriesRowRegex = /(\s*\/\* 2\. Categories Row \*\/[\s\S]*?<\/section>)/;
const surpriseGiftsRegex = /(\s*\/\* 3\. Surprise Gifts \*\/[\s\S]*?<\/section>)/;

const newProductsGrid = getShowcaseHtml('Our Cakes', 'cakesData', '/cakes');
const newCoffeeShowcase = getShowcaseHtml('Hot Coffee', 'coffeeData', '/coffee');
const newPastriesShowcase = getShowcaseHtml('Fresh Pastries', 'pastriesData', '/pastries');
const newGiftsShowcase = getShowcaseHtml('Surprise Gifts', 'giftsData', '/gifts');

const dataVarsHtml = `
  const cakesData = cakes.filter(c => c.category === 'Cakes').slice(0, 4);
  const coffeeData = cakes.filter(c => c.category === 'Coffee').slice(0, 4);
  const pastriesData = cakes.filter(c => c.category === 'Pastries').slice(0, 4);
  const giftsData = cakes.filter(c => c.category === 'Gifts').slice(0, 4);
`;

const filteredCakesRegex = /const filteredCakes = [\s\S]*?const newArrivals = \[\.\.\.filteredCakes\]\.reverse\(\)\.slice\(0, 4\);/;
content = content.replace(filteredCakesRegex, dataVarsHtml);

content = content.replace(productsGridRegex, newProductsGrid);
content = content.replace(categoriesRowRegex, newCoffeeShowcase + newPastriesShowcase);
content = content.replace(surpriseGiftsRegex, newGiftsShowcase);

fs.writeFileSync(path, content, 'utf8');
console.log('Restructured successfully!');
