import { Link } from 'react-router';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import logo from '../../../assets/logo.png';
import heroImg from '../../../assets/home.png';
export function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: '#fff', marginTop: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <img src={heroImg} alt="Cover Zone" style={{ height: '85px', objectFit: 'contain', marginBottom: '12px', filter: 'brightness(-10) invert(1)' }} />
            <p style={{ color: '#c9a96e', fontSize: '13px', lineHeight: 1.7 }}>
              Premium phone covers designed to protect and personalize your device.
            </p>
            <p style={{ color: '#c9a96e', fontSize: '12px', marginTop: '8px', fontStyle: 'italic' }}>
              Style. Protect. Express.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', color: '#c9a96e' }}>Shop</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/products', label: 'All Products' },
                { to: '/products', label: 'Anime' },
                { to: '/products', label: 'TV Show' },
                { to: '/products', label: 'Islam' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} style={{ color: '#c9a96e', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#c9a96e'}
                    onMouseLeave={e => e.target.style.color = '#80693f'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', color: '#c9a96e' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/contact',  label: 'Contact Us' },
                { to: '/shipping', label: 'Shipping Info' },
                { to: '/returns',  label: 'Returns' },
                { to: '/faq',      label: 'FAQ' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} style={{ color: '#c9a96e', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#c9a96e'}
                    onMouseLeave={e => e.target.style.color = '#80693f'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '16px', color: '#c9a96e' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#"
                  style={{ color: '#a5a8c8', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.color = '#80693f'}>
                  <Icon style={{ width: 20, height: 20 }} />
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#c9a96e' }}>
              <p>📞 01030733667</p>
              <p>✉️ coverzone109@gmail.com</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2d3561', marginTop: '32px', paddingTop: '24px', textAlign: 'center', color: '#c9a96e', fontSize: '13px' }}>
          <p>&copy; 2026 Cover Zone. All rights reserved. — Style. Protect. Express.</p>
        </div>
      </div>
    </footer>
  );
}
