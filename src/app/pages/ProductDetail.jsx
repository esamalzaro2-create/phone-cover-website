import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { products, iphoneModels } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Smartphone, Check, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { emptyForm, validateForm, sendOrder, genConfNum } from '../utils/checkout';
import { CheckoutForm } from '../components/CheckoutForm';
import { Invoice } from '../components/Invoice';

const WHATSAPP_NUMBER = '201030733667';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedModel, setSelectedModel] = useState('');
  const [modelError, setModelError]       = useState(false);
  const [step, setStep]                   = useState('detail');
  const [sending, setSending]             = useState(false);
  const [form, setForm]                   = useState(emptyForm);
  const [errors, setErrors]               = useState({});
  const [orderData, setOrderData]         = useState(null);

  const sliderRef = useRef(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">Back to Products</Link>
        </div>
      </div>
    );
  }

  // المنتجات من نفس الكاتيجوري غير المنتج الحالي
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  const scrollSlider = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };

  const isModelSoldOut = (model) => {
    if (product.soldOut) return true;
    return product.soldOutModels?.includes(model) ?? false;
  };

  const selectedModelSoldOut = selectedModel ? isModelSoldOut(selectedModel) : false;
  const isFullySoldOut = product.soldOut || (product.soldOutModels?.length === iphoneModels.length);

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
      addToCart(product, selectedModel);
      toast.success('Added to cart!', { description: `${product.name} — ${selectedModel}` });
      setStep('checkout');
    }
  };

  const handlePreOrder = () => {
    if (!selectedModel) { setModelError(true); return; }
    setModelError(false);
    const msg = encodeURIComponent(
      `مرحبا، عايز أعمل Pre-Order 🛍️\n\n` +
      `المنتج: ${product.name}\n` +
      `موديل الجوال: ${selectedModel}\n` +
      `السعر: 250 جنيه\n\n` +
      `ممكن تأكدلي الطلب؟`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const handleConfirm = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setSending(true);
    const confNum = genConfNum();
    const items = [{ ...product, selectedColor: selectedModel, quantity: 1 }];
    const { fee, total } = await sendOrder({ form, items, totalPrice: product.price, confNum });

    setOrderData({ ...form, items, totalPrice: product.price, deliveryFee: fee, grandTotal: total, confNum });
    setSending(false);
    setStep('confirmed');
  };

  if (step === 'confirmed' && orderData) return <Invoice orderData={orderData} />;

  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button onClick={() => setStep('detail')} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Product
          </button>
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex gap-4 items-center">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{selectedModel}</p>
            </div>
            <p className="font-bold text-blue-600">250 EGP</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <CheckoutForm
              form={form} errors={errors} sending={sending}
              totalPrice={product.price}
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Products
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Image */}
            <div className="aspect-square bg-gray-100 relative">
              <img src={product.image} alt={product.name}
                className={`w-full h-full object-cover ${isFullySoldOut ? 'grayscale' : ''}`} />
              {isFullySoldOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center">
                    <span className="block bg-red-600 text-white text-xl font-bold px-6 py-2 rounded-full mb-3">Sold Out</span>
                    <span className="block bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">Pre-Order Available via WhatsApp</span>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col p-8">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.category}</span>
                {isFullySoldOut && <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">Sold Out</span>}
                {!isFullySoldOut && product.soldOutModels?.length > 0 && (
                  <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">بعض الموبيلات خلصت</span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="text-3xl font-bold text-blue-600 mb-5">250 EGP</div>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Material</p>
                <p className="font-semibold text-gray-900">{product.material}</p>
              </div>

              {/* iPhone model selector */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-gray-700" />
                  <label className="font-semibold text-gray-900">Select Your iPhone Model *</label>
                </div>
                {modelError && <p className="text-red-500 text-sm mb-2">⚠️ Please select your iPhone model first</p>}

                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                  {iphoneModels.map(model => {
                    const soldOut = isModelSoldOut(model);
                    const isSelected = selectedModel === model;
                    return (
                      <button key={model}
                        onClick={() => { setSelectedModel(model); setModelError(false); }}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? soldOut ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-blue-600 bg-blue-50 text-blue-700'
                            : soldOut ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <span>{model}</span>
                        <span className="flex items-center gap-1">
                          {isSelected && !soldOut && <Check className="w-4 h-4 text-blue-600" />}
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
                    <p className="text-center text-sm text-gray-500">{selectedModel} خلص، بس ممكن تعمل Pre-Order وتاخده أول ما يجي</p>
                  </div>
                ) : (
                  <button onClick={handleOrder}
                    className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Order Now — {selectedModel}
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

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">More from {product.category}</h2>
                <p className="text-gray-500 text-sm mt-1">منتجات مشابهة ممكن تعجبك</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollSlider(-1)}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollSlider(1)}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Scrollable slider */}
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {relatedProducts.map(related => (
                <Link
                  key={related.id}
                  to={`/product/${related.id}`}
                  onClick={() => { setSelectedModel(''); setStep('detail'); window.scrollTo(0, 0); }}
                  className="flex-shrink-0 w-56 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                    <img
                      src={related.image}
                      alt={related.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${related.soldOut ? 'grayscale' : ''}`}
                    />
                    {related.soldOut && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Sold Out
                      </span>
                    )}
                    {!related.soldOut && related.soldOutModels?.length > 0 && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Limited
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {related.name}
                    </p>
                    <p className="text-blue-600 font-bold text-sm">250 EGP</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
