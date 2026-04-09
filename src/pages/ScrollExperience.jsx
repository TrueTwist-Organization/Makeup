import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { crimsonFrames } from '../data/crimson_frames';

const ScrollExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for a premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map 0-1 scroll progress to 0-30 frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, crimsonFrames.length - 1]);
  
  // We need to force a re-render or use a state to update the image src
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      setIndex(Math.round(latest));
    });
  }, [frameIndex]);

  // Pre-load images for seamless animation
  useEffect(() => {
    crimsonFrames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative', background: '#fff' }}>
      {/* Sticky Container for the Image */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #ffffff 0%, #fdf2f8 100%)'
      }}>
        {/* Elegant Frame/Border as requested previously */}
        <div style={{
          position: 'absolute',
          inset: '2rem',
          border: '1px solid rgba(0,0,0,0.05)',
          pointerEvents: 'none',
          zIndex: 10
        }} />

        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Main Frame Animation */}
          <motion.img
            key={index}
            src={crimsonFrames[index]}
            alt={`Frame ${index}`}
            initial={{ opacity: 1 }}
            style={{
              height: '80vh',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.1))',
              userSelect: 'none'
            }}
          />

          {/* Overlay Text/UI that reacts to scroll */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '15%',
              textAlign: 'center',
              zIndex: 20,
              opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
            }}
          >
            <h2 style={{ fontSize: '1rem', letterSpacing: '0.5em', fontWeight: 800, color: '#111', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Crimson Velvet
            </h2>
            <div style={{ width: '40px', height: '2px', background: 'var(--primary-makeup)', margin: '0 auto' }} />
          </motion.div>
        </div>

        {/* Scroll Progress Bar (Minimal) */}
        <div style={{
          position: 'absolute',
          right: '3rem',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '200px',
          width: '2px',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: '10px'
        }}>
          <motion.div
            style={{
              width: '100%',
              background: 'var(--primary-makeup)',
              height: '100%',
              scaleY: scrollYProgress,
              transformOrigin: 'top',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>

      {/* Sections to show scroll progress */}
      <section style={{ height: '100vh', pointerEvents: 'none' }} />
      <section style={{ height: '100vh', pointerEvents: 'none' }} />
      <section style={{ height: '100vh', pointerEvents: 'none' }} />
      <section style={{ height: '100vh', pointerEvents: 'none' }} />
    </div>
  );
};

export default ScrollExperience;
