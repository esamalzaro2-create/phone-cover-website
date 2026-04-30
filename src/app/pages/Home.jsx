import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { products as initialProducts } from '../data/products';
import { useStock } from '../context/StockContext';
import heroImg from '../../../assets/home.png';

const bestSellerIds = ['3', '6', '7', '9', '13', '14'];

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
    <div className="min-h-screen" style={{ background: '#f5f0eb' }}>

      {/* ══════════════════════════════════════
          Hero — Responsive Split Layout
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f5f0eb]">

        {/* Main hero content — column on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row md:items-center max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-6 md:py-20 gap-10 md:gap-0">

          {/* Left — النص */}
          <div className="flex-1 z-10 text-center md:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ede8e1] border border-[#ddd5c5] rounded-full px-4 py-1.5 text-[11px] font-bold text-[#7a6a55] tracking-widest uppercase mb-6">
              ✦ Premium Phone Covers
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5" style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
              Protect Your Phone
              <br />
              <span style={{ color: '#c9a96e' }}>in Style</span>
            </h1>

            <p className="text-base md:text-lg text-[#7a6a55] leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Discover our collection of premium phone covers
              designed to match your unique style
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/products"
                className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg hover:-translate-y-0.5 transition-transform">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/products"
                className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] px-7 py-3.5 rounded-full font-semibold text-sm md:text-base hover:bg-black/5 transition-colors">
                View All Products
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 md:gap-8 justify-center md:justify-start mt-8 pt-6 border-t border-[#ddd5c5] flex-wrap">
              {[
                { num: '250+', label: 'Happy Customers' },
                { num: '100%', label: 'Quality' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-black text-[#1a1a1a] m-0">{num}</p>
                  <p className="text-xs text-[#9a8878] m-0 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — صورة + badge (مخفية على موبايل صغير، بتظهر تحت النص) */}
          <div className="flex-1 relative flex justify-center items-center min-h-[280px] md:min-h-[440px]">
            {/* دايرة ديكور */}
            <div className="absolute w-56 h-56 md:w-96 md:h-96 rounded-full bg-[#e5ddd0]" />
            <img
              src={heroImg}
              alt="Cover Station"
              className="relative z-10 w-48 md:w-72 lg:w-80 object-contain drop-shadow-2xl"
            />
            {/* Float badge — بتظهر بس على desktop */}
            <div className="hidden md:block absolute bottom-8 right-4 z-20 bg-[#1a1a1a] rounded-2xl p-4 shadow-xl text-center min-w-[120px]">
              <div className="text-2xl mb-1">🛡️</div>
              <p className="font-black text-xs text-[#ac9981] m-0">Ultimate</p>
              <p className="font-black text-xs text-[#ac9981] m-0">Protection</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-snug">Stylish. Durable.<br />Reliable.</p>
            </div>
          </div>
        </div>

        {/* Features bar — 2x2 grid on mobile, 4 cols on desktop */}
        <div className="bg-[#1a1a1a] border-t border-[#e8e0d8]">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a]">
            {[
              { icon: '🛡️', title: 'Premium Quality',  desc: 'Top-notch materials for ultimate protection.' },
              { icon: '📱', title: 'Perfect Fit',       desc: 'Precision design for every device.' },
              { icon: '🎨', title: 'Trendy Designs',    desc: 'Stylish covers that match your vibe.' },
              { icon: '🚚', title: 'Fast Delivery',     desc: 'Quick and reliable shipping.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 bg-[#f5f0eb] px-4 py-4">
                <span className="w-9 h-9 rounded-full bg-[#f5f0eb] flex items-center justify-center text-lg shrink-0">
                  {icon}
                </span>
                <div>
                  <p className="font-bold text-xs text-[#1a1a1a] m-0">{title}</p>
                  <p className="text-[10px] text-[#9a8878] mt-0.5 leading-snug m-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1a1a1a]">🔥 Best Sellers</h2>
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
                    <p className="text-[#9a8878] font-bold text-sm">250 EGP</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-[#bbad9b] px-6 py-3 rounded-lg font-semibold hover:bg-[#333333] transition-colors">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── All Products Slider ── */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1a1a1a]">Our Collection</h2>
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
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#1a1a1a] w-5' : 'bg-gray-300 w-2'}`} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products"
              className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] text-[#c9a96e] px-6 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-[#a09280] transition-colors">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1a1a1a] text-[#c9a96e] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Match</h2>
          <p className="text-[#c9a96e] text-lg mb-8">Browse our extensive collection and find the perfect case for your device</p>
          <Link to="/products"
            className="inline-flex items-center gap-2 bg-[#c9a96e] text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-[#80693f] transition-colors">
            Explore Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
