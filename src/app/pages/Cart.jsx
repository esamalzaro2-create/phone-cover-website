import { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { emptyForm, validateForm, sendOrder, getDeliveryFee, genConfNum, CAIRO_GIZA_DELIVERY, OTHER_DELIVERY, cairoGiza } from '../utils/checkout';
import { CheckoutForm } from '../components/CheckoutForm';
import { Invoice } from '../components/Invoice';

export function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [step, setStep]       = useState('cart');
  const [sending, setSending] = useState(false);
  const [form, setForm]       = useState(emptyForm);
  const [errors, setErrors]   = useState({});
  const [orderData, setOrderData] = useState(null);

  const deliveryFee = getDeliveryFee(form.governorate);
  const grandTotal  = totalPrice + deliveryFee;

  const handleChangeField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleConfirm = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setSending(true);
    const confNum = genConfNum();
    const { fee, total } = await sendOrder({ form, items, totalPrice, confNum });

    setOrderData({ ...form, items: [...items], totalPrice, deliveryFee: fee, grandTotal: total, confNum });
    clearCart();
    setSending(false);
    setStep('confirmed');
  };

  // ── Confirmed ──
  if (step === 'confirmed' && orderData) {
    return <Invoice orderData={orderData} />;
  }

  // ── Empty ──
  if (items.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Start shopping and add items to your cart</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Browse Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">

            {/* Cart items */}
            {step === 'cart' && items.map(item => (
              <div key={`${item.id}-${item.selectedColor}`} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Model: {item.selectedColor}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.price * item.quantity} EGP</p>
                        <p className="text-xs text-gray-500">{item.price} EGP each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Checkout form */}
            {step === 'checkout' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <CheckoutForm
                  form={form}
                  errors={errors}
                  sending={sending}
                  totalPrice={totalPrice}
                  onChangeField={handleChangeField}
                  onConfirm={handleConfirm}
                  onBack={() => setStep('cart')}
                />
              </div>
            )}

            {step === 'cart' && (
              <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-medium">
                Clear Cart
              </button>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1 ml-2">{item.name} x{item.quantity}</span>
                    <span className="text-gray-900 font-medium flex-shrink-0">{item.price * item.quantity} EGP</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span><span>{totalPrice} EGP</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span>{form.governorate ? `${deliveryFee} EGP` : '—'}</span>
                </div>
                {form.governorate && (
                  <p className="text-xs text-gray-400">{cairoGiza.includes(form.governorate) ? 'القاهرة / الجيزة' : 'محافظات أخرى'}</p>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-3 mt-2">
                  <span>Total</span>
                  <span>{form.governorate ? grandTotal : totalPrice} EGP</span>
                </div>
              </div>

              {step === 'cart' && (
                <button onClick={() => setStep('checkout')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors mt-6">
                  Proceed to Checkout
                </button>
              )}

              <Link to="/products" className="block w-full text-center text-blue-600 font-medium py-2 mt-3 hover:underline">
                Continue Shopping
              </Link>

              <div className="mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500 space-y-1">
                <p>🚚 القاهرة / الجيزة: {CAIRO_GIZA_DELIVERY} EGP</p>
                <p>🚚 باقي المحافظات: {OTHER_DELIVERY} EGP</p>
                <p>💵 الدفع عند الاستلام (COD)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
