import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const ProductCard = ({ product, type }) => {
  const navigate = useNavigate();
  const isMakeup = type === 'makeup';
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  
  const hasFrames = product.frames && product.frames.length > 0;

  const handleMouseMove = (e) => {
    if (!hasFrames) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const frameIndex = Math.floor(percentage * (product.frames.length - 1));
    setCurrentFrame(frameIndex);
  };

  return (
    <Tilt
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.2}
      scale={1.05}
      transitionSpeed={1500}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setCurrentFrame(0);
        }}
        onMouseMove={handleMouseMove}
        onClick={() => navigate(`/product/${product.id}`)}
        className="glass-card"
        style={{
          overflow: 'hidden',
          cursor: 'pointer',
          padding: '0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          aspectRatio: '1',
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={hasFrames && isHovering ? product.frames[currentFrame] : product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovering ? 'scale(1.1)' : 'scale(1)',
              transition: hasFrames && isHovering ? 'none' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
          <div style={{ 
            position: 'absolute', 
            top: '1.5rem', 
            right: '1.5rem', 
            background: 'rgba(0,0,0,0.3)', 
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.05em'
          }}>
            NEW
          </div>
        </div>

        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            color: 'var(--highlight-pink)',
            marginBottom: '0.5rem',
            fontWeight: 700
          }}>
            {product.category || "Luxury Collection"}
          </p>
          <h3 style={{ 
            fontSize: '1.4rem', 
            marginBottom: '1rem', 
            color: '#FFFFFF', 
            textAlign: 'center',
            fontWeight: 800
          }}>
            {product.name}
          </h3>
          <div style={{ 
            width: '40px', 
            height: '1px', 
            background: 'rgba(255,255,255,0.2)', 
            marginBottom: '1.5rem' 
          }}></div>
          <p style={{ 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            color: 'white',
            opacity: 1
          }}>
            ${product.price || "45.00"}
          </p>
        </div>

      </motion.div>
    </Tilt>
  );
};

export default ProductCard;
