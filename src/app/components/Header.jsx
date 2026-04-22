import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useRef } from 'react';

export function Header() {
  const { totalItems }  = useCart();
  const navigate        = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── السر: اضغط على الأيقونة 3 مرات في أقل من 2 ثانية ──
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

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">CoverCraft</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 transition-colors">Products</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Right side: secret icon + mobile menu */}
          <div className="flex items-center gap-3">
            {/* ── أيقونة سرية — اضغط 3 مرات ── */}
            <button
              onClick={handleSecretClick}
              className="w-8 h-8 rounded-full overflow-hidden opacity-60 hover:opacity-80 transition-opacity focus:outline-none"
              title=""
              aria-label=""
            >
              <img
                src="https://api.dicebear.com/7.x/thumbs/svg?seed=admin&backgroundColor=b6e3f4"
                alt=""
                className="w-full h-full object-cover"
              />
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen
                ? <X className="w-6 h-6 text-gray-700" />
                : <Menu className="w-6 h-6 text-gray-700" />
              }
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <ShoppingCart className="w-5 h-5" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
