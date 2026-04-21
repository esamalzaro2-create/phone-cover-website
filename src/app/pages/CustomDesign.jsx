import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { Upload, X, Palette, Smartphone, Check, Send, MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { iphoneModels } from '../data/products';
import { governorates, getDeliveryFee, cairoGiza, CAIRO_GIZA_DELIVERY, OTHER_DELIVERY } from '../utils/checkout';

const EMAILJS_SERVICE_ID  = 'service_38go51x';
const EMAILJS_TEMPLATE_ID = 'template_40hpfnp';
const EMAILJS_PUBLIC_KEY  = 'wd92qJRhD1F10hA8P';
const WHATSAPP_NUMBER     = '201030733667';
const CUSTOM_PRICE        = 350;

const inp = (hasErr) => ({
  width: '100%', padding: '11px 14px',
  background: '#f9fafb',
  border: `1.5px solid ${hasErr ? '#ef4444' : '#e5e7eb'}`,
  borderRadius: '10px', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
});

export function CustomDesign() {
  const [image, setImage]         = useState(null);
  const [imagePreview, setPreview]= useState(null);
  const [step, setStep]           = useState('form'); // form | confirmed
  const [sending, setSending]     = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const fileRef = useRef();

  const [form, setForm] = useState({
    name: '', phone: '', whatsapp: '',
    governorate: '', address: '', building: '', apartment: '',
    model: '', description: '', notes: '',
  });
  const [errors, setErrors] = useState({});

  const deliveryFee = getDeliveryFee(form.governorate);
  const grandTotal  = CUSTOM_PRICE + deliveryFee;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    if (errors.image) setErrors(prev => ({ ...prev, image: undefined }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImage(e.dataTransfer.files[0]);
  };

  const validate = () => {
    const e = {};
    if (!image)                              e.image       = 'صورة التصميم مطلوبة';
    if (!form.description.trim())            e.description = 'وصف التصميم مطلوب';
    if (!form.model)                         e.model       = 'موديل التليفون مطلوب';
    if (!form.name.trim())                   e.name        = 'الاسم مطلوب';
    if (!/^01[0-9]{9}$/.test(form.phone))   e.phone       = 'رقم تليفون مصري صحيح مطلوب';
    if (!/^01[0-9]{9}$/.test(form.whatsapp))e.whatsapp    = 'رقم واتساب صحيح مطلوب';
    if (!form.governorate)                   e.governorate = 'المحافظة مطلوبة';
    if (!form.address.trim())                e.address     = 'العنوان مطلوب';
    if (!form.building.trim())               e.building    = 'رقم العمارة مطلوب';
    if (!form.apartment.trim())              e.apartment   = 'رقم الشقة مطلوب';
    return e;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setSending(true);
    const confNum = '#C' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const fee     = getDeliveryFee(form.governorate);
    const total   = CUSTOM_PRICE + fee;

    // ── EmailJS ──
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        {
          conf_num:       confNum,
          customer_name:  form.name,
          customer_phone: form.phone,
          governorate:    form.governorate,
          address:        `${form.address}، عمارة ${form.building}، شقة ${form.apartment}`,
          order_items:    `🎨 Custom Design\nالموديل: ${form.model}\nوصف التصميم: ${form.description}\n${form.notes ? 'ملاحظات: ' + form.notes : ''}`,
          subtotal:       CUSTOM_PRICE,
          delivery:       fee,
          total:          total,
          name:           form.name,
          message:        `🎨 طلب Custom Design ${confNum}\nالموديل: ${form.model}\nالتصميم: ${form.description}`,
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) { console.error('EmailJS:', err); }

    // ── WhatsApp ──
    const waMsg = encodeURIComponent(
      `🎨 طلب Custom Design ${confNum}\n\n` +
      `👤 ${form.name} — 📞 ${form.phone}\n` +
      `💬 واتساب: ${form.whatsapp}\n` +
      `📱 الموديل: ${form.model}\n\n` +
      `🖼️ وصف التصميم:\n${form.description}\n` +
      (form.notes ? `📝 ملاحظات: ${form.notes}\n` : '') +
      `\n📍 ${form.governorate}، ${form.address}، عمارة ${form.building}، شقة ${form.apartment}\n\n` +
      `💰 سعر التصميم: ${CUSTOM_PRICE} جنيه\n` +
      `🚚 توصيل: ${fee} جنيه\n` +
      `✅ الإجمالي: ${total} جنيه\n` +
      `💵 الدفع عند الاستلام (COD)\n\n` +
      `⚠️ هبعتلك الصورة على الواتساب`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, '_blank');

    setSending(false);
    setStep('confirmed');
  };

  // ── Confirmed ──
  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-md overflow-hidden shadow-lg text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-10 px-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎨</div>
            <h1 className="text-2xl font-bold mb-1">تم استلام طلبك!</h1>
            <p className="text-indigo-100 text-sm">Custom Design Order</p>
          </div>
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 text-right" style={{ direction: 'rtl' }}>
              <p className="font-bold text-green-800 mb-1">✅ الطلب اتبعت</p>
              <p className="text-green-700 text-sm">تم الإرسال على Gmail والواتساب. ابعتلنا الصورة على الواتساب وهنبدأ التصميم فوراً.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-right mb-5 space-y-1 text-sm" style={{ direction: 'rtl' }}>
              <p><span className="text-gray-500">الاسم:</span> <span className="font-semibold">{form.name}</span></p>
              <p><span className="text-gray-500">الموديل:</span> <span className="font-semibold">{form.model}</span></p>
              <p><span className="text-gray-500">السعر:</span> <span className="font-bold text-purple-600">{CUSTOM_PRICE} جنيه + {getDeliveryFee(form.governorate)} توصيل = {CUSTOM_PRICE + getDeliveryFee(form.governorate)} جنيه</span></p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors mb-3"
            >
              <MessageCircle className="w-5 h-5" /> ابعت الصورة على واتساب
            </a>
            <Link to="/products" className="block w-full text-center text-blue-600 font-medium py-2 hover:underline">
              العودة للمنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="w-8 h-8" />
            <Sparkles className="w-6 h-6 opacity-80" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Custom Design</h1>
          <p className="text-indigo-100 text-lg mb-4">صمم كفرك بنفسك — ابعتنا أي صورة وهنطبعهالك</p>
          <div className="inline-block bg-white/20 rounded-full px-5 py-2 text-white font-bold text-lg">
            350 EGP فقط
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Products
        </Link>

        <div className="space-y-6" style={{ direction: 'rtl' }}>

          {/* ── Step 1: Upload image ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              ارفع صورة التصميم
            </h2>
            <p className="text-gray-500 text-sm mb-4 mr-9">اختار الصورة اللي عايز تطبعها على الكفر</p>

            {!imagePreview ? (
              <div
                onClick={() => fileRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  dragOver ? 'border-purple-400 bg-purple-50' :
                  errors.image ? 'border-red-300 bg-red-50' :
                  'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="font-semibold text-gray-700 mb-1">اسحب الصورة هنا أو اضغط للاختيار</p>
                <p className="text-xs text-gray-400">PNG, JPG, JPEG — حجم أقصى 10MB</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => handleImage(e.target.files[0])} />
              </div>
            ) : (
              <div className="relative">
                <img src={imagePreview} alt="preview"
                  className="w-full max-h-72 object-contain rounded-xl border border-gray-200 bg-gray-50" />
                <button
                  onClick={() => { setImage(null); setPreview(null); }}
                  className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-green-600 text-sm font-medium mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" /> تم رفع الصورة
                </p>
              </div>
            )}
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>

          {/* ── Step 2: Description ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              وصف التصميم
            </h2>
            <p className="text-gray-500 text-sm mb-4 mr-9">اشرحلنا إيه اللي عايزه بالظبط</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">وصف التصميم *</label>
                <textarea
                  placeholder="مثال: عايز الصورة دي تبقى على خلفية سودا، مع كتابة اسمي باللون الأبيض في الأسفل..."
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                  rows={4}
                  style={{ ...inp(errors.description), resize: 'vertical' }}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ملاحظات إضافية <span className="text-gray-400 font-normal">(اختياري)</span></label>
                <textarea
                  placeholder="أي تفاصيل تانية عايزنا نعرفها..."
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  rows={2}
                  style={{ ...inp(false), resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* ── Step 3: iPhone model ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              موديل التليفون
            </h2>
            <p className="text-gray-500 text-sm mb-4 mr-9">اختار الموديل بتاعك عشان الكفر يجيب بالمقاس الصح</p>

            {errors.model && <p className="text-red-500 text-xs mb-2">{errors.model}</p>}
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pl-1">
              {iphoneModels.map(model => (
                <button key={model}
                  onClick={() => handleChange('model', model)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition-all text-right flex items-center justify-between ${
                    form.model === model
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <span>{model}</span>
                  {form.model === model && <Check className="w-4 h-4 text-purple-600" />}
                </button>
              ))}
            </div>
            {form.model && (
              <p className="mt-2 text-sm text-green-600 font-medium">✓ اخترت: {form.model}</p>
            )}
          </div>

          {/* ── Step 4: Customer details ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              بيانات التوصيل
            </h2>
            <p className="text-gray-500 text-sm mb-5 mr-9">هنبعتلك الكفر على العنوان ده</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم الكامل *</label>
                  <input type="text" placeholder="اسمك كامل" value={form.name}
                    onChange={e => handleChange('name', e.target.value)} style={inp(errors.name)} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم التليفون *</label>
                  <input type="tel" placeholder="01xxxxxxxxx" value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    style={{ ...inp(errors.phone), direction: 'ltr', textAlign: 'right' }} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم الواتساب *</label>
                <input type="tel" placeholder="01xxxxxxxxx" value={form.whatsapp}
                  onChange={e => handleChange('whatsapp', e.target.value)}
                  style={{ ...inp(errors.whatsapp), direction: 'ltr', textAlign: 'right' }} />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                <p className="text-gray-400 text-xs mt-1">هنبعتلك معاينة التصميم على الواتساب قبل الطباعة</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">المحافظة *</label>
                <select value={form.governorate}
                  onChange={e => handleChange('governorate', e.target.value)} style={inp(errors.governorate)}>
                  <option value="">اختار المحافظة</option>
                  {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
                {form.governorate && (
                  <p className="text-blue-600 text-xs mt-1 font-medium">
                    🚚 رسوم التوصيل: {deliveryFee} جنيه {cairoGiza.includes(form.governorate) ? '(القاهرة/الجيزة)' : '(محافظات أخرى)'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">اسم الشارع *</label>
                <input type="text" placeholder="اسم الشارع والحي" value={form.address}
                  onChange={e => handleChange('address', e.target.value)} style={inp(errors.address)} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم العمارة *</label>
                  <input type="text" placeholder="15" value={form.building}
                    onChange={e => handleChange('building', e.target.value)} style={inp(errors.building)} />
                  {errors.building && <p className="text-red-500 text-xs mt-1">{errors.building}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم الشقة *</label>
                  <input type="text" placeholder="3" value={form.apartment}
                    onChange={e => handleChange('apartment', e.target.value)} style={inp(errors.apartment)} />
                  {errors.apartment && <p className="text-red-500 text-xs mt-1">{errors.apartment}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ── Summary & Submit ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">ملخص الطلب</h2>
            <div className="space-y-2 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Custom Design</span><span>{CUSTOM_PRICE} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>التوصيل</span>
                <span>{form.governorate ? `${deliveryFee} EGP` : '—'}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2 mt-1">
                <span>الإجمالي</span>
                <span className="text-purple-600">{form.governorate ? grandTotal : CUSTOM_PRICE} EGP</span>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-5 text-sm text-purple-800" style={{ direction: 'rtl' }}>
              <p className="font-semibold mb-1">⚠️ مهم قبل الإرسال</p>
              <p className="text-purple-700 text-xs">بعد تأكيد الطلب — ابعتلنا الصورة على الواتساب وهنبعتلك معاينة التصميم قبل الطباعة.</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg text-white transition-colors disabled:opacity-60"
              style={{ background: sending ? '#a78bfa' : 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              {sending
                ? <><span className="animate-spin">⏳</span> جاري الإرسال...</>
                : <><Send className="w-5 h-5" /> تأكيد الطلب — {form.governorate ? grandTotal : CUSTOM_PRICE} EGP</>
              }
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">الدفع عند الاستلام — COD</p>
          </div>

        </div>
      </div>
    </div>
  );
}
