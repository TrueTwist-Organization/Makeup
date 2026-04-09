import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, Zap, Leaf, Droplets } from 'lucide-react';

const BenefitReveal = ({ benefits }) => {
  const benefitIcons = [
    <Sparkles size={24} />,
    <ShieldCheck size={24} />,
    <Heart size={24} />,
    <Zap size={24} />,
    <Leaf size={24} />,
    <Droplets size={24} />
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotate: -15,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      className="benefits-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="benefits-header">
        <motion.h3 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="benefits-title text-glow-pulse"
        >
          Essence of Beauty
        </motion.h3>
        <motion.p 
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="benefits-subtitle"
        >
          Premium Benefits & Features
        </motion.p>
        <div className="benefits-divider"></div>
      </div>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            className="benefit-item"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              className="benefit-icon-wrapper"
            >
              {benefitIcons[index % benefitIcons.length]}
            </motion.div>
            <motion.span 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
              className="benefit-text"
            >
              {benefit}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BenefitReveal;
