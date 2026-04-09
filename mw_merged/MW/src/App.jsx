import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import InteractiveLipstick from './pages/InteractiveLipstick';
import ScrollExperience from './pages/ScrollExperience';
import ModelPage from './pages/ModelPage';
import { AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '100vh', marginTop: '20px' }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/interactive-lipstick" element={<InteractiveLipstick />} />
            <Route path="/scroll-experience" element={<ScrollExperience />} />
            <Route path="/test-model" element={<ModelPage />} />
          </Routes>
        </AnimatePresence>
      </main>


      
      {/* Footer */}
      <footer className="footer glass">
        <h2 className="text-lips" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.06em', fontWeight: 950 }}>GLOWELLE</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
          Crafted for your skin, your hair, and your beauty. Only the finest ingredients, delivered with luxury.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem', fontWeight: '600' }}>
           <span>Instagram</span>
           <span>Pinterest</span>
           <span>Twitter</span>
           <span>Facebook</span>
        </div>
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
           &copy; 2024 GLOWELLE COSMETICS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </Router>
  );
}

export default App;
