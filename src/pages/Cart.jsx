import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, getCartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'transparent' }}>
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '4rem' }}
        >
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            Shopping <span className="text-lips">Bag</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            {getCartCount()} items in your cart
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: cartItems.length > 0 ? '1.2fr 400px' : '1fr', gap: '4rem' }}>
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AnimatePresence mode="popLayout">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="cart-item-no-shape"
                    style={{ 
                      display: 'flex', 
                      gap: '3rem', 
                      padding: '2.5rem 0', 
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                      <p style={{ color: 'var(--highlight-pink)', fontWeight: 700, marginBottom: '1rem' }}>{item.category}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '100px' }}>
                          <button onClick={() => addToCart(item, -1)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'white' }}><Minus size={16} /></button>
                          <span style={{ fontWeight: 800 }}>{item.quantity}</span>
                          <button onClick={() => addToCart(item, 1)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'white' }}><Plus size={16} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                          <Trash2 size={18} /> Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '1.4rem', fontWeight: 900 }}>{item.price}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', padding: '5rem 0', background: 'rgba(255,255,255,0.03)', borderRadius: '24px' }}
                >
                  <ShoppingBag size={64} style={{ marginBottom: '2rem', opacity: 0.2 }} />
                  <h2 style={{ marginBottom: '1.5rem' }}>Your bag is empty</h2>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          {cartItems.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cart-summary-no-shape"
              style={{ padding: '0 2rem', position: 'sticky', top: '10rem', height: 'fit-content' }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#22c55e' }}>FREE</span>
                </div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900 }}>
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '1.5rem' }}
                onClick={() => navigate('/checkout')}
              >
                Checkout Now <ArrowRight size={20} />
              </button>
              
              <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Secure checkout powered by Stripe
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
