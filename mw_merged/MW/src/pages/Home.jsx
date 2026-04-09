import React from 'react';
import { motion } from 'framer-motion';
import { categories, products } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

import Hero3D from '../components/Hero3D';

const Home = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2);
    const y = (clientY - innerHeight / 2);
    setMousePos({ x, y });
  };

  return (
    <div style={{ paddingBottom: '5rem' }} onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '4rem',
        padding: '0 2rem',
        perspective: '1000px'
      }}>
        <Hero3D />
        <motion.div
           initial="hidden"
           animate="visible"
           variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.2,
                  delayChildren: 0.5
                }
              }
           }}
           style={{ zIndex: 1, maxWidth: '1000px' }}
        >

          <motion.h1 
             className="premium-text"
             variants={{
               hidden: { opacity: 0, y: 30 },
               visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
             }}
             style={{ 
               fontSize: 'clamp(3.5rem, 10vw, 7rem)', 
               lineHeight: 1, 
               fontWeight: 900, 
               marginBottom: '2rem', 
               letterSpacing: '-0.06em',
               textAlign: 'center',
               perspective: '1000px'
             }}
          >
            <motion.div 
              animate={{ rotateX: [0, 180, 180, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.55, 1] }}
              style={{ transformStyle: 'preserve-3d', cursor: 'default' }}
            >
              <div className="text-gold" style={{ backfaceVisibility: 'hidden' }}>GLOWING</div>
              <div className="text-eye" style={{ 
                position: 'absolute', inset: 0, transform: 'rotateX(180deg)', 
                backfaceVisibility: 'hidden', fontSize: '0.9em' 
              }}>GLOWING</div>
            </motion.div>

            <motion.div 
              animate={{ rotateX: [0, 180, 180, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.55, 1], delay: 1 }}
              style={{ transformStyle: 'preserve-3d', cursor: 'default' }}
            >
              <div className="text-eye" style={{ backfaceVisibility: 'hidden' }}>FUTURE</div>
              <div className="text-gold" style={{ 
                position: 'absolute', inset: 0, transform: 'rotateX(180deg)', 
                backfaceVisibility: 'hidden', fontSize: '0.9em' 
              }}>FUTURE</div>
            </motion.div>
          </motion.h1>


          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            style={{ 
              fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
              maxWidth: '650px', 
              margin: '0 auto 2.5rem', 
              lineHeight: 1.6,
              opacity: 0.9
            }}
          >
            Redefining beauty through cinematic visual experiences. Discover our laboratory-refined <span style={{ color: 'white', fontWeight: 600 }}>luxury collection</span>.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
          >
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="btn btn-primary" 
             >
               Explore Shop <ArrowRight size={20} />
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="btn btn-secondary" 
             >
               Interactive Gallery
             </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2.8, duration: 1 }}
           style={{
             position: 'absolute',
             bottom: '2.5rem',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             gap: '1rem',
             fontSize: '0.75rem',
             fontWeight: 800,
             letterSpacing: '0.45em',
             opacity: 0.6
           }}
        >
          SCROLL
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, white, transparent)', borderRadius: '10px' }}
          />
        </motion.div>
      </section>

      <section className="container" id="categories-section" style={{ marginBottom: 'clamp(5rem, 15vw, 10rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
           <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', position: 'relative', display: 'inline-block' }}>
              Shop By <span className="highlight" style={{ position: 'relative', zIndex: 1, padding: '0 10px' }}>
                Category
                <div style={{ 
                   position: 'absolute', inset: '-10px -20px', 
                   background: 'linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.4), transparent)', 
                   borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', 
                   filter: 'blur(15px)', zIndex: -1, animation: 'smudge 3s ease-in-out infinite' 
                }}></div>
              </span>
           </h2>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Curated beauty essentials for every part of your routine.</p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="container" id="products-section">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Featured <span className="highlight">Collection</span></h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Elevate your beauty routine with our most-loved products. Meticulously crafted for perfection.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          marginTop: '2rem'
        }}>
          {/* Displaying a mix of products from different categories */}
          {Object.entries(products).flatMap(([type, list]) => list.slice(0, 3)).slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} type={product.category?.toLowerCase() === 'skincare' ? 'skincare' : 'makeup'} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section style={{ marginTop: 'clamp(5rem, 15vw, 10rem)', padding: 'clamp(4rem, 10vw, 8rem) 0', background: 'rgba(0,0,0,0.2)' }}>
         <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>Why <span className="highlight">Glowelle?</span></h2>
               <div style={{ display: 'grid', gap: '2.5rem' }}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                     <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '20px' }}>
                        <Sparkles size={28} color="var(--highlight-pink)" />
                     </div>
                     <div>
                        <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Vegan & Cruelty Free</h4>
                        <p>We believe in beauty without harm. All our products are 100% vegan.</p>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                     <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '20px' }}>
                        <Heart size={28} color="var(--highlight-pink)" />
                     </div>
                     <div>
                        <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Dermatologist Tested</h4>
                        <p>Safe for sensitive skin. Rigorously tested by skin experts.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div style={{ position: 'relative' }}>
               <img 
                 src="https://images.unsplash.com/photo-1512496011951-a6994413c2ca?q=80&w=800&auto=format&fit=crop" 
                 alt="Cosmetics" 
                 style={{ width: '100%', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.3)' }}
               />
                <div className="glass-card" style={{ position: 'absolute', bottom: '-20px', left: '-10px', textAlign: 'center', minWidth: '120px', padding: '1rem' }}>
                  <p style={{ fontWeight: '900', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: 'white', marginBottom: '0' }}>10k+</p>
                  <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Happy Users</p>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
