import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { products as initialProducts, categories } from '../data/products';
import { useStock } from '../context/StockContext';
import { Filter, Palette, Sparkles } from 'lucide-react';

// ── ProductCard مدمج هنا عشان يستخدم StockContext ──
function ProductCard({ product }) {
  const { isProductSoldOut, isHidden } = useStock();

  if (isHidden(product.id)) return null;

  const soldOut = isProductSoldOut(product.id);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
    >
      {soldOut && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 rounded-xl">
          <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-2">Sold Out</span>
          <span className="text-white text-xs font-medium bg-green-600 px-3 py-1 rounded-full">Pre-Order Available</span>
        </div>
      )}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${soldOut ? 'grayscale' : ''}`}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          {soldOut && (
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Sold Out</span>
          )}
        </div>
        <h3 className="text-base font-semibold text-gray-900 mt-1 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">250 EGP</span>
          {soldOut
            ? <span className="text-xs text-green-600 bg-green-50 font-semibold px-2 py-1 rounded-lg">Pre-Order</span>
            : <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">All iPhones</span>
          }
        </div>
      </div>
    </Link>
  );
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [shake, setShake] = useState(false);
  const { customProducts, isHidden } = useStock();

  // كل المنتجات = الأصلية + الـ custom
  const allProducts = [...initialProducts, ...customProducts];

  const filteredProducts = allProducts.filter(product => {
    if (isHidden(product.id)) return false;
    return selectedCategory === 'All' || product.category === selectedCategory;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-4 h-4 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Category</h2>
              </div>
              <div className="space-y-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                    <span className="float-right text-xs opacity-60">
                      {category === 'All'
                        ? allProducts.filter(p => !isHidden(p.id)).length
                        : allProducts.filter(p => p.category === category && !isHidden(p.id)).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                {/* Custom Design button */}
                {/*
                <Link
                  to="/custom-design"
                  onMouseEnter={() => setShake(false)}
                  className="flex items-center gap-2 w-full px-3 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    animation: shake ? 'wiggle 0.6s ease-in-out' : 'none',
                  }}
                >
                  <Palette className="w-4 h-4 flex-shrink-0" />
                  <span>Custom Design</span>
                  <Sparkles className="w-3 h-3 mr-auto opacity-80" />
                </Link>
                <p className="text-xs text-gray-400 text-center mt-2">صمم كفرك بنفسك!</p>
                */}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No products found.</p>
                <button onClick={() => setSelectedCategory('All')} className="mt-4 text-blue-600 font-medium hover:underline">
                  Show all
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @keyframes wiggle {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(-6deg); }
          30%  { transform: rotate(6deg); }
          45%  { transform: rotate(-4deg); }
          60%  { transform: rotate(4deg); }
          75%  { transform: rotate(-2deg); }
          90%  { transform: rotate(2deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
