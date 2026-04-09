import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ShoppingCart, Star, ArrowLeft, Heart, Share2, ShieldCheck, Truck } from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const videoRef = React.useRef(null);

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

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '8rem', paddingBottom: '10rem' }}>
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn"
          style={{ marginBottom: '3rem', background: 'transparent', padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
        >
          <ArrowLeft size={20} /> Back to Collection
        </motion.button>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '5rem',
          alignItems: 'start'
        }}>
          {/* Product Image Section */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="glass"
             style={{
               padding: '4rem',
               height: '600px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               background: 'rgba(255, 255, 255, 0.4)',
               position: 'relative',
               overflow: 'hidden'
             }}
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
            />
            
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', gap: '1rem' }}>
               <div style={{ padding: '0.6rem', color: 'var(--text-main)', cursor: 'pointer' }}><Heart size={24} /></div>
               <div style={{ padding: '0.6rem', color: 'var(--text-main)', cursor: 'pointer' }}><Share2 size={24} /></div>
            </div>
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

            {/* Features Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
               {product.details?.map((detail, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.95rem', fontWeight: 600 }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-makeup)' }}></div>
                     {detail}
                  </div>
               ))}
            </div>

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
               
               <button onClick={() => {}} style={{ background: 'transparent', border: 'none', color: 'var(--primary-makeup)', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  ADD TO CART <ShoppingCart size={24} />
               </button>
            </div>

            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '2rem', borderTop: '1px solid #eee', paddingTop: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                  <Truck size={24} color="var(--primary-makeup)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Free Express Shipping</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                  <ShieldCheck size={24} color="var(--primary-makeup)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Premium Guarantee</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
