import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <Tilt
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.45}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.02}
        transitionSpeed={2500}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          width: '100%',
          height: 'min(600px, 60vh)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `url(${category.image}) no-repeat center center / cover`,
          zIndex: -1,
          transition: 'transform 0.5s ease'
        }} className="card-bg-image" />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 80%)',
          zIndex: 0
        }} />

        <div style={{
          position: 'absolute',
          bottom: 'max(1.5rem, 5%)',
          left: 'max(1.5rem, 5%)',
          right: 'max(1.5rem, 5%)',
          color: 'white',
          zIndex: 1
        }}>
          {category.emoji && (
            <div style={{ 
              fontSize: '1.8rem', 
              marginBottom: '0.8rem', 
              background: 'rgba(255,255,255,0.1)', 
              width: '45px', 
              height: '45px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '50%',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {category.emoji}
            </div>
          )}
          <h2 style={{ fontSize: 'clamp(1.8rem, 8vw, 3rem)', marginBottom: '0.5rem', lineHeight: 1.1, fontWeight: 900 }}>{category.name}</h2>
          <p style={{ fontSize: 'clamp(0.9rem, 4vw, 1.1rem)', opacity: 0.8, marginBottom: '1.5rem', maxWidth: '400px', lineHeight: 1.3 }}>{category.description}</p>
          
          <button className="btn" style={{ 
            background: 'white', 
            color: 'black', 
            padding: '0.8rem 1.8rem',
            fontSize: '0.9rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            Explore Now <ArrowRight size={18} />
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default CategoryCard;
