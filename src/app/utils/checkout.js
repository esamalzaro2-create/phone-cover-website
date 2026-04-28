import { ref, push } from 'firebase/database';
import { db } from '../firebase';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const WHATSAPP_NUMBER = '201030733667';
export const DELIVERY_FEE   = 70; // القاهرة والجيزة بس

// 💡 عشان تعدل سعر التوصيل — غير الرقم هنا بس
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const governorates = ['القاهرة', 'الجيزة'];

export const emptyForm = {
  name: '', phone: '', whatsapp: '', governorate: '', address: '', building: '', apartment: '',
};

export function validateForm(form) {
  const e = {};
  if (!form.name.trim())                    e.name        = 'الاسم مطلوب';
  if (!/^01[0-9]{9}$/.test(form.phone))    e.phone       = 'رقم تليفون مصري صحيح مطلوب';
  if (!/^01[0-9]{9}$/.test(form.whatsapp)) e.whatsapp    = 'رقم واتساب صحيح مطلوب';
  if (!form.governorate)                    e.governorate = 'المنطقة مطلوبة';
  if (!form.address.trim())                 e.address     = 'اسم الشارع مطلوب';
  if (!form.building.trim())                e.building    = 'رقم العمارة مطلوب';
  if (!form.apartment.trim())               e.apartment   = 'رقم الشقة مطلوب';
  return e;
}

export function genConfNum() {
  return '#' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export const inp = (hasErr) => ({
  width: '100%', padding: '10px 12px',
  background: '#f9fafb',
  border: `1px solid ${hasErr ? '#ef4444' : '#e5e7eb'}`,
  borderRadius: '8px', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
});

export async function sendOrder({ form, items, totalPrice, confNum }) {
  const fee   = DELIVERY_FEE;
  const total = totalPrice + fee;

  const itemsList = items.map(i =>
    `• ${i.name} (${i.selectedColor}) x${i.quantity} = ${i.price * i.quantity} جنيه`
  ).join('\n');

  // ── 1. حفظ في Firebase ──
  try {
    await push(ref(db, 'orders'), {
      confNum,
      timestamp:   Date.now(),
      name:        form.name,
      phone:       form.phone,
      whatsapp:    form.whatsapp,
      governorate: form.governorate,
      address:     `${form.address}، عمارة ${form.building}، شقة ${form.apartment}`,
      items,
      totalPrice,
      deliveryFee: fee,
      grandTotal:  total,
    });
    console.log('✅ Order saved to Firebase');
  } catch (err) {
    console.error('❌ Firebase error:', err);
  }

  // ── 2. WhatsApp ──
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
