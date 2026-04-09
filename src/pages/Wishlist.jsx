import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'transparent' }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.05,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 20% 30%, var(--highlight-pink), transparent 40%), radial-gradient(circle at 80% 70%, var(--primary-eye), transparent 40%)',
        filter: 'blur(100px)'
      }} />

      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--highlight-pink)' }}>
            <Heart size={32} fill="var(--highlight-pink)" />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Your Watchlist</span>
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1 }}>
            Beauty <span className="text-lips">Favorites</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            A curated selection of the products you love most. Ready to make them yours?
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            <motion.div 
              layout
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '3rem' 
              }}
            >
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '5rem 0' }}
            >
              <ShoppingBag size={64} style={{ marginBottom: '2rem', opacity: 0.2 }} />
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', opacity: 0.8 }}>Your wishlist is empty</h3>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Go Shopping <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
