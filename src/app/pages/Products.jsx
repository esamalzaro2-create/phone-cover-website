import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Filter } from 'lucide-react';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product =>
    selectedCategory === 'All' || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-4 h-4 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Category</h2>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                    <span className="float-right text-xs opacity-60">
                      {category === 'All' ? products.length : products.filter(p => p.category === category).length}
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
                <button onClick={() => setSelectedCategory('All')} className="mt-4 text-blue-600 font-medium hover:underline">
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
