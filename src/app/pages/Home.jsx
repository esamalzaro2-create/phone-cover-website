import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { products as initialProducts } from '../data/products';
import { useStock } from '../context/StockContext';

const bestSellerIds = ['3', '6', '7', '9', '13', '14'];

// كفرات بتطير في الخلفية
const floatingCovers = [
  { id: '1',  top: '10%', left: '5%',   size: 90,  delay: '0s',    duration: '8s',  rotate: '-15deg', rotateY: '20deg'  },
  { id: '7',  top: '15%', left: '20%',  size: 75,  delay: '1.5s',  duration: '10s', rotate: '10deg',  rotateY: '-25deg' },
  { id: '3',  top: '5%',  left: '40%',  size: 85,  delay: '0.5s',  duration: '9s',  rotate: '-8deg',  rotateY: '30deg'  },
  { id: '9',  top: '20%', left: '60%',  size: 70,  delay: '2s',    duration: '11s', rotate: '15deg',  rotateY: '-20deg' },
  { id: '13', top: '8%',  left: '75%',  size: 95,  delay: '1s',    duration: '7s',  rotate: '-20deg', rotateY: '25deg'  },
  { id: '14', top: '18%', left: '88%',  size: 65,  delay: '3s',    duration: '12s', rotate: '8deg',   rotateY: '-30deg' },
  { id: '6',  top: '55%', left: '2%',   size: 80,  delay: '2.5s',  duration: '9s',  rotate: '12deg',  rotateY: '20deg'  },
  { id: '2',  top: '60%', left: '82%',  size: 72,  delay: '0.8s',  duration: '10s', rotate: '-10deg', rotateY: '-22deg' },
];

export function Home() {
  const { customProducts, isHidden, isProductSoldOut } = useStock();
  const allProducts = [...initialProducts, ...customProducts].filter(p => !isHidden(p.id));

  const bestSellers = bestSellerIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  const [current, setCurrent]     = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const visibleCount = 4;
  const maxIndex     = Math.max(0, allProducts.length - visibleCount);
  const cardWidth    = 100 / visibleCount;

  const next = () => setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(next, 3000);
    }
    return () => clearInterval(timerRef.current);
  }, [isHovered, maxIndex]);

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════
          Hero — 3D Floating Covers
      ══════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '520px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Floating covers في الخلفية */}
        {floatingCovers.map(cover => {
          const product = allProducts.find(p => p.id === cover.id);
          if (!product) return null;
          return (
            <div
              key={cover.id}
              style={{
                position: 'absolute',
                top: cover.top,
                left: cover.left,
                width: `${cover.size}px`,
                height: `${cover.size * 1.2}px`,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
                transform: `rotate(${cover.rotate}) rotateY(${cover.rotateY})`,
                animation: `floatUp ${cover.duration} ${cover.delay} ease-in-out infinite alternate`,
                opacity: 0.55,
                zIndex: 1,
              }}
            >
              <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          );
        })}

        {/* Gradient overlay عشان النص يبان */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'radial-gradient(ellipse at center, rgba(30,27,75,0.5) 0%, rgba(30,27,75,0.75) 100%)',
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '80px 20px', maxWidth: '700px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50px',
            padding: '6px 18px',
            fontSize: '13px',
            color: '#c4b5fd',
            fontWeight: 600,
            marginBottom: '20px',
            letterSpacing: '1px',
          }}>
            ✨ Premium Phone Covers
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '20px',
            textShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}>
            Protect Your Phone
            <br />
            <span style={{ color: '#a5b4fc' }}>in Style</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#c4b5fd',
            marginBottom: '36px',
            lineHeight: 1.7,
          }}>
            Discover our collection of premium phone covers
            <br />designed to match your unique style
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'white', color: '#4338ca',
              padding: '14px 28px', borderRadius: '50px',
              fontWeight: 700, fontSize: '16px',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '14px 28px', borderRadius: '50px',
              fontWeight: 600, fontSize: '16px',
              textDecoration: 'none',
            }}>
              View All
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '32px', justifyContent: 'center',
            marginTop: '48px', flexWrap: 'wrap',
          }}>
            {[
              { num: '17+', label: 'Designs' },
              { num: '250', label: 'EGP' },
              { num: '100%', label: 'Quality' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: 0 }}>{num}</p>
                <p style={{ fontSize: '12px', color: '#a5b4fc', margin: 0, letterSpacing: '1px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes floatUp {
            0%   { transform: rotate(var(--r, -15deg)) rotateY(var(--ry, 20deg)) translateY(0px);   }
            100% { transform: rotate(var(--r, -15deg)) rotateY(var(--ry, 20deg)) translateY(-18px); }
          }
        `}</style>
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">🔥 Best Sellers</h2>
            <p className="text-gray-500 text-lg">الأكثر مبيعاً عند عملاءنا</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {bestSellers.map(product => {
              const soldOut = isProductSoldOut(product.id);
              return (
                <Link key={product.id} to={`/product/${product.id}`}
                  className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src={product.image} alt={product.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${soldOut ? 'grayscale' : ''}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {soldOut && <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Sold Out</span>}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-sm md:text-base leading-tight mb-1">{product.name}</p>
                    <p className="text-blue-300 font-bold text-sm">250 EGP</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── All Products Slider ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Collection</h2>
            <p className="text-gray-500 text-lg">تصفح كل المنتجات</p>
          </div>

          <div className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * cardWidth}%)` }}>
                {allProducts.map(product => {
                  const soldOut = isProductSoldOut(product.id);
                  return (
                    <div key={product.id} className="flex-shrink-0 px-2" style={{ width: `${cardWidth}%` }}>
                      <Link to={`/product/${product.id}`}
                        className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <div className="aspect-square overflow-hidden bg-gray-100 relative">
                          <img src={product.image} alt={product.name}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${soldOut ? 'grayscale' : ''}`} />
                          {soldOut && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Sold Out</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-1">{product.category}</p>
                          <p className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</p>
                          <p className="text-blue-600 font-bold text-sm mt-1">250 EGP</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={prev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors z-10 border border-gray-200">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button onClick={next}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors z-10 border border-gray-200">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-blue-600 w-5' : 'bg-gray-300 w-2'}`} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Match</h2>
          <p className="text-gray-300 text-lg mb-8">Browse our extensive collection and find the perfect case for your device</p>
          <Link to="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
