import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import { ShoppingCart, Star, ArrowLeft, Heart, Share2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BenefitReveal from '../components/BenefitReveal';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const videoRef = React.useRef(null);


  const categoryBg = React.useMemo(() => {
    if (!product) return null;
    const categoryKey = Object.keys(products).find(key => 
      products[key].some(p => p.id === product.id)
    );
    return categories.find(c => c.id === categoryKey)?.pageBg;
  }, [product]);

  useEffect(() => {
    // Search for product in all categories
    let foundProduct = null;
    Object.values(products).forEach(category => {
      const p = category.find(p => p.id === parseInt(productId));
      if (p) foundProduct = p;
    });
    setProduct(foundProduct);
  }, [productId]);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current && product?.video) {
        const scrollPosition = window.scrollY;
        const speed = 0.005; // Adjust playback speed
        videoRef.current.currentTime = scrollPosition * speed % videoRef.current.duration;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [product]);

  const handleWishlist = () => {
    if (product) toggleWishlist(product);
  };

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${product.name} at Glowelle`,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    if (categoryBg) {
      document.documentElement.style.setProperty(
        '--dynamic-bg', 
        `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${categoryBg})`
      );
    }
    
    return () => {
      document.documentElement.style.setProperty('--dynamic-bg', 'var(--bg-gradient)');
    };
  }, [categoryBg]);

  if (!product) return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Product not found</h2>
      <button className="btn" onClick={() => navigate('/')}>Return Home</button>
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'transparent' }}>
      {/* Background Video for specific products */}
      {product.video && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
          <video 
            ref={videoRef}
            muted 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
          >
            <source src={product.video} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent' }}></div>
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem', paddingBottom: '4rem' }}>
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="glass-card"
          style={{ 
            marginBottom: '1.5rem', 
            background: 'rgba(255,255,255,0.03)', 
            padding: '0.8rem 1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.8rem', 
            fontWeight: 800,
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowLeft size={18} style={{ color: 'var(--highlight-pink)' }} />
          </motion.div>
          <span>BACK TO COLLECTION</span>
        </motion.button>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '5rem',
          alignItems: 'start'
        }}>
          {/* Product Image Section */}
          <motion.div
             initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
             animate={{ 
               opacity: 1, 
               scale: 1, 
               rotate: 360 
             }}
             transition={{ 
               duration: 1.5,
               rotate: { duration: 12, repeat: Infinity, ease: "linear" },
               scale: { duration: 1.2 },
               opacity: { duration: 1 }
             }}
             style={{
              padding: '2rem',
              minHeight: '60dvh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              position: 'relative'
            }}
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
            />
          </motion.div>

          {/* Product Info Section */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
          >
            <div style={{ 
              display: 'inline-block', 
              color: 'var(--primary-makeup)', 
              fontSize: '0.85rem', 
              fontWeight: 800, 
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              {product.category}
            </div>

            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1.1rem' }}>
                  <Star size={20} fill="#FFD700" stroke="#FFD700" />
                  4.9 <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>(120+ Reviews)</span>
               </div>
               <div style={{ width: '1.5px', height: '20px', background: '#ddd' }}></div>
               <div style={{ color: '#22c55e', fontWeight: 700 }}>In Stock</div>
            </div>

            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-makeup)', marginBottom: '2.5rem' }}>
               {product.price}
            </div>

            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '3rem' }}>
              {product.description}
            </p>


            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
               <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '1.5rem', 
                 padding: '0.8rem 0',
                 borderBottom: '1px solid #eee'
               }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: 800, fontSize: '1.5rem' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}>+</button>
               </div>
               
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <button 
                    onClick={handleAddToCart} 
                    style={{ 
                      background: addedToCart ? '#22c55e' : 'transparent', 
                      border: 'none', 
                      color: addedToCart ? 'white' : 'var(--primary-makeup)', 
                      fontSize: '1.2rem', 
                      fontWeight: 800, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.8rem',
                      padding: addedToCart ? '0.8rem 1.5rem' : '0',
                      borderRadius: '100px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {addedToCart ? 'ADDED!' : 'ADD TO CART'} <ShoppingCart size={24} />
                  </button>

                  <div style={{ display: 'flex', gap: '1rem', borderLeft: '1px solid #eee', paddingLeft: '2rem' }}>
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleWishlist}
                      style={{ padding: '0.6rem', color: isWishlisted ? 'var(--highlight-pink)' : 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Heart size={26} fill={isWishlisted ? 'var(--highlight-pink)' : 'none'} />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      style={{ padding: '0.6rem', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Share2 size={26} />
                    </motion.div>
                  </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center', textAlign: 'center' }}>
                  <Truck size={22} color="var(--primary-makeup)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Free Express Shipping</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center', textAlign: 'center' }}>
                  <ShieldCheck size={22} color="var(--primary-makeup)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Premium Guarantee</span>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Benefit Reveal Component (Full Width Below Product) */}
        {product.details && (
          <div style={{ marginTop: '3rem', width: '100%' }}>
            <BenefitReveal benefits={product.details} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
