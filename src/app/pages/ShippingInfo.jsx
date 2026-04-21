import { Link } from 'react-router';
import { Truck, Clock, MapPin, Package, RefreshCw, Phone, MessageCircle, CheckCircle, XCircle } from 'lucide-react';

export function ShippingInfo() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Info</h1>
          <p className="text-blue-100 text-lg">كل اللي محتاج تعرفه عن التوصيل والشحن</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">

        {/* Delivery fees */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">رسوم التوصيل</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-100">
              <p className="text-3xl font-bold text-blue-600 mb-2">70 EGP</p>
              <p className="font-semibold text-gray-900 mb-1">القاهرة والجيزة</p>
              <p className="text-sm text-gray-500">Cairo & Giza</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200">
              <p className="text-3xl font-bold text-gray-700 mb-2">105 EGP</p>
              <p className="font-semibold text-gray-900 mb-1">باقي المحافظات</p>
              <p className="text-sm text-gray-500">All other governorates</p>
            </div>
          </div>
        </div>

        {/* Delivery time */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-6 py-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">مواعيد التوصيل</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">القاهرة والجيزة</p>
                <p className="text-gray-500 text-sm mt-0.5">من 2 لـ 4 أيام عمل بعد تأكيد الطلب</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">باقي المحافظات</p>
                <p className="text-gray-500 text-sm mt-0.5">من 3 لـ 6 أيام عمل بعد تأكيد الطلب</p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-2">
              <p className="text-sm text-yellow-800 font-medium">⚠️ ملاحظة</p>
              <p className="text-sm text-yellow-700 mt-1">المواعيد دي تقريبية وممكن تتأثر بالأعياد والعطلات الرسمية.</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-purple-50 border-b border-purple-100 px-6 py-4 flex items-center gap-3">
            <Package className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">إزاي بيشتغل التوصيل؟</h2>
          </div>
          <div className="p-6">
            <div className="space-y-0" style={{ direction: 'rtl' }}>
              {[
                { step: '01', title: 'بتسجل طلبك', desc: 'بتختار المنتج وموديل التليفون وبتملا بياناتك', color: 'blue' },
                { step: '02', title: 'بنأكد الطلب', desc: 'بيوصلك تأكيد على الواتساب أو الإيميل خلال ساعات', color: 'purple' },
                { step: '03', title: 'بنجهز طلبك', desc: 'بنطبع الكفر وبنعبيه ونسلمه للشركة', color: 'orange' },
                { step: '04', title: 'بيتبعتلك', desc: 'شركة الشحن بتوصلك الطلب على العنوان', color: 'green' },
                { step: '05', title: 'الدفع عند الاستلام', desc: 'بتدفع لما الطلب يوصلك — Cash on Delivery', color: 'teal' },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex items-start gap-4 pb-6 last:pb-0 relative">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                    ${color === 'blue'   ? 'bg-blue-100 text-blue-700' :
                      color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      color === 'green'  ? 'bg-green-100 text-green-700' :
                                           'bg-teal-100 text-teal-700'}
                  `}>{step}</div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-teal-50 border-b border-teal-100 px-6 py-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold text-gray-900">طريقة الدفع</h2>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Cash on Delivery (COD)</p>
                <p className="text-sm text-gray-500">الدفع عند الاستلام — مفيش دفع أونلاين</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">بطاقات ائتمان / فودافون كاش</p>
                <p className="text-sm text-gray-500">مش متاحة حالياً</p>
              </div>
            </div>
          </div>
        </div>

        {/* Returns */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 px-6 py-4 flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900">الاستبدال والاسترداد</h2>
          </div>
          <div className="p-6 space-y-4" style={{ direction: 'rtl' }}>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">لو الكفر وصل تالف أو غلط — بنستبدله مجاناً</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">لازم تتواصل معانا خلال 48 ساعة من الاستلام</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">بعتلنا صورة للمشكلة على الواتساب وهنحلها فوراً</p>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">مش بنقبل إرجاع لو المنتج اتكسر بعد الاستلام</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">عندك سؤال؟</h2>
          <p className="text-blue-100 mb-6">تواصل معانا وهنرد في أقرب وقت</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/201030733667"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> واتساب
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
