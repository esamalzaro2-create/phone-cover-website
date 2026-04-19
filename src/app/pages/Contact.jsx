import { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, CheckCircle, Clock, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_38go51x';
const EMAILJS_TEMPLATE_ID = 'template_40hpfnp';
const EMAILJS_PUBLIC_KEY  = 'wd92qJRhD1F10hA8P';

const WHATSAPP_NUMBER = '201030733667';
const CONTACT_EMAIL   = 'esamalzaro2@gmail.com';

const inp = (hasErr) => ({
  width: '100%', padding: '12px 14px',
  background: '#f9fafb',
  border: `1.5px solid ${hasErr ? '#ef4444' : '#e5e7eb'}`,
  borderRadius: '10px', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', transition: 'border-color 0.2s',
});

export function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', orderNumber: '', subject: '', message: '',
  });
  const [errors, setErrors]   = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'الاسم مطلوب';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                              e.email   = 'إيميل صحيح مطلوب';
    if (!form.subject.trim()) e.subject = 'الموضوع مطلوب';
    if (!form.message.trim()) e.message = 'الرسالة مطلوبة';
    return e;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:           form.name,
          customer_name:  form.name,
          customer_phone: form.email,
          governorate:    form.subject,
          address:        form.orderNumber ? `رقم الطلب: ${form.orderNumber}` : 'لا يوجد رقم طلب',
          order_items:    form.message,
          subtotal:       '—',
          delivery:       '—',
          total:          '—',
          conf_num:       form.orderNumber || 'شكوى/استفسار',
          message:        `📧 رسالة من: ${form.name}\nالإيميل: ${form.email}\nرقم الطلب: ${form.orderNumber || 'لا يوجد'}\nالموضوع: ${form.subject}\n\nالرسالة:\n${form.message}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      alert('حصل خطأ، جرب تاني أو تواصل معنا على الواتساب');
    }
    setSending(false);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `مرحبا، عايز أتواصل معاكم 👋\n` +
      (form.orderNumber ? `رقم الطلب: ${form.orderNumber}\n` : '') +
      (form.message ? `الموضوع: ${form.message}` : '')
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg">في أي مشكلة أو استفسار — احنا هنا نساعدك</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Info cards ── */}
          <div className="space-y-4">

            {/* WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="w-full bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-md hover:border-green-300 transition-all group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-500">أسرع طريقة للتواصل</p>
                </div>
              </div>
              <p className="text-green-600 font-semibold text-sm">01030733667</p>
              <p className="text-xs text-gray-400 mt-1">اضغط للتواصل مباشرة ←</p>
            </button>

            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">للشكاوى والاستفسارات</p>
                </div>
              </div>
              <p className="text-blue-600 font-semibold text-sm break-all">{CONTACT_EMAIL}</p>
            </div>

            {/* Response time */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Response Time</p>
                  <p className="text-sm text-gray-500">وقت الرد</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">واتساب: خلال ساعة</p>
              <p className="text-gray-700 text-sm">إيميل: خلال 24 ساعة</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-500">مناطق التوصيل</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">🚚 القاهرة / الجيزة: 70 EGP</p>
              <p className="text-gray-700 text-sm">🚚 باقي المحافظات: 105 EGP</p>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">تم الإرسال!</h2>
                <p className="text-gray-500 mb-2">وصلتنا رسالتك وهنرد عليك في أقرب وقت.</p>
                <p className="text-gray-400 text-sm mb-8">لو محتاج رد أسرع، تواصل معنا على الواتساب.</p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', orderNumber: '', subject: '', message: '' }); }}
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    إرسال رسالة جديدة
                  </button>
                  <button
                    onClick={openWhatsApp}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> تواصل على واتساب
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">ابعت رسالة</h2>
                <p className="text-gray-500 text-sm mb-8">هنرد عليك في أقرب وقت ممكن</p>

                <div className="space-y-5" style={{ direction: 'rtl' }}>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم *</label>
                      <input type="text" placeholder="اسمك الكامل" value={form.name}
                        onChange={e => handleChange('name', e.target.value)} style={inp(errors.name)} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">الإيميل *</label>
                      <input type="email" placeholder="example@gmail.com" value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        style={{ ...inp(errors.email), direction: 'ltr' }} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Order number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      رقم الطلب <span className="text-gray-400 font-normal">(اختياري — لو عندك شكوى على طلب)</span>
                    </label>
                    <input type="text" placeholder="#ABC12345" value={form.orderNumber}
                      onChange={e => handleChange('orderNumber', e.target.value)}
                      style={{ ...inp(false), direction: 'ltr' }} />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">الموضوع *</label>
                    <select value={form.subject}
                      onChange={e => handleChange('subject', e.target.value)} style={inp(errors.subject)}>
                      <option value="">اختار موضوع الرسالة</option>
                      <option value="استفسار عن منتج">استفسار عن منتج</option>
                      <option value="مشكلة في الطلب">مشكلة في الطلب</option>
                      <option value="تأخر التوصيل">تأخر التوصيل</option>
                      <option value="طلب استرداد">طلب استرداد</option>
                      <option value="Pre-Order">Pre-Order</option>
                      <option value="اقتراح">اقتراح</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">الرسالة *</label>
                    <textarea
                      placeholder="اكتب رسالتك هنا..."
                      value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      rows={5}
                      style={{ ...inp(errors.message), resize: 'vertical' }}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={sending}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-60"
                    >
                      {sending
                        ? <><span className="animate-spin">⏳</span> جاري الإرسال...</>
                        : <><Send className="w-4 h-4" /> إرسال الرسالة</>
                      }
                    </button>
                    <button
                      onClick={openWhatsApp}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      واتساب
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
