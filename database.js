import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'db.json');

// Initialize with default data if empty
const defaultData = {
  products: [
    {
      id: "1",
      name: "Classic Black Forest",
      price: 1200,
      category: "Cakes",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
      description: "Rich chocolate sponge layered with fresh cream and dark cherries, topped with chocolate shavings.",
      features: JSON.stringify(["100% Eggless available", "Free custom message", "Fresh cherry filling"]),
      isCustomDesign: 0,
      isBestSeller: 1
    },
    {
      id: "2",
      name: "Red Velvet Dream",
      price: 1500,
      category: "Cakes",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1616541823729-00fe0ea0f6fb?w=800&auto=format&fit=crop",
      description: "Signature red velvet sponge with smooth cream cheese frosting.",
      features: JSON.stringify(["Premium cream cheese", "Available in heart shape", "Contains edible flowers"]),
      isCustomDesign: 0,
      isBestSeller: 1
    }
  ],
  orders: [],
  celebrations: [],
  gallery: [
    { id: "1", imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', altText: 'Decadent chocolate cake', createdAt: new Date().toISOString() },
    { id: "2", imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800', altText: 'Beautiful anniversary cake', createdAt: new Date().toISOString() },
    { id: "3", imageUrl: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=800', altText: 'Birthday party celebration', createdAt: new Date().toISOString() },
    { id: "4", imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800', altText: 'Strawberry cream cake', createdAt: new Date().toISOString() },
    { id: "5", imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800', altText: 'Red velvet slice', createdAt: new Date().toISOString() },
    { id: "6", imageUrl: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&q=80&w=800', altText: 'Custom photo cake', createdAt: new Date().toISOString() },
    { id: "7", imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800', altText: 'Kids birthday cake', createdAt: new Date().toISOString() },
    { id: "8", imageUrl: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?auto=format&fit=crop&q=80&w=800', altText: 'Premium design cake', createdAt: new Date().toISOString() }
  ],
  settings: {
    trendingFlavors: ['birthday', 'chocolate', 'bento', 'rasmalai cake', 'chocolate bar', 'black forest', 'red velvet', 'butterscotch', 'vanilla', 'strawberry']
  }
};

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), 'utf-8');
}

function loadData() {
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return { ...defaultData };
  }
}

function saveData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

// Simple SQLite mock for server.js
const db = {
  prepare: (sql) => {
    return {
      all: () => {
        const data = loadData();
        if (sql.includes('FROM products')) return data.products || [];
        if (sql.includes('FROM orders')) return data.orders || [];
        if (sql.includes('FROM settings')) return data.settings || { trendingFlavors: [] };
        if (sql.includes('FROM celebrations')) return data.celebrations || [];
        if (sql.includes('FROM gallery')) {
          const gallery = data.gallery || [];
          if (sql.includes('ORDER BY createdAt DESC')) {
            return gallery.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
          return gallery;
        }
        return [];
      },
      run: (params) => {
        const data = loadData();
        
        if (sql.includes('DELETE FROM')) {
          const id = typeof params === 'object' ? params.id : params;
          if (sql.includes('products')) data.products = data.products.filter(p => p.id !== id);
          if (sql.includes('orders')) data.orders = data.orders.filter(o => o.id !== id);
          if (sql.includes('celebrations')) data.celebrations = data.celebrations.filter(c => c.id !== id);
          if (sql.includes('gallery')) data.gallery = data.gallery.filter(g => g.id !== id);
        } else if (sql.includes('INSERT')) {
          let tableName = '';
          if (sql.includes('INTO products')) tableName = 'products';
          else if (sql.includes('INTO orders')) tableName = 'orders';
          else if (sql.includes('INTO celebrations')) tableName = 'celebrations';
          else if (sql.includes('INTO gallery')) tableName = 'gallery';

          if (tableName) {
            if (!data[tableName]) data[tableName] = [];
            // INSERT OR REPLACE logic
            const existingIndex = data[tableName].findIndex(item => item.id === params.id);
            if (existingIndex >= 0) {
              data[tableName][existingIndex] = { ...data[tableName][existingIndex], ...params };
            } else {
              data[tableName].push(params);
            }
          }
        } else if (sql.includes('UPDATE settings')) {
          data.settings = { ...data.settings, ...params };
        }
        
        saveData(data);
        return { changes: 1 };
      }
    };
  }
};

export default db;
