import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { products as initialProducts, categories } from '../data/products';
import { useStock } from '../context/StockContext';
import { Filter } from 'lucide-react';

const brand = { main: '#c9a96e', purple: '#7a6a55', light: '#7a6a55' };

function ProductCard({ product }) {
  const { isProductSoldOut, isHidden, getFinalPrice, hasSale, stock, loading } = useStock();

  if (isHidden(product.id)) return null;

  const soldOut    = isProductSoldOut(product.id);
  const onSale     = hasSale(product.id);
  const finalPrice = getFinalPrice(product.id);
  const basePrice  = stock[product.id]?.price ?? 250;
  const salePct    = stock[product.id]?.salePercent ?? 0;

  return (
    <Link to={`/product/${product.id}`}
      className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">

      {/* Sale badge */}
      {onSale && !soldOut && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          -{salePct}%
        </div>
      )}

      {/* Sold Out overlay */}
      {soldOut && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 rounded-xl">
          <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-2">Sold Out</span>
          <span className="text-white text-xs font-medium bg-green-600 px-3 py-1 rounded-full">Pre-Order Available</span>
        </div>
      )}

      <div className="aspect-square overflow-hidden bg-[#1a1a1a]">
        <img src={product.image} alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${soldOut ? 'grayscale' : ''}`} />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: brand.light, color: brand.main }}>
            {product.category}
          </span>
          {soldOut && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Sold Out</span>}
          {onSale && !soldOut && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Sale!</span>}
        </div>

        <h3 className="text-base font-semibold text-[#c9a96e] mt-1 mb-3 line-clamp-1 group-hover:text-purple-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {loading ? (
              <span className="text-xl font-bold text-gray-300 animate-pulse">...</span>
            ) : (
              <>
                <span className="text-xl font-bold" style={{ color: brand.main }}>{finalPrice} EGP</span>
                {onSale && <span className="text-sm text-[#7a6a55] line-through">{basePrice} EGP</span>}
              </>
            )}
          </div>
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
  const { customProducts, isHidden } = useStock();

  const allProducts = [...initialProducts, ...customProducts];

  const filteredProducts = allProducts.filter(product => {
    if (isHidden(product.id)) return false;
    return selectedCategory === 'All' || product.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
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
                <Filter className="w-4 h-4" style={{ color: brand.main }} />
                <h2 className="font-semibold text-gray-900">Category</h2>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button key={category} onClick={() => setSelectedCategory(category)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      background: selectedCategory === category ? brand.main : 'transparent',
                      color:      selectedCategory === category ? '#fff' : '#374151',
                    }}
                    onMouseEnter={e => { if (selectedCategory !== category) e.currentTarget.style.background = brand.light; }}
                    onMouseLeave={e => { if (selectedCategory !== category) e.currentTarget.style.background = 'transparent'; }}
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
                <button onClick={() => setSelectedCategory('All')}
                  style={{ color: brand.main }} className="mt-4 font-medium hover:underline">
                  Show all
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
