// Database API Service using REST
const API_BASE = '/api';

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
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
  const res = await fetch(`${API_BASE}${endpoint}`);
  return res.json();
};

const post = async (endpoint, data) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

const del = async (endpoint) => {
  const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
  return res.json();
};

// Products
export const getProducts = () => get('/products');
export const getProduct = async (id) => {
  const products = await get('/products');
  return products.find(p => p.id === id);
};
export const saveProduct = (p) => post('/products', p);
export const deleteProduct = (id) => del(`/products/${id}`);

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
export const deleteCelebration = (id) => del(`/celebrations/${id}`);

// Custom Orders
export const submitCustomOrder = async (orderData, imageFile) => {
  let imageUrl = null;
  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }
  
  const finalOrder = {
    ...orderData,
    referenceImage: imageUrl,
    isCustomOrder: true
  };
  
  return saveOrder(finalOrder);
};

// Image Upload
export const uploadImage = async (file) => {
  if (!file) return null;
  const formData = new FormData();
  formData.append('image', file);
  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) return data.url;
    return null;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

// Gallery
export const getGalleryImages = () => get('/gallery');
export const saveGalleryImage = (img) => post('/gallery', img);
export const deleteGalleryImage = (id) => del(`/gallery/${id}`);

