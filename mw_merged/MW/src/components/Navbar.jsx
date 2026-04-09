import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="glass" style={{
        margin: '1rem',
        padding: '0.8rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1001,
        position: 'sticky',
        top: '1rem'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={24} className="text-eye" />
          <span className="text-lips navbar-logo-text" style={{ fontSize: '2rem', fontWeight: '950', letterSpacing: '-0.05em' }}>GLOWELLE</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem', fontWeight: '600' }}>
          <Link to="/">Home</Link>
          <Link to="/category/lips">Lips</Link>
          <Link to="/category/face-products">Face</Link>
          <Link to="/category/eye-makeup">Eyes</Link>
          <Link to="/category/skincare">Skincare</Link>
          <Link to="/test-model">Try-On</Link>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ cursor: 'pointer', display: 'flex', position: 'relative' }}>
            <ShoppingBag size={20} />
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary-makeup)', color: 'white', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '50%' }}>0</span>
          </div>
          <User size={20} style={{ cursor: 'pointer' }} className="nav-links" />
          
          <div className="mobile-only" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'none' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="glass" style={{
          position: 'fixed', inset: '5rem 1rem auto', padding: '2rem',
          zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '1.5rem',
          textAlign: 'center', fontSize: '1.2rem', fontWeight: '700'
        }}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/category/lips" onClick={() => setIsOpen(false)}>Lips</Link>
          <Link to="/category/face-products" onClick={() => setIsOpen(false)}>Face</Link>
          <Link to="/category/eye-makeup" onClick={() => setIsOpen(false)}>Eyes</Link>
          <Link to="/category/skincare" onClick={() => setIsOpen(false)}>Skincare</Link>
          <Link to="/test-model" onClick={() => setIsOpen(false)}>Live Try-On</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
