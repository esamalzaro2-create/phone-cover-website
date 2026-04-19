import { Link } from 'react-router';
import { Check } from 'lucide-react';

export function Invoice({ orderData }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg overflow-hidden shadow-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-8 px-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Confirmation {orderData.confNum}</p>
          <h1 className="text-2xl font-bold">Thank you, {orderData.name}!</h1>
        </div>

        <div className="p-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="font-semibold text-green-800 mb-1">✅ Your order is confirmed</p>
            <p className="text-green-700 text-sm">تم إرسال تفاصيل الطلب على Gmail والواتساب تلقائياً.</p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold text-gray-900 mb-2 border-b pb-2">Contact information</p>
              <p className="text-gray-700">📞 {orderData.phone}</p>
              <p className="text-gray-700">💬 واتساب: {orderData.whatsapp}</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-2 border-b pb-2">Shipping address</p>
              <p className="text-gray-700">{orderData.name}</p>
              <p className="text-gray-700">{orderData.address}، عمارة {orderData.building}، شقة {orderData.apartment}</p>
              <p className="text-gray-700">{orderData.governorate}، Egypt</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-2 border-b pb-2">Shipping method</p>
              <p className="text-gray-700">Fast Delivery</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-2 border-b pb-2">Order items</p>
              {orderData.items.map((item, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-700">{item.name} ({item.selectedColor}) x{item.quantity}</span>
                  <span className="font-medium">{item.price * item.quantity} EGP</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Products</span><span>{orderData.totalPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery ({orderData.governorate})</span>
                <span>{orderData.deliveryFee} EGP</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2 mt-1">
                <span>Total</span><span>{orderData.grandTotal} EGP</span>
              </div>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-2 border-b pb-2">Payment method</p>
              <p className="text-gray-700">💵 Cash on Delivery (COD) · {orderData.grandTotal} EGP</p>
            </div>
          </div>

          <Link
            to="/products"
            className="mt-8 block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
