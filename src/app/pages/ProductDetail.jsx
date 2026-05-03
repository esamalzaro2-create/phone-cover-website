import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { products as initialProducts, iphoneModels } from '../data/products';
import { useCart } from '../context/CartContext';
import { useStock } from '../context/StockContext';
import { ArrowLeft, ShoppingCart, Smartphone, Check, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { emptyForm, validateForm, sendOrder, genConfNum, DELIVERY_FEE } from '../utils/checkout';
import { CheckoutForm } from '../components/CheckoutForm';
import { Invoice } from '../components/Invoice';

const WHATSAPP_NUMBER = '201030733667';
const brand = { main: '#c9a96e', purple: '#7b7fc4', light: '#7a6a55', dark: '#1a1f3c' };

export function ProductDetail() {
  const { id } = useParams();
  const { customProducts, isModelSoldOut, isProductSoldOut, isHidden, getFinalPrice, hasSale, stock } = useStock();

  const allProducts = [...initialProducts, ...customProducts];
  const product     = allProducts.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedModel, setSelectedModel] = useState('');
  const [modelError, setModelError]       = useState(false);
  const [step, setStep]                   = useState('detail');
  const [sending, setSending]             = useState(false);
  const [form, setForm]                   = useState(emptyForm);
  const [errors, setErrors]               = useState({});
  const [orderData, setOrderData]         = useState(null);
  const sliderRef = useRef(null);

  if (!product || isHidden(product.id)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <Link to="/products" style={{ color: brand.main }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  // ── السعر من StockContext ──
  const finalPrice  = getFinalPrice(product.id);
  const basePrice   = stock[product.id]?.price ?? 250;
  const onSale      = hasSale(product.id);
  const salePct     = stock[product.id]?.salePercent ?? 0;

  // ── Related products ──
  const relatedProducts = allProducts.filter(p =>
    p.category === product.category && p.id !== product.id && !isHidden(p.id)
  );

  const scrollSlider = (dir) => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  const selectedModelSoldOut = selectedModel ? isModelSoldOut(product.id, selectedModel) : false;
  const isFullySoldOut       = isProductSoldOut(product.id);

  const handleChangeField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleOrder = () => {
    if (!selectedModel) { setModelError(true); return; }
    setModelError(false);
    if (selectedModelSoldOut) {
      handlePreOrder();
    } else {
      addToCart({ ...product, price: finalPrice }, selectedModel);
      toast.success('Added to cart!', { description: `${product.name} — ${selectedModel}` });
      setStep('checkout');
    }
  };

  const handlePreOrder = () => {
    if (!selectedModel) { setModelError(true); return; }
    const msg = encodeURIComponent(
      `مرحبا، عايز أعمل Pre-Order 🛍️\n\n` +
      `المنتج: ${product.name}\n` +
      `موديل الجوال: ${selectedModel}\n` +
      `السعر: ${finalPrice} جنيه\n\n` +
      `ممكن تأكدلي الطلب؟`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const handleConfirm = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setSending(true);
    const confNum = genConfNum();
    const items   = [{ ...product, price: finalPrice, selectedColor: selectedModel, quantity: 1 }];
    const { fee, total } = await sendOrder({ form, items, totalPrice: finalPrice, confNum });
    setOrderData({ ...form, items, totalPrice: finalPrice, deliveryFee: fee, grandTotal: total, confNum });
    setSending(false);
    setStep('confirmed');
  };

  if (step === 'confirmed' && orderData) return <Invoice orderData={orderData} />;

  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-[#f5f0eb]">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button onClick={() => setStep('detail')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Product
          </button>

          {/* Product recap */}
          <div className="bg-[#1a1a1a] rounded-xl border border-gray-200 p-4 mb-4 flex gap-4 items-center">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#7a6a55] flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{selectedModel}</p>
            </div>
            <div className="text-right">
              <p className="font-bold" style={{ color: brand.main }}>{finalPrice} EGP</p>
              {onSale && <p className="text-xs text-gray-400 line-through">{basePrice} EGP</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <CheckoutForm
              form={form} errors={errors} sending={sending}
              totalPrice={finalPrice}
              onChangeField={handleChangeField}
              onConfirm={handleConfirm}
              onBack={() => setStep('detail')}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Products
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Image */}
            <div className="aspect-square bg-gray-100 relative">
              <img src={product.image} alt={product.name}
                className={`w-full h-full object-cover ${isFullySoldOut ? 'grayscale' : ''}`} />

              {/* Sale badge on image */}
              {onSale && !isFullySoldOut && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-lg">
                  -{salePct}% خصم
                </div>
              )}

              {isFullySoldOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center">
                    <span className="block bg-red-600 text-white text-xl font-bold px-6 py-2 rounded-full mb-3">Sold Out</span>
                    <span className="block bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">Pre-Order via WhatsApp</span>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col p-8">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ background: brand.light, color: brand.main }}>
                  {product.category}
                </span>
                {isFullySoldOut && <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">Sold Out</span>}
                {onSale && !isFullySoldOut && <span className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">Sale -{salePct}%</span>}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-bold" style={{ color: brand.main }}>{finalPrice} EGP</span>
                {onSale && (
                  <span className="text-xl text-gray-400 line-through">{basePrice} EGP</span>
                )}
                {onSale && (
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                    وفّر {basePrice - finalPrice} جنيه!
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Material</p>
                <p className="font-semibold text-gray-900">{product.material || 'Hard Polycarbonate'}</p>
              </div>

              {/* iPhone model selector */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5" style={{ color: brand.main }} />
                  <label className="font-semibold text-gray-900">Select Your iPhone Model *</label>
                </div>
                {modelError && <p className="text-red-500 text-sm mb-2">⚠️ Please select your iPhone model first</p>}

                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                  {iphoneModels.map(model => {
                    const soldOut  = isModelSoldOut(product.id, model);
                    const selected = selectedModel === model;
                    return (
                      <button key={model}
                        onClick={() => { setSelectedModel(model); setModelError(false); }}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition-all text-left flex items-center justify-between"
                        style={{
                          borderColor: selected ? (soldOut ? '#f97316' : brand.main) : soldOut ? '#fca5a5' : '#e5e7eb',
                          background:  selected ? (soldOut ? '#fff7ed' : brand.light) : soldOut ? '#fef2f2' : '#fff',
                          color:       selected ? (soldOut ? '#c2410c' : brand.main) : soldOut ? '#ef4444' : '#374151',
                        }}>
                        <span>{model}</span>
                        <span className="flex items-center gap-1">
                          {selected && !soldOut && <Check className="w-4 h-4" style={{ color: brand.main }} />}
                          {soldOut && <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">Sold Out</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedModel && (
                  <p className={`mt-2 text-sm font-medium ${selectedModelSoldOut ? 'text-orange-600' : 'text-green-600'}`}>
                    {selectedModelSoldOut
                      ? `⚠️ ${selectedModel} — خلص، هتتبعت على واتساب للـ Pre-Order`
                      : `✓ Selected: ${selectedModel}`}
                  </p>
                )}
              </div>

              {/* Action button */}
              {selectedModel ? (
                selectedModelSoldOut ? (
                  <div className="mt-auto flex flex-col gap-3">
                    <button onClick={handlePreOrder}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      Pre-Order via WhatsApp — {selectedModel}
                    </button>
                    <p className="text-center text-sm text-gray-500">{selectedModel} خلص — ممكن تعمل Pre-Order</p>
                  </div>
                ) : (
                  <button onClick={handleOrder}
                    className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg text-white transition-colors"
                    style={{ background: brand.main }}
                    onMouseEnter={e => e.currentTarget.style.background = brand.purple}
                    onMouseLeave={e => e.currentTarget.style.background = brand.main}>
                    <ShoppingCart className="w-5 h-5" />
                    Order Now — {finalPrice} EGP
                  </button>
                )
              ) : (
                <button disabled
                  className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg bg-gray-200 text-gray-500 cursor-not-allowed">
                  <Smartphone className="w-5 h-5" />
                  Select iPhone Model First
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related products slider */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">More from {product.category}</h2>
                <p className="text-gray-500 text-sm mt-1">منتجات مشابهة</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => scrollSlider(-1)}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 shadow-sm">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
                <button onClick={() => scrollSlider(1)}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 shadow-sm">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div ref={sliderRef} className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
              {relatedProducts.map(related => {
                const rFinalPrice = getFinalPrice(related.id);
                const rOnSale     = hasSale(related.id);
                const rBasePrice  = stock[related.id]?.price ?? 250;
                return (
                  <Link key={related.id} to={`/product/${related.id}`}
                    onClick={() => { setSelectedModel(''); setStep('detail'); window.scrollTo(0, 0); }}
                    className="flex-shrink-0 w-56 bg-[#1a1a1a] rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                      <img src={related.image} alt={related.name}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isProductSoldOut(related.id) ? 'grayscale' : ''}`} />
                      {isProductSoldOut(related.id) && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Sold Out</span>
                      )}
                      {rOnSale && !isProductSoldOut(related.id) && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Sale!</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-[#9a8878] text-sm mb-1 line-clamp-1 group-hover:text-[#c9a96e] transition-colors">{related.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm" style={{ color: brand.main }}>{rFinalPrice} EGP</p>
                        {rOnSale && <p className="text-xs text-[#c9a96e] line-through">{rBasePrice} EGP</p>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
