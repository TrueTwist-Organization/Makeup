import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();

  return (
    <>
      <nav className="navbar-container" style={{
        position: 'sticky',
        top: '0',
        zIndex: 1001,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        backdropFilter: 'none',
        boxShadow: 'none'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src="/logo.png" alt="GLOWELLE Logo" style={{ height: '50px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,117,143,0.3))' }} />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem', fontWeight: '700' }}>
          <Link to="/" style={{ color: 'white' }}>Home</Link>
          <Link to="/category/lips" style={{ color: '#FF758F' }}>Lips</Link>
          <Link to="/category/face-products" style={{ color: '#FF9A8B' }}>Face</Link>
          <Link to="/category/eye-makeup" style={{ color: '#B721FF' }}>Eyes</Link>
          <Link to="/category/skincare" style={{ color: '#84fab0' }}>Skincare</Link>
          <Link to="/test-model" style={{ color: 'white', opacity: 0.8 }}>Try-On</Link>
          <Link to="/ai-assistant" style={{ color: '#FF758F', fontWeight: '800' }}>AI Assistant</Link>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/cart" style={{ color: 'inherit', display: 'flex', position: 'relative', textDecoration: 'none' }}>
            <ShoppingBag size={20} />
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary-makeup)', color: 'white', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '50%' }}>{getCartCount()}</span>
          </Link>
          <Link to="/wishlist" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Heart size={20} style={{ cursor: 'pointer' }} />
          </Link>
          <User size={20} style={{ cursor: 'pointer' }} className="nav-links" />

          <div className="mobile-only" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'none' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed', inset: '5rem 1rem auto', padding: '2rem',
          zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '1.5rem',
          textAlign: 'center', fontSize: '1.2rem', fontWeight: '700',
          background: 'rgba(0,0,0,0.9)', borderRadius: '24px'
        }}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/category/lips" onClick={() => setIsOpen(false)}>Lips</Link>
          <Link to="/category/face-products" onClick={() => setIsOpen(false)}>Face</Link>
          <Link to="/category/eye-makeup" onClick={() => setIsOpen(false)}>Eyes</Link>
          <Link to="/category/skincare" onClick={() => setIsOpen(false)}>Skincare</Link>
          <Link to="/test-model" onClick={() => setIsOpen(false)}>Live Try-On</Link>
          <Link to="/ai-assistant" onClick={() => setIsOpen(false)}>AI Assistant</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
