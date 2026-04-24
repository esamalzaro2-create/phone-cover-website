import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useRef } from 'react';
import logo from '../../../assets/logo.png';

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
    <header style={{ background: '#fff', borderBottom: '2px solid #7b7fc4', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Cover Zone" style={{ height: '85px', objectFit: 'contain' }} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                style={{ color: '#2d3561', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#7b7fc4'}
                onMouseLeave={e => e.target.style.color = '#2d3561'}
              >
                {label}
              </Link>
            ))}

            {/* Cart */}
            <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
              <ShoppingCart style={{ color: '#2d3561', width: 24, height: 24 }} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: '#7b7fc4', color: '#fff',
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
                background: '#2d3561', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '14px' }}>👤</span>
              </div>
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {mobileMenuOpen
                ? <X style={{ color: '#2d3561', width: 24, height: 24 }} />
                : <Menu style={{ color: '#2d3561', width: 24, height: 24 }} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav style={{ padding: '16px 0', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
              ].map(({ to, label }) => (
                <Link key={to} to={to}
                  style={{ color: '#2d3561', fontWeight: 600, textDecoration: 'none' }}
                  onClick={() => setMobileMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link to="/cart"
                style={{ color: '#2d3561', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
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
