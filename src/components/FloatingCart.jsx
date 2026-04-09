import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronRight, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingCart = () => {
  const { cartItems, getCartCount, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + (price * item.quantity);
  }, 0);

  // Don't show the floating cart on cart or checkout pages
  if (['/cart', '/checkout'].includes(location.pathname)) return null;
  
  if (cartItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(95%, 1000px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2000,
          color: 'white',
          padding: '0 2rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}
        className="floating-cart-no-shape"
      >
        <div className="fc-inner" style={{ display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden', gap: '3rem' }}>
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={24} className="text-lips" />
            <span style={{ 
              position: 'absolute', 
              top: '-10px', 
              right: '-10px', 
              background: 'var(--highlight-pink)', 
              borderRadius: '50%', 
              fontSize: '0.7rem', 
              width: '20px', 
              height: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 900
            }}>
              {getCartCount()}
            </span>
          </div>
          
          {/* Mini items list */}
          <div style={{ 
            display: 'flex', 
            gap: '0.8rem', 
            overflowX: 'auto', 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            padding: '2px 0'
          }} className="hide-scrollbar">
            {cartItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '12px', 
                  background: 'white', 
                  padding: '3px',
                  flexShrink: 0,
                  position: 'relative'
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <div 
                   onClick={() => removeFromCart(item.id)}
                   style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', borderRadius: '50%', padding: '2px', cursor: 'pointer' }}
                >
                   <X size={10} color="white" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="fc-total">
             <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Checkout</p>
             <p style={{ fontWeight: 900, fontSize: '1.1rem' }}>₹{total.toLocaleString()}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/checkout')}
          className="btn-primary"
          style={{
            borderRadius: '100px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            padding: '1.2rem 2.5rem',
            fontSize: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            marginLeft: '2rem'
          }}
        >
          Checkout Now <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCart;
