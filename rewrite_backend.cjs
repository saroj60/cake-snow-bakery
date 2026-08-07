const fs = require('fs');

const serverContent = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'cakesnowbakery.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cakesnowbakery@@2026';
const ADMIN_TOKEN = 'secure-admin-token-' + Date.now(); 

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_TOKEN, user: { email } });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Products
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products.map(p => ({
      ...p,
      features: p.features ? JSON.parse(p.features) : [],
      isCustomDesign: Boolean(p.isCustomDesign),
      isBestSeller: Boolean(p.isBestSeller)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const p = req.body;
    const stmt = db.prepare(\`
      INSERT OR REPLACE INTO products (id, name, price, category, rating, reviews, image, description, features, isCustomDesign, isBestSeller)
      VALUES (@id, @name, @price, @category, @rating, @reviews, @image, @description, @features, @isCustomDesign, @isBestSeller)
    \`);
    stmt.run({
      id: p.id || Date.now().toString(),
      name: p.name,
      price: p.price,
      category: p.category || 'Cakes',
      rating: p.rating || 0,
      reviews: p.reviews || 0,
      image: p.image || '',
      description: p.description || '',
      features: JSON.stringify(p.features || []),
      isCustomDesign: p.isCustomDesign ? 1 : 0,
      isBestSeller: p.isBestSeller ? 1 : 0
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders
app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders').all();
    res.json(orders.map(o => ({
      ...o,
      customer: JSON.parse(o.customer),
      items: JSON.parse(o.items)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const o = req.body;
    const stmt = db.prepare(\`
      INSERT OR REPLACE INTO orders (id, customer, items, total, status, createdAt)
      VALUES (@id, @customer, @items, @total, @status, @createdAt)
    \`);
    stmt.run({
      id: o.id || Date.now().toString(),
      customer: JSON.stringify(o.customer || {}),
      items: JSON.stringify(o.items || []),
      total: o.total || 0,
      status: o.status || 'pending',
      createdAt: o.createdAt || new Date().toISOString()
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Celebrations
app.get('/api/celebrations', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM celebrations').all();
    res.json(items.map(c => ({
      ...c,
      isActive: Boolean(c.isActive),
      showOnHomepage: Boolean(c.showOnHomepage)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/celebrations', (req, res) => {
  try {
    const c = req.body;
    const stmt = db.prepare(\`
      INSERT OR REPLACE INTO celebrations (id, title, date, isActive, showOnHomepage)
      VALUES (@id, @title, @date, @isActive, @showOnHomepage)
    \`);
    stmt.run({
      id: c.id || Date.now().toString(),
      title: c.title,
      date: c.date,
      isActive: c.isActive ? 1 : 0,
      showOnHomepage: c.showOnHomepage ? 1 : 0
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/celebrations/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM celebrations WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

fs.writeFileSync('server.js', serverContent);
console.log('server.js updated');

const dbJsContent = `// Database API Service using REST
const API_BASE = '/api';

export const login = async (email, password) => {
  try {
    const res = await fetch(\`\${API_BASE}/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      sessionStorage.setItem('admin_token', data.token);
      sessionStorage.setItem('admin_email', data.user.email);
      return { user: data.user, error: null };
    }
    return { user: null, error: data.error };
  } catch (err) {
    return { user: null, error: 'Network error' };
  }
};

export const logout = async () => {
  sessionStorage.removeItem('admin_token');
  sessionStorage.removeItem('admin_email');
};

export const getSession = async () => {
  const token = sessionStorage.getItem('admin_token');
  const email = sessionStorage.getItem('admin_email');
  return token && email ? { user: { email } } : null;
};

// Generic REST Helpers
const get = async (endpoint) => {
  const res = await fetch(\`\${API_BASE}\${endpoint}\`);
  return res.json();
};

const post = async (endpoint, data) => {
  const res = await fetch(\`\${API_BASE}\${endpoint}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

const del = async (endpoint) => {
  const res = await fetch(\`\${API_BASE}\${endpoint}\`, { method: 'DELETE' });
  return res.json();
};

// Products
export const getProducts = () => get('/products');
export const getProduct = async (id) => {
  const products = await get('/products');
  return products.find(p => p.id === id);
};
export const saveProduct = (p) => post('/products', p);
export const deleteProduct = (id) => del(\`/products/\${id}\`);

// Orders
export const getOrders = () => get('/orders');
export const getOrder = async (id) => {
  const orders = await get('/orders');
  return orders.find(o => o.id === id);
};
export const saveOrder = (o) => post('/orders', o);
export const updateOrderStatus = async (id, status) => {
  const order = await getOrder(id);
  if (order) {
    order.status = status;
    await post('/orders', order);
  }
};

// Follow-ups (using localStorage for now to save time if no table)
export const getFollowUps = async () => {
  return JSON.parse(localStorage.getItem('cakesnow_followups') || '[]');
};
export const saveFollowUp = async (f) => {
  const fs = await getFollowUps();
  const exists = fs.findIndex(x => x.id === f.id);
  if (exists >= 0) fs[exists] = f;
  else fs.push(f);
  localStorage.setItem('cakesnow_followups', JSON.stringify(fs));
};
export const deleteFollowUp = async (id) => {
  const fs = await getFollowUps();
  localStorage.setItem('cakesnow_followups', JSON.stringify(fs.filter(x => x.id !== id)));
};

// Celebrations
export const getCelebrations = () => get('/celebrations');
export const saveCelebration = (c) => post('/celebrations', c);
export const deleteCelebration = (id) => del(\`/celebrations/\${id}\`);
`;

fs.writeFileSync('src/services/db.js', dbJsContent);
console.log('src/services/db.js updated');

// Also update vite.config.js to include proxy
const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
`;

fs.writeFileSync('vite.config.js', viteConfigContent);
console.log('vite.config.js updated');
