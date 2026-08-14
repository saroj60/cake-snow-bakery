console.log("Starting server.js...");
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import db from './database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'))
});
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir)); // Serve uploaded files statically

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'cakesnowbakery@gmail.com';
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
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO products (id, name, price, category, occasion, rating, reviews, image, description, features, isCustomDesign, isBestSeller, isPerLb, isActive)
      VALUES (@id, @name, @price, @category, @occasion, @rating, @reviews, @image, @description, @features, @isCustomDesign, @isBestSeller, @isPerLb, @isActive)
    `);
    stmt.run({
      id: p.id || Date.now().toString(),
      name: p.name,
      price: p.price,
      category: p.category || 'Cakes',
      occasion: p.occasion || 'General / Any',
      rating: p.rating || 0,
      reviews: p.reviews || 0,
      image: p.image || '',
      description: p.description || '',
      features: JSON.stringify(p.features || []),
      isCustomDesign: p.isCustomDesign ? 1 : 0,
      isBestSeller: p.isBestSeller ? 1 : 0,
      isPerLb: p.isPerLb ? 1 : 0,
      isActive: p.isActive !== false ? 1 : 0
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
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO orders (id, customer, items, total, status, createdAt)
      VALUES (@id, @customer, @items, @total, @status, @createdAt)
    `);
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
app.get('/api/gallery', (req, res) => {
  try {
    const images = db.prepare('SELECT * FROM gallery ORDER BY createdAt DESC').all();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', (req, res) => {
  try {
    const { id, imageUrl, altText, createdAt } = req.body;
    const stmt = db.prepare(`
      INSERT INTO gallery (id, imageUrl, altText, createdAt)
      VALUES (@id, @imageUrl, @altText, @createdAt)
    `);
    stmt.run({
      id: id || Date.now().toString(),
      imageUrl,
      altText: altText || 'Gallery Image',
      createdAt: createdAt || new Date().toISOString()
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM gallery WHERE id = ?');
    stmt.run(req.params.id);
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
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO celebrations (id, title, date, isActive, showOnHomepage)
      VALUES (@id, @title, @date, @isActive, @showOnHomepage)
    `);
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
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
      next();
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
