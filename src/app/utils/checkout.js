import emailjs from '@emailjs/browser';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EmailJS
export const EMAILJS_SERVICE_ID  = 'service_38go51x';
export const EMAILJS_TEMPLATE_ID = 'template_40hpfnp';
export const EMAILJS_PUBLIC_KEY  = 'wd92qJRhD1F10hA8P';

// WhatsApp
export const WHATSAPP_NUMBER = '201030733667';

// 💡 عشان تعدل أسعار التوصيل — السطرين دول بس
export const CAIRO_GIZA_DELIVERY = 70;   // سعر التوصيل للقاهرة والجيزة
export const OTHER_DELIVERY      = 105;  // سعر التوصيل لباقي المحافظات
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const cairoGiza = ['القاهرة', 'الجيزة'];

export function getDeliveryFee(gov) {
  if (!gov) return 0;
  return cairoGiza.includes(gov) ? CAIRO_GIZA_DELIVERY : OTHER_DELIVERY;
}

export function genConfNum() {
  return '#' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر',
  'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية',
  'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس', 'أسوان',
  'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'الشرقية',
  'جنوب سيناء', 'شمال سيناء', 'الأقصر', 'قنا', 'كفر الشيخ',
  'مطروح', 'سوهاج',
];

export const emptyForm = {
  name: '', phone: '', whatsapp: '', governorate: '',
  address: '', building: '', apartment: '',
};

export function validateForm(form) {
  const e = {};
  if (!form.name.trim())                 e.name        = 'الاسم مطلوب';
  if (!/^01[0-9]{9}$/.test(form.phone)) e.phone       = 'رقم تليفون مصري صحيح مطلوب';
  if (!/^01[0-9]{9}$/.test(form.whatsapp)) e.whatsapp = 'رقم واتساب مصري صحيح مطلوب';
  if (!form.governorate)                 e.governorate = 'المحافظة مطلوبة';
  if (!form.address.trim())              e.address     = 'اسم الشارع مطلوب';
  if (!form.building.trim())             e.building    = 'رقم العمارة مطلوب';
  if (!form.apartment.trim())            e.apartment   = 'رقم الشقة مطلوب';
  return e;
}

export async function sendOrder({ form, items, totalPrice, confNum }) {
  const fee   = getDeliveryFee(form.governorate);
  const total = totalPrice + fee;
  const itemsList = items.map(i =>
    `• ${i.name} (${i.selectedColor}) x${i.quantity} = ${i.price * i.quantity} جنيه`
  ).join('\n');

  // ── EmailJS ──
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        conf_num:       confNum,
        customer_name:  form.name,
        customer_phone: form.phone,
        governorate:    form.governorate,
        address:        `${form.address}، عمارة ${form.building}، شقة ${form.apartment}`,
        order_items:    itemsList,
        subtotal:       totalPrice,
        delivery:       fee,
        total:          total,
        name:           form.name,
        message:        `طلب جديد ${confNum}`,
      },
      EMAILJS_PUBLIC_KEY
    );
  } catch (err) {
    console.error('EmailJS error:', err);
  }

  // ── WhatsApp ──
  const waMsg = encodeURIComponent(
    `🛍️ طلب جديد ${confNum}\n\n` +
    `👤 الاسم: ${form.name}\n` +
    `📞 تليفون: ${form.phone}\n` +
    `💬 واتساب: ${form.whatsapp}\n` +
    `📍 ${form.governorate}، ${form.address}، عمارة ${form.building}، شقة ${form.apartment}\n\n` +
    `${itemsList}\n\n` +
    `💰 منتجات: ${totalPrice} جنيه\n` +
    `🚚 توصيل: ${fee} جنيه\n` +
    `✅ الإجمالي: ${total} جنيه\n` +
    `💵 الدفع عند الاستلام (COD)`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, '_blank');

  return { fee, total };
}

export const inp = (hasErr) => ({
  width: '100%', padding: '10px 12px',
  background: '#f9fafb',
  border: `1px solid ${hasErr ? '#ef4444' : '#e5e7eb'}`,
  borderRadius: '8px', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
});
