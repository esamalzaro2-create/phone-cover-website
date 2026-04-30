import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useRef } from 'react';
import logo from '../../../assets/logo.png';
import heroImg from '../../../assets/home.png';

export function Header() {
  const { totalItems }  = useCart();
  const navigate        = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const handleSecretClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clickCount.current >= 10) {
      clickCount.current = 0;
      navigate('/admin');
      return;
    }
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
  };

  return (
    <header style={{
      background: '#1a1a1a',
      borderBottom: 'none',
      position: 'sticky',
      top: '12px',
      zIndex: 50,
      borderRadius: '20px',
      margin: '0 16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src={heroImg} alt="Cover Station" style={{ height: '36px', objectFit: 'contain', filter: 'brightness(-1) invert(1)' }} />
            <div style={{ lineHeight: 1.2 }}>
              <p style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 700, margin: 0 }}>
                Cover <span style={{ color: '#c9a96e' }}>Station</span>
              </p>
              <p style={{ color: '#555', fontSize: '8px', letterSpacing: '1.5px', margin: 0, textTransform: 'uppercase' }}>
                Style That Protects
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: '/',         label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/products', label: 'Categories' },
              { to: '/contact',  label: 'Contact' },
            ].map(({ to, label }) => (
              <Link key={label} to={to}
                style={{ color: '#c9a96e', fontWeight: 600, fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#c9a96e'}
              >
                {label}
              </Link>
            ))}

            {/* Search bar */}
            

            {/* Cart */}
            <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
              <ShoppingCart style={{ color: '#aaa', width: 22, height: 22 }} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: '#c9a96e', color: '#1a1a1a',
                  fontSize: '11px', fontWeight: 700,
                  borderRadius: '50%', width: '20px', height: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Secret icon + mobile menu */}
          <div className="flex items-center gap-3">
            <button onClick={handleSecretClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, padding: 0 }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '14px' }}>👤</span>
              </div>
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {mobileMenuOpen
                ? <X style={{ color: '#fff', width: 24, height: 24 }} />
                : <Menu style={{ color: '#fff', width: 24, height: 24 }} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav style={{ padding: '16px 0', borderTop: '1px solid #2a2a2a' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { to: '/',         label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/products', label: 'Categories' },
                { to: '/about',    label: 'About Us' },
                { to: '/contact',  label: 'Contact' },
              ].map(({ to, label }) => (
                <Link key={label} to={to}
                  style={{ color: '#c9a96e', fontWeight: 600, textDecoration: 'none' }}
                  onClick={() => setMobileMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link to="/cart"
                style={{ color: '#aaa', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setMobileMenuOpen(false)}>
                <ShoppingCart style={{ width: 20, height: 20 }} />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
