import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Filter, Grid, List as ListIcon } from 'lucide-react';

const ProductList = () => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const category = categories.find(c => c.id === categoryId);
    setActiveCategory(category);
    setFilteredProducts(products[categoryId] || []);
  }, [categoryId]);

  if (!activeCategory) return <div>Loading...</div>;

  const getCategoryColor = () => {
    if (categoryId === 'lips') return 'var(--primary-makeup)';
    if (categoryId === 'face-products') return 'var(--primary-face)';
    if (categoryId === 'eye-makeup') return 'var(--primary-eye)';
    if (categoryId === 'skincare') return 'var(--primary-skincare)';
    return 'var(--primary-makeup)';
  };

  const themeColor = getCategoryColor();

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '10rem' }}>
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1rem' }}>
        <Link to="/" style={{ color: 'inherit' }}>Home</Link> <ChevronRight size={16} />
        <span style={{ fontWeight: '600', color: themeColor }}>{activeCategory.name}</span>
      </nav>

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
      >
        <div style={{ flex: 1 }}>
          <h1 className={`text-${categoryId}`} style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.2rem', lineHeight: 1 }}>
             {activeCategory.name} Collection
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
             Explore our curated selection of high-performance {activeCategory.name.toLowerCase()} products designed for professional results.
          </p>
        </div>
        
        <div className="glass" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
              <Filter size={18} /> Filters
           </div>
           <div style={{ width: '1px', height: '24px', background: '#eee' }}></div>
           <select 
             value={sortBy} 
             onChange={(e) => setSortBy(e.target.value)}
             style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
           >
              <option value="featured">Sort by Featured</option>
              <option value="low-high">Price Low to High</option>
              <option value="high-low">Price High to Low</option>
           </select>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div 
        layout
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '3rem' 
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} type={categoryId} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductList;
