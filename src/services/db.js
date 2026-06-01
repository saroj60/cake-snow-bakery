// --- Auth ---
export const login = async (email, password) => {
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  if (trimmedEmail === 'cakesnowbakery.com' && trimmedPassword === 'cakesnowbakery@@2026') {
    // We still use sessionStorage or localStorage for admin login so they don't get logged out on refresh
    sessionStorage.setItem('admin_session', 'true');
    return { user: { email: trimmedEmail }, error: null };
  }
  return { user: null, error: 'Invalid login credentials' };
};

export const logout = async () => {
  sessionStorage.removeItem('admin_session');
};

export const getSession = async () => {
  if (sessionStorage.getItem('admin_session') === 'true') {
    return { user: { email: 'cakesnowbakery.com' } };
  }
  return null;
};

// --- Products ---
const INITIAL_MOCK_PRODUCTS = [
  {
    id: 'mock-1',
    name: 'Royal Chocolate Fudge',
    category: 'Cakes',
    description: 'Decadent dark chocolate layers filled with rich Belgian ganache. Voted by our customers as the best custom anniversary cake in Nepal!',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    isActive: true,
    tags: ['Weddings']
  },
  {
    id: 'mock-2',
    name: 'Strawberry Cream Dream',
    category: 'Cakes',
    description: 'Fresh organic strawberries layered with light vanilla sponge. A highly requested birthday cake in Kathmandu for all ages.',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    tags: ['Baby showers']
  },
  {
    id: 'mock-3',
    name: 'Red Velvet Rosette',
    category: 'Cakes',
    description: 'Classic velvety cocoa crumb layers with rich cream cheese frosting. The perfect base for a stunning wedding cake in Nepal.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    tags: ['Anniversaries']
  },
  {
    id: 'mock-4',
    name: 'Classic Vanilla Bean (Vegan Option Available)',
    category: 'Cakes',
    description: 'Light and fluffy vanilla cake made with real Madagascar vanilla beans. Widely known as the best vegan cake in Kathmandu.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    tags: ['Birthdays']
  },
  {
    id: 'mock-5',
    name: 'Black Forest Gateau (Gluten Free)',
    category: 'Cakes',
    description: 'Layers of chocolate sponge, sour cherries, and whipped cream. Your go-to gluten free cake in Kathmandu.',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    tags: ['Job promotions']
  },
  {
    id: 'mock-6',
    name: 'Lemon Blueberry Pound',
    category: 'Cakes',
    description: 'Zesty lemon pound cake studded with fresh blueberries.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    tags: ['Opening a new business']
  },
  {
    id: 'mock-dec-1',
    name: 'Happy Birthday Banner (Gold)',
    category: 'Decorations',
    description: 'Premium metallic gold foil "Happy Birthday" letter banner.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1530103862676-de8892b12a43?w=800&q=80',
    isActive: true,
    tags: ['Birthdays']
  },
  {
    id: 'mock-dec-2',
    name: 'Pastel Party Balloons (Pack of 20)',
    category: 'Decorations',
    description: 'High-quality latex balloons in assorted pastel colors.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&q=80',
    isActive: true,
    tags: ['Birthdays', 'Baby showers']
  },
  {
    id: 'mock-dec-3',
    name: 'Sparkler Candles',
    category: 'Decorations',
    description: 'Set of 4 smokeless sparkler candles for that extra special cake presentation.',
    price: 300,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    isActive: true,
    tags: ['Anniversaries', 'Weddings']
  }
];

let memoryProducts = [...INITIAL_MOCK_PRODUCTS];

export const getProducts = async () => {
  return [...memoryProducts];
};

export const saveProduct = async (product) => {
  if (product.id) {
    const index = memoryProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      memoryProducts[index] = { ...product };
      return memoryProducts[index];
    }
  }
  
  const newProduct = { ...product, id: 'mock-new-' + Date.now() };
  memoryProducts.unshift(newProduct);
  return newProduct;
};

export const deleteProduct = async (id) => {
  memoryProducts = memoryProducts.filter(p => p.id !== id);
};

// --- Storage ---
export const uploadImage = async (file) => {
  // Directly fallback to base64 encoding since we don't have cloud storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- Orders ---
let memoryOrders = [];

export const getOrders = async () => {
  return [...memoryOrders];
};

export const saveOrder = async (order) => {
  const orderData = {
    id: order.id || 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    customer: order.customer,
    items: order.items,
    total: order.total,
    status: order.status || 'Pending',
    createdAt: new Date().toISOString()
  };

  if (order.id) {
    const index = memoryOrders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      memoryOrders[index] = { ...memoryOrders[index], ...orderData };
      return memoryOrders[index];
    }
  }

  memoryOrders.unshift(orderData);
  return orderData;
};

// --- Settings ---
let memorySettings = { isOpen: true, deliveryCharge: 0 };

export const getSettings = async () => {
  return { ...memorySettings };
};

export const updateSettings = async (settings) => {
  memorySettings = { ...memorySettings, ...settings };
  return memorySettings;
};
