const fs = require('fs');

const path = 'src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

const productsGridRegex = /(\s*\/\* Products Grid \*\/[\s\S]*?<\/section>)/;
const bestSellerRegex = /(\s*\/\* 1\. Today's Best Seller Section \*\/[\s\S]*?<\/section>)/;

const productsGridMatch = content.match(productsGridRegex);
const bestSellerMatch = content.match(bestSellerRegex);

if (productsGridMatch && bestSellerMatch) {
  content = content.replace(productsGridMatch[0], '%%%PRODUCTS_GRID%%%');
  content = content.replace(bestSellerMatch[0], '%%%BEST_SELLER%%%');
  
  content = content.replace('%%%PRODUCTS_GRID%%%', bestSellerMatch[0]);
  content = content.replace('%%%BEST_SELLER%%%', productsGridMatch[0]);
  
  fs.writeFileSync(path, content, 'utf8');
  console.log('Swapped successfully!');
} else {
  console.log('Could not find matches');
}
