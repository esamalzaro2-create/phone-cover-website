import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';

const faqs = [
  {
    category: '📦 الطلب والشراء',
    items: [
      {
        q: 'إزاي بطلب من الموقع؟',
        a: 'بتختار المنتج اللي عجبك، بتحدد موديل التليفون بتاعك، وبتضغط Order Now. بعدين بتملا بياناتك وبتأكد الطلب — هيوصلك تأكيد على الواتساب والإيميل فوراً.',
      },
      {
        q: 'الدفع بيبقى إزاي؟',
        a: 'الدفع عند الاستلام فقط (Cash on Delivery). مش محتاج تدفع أونلاين خالص — بتدفع لما الطلب يوصلك على بابك.',
      },
      {
        q: 'ممكن أطلب أكتر من منتج في نفس الوقت؟',
        a: 'أيوه! بتضيف المنتجات في السلة وبتأكد الطلب كله مرة واحدة. التوصيل بيتحسب مرة واحدة بردو.',
      },
      {
        q: 'فيه حد أدنى للطلب؟',
        a: 'لا، ممكن تطلب منتج واحد بس براحتك.',
      },
    ],
  },
  {
    category: '🚚 التوصيل والشحن',
    items: [
      {
        q: 'كام يوم بياخد التوصيل؟',
        a: 'القاهرة والجيزة: من 2 لـ 4 أيام عمل. باقي المحافظات: من 3 لـ 6 أيام عمل. المواعيد دي بعد تأكيد الطلب.',
      },
      {
        q: 'كام رسوم التوصيل؟',
        a: 'القاهرة والجيزة: 70 جنيه. باقي المحافظات: 105 جنيه.',
      },
      {
        q: 'بتوصلوا لكل المحافظات؟',
        a: 'أيوه! بنوصل لكل محافظات مصر.',
      },
      {
        q: 'هعرف أتابع الشحنة بتاعتي؟',
        a: 'بعد ما الطلب يتشحن، هنبعتلك تفاصيل الشحنة على الواتساب عشان تقدر تتابعها.',
      },
    ],
  },
  {
    category: '📱 المنتجات والجودة',
    items: [
      {
        q: 'الكفرات مصنوعة من إيه؟',
        a: 'كل الكفرات بتاعتنا مصنوعة من Hard Polycarbonate عالي الجودة — بيحمي التليفون من الصدمات والخدوش وبيدي شكل أنيق.',
      },
      {
        q: 'الطباعة بتتمسح مع الوقت؟',
        a: 'لا، بنستخدم طباعة UV عالية الجودة اللي بتخلي الألوان ثابتة لفترة طويلة.',
      },
      {
        q: 'عندكم كفرات لكل موديلات الآيفون؟',
        a: 'بنعمل كفرات من iPhone 12 لحد iPhone 17 Pro Max. لو موديلك مش موجود، تواصل معانا على الواتساب وهنشوف نجيبه.',
      },
      {
        q: 'ممكن أبعت تصميم خاص بيا؟',
        a: 'أيوه! تواصل معانا على الواتساب وابعت التصميم، وهنعملك كفر custom بسعر خاص.',
      },
    ],
  },
  {
    category: '🔄 الاستبدال والمشاكل',
    items: [
      {
        q: 'لو الكفر وصل تالف؟',
        a: 'تواصل معانا خلال 48 ساعة من الاستلام وابعتلنا صورة للمشكلة على الواتساب — هنستبدله مجاناً فوراً.',
      },
      {
        q: 'لو الكفر مش تمام على تليفوني؟',
        a: 'لو الغلط من عندنا في الموديل هنستبدله. تأكد إنك اخترت الموديل الصح وقت الطلب.',
      },
      {
        q: 'ممكن أرجع المنتج لو مش عاجبني؟',
        a: 'الإرجاع بيكون في حالة وجود عيب تصنيعي أو غلط في الطلب. مش بنقبل إرجاع لأسباب شخصية بعد فتح المنتج.',
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`font-semibold text-base transition-colors ${open ? 'text-blue-700' : 'text-gray-900'}`}>
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-3 transition-transform duration-200 ${open ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-600 leading-relaxed text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState(null);

  const visibleFaqs = activeCategory
    ? faqs.filter(f => f.category === activeCategory)
    : faqs;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">❓</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-blue-100 text-lg">إجابات على أكتر الأسئلة اللي بتتسألنا</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === null ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            الكل
          </button>
          {faqs.map(f => (
            <button
              key={f.category}
              onClick={() => setActiveCategory(activeCategory === f.category ? null : f.category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === f.category ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
            >
              {f.category}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-8">
          {visibleFaqs.map(section => (
            <div key={section.category}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <p className="text-xl font-bold text-gray-900 mb-2">لقيتش إجابة سؤالك؟</p>
          <p className="text-gray-500 mb-6">تواصل معانا مباشرة وهنرد عليك في أقرب وقت</p>
          <div className="flex gap-3 justify-center flex-wrap">
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
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
