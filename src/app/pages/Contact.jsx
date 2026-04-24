import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_38go51x';
const EMAILJS_TEMPLATE_ID = 'template_40hpfnp';
const EMAILJS_PUBLIC_KEY  = 'wd92qJRhD1F10hA8P';
const WHATSAPP_NUMBER     = '201030733667';
const CONTACT_EMAIL       = 'coverzone109@gmail.com';

const brand = {
  dark:   '#1a1f3c',
  main:   '#2d3561',
  purple: '#7b7fc4',
  light:  '#e8e9f5',
};

const inp = (hasErr) => ({
  width: '100%', padding: '12px 14px',
  background: '#f9fafb',
  border: `1.5px solid ${hasErr ? '#ef4444' : '#e5e7eb'}`,
  borderRadius: '10px', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
});

export function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', orderNumber: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name    = 'الاسم مطلوب';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'إيميل صحيح مطلوب';
    if (!form.subject)       e.subject = 'الموضوع مطلوب';
    if (!form.message.trim()) e.message = 'الرسالة مطلوبة';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.name, customer_name: form.name,
        customer_phone: form.email, governorate: form.subject,
        address: form.orderNumber ? `رقم الطلب: ${form.orderNumber}` : 'لا يوجد رقم طلب',
        order_items: form.message, subtotal: '—', delivery: '—', total: '—',
        conf_num: form.orderNumber || 'استفسار',
        message: `📧 من: ${form.name}\nإيميل: ${form.email}\nرقم الطلب: ${form.orderNumber || 'لا يوجد'}\nالموضوع: ${form.subject}\n\n${form.message}`,
      }, EMAILJS_PUBLIC_KEY);
      setSent(true);
    } catch { alert('حصل خطأ، جرب الواتساب'); }
    setSending(false);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحبا، عايز أتواصل معاكم 👋\n' + (form.message || ''))}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${brand.dark}, ${brand.main})`, color: '#fff', padding: '64px 16px', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: '#c4c6e8', fontSize: '18px' }}>في أي مشكلة أو استفسار — احنا هنا نساعدك</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Info cards */}
          <div className="space-y-4">
            {/* WhatsApp */}
            <button onClick={openWhatsApp}
              className="w-full bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-md transition-all group"
              style={{ cursor: 'pointer' }}>
              <div className="flex items-center gap-4 mb-3">
                <div style={{ width: 48, height: 48, background: '#dcfce7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle style={{ color: '#16a34a', width: 24, height: 24 }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-500">أسرع طريقة للتواصل</p>
                </div>
              </div>
              <p style={{ color: '#16a34a', fontWeight: 600, fontSize: '14px' }}>01030733667</p>
              <p className="text-xs text-gray-400 mt-1">اضغط للتواصل مباشرة ←</p>
            </button>

            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div style={{ width: 48, height: 48, background: brand.light, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail style={{ color: brand.purple, width: 24, height: 24 }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">للشكاوى والاستفسارات</p>
                </div>
              </div>
              <p style={{ color: brand.purple, fontWeight: 600, fontSize: '13px', wordBreak: 'break-all' }}>{CONTACT_EMAIL}</p>
            </div>

            {/* Response time */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div style={{ width: 48, height: 48, background: '#f3f0ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock style={{ color: brand.purple, width: 24, height: 24 }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Response Time</p>
                  <p className="text-sm text-gray-500">وقت الرد</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">واتساب: خلال ساعة</p>
              <p className="text-gray-700 text-sm">إيميل: خلال 24 ساعة</p>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div style={{ width: 48, height: 48, background: '#fff7ed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin style={{ color: '#ea580c', width: 24, height: 24 }} />
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

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center h-full flex flex-col items-center justify-center">
                <div style={{ width: 80, height: 80, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle style={{ color: '#16a34a', width: 40, height: 40 }} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">تم الإرسال!</h2>
                <p className="text-gray-500 mb-8">وصلتنا رسالتك وهنرد عليك في أقرب وقت.</p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', orderNumber: '', subject: '', message: '' }); }}
                    style={{ padding: '12px 24px', border: `1px solid ${brand.purple}`, color: brand.purple, borderRadius: 12, fontWeight: 600, cursor: 'pointer', background: 'transparent' }}>
                    إرسال رسالة جديدة
                  </button>
                  <button onClick={openWhatsApp}
                    style={{ padding: '12px 24px', background: '#16a34a', color: '#fff', borderRadius: 12, fontWeight: 600, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MessageCircle style={{ width: 18, height: 18 }} /> واتساب
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">ابعت رسالة</h2>
                <p className="text-gray-500 text-sm mb-8">هنرد عليك في أقرب وقت ممكن</p>
                <div className="space-y-5" style={{ direction: 'rtl' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم *</label>
                      <input type="text" placeholder="اسمك الكامل" value={form.name} onChange={e => handleChange('name', e.target.value)} style={inp(errors.name)} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">الإيميل *</label>
                      <input type="email" placeholder="example@gmail.com" value={form.email} onChange={e => handleChange('email', e.target.value)} style={{ ...inp(errors.email), direction: 'ltr' }} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم الطلب <span className="text-gray-400 font-normal">(اختياري)</span></label>
                    <input type="text" placeholder="#ABC12345" value={form.orderNumber} onChange={e => handleChange('orderNumber', e.target.value)} style={{ ...inp(false), direction: 'ltr' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">الموضوع *</label>
                    <select value={form.subject} onChange={e => handleChange('subject', e.target.value)} style={inp(errors.subject)}>
                      <option value="">اختار موضوع الرسالة</option>
                      <option>استفسار عن منتج</option>
                      <option>مشكلة في الطلب</option>
                      <option>تأخر التوصيل</option>
                      <option>طلب استرداد</option>
                      <option>Pre-Order</option>
                      <option>اقتراح</option>
                      <option>أخرى</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">الرسالة *</label>
                    <textarea placeholder="اكتب رسالتك هنا..." value={form.message} onChange={e => handleChange('message', e.target.value)}
                      rows={5} style={{ ...inp(errors.message), resize: 'vertical' }} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSubmit} disabled={sending}
                      style={{ flex: 1, padding: '14px', background: brand.main, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      {sending ? '⏳ جاري الإرسال...' : <><Send style={{ width: 16, height: 16 }} /> إرسال الرسالة</>}
                    </button>
                    <button onClick={openWhatsApp}
                      style={{ padding: '14px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MessageCircle style={{ width: 18, height: 18 }} /> واتساب
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
