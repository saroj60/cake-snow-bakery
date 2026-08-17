import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingSidebar from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import Snowfall from './components/Snowfall';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Coffee from './pages/Coffee';
import Gifts from './pages/Gifts';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Pastries from './pages/Pastries';
import CustomOrder from './pages/CustomOrder';
import Decorations from './pages/Decorations';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import FollowUps from './pages/admin/FollowUps';
import Celebrations from './pages/admin/Celebrations';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import Settings from './pages/admin/Settings';

const StorefrontLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Snowfall />
    <Navbar />
    <CartDrawer />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
    <FloatingSidebar />
    <MobileBottomNav />
  </div>
);

import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Toaster position="top-center" />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Storefront Routes */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/coffee" element={<Coffee />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/pastries" element={<Pastries />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/custom-order" element={<CustomOrder />} />
            <Route path="/decorations" element={<Decorations />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Admin & Auth Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="followups" element={<FollowUps />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="celebrations" element={<Celebrations />} />
            <Route path="categories" element={<div className="p-8">Categories Management Coming Soon</div>} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
