import { governorates, getDeliveryFee, inp, cairoGiza, CAIRO_GIZA_DELIVERY, OTHER_DELIVERY } from '../utils/checkout';
import { Loader } from 'lucide-react';

export function CheckoutForm({ form, errors, sending, totalPrice, onChangeField, onConfirm, onBack }) {
  const deliveryFee = getDeliveryFee(form.governorate);
  const grandTotal  = totalPrice + deliveryFee;

  return (
    <div style={{ direction: 'rtl' }}>
      <h2 className="text-lg font-bold text-gray-900 mb-5">بيانات الشحن</h2>
      <div className="space-y-4">

        {/* الاسم */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
          <input type="text" placeholder="اسمك كامل" value={form.name}
            onChange={e => onChangeField('name', e.target.value)} style={inp(errors.name)} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* تليفون */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رقم التليفون *</label>
          <input type="tel" placeholder="01xxxxxxxxx" value={form.phone}
            onChange={e => onChangeField('phone', e.target.value)}
            style={{ ...inp(errors.phone), direction: 'ltr', textAlign: 'right' }} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* واتساب */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رقم الواتساب *</label>
          <input type="tel" placeholder="01xxxxxxxxx" value={form.whatsapp}
            onChange={e => onChangeField('whatsapp', e.target.value)}
            style={{ ...inp(errors.whatsapp), direction: 'ltr', textAlign: 'right' }} />
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
          <p className="text-gray-400 text-xs mt-1">لو نفس رقم التليفون اكتبه تاني</p>
        </div>

        {/* المحافظة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة *</label>
          <select value={form.governorate}
            onChange={e => onChangeField('governorate', e.target.value)} style={inp(errors.governorate)}>
            <option value="">اختار المحافظة</option>
            {governorates.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
          {form.governorate && (
            <p className="text-blue-600 text-xs mt-1 font-medium">
              🚚 رسوم التوصيل: {getDeliveryFee(form.governorate)} جنيه
              {cairoGiza.includes(form.governorate) ? ' (القاهرة / الجيزة)' : ' (محافظات أخرى)'}
            </p>
          )}
        </div>

        {/* الشارع */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشارع *</label>
          <input type="text" placeholder="اسم الشارع والحي" value={form.address}
            onChange={e => onChangeField('address', e.target.value)} style={inp(errors.address)} />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* العمارة والشقة */}
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

        {/* ملخص السعر */}
        {form.governorate && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm space-y-1" style={{ direction: 'rtl' }}>
            <div className="flex justify-between text-gray-600">
              <span>المنتجات</span><span>{totalPrice} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>التوصيل</span><span>{deliveryFee} EGP</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-2 mt-1">
              <span>الإجمالي</span><span>{grandTotal} EGP</span>
            </div>
          </div>
        )}

        {/* الأزرار */}
        <div className="flex gap-3 pt-2">
          {onBack && (
            <button onClick={onBack}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
              ← رجوع
            </button>
          )}
          <button onClick={onConfirm} disabled={sending}
            className="flex-grow py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {sending
              ? <><Loader className="w-4 h-4 animate-spin" /> جاري الإرسال...</>
              : 'تأكيد الطلب ✓'
            }
          </button>
        </div>

        <div className="text-xs text-gray-400 text-center pt-1">
          سيتم إرسال الطلب على Gmail والواتساب تلقائياً
        </div>
      </div>
    </div>
  );
}
