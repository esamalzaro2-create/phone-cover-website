import { governorates, DELIVERY_FEE, inp } from '../utils/checkout';
import { Loader } from 'lucide-react';

const brand = { main: '#c9a96e', purple: '#7a6a55', light: '#fff' };

export function CheckoutForm({ form, errors, sending, totalPrice, onChangeField, onConfirm, onBack }) {
  const grandTotal = totalPrice + DELIVERY_FEE;

  return (
    <div style={{ direction: 'rtl' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-5">بيانات الشحن</h2>
      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
          <input type="text" placeholder="اسمك كامل" value={form.name}
            onChange={e => onChangeField('name', e.target.value)} style={inp(errors.name)} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رقم التليفون *</label>
          <input type="tel" placeholder="01xxxxxxxxx" value={form.phone}
            onChange={e => onChangeField('phone', e.target.value)}
            style={{ ...inp(errors.phone), direction: 'ltr', textAlign: 'right' }} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رقم الواتساب *</label>
          <input type="tel" placeholder="01xxxxxxxxx" value={form.whatsapp}
            onChange={e => onChangeField('whatsapp', e.target.value)}
            style={{ ...inp(errors.whatsapp), direction: 'ltr', textAlign: 'right' }} />
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">المنطقة *</label>
          <select value={form.governorate}
            onChange={e => onChangeField('governorate', e.target.value)} style={inp(errors.governorate)}>
            <option value="">اختار المنطقة</option>
            {governorates.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
          {form.governorate && (
            <p style={{ color: brand.main }} className="text-xs mt-1 font-medium">🚚 رسوم التوصيل: {DELIVERY_FEE} جنيه</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشارع *</label>
          <input type="text" placeholder="اسم الشارع والحي" value={form.address}
            onChange={e => onChangeField('address', e.target.value)} style={inp(errors.address)} />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم العمارة *</label>
            <input type="text" placeholder="15" value={form.building}
              onChange={e => onChangeField('building', e.target.value)} style={inp(errors.building)} />
            {errors.building && <p className="text-red-500 text-xs mt-1">{errors.building}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم الشقة *</label>
            <input type="text" placeholder="3" value={form.apartment}
              onChange={e => onChangeField('apartment', e.target.value)} style={inp(errors.apartment)} />
            {errors.apartment && <p className="text-red-500 text-xs mt-1">{errors.apartment}</p>}
          </div>
        </div>

        {form.governorate && (
          <div style={{ background: brand.light, border: `1px solid ${brand.purple}40`, borderRadius: 12, padding: 16 }} className="text-sm space-y-1">
            <div className="flex justify-between text-gray-600"><span>المنتجات</span><span>{totalPrice} EGP</span></div>
            <div className="flex justify-between text-gray-600"><span>التوصيل</span><span>{DELIVERY_FEE} EGP</span></div>
            <div className="flex justify-between font-bold border-t pt-2 mt-1" style={{ color: brand.main }}>
              <span>الإجمالي</span><span>{grandTotal} EGP</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {onBack && (
            <button onClick={onBack} className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
              ← رجوع
            </button>
          )}
          <button onClick={onConfirm} disabled={sending}
            className="flex-grow py-3 rounded-xl font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-white"
            style={{ background: brand.main }}
            onMouseEnter={e => e.currentTarget.style.background = brand.purple}
            onMouseLeave={e => e.currentTarget.style.background = brand.main}>
            {sending ? <><Loader className="w-4 h-4 animate-spin" /> جاري الإرسال...</> : 'تأكيد الطلب ✓'}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400">سيتم إرسال الطلب على Gmail والواتساب تلقائياً</p>
      </div>
    </div>
  );
}
