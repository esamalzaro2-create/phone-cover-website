import { useState } from 'react';

const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر',
  'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية',
  'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس', 'أسوان',
  'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'الشرقية',
  'جنوب سيناء', 'شمال سيناء', 'الأقصر', 'قنا', 'كفر الشيخ',
  'مطروح', 'سوهاج',
];

const RECIPIENT_EMAIL = 'esamalzaro2@gmail.com';

export function OrderModal({ product, selectedModel, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', address: '', building: '', apartment: '', governorate: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!/^01[0-9]{9}$/.test(form.phone)) e.phone = 'رقم تليفون مصري صحيح مطلوب (01xxxxxxxxx)';
    if (!form.address.trim()) e.address = 'العنوان مطلوب';
    if (!form.building.trim()) e.building = 'رقم العمارة مطلوب';
    if (!form.apartment.trim()) e.apartment = 'رقم الشقة مطلوب';
    if (!form.governorate) e.governorate = 'المحافظة مطلوبة';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = encodeURIComponent(`🛍️ طلب جديد - ${product.name}`);
    const body = encodeURIComponent(
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `تفاصيل الطلب\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `المنتج: ${product.name}\n` +
      `موديل الجوال: ${selectedModel}\n` +
      `الفئة: ${product.category}\n` +
      `السعر: 250 جنيه\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `بيانات العميل\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `الاسم: ${form.name}\n` +
      `رقم التليفون: ${form.phone}\n` +
      `المحافظة: ${form.governorate}\n` +
      `العنوان / الشارع: ${form.address}\n` +
      `رقم العمارة: ${form.building}\n` +
      `رقم الشقة: ${form.apartment}\n`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT_EMAIL}&su=${subject}&body=${body}`,
      '_blank'
    );
    setSubmitted(true);
  };

  const inp = (hasErr) => ({
    width: '100%', padding: '10px 12px',
    background: '#f9fafb',
    border: `1px solid ${hasErr ? '#ef4444' : '#e5e7eb'}`,
    borderRadius: '8px', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  });

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: '16px',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '16px',
        width: '100%', maxWidth: '500px',
        maxHeight: '90vh', overflowY: 'auto',
        padding: '28px 24px', direction: 'rtl',
      }}>
        {!submitted ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111' }}>تأكيد الطلب</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>
                  {product.name} — <span style={{ color: '#374151' }}>{selectedModel}</span>
                  {' '}<span style={{ color: '#2563eb', fontWeight: 600 }}>— 250 جنيه</span>
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>الاسم الكامل *</label>
                <input type="text" placeholder="اسمك كامل" value={form.name} onChange={e => handleChange('name', e.target.value)} style={inp(errors.name)} />
                {errors.name && <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.name}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>رقم التليفون *</label>
                <input type="tel" placeholder="01xxxxxxxxx" value={form.phone} onChange={e => handleChange('phone', e.target.value)} style={{ ...inp(errors.phone), direction: 'ltr', textAlign: 'right' }} />
                {errors.phone && <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.phone}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>المحافظة *</label>
                <select value={form.governorate} onChange={e => handleChange('governorate', e.target.value)} style={inp(errors.governorate)}>
                  <option value="">اختار المحافظة</option>
                  {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.governorate && <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.governorate}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>العنوان / الشارع *</label>
                <input type="text" placeholder="اسم الشارع والحي" value={form.address} onChange={e => handleChange('address', e.target.value)} style={inp(errors.address)} />
                {errors.address && <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.address}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>رقم العمارة *</label>
                  <input type="text" placeholder="مثال: 15" value={form.building} onChange={e => handleChange('building', e.target.value)} style={inp(errors.building)} />
                  {errors.building && <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.building}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>رقم الشقة *</label>
                  <input type="text" placeholder="مثال: 3" value={form.apartment} onChange={e => handleChange('apartment', e.target.value)} style={inp(errors.apartment)} />
                  {errors.apartment && <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.apartment}</p>}
                </div>
              </div>

              {/* Summary */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#6b7280' }}>المنتج</span>
                  <span style={{ color: '#111', fontWeight: 500 }}>{product.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#6b7280' }}>موديل الجوال</span>
                  <span style={{ color: '#111' }}>{selectedModel}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '6px' }}>
                  <span style={{ color: '#6b7280' }}>الإجمالي</span>
                  <span style={{ color: '#2563eb' }}>250 جنيه</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  background: '#2563eb', color: '#fff', border: 'none',
                  borderRadius: '10px', padding: '13px', fontSize: '15px',
                  fontWeight: 700, cursor: 'pointer', width: '100%',
                }}
                onMouseEnter={e => e.target.style.background = '#1d4ed8'}
                onMouseLeave={e => e.target.style.background = '#2563eb'}
              >
                تأكيد الطلب وإرسال
              </button>
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                هيتبعت على <strong>esamalzaro2@gmail.com</strong>
              </p>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#dcfce7', border: '2px solid #16a34a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '28px', color: '#16a34a',
            }}>✓</div>
            <h2 style={{ color: '#16a34a', margin: '0 0 8px', fontSize: '20px', fontWeight: 700 }}>تم إرسال الطلب!</h2>
            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px' }}>
              اتفتحلك Gmail وبعت الطلب على <strong>esamalzaro2@gmail.com</strong>
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'right', marginBottom: '20px' }}>
              <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: '#111' }}>{product.name} — {selectedModel}</p>
              <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#374151' }}>{form.name} — {form.phone}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{form.governorate}، {form.address}، عمارة {form.building}، شقة {form.apartment}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent', color: '#2563eb',
                border: '1px solid #2563eb', borderRadius: '10px',
                padding: '11px 32px', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', width: '100%',
              }}
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
