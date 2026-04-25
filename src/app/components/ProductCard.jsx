import { Link } from 'react-router';
import { useStock } from '../context/StockContext';

export function ProductCard({ product }) {
  const { isProductSoldOut, isHidden, getFinalPrice, hasSale, stock } = useStock();

  if (isHidden(product.id)) return null;

  const soldOut    = isProductSoldOut(product.id);
  const onSale     = hasSale(product.id);
  const finalPrice = getFinalPrice(product.id);
  const basePrice  = stock[product.id]?.price ?? 250;
  const salePct    = stock[product.id]?.salePercent ?? 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
    >
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
          {soldOut && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Sold Out</span>}
          {onSale && !soldOut && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Sale!</span>}
        </div>

        <h3 className="text-base font-semibold text-gray-900 mt-1 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">{finalPrice} EGP</span>
            {onSale && (
              <span className="text-sm text-gray-400 line-through ml-2">{basePrice} EGP</span>
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
