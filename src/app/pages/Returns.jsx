import { Link } from 'react-router';
import { RefreshCw, CheckCircle, XCircle, MessageCircle, Clock, Camera, Package, ThumbsUp } from 'lucide-react';

export function Returns() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Exchange</h1>
          <p className="text-blue-100 text-lg">سياسة الاستبدال والاسترداد بتاعتنا</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">

        {/* Promise banner */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <ThumbsUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-bold text-green-900 text-lg mb-1">وعدنا بيك 🤝</p>
            <p className="text-green-700 text-sm leading-relaxed">
              رضاك هو أولويتنا. لو في أي مشكلة في طلبك — تواصل معانا وهنحلها من غير أي تعقيد.
            </p>
          </div>
        </div>

        {/* What we accept */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-6 py-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">إمتى بنقبل الاستبدال؟</h2>
          </div>
          <div className="p-6 space-y-4" style={{ direction: 'rtl' }}>
            {[
              { icon: '📦', title: 'الكفر وصل تالف', desc: 'لو المنتج وصلك مكسور أو فيه عيب تصنيعي — بنستبدله مجاناً فوراً.' },
              { icon: '❌', title: 'غلط في الطلب', desc: 'لو بعتنالك موديل غلط أو منتج مختلف عن اللي طلبته — مسؤوليتنا الكاملة.' },
              { icon: '🖨️', title: 'مشكلة في الطباعة', desc: 'لو الطباعة طلعت باهتة أو غلط — بنعمل طباعة جديدة ونبعتهالك.' },
              { icon: '📐', title: 'مش مناسب لتليفونك', desc: 'لو الكفر مش ماشي على موديلك رغم إنك اخترت الصح — بنستبدله.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What we don't accept */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-gray-900">إمتى مش بنقبل الإرجاع؟</h2>
          </div>
          <div className="p-6 space-y-3" style={{ direction: 'rtl' }}>
            {[
              'لو المنتج اتكسر بعد الاستلام بسبب سوء الاستخدام',
              'لو اتعدى 48 ساعة من وقت الاستلام من غير ما تتواصل معانا',
              'لو المنتج اتستخدم وفيه خدوش أو تلف واضح',
              'إرجاع بسبب تغيير رأي أو مش عاجبك التصميم بعد الاستلام',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to request */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex items-center gap-3">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">إزاي تطلب استبدال؟</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4" style={{ direction: 'rtl' }}>
              {[
                { step: '01', icon: <Clock className="w-5 h-5" />, title: 'خلال 48 ساعة', desc: 'تواصل معانا خلال 48 ساعة من استلام الطلب', color: 'blue' },
                { step: '02', icon: <Camera className="w-5 h-5" />, title: 'ابعت صور', desc: 'ابعتلنا صور واضحة للمشكلة على الواتساب', color: 'purple' },
                { step: '03', icon: <MessageCircle className="w-5 h-5" />, title: 'هنراجع الطلب', desc: 'هنشوف الصور ونأكدلك الاستبدال خلال ساعات', color: 'orange' },
                { step: '04', icon: <RefreshCw className="w-5 h-5" />, title: 'الاستبدال', desc: 'هنبعتلك المنتج الجديد على نفس العنوان مجاناً', color: 'green' },
              ].map(({ step, icon, title, desc, color }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                    ${color === 'blue'   ? 'bg-blue-100 text-blue-700' :
                      color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      color === 'orange' ? 'bg-orange-100 text-orange-700' :
                                           'bg-green-100 text-green-700'}
                  `}>{step}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-purple-50 border-b border-purple-100 px-6 py-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">المدة الزمنية للاستبدال</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-2xl font-bold text-blue-600 mb-1">48 ساعة</p>
              <p className="text-sm text-gray-600">أقصى وقت للإبلاغ عن المشكلة</p>
            </div>
            <div className="text-center bg-purple-50 rounded-xl p-4 border border-purple-100">
              <p className="text-2xl font-bold text-purple-600 mb-1">24 ساعة</p>
              <p className="text-sm text-gray-600">وقت مراجعة الطلب من عندنا</p>
            </div>
            <div className="text-center bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-2xl font-bold text-green-600 mb-1">3-5 أيام</p>
              <p className="text-sm text-gray-600">وقت توصيل المنتج البديل</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">عندك مشكلة في طلبك؟</h2>
          <p className="text-blue-100 mb-6">تواصل معانا على الواتساب وهنحلها في أسرع وقت</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/201030733667"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> تواصل على واتساب
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
