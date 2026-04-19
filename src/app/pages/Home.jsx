import { Link } from 'react-router';
import { products } from '../data/products';
import { ArrowRight, Shield, Truck, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import img1 from '../../../assets/1.jpeg';
import img2 from '../../../assets/2.jpeg';
import img3 from '../../../assets/3.jpeg';
import img4 from '../../../assets/4.jpeg';
import img5 from '../../../assets/5.jpeg';
import img6 from '../../../assets/6.jpeg';
import img7 from '../../../assets/7.jpeg';
import img8 from '../../../assets/8.jpeg';
import img9 from '../../../assets/9.jpeg';
import img10 from '../../../assets/10.jpeg';


const sliderItems = [
  { id: 1,  image: img1,  name: 'Good Person Case',      price: 250 },
  { id: 2,  image: img2,  name: 'Sun & Moon Case',       price: 250 },
  { id: 3,  image: img3,  name: 'Makkah Case',           price: 250 },
  { id: 4,  image: img4,  name: 'Vintage Radio Case',    price: 250 },
  { id: 5,  image: img5,  name: 'Porsche GT3 Case',      price: 250 },
  { id: 6,  image: img6,  name: 'Islamic Quote Case',    price: 250 },
  { id: 7,  image: img7,  name: 'Jujutsu Kaisen Case',   price: 250 },
  { id: 8,  image: img8,  name: 'Anime Manga Case',      price: 250 },
  { id: 9,  image: img9,  name: "Don't Touch My Phone",  price: 250 },
  { id: 10, image: img10, name: 'Attack on Titan Case',  price: 250 },
];

export function Home() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const next = () => setCurrent(prev => (prev + 1) % sliderItems.length);
  const prev = () => setCurrent(prev => (prev - 1 + sliderItems.length) % sliderItems.length);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(next, 3000);
    }
    return () => clearInterval(timerRef.current);
  }, [isHovered]);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Protect Your Phone in Style</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover our collection of premium phone covers designed to match your unique style
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Protection</h3>
              <p className="text-gray-600">Military-grade materials that protect your device from drops and scratches</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stylish Designs</h3>
              <p className="text-gray-600">Curated collection of trendy patterns and colors to match your personality</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders with delivery in 2-3 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS SLIDER ===== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Best Sellers</h2>
            <p className="text-gray-500 text-lg">Our most loved phone cases by customers</p>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Slides track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {sliderItems.map((item) => (
                <div key={item.id} className="min-w-full">
                  <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-2xl p-8 md:p-14">
                    {/* Image */}
                    <div className="w-56 h-72 md:w-64 md:h-80 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                        🔥 Best Seller
                      </span>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h3>
                      <p className="text-gray-500 mb-6 text-lg leading-relaxed">
                        Premium quality phone case with a unique design. Protects your phone while keeping it stylish.
                      </p>
                      <div className="text-4xl font-bold text-blue-600 mb-8">
                        {item.price} EGP
                      </div>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
                      >
                        Order Now <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prev button */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {sliderItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2.5'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* View All */}
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Match</h2>
          <p className="text-gray-300 text-lg mb-8">Browse our extensive collection and find the perfect case for your device</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
