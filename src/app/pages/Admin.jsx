import { useState, useRef } from 'react';
import { Lock, Eye, EyeOff, LogOut, Check, X, Plus, Trash2, ChevronDown, ChevronUp, Package, Upload, AlertTriangle, BarChart2, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';
import { products as initialProducts, iphoneModels, categories } from '../data/products';
import { useStock } from '../context/StockContext';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { useEffect } from 'react';

const ADMIN_PASSWORD = '13522359420';
const SELL_PRICE     = 250;
const COST_PRICE     = 150; // تكلفة الكفر — غيرها براحتك

const inp = (err) => ({
  width: '100%', padding: '10px 12px',
  background: '#111827',
  border: `1.5px solid ${err ? '#ef4444' : '#374151'}`,
  borderRadius: '8px', fontSize: '13px', color: '#f9fafb',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
});

export function Admin() {
  const [authed, setAuthed]         = useState(false);
  const [pass, setPass]             = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [passErr, setPassErr]       = useState('');
  const [expanded, setExpanded]     = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab]   = useState('stock'); // stock | report
  const [orders, setOrders]         = useState([]);
  const [reportForm, setReportForm] = useState({ cost: COST_PRICE, sold: 0, notes: '' });

  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Anime', description: '', image: '', material: 'Hard Polycarbonate',
  });
  const [newProductErr, setNewProductErr] = useState({});
  const [imagePreview, setImagePreview]   = useState(null);
  const fileRef = useRef();

  const { stock, customProducts, loading, setModelQty, toggleHidden, addCustomProduct, deleteCustomProduct, isModelSoldOut, isProductSoldOut, isHidden } = useStock();
  const allProducts = [...initialProducts, ...customProducts];

  // تحميل الطلبات من Firebase
  useEffect(() => {
    if (!authed) return;
    const ordersRef = ref(db, 'orders');
    const unsub = onValue(ordersRef, snap => {
      if (snap.exists()) {
        const data = snap.val();
        setOrders(Object.values(data).sort((a, b) => b.timestamp - a.timestamp));
      } else {
        setOrders([]);
      }
    });
    return () => unsub();
  }, [authed]);

  const handleLogin = () => {
    if (pass === ADMIN_PASSWORD) { setAuthed(true); setPassErr(''); }
    else setPassErr('باسورد غلط!');
  };

  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewProduct(prev => ({ ...prev, image: e.target.result }));
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const validateNewProduct = () => {
    const e = {};
    if (!newProduct.name.trim())        e.name        = 'الاسم مطلوب';
    if (!newProduct.image)              e.image       = 'الصورة مطلوبة';
    if (!newProduct.description.trim()) e.description = 'الوصف مطلوب';
    return e;
  };

  const handleAddProduct = () => {
    const errs = validateNewProduct();
    if (Object.keys(errs).length > 0) { setNewProductErr(errs); return; }
    addCustomProduct(newProduct);
    setNewProduct({ name: '', category: 'Anime', description: '', image: '', material: 'Hard Polycarbonate' });
    setImagePreview(null);
    setNewProductErr({});
    setShowAddForm(false);
  };

  // ── حسابات الـ Report ──
  const totalSold     = orders.length;
  const totalRevenue  = totalSold * SELL_PRICE;
  const totalCost     = totalSold * Number(reportForm.cost);
  const totalProfit   = totalRevenue - totalCost;
  const deliveryTotal = orders.reduce((sum, o) => sum + (o.deliveryFee || 0), 0);

  // ── Login ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-white text-xl font-bold mb-1">Admin Panel</h1>
          <p className="text-gray-500 text-sm mb-6">Cover Zone — ادخل الباسورد</p>
          <div className="relative mb-3">
            <input type={showPass ? 'text' : 'password'} placeholder="الباسورد" value={pass}
              onChange={e => { setPass(e.target.value); setPassErr(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ ...inp(passErr), direction: 'ltr', padding: '12px 44px 12px 14px' }} />
            <button onClick={() => setShowPass(!showPass)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {passErr && <p className="text-red-400 text-xs mb-3">{passErr}</p>}
          <button onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            دخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm">Cover Zone — Admin</p>
            <p className="text-gray-500 text-xs">{allProducts.length} منتج • {orders.length} طلب</p>
          </div>
        </div>
        <button onClick={() => setAuthed(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-gray-800 text-xs transition-colors">
          <LogOut className="w-3 h-3" /> خروج
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-xl w-fit">
          <button onClick={() => setActiveTab('stock')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'stock' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
            📦 المخزون
          </button>
          <button onClick={() => setActiveTab('report')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'report' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
            📊 التقرير المالي
          </button>
          <button onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
            🛍️ الطلبات
          </button>
        </div>
      </div>

      {/* ══════════ STOCK TAB ══════════ */}
      {activeTab === 'stock' && (
        <div className="max-w-4xl mx-auto px-4 pb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">المنتجات</h2>
            <button onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
              <Plus className="w-4 h-4" />
              {showAddForm ? 'إلغاء' : 'إضافة منتج'}
            </button>
          </div>

          {/* Add product form */}
          {showAddForm && (
            <div className="bg-gray-900 border border-purple-700/50 rounded-2xl p-5 space-y-4" style={{ direction: 'rtl' }}>
              <h3 className="font-bold text-purple-300 flex items-center gap-2"><Plus className="w-4 h-4" /> منتج جديد</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">صورة المنتج *</label>
                {!imagePreview ? (
                  <div onClick={() => fileRef.current.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${newProductErr.image ? 'border-red-500 bg-red-900/10' : 'border-gray-700 hover:border-purple-500 hover:bg-purple-900/10'}`}>
                    <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">اضغط لرفع الصورة</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden"
                      onChange={e => handleImageUpload(e.target.files[0])} />
                  </div>
                ) : (
                  <div className="relative">
                    <img src={imagePreview} alt="preview" className="w-full h-40 object-cover rounded-xl border border-gray-700" />
                    <button onClick={() => { setImagePreview(null); setNewProduct(p => ({ ...p, image: '' })); }}
                      className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {newProductErr.image && <p className="text-red-400 text-xs mt-1">{newProductErr.image}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">اسم المنتج *</label>
                <input type="text" placeholder="مثال: Naruto Case" value={newProduct.name}
                  onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} style={inp(newProductErr.name)} />
                {newProductErr.name && <p className="text-red-400 text-xs mt-1">{newProductErr.name}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">الكاتيجوري</label>
                <select value={newProduct.category}
                  onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} style={inp(false)}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">الوصف *</label>
                <textarea placeholder="وصف المنتج..." value={newProduct.description}
                  onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))}
                  rows={2} style={{ ...inp(newProductErr.description), resize: 'vertical' }} />
                {newProductErr.description && <p className="text-red-400 text-xs mt-1">{newProductErr.description}</p>}
              </div>
              <button onClick={handleAddProduct}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> إضافة
              </button>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-gray-500">⏳ جاري التحميل من Firebase...</div>
          ) : (
            allProducts.map(product => {
              const s        = stock[product.id] ?? { hidden: false, models: {} };
              const isExp    = expanded === product.id;
              const totalQty = Object.values(s.models ?? {}).reduce((a, b) => a + b, 0);
              const soldOut  = isProductSoldOut(product.id);
              const hidden   = isHidden(product.id);
              const isCustom = customProducts.some(p => p.id === product.id);

              return (
                <div key={product.id}
                  className={`bg-gray-900 border rounded-xl overflow-hidden transition-colors ${hidden ? 'border-gray-700 opacity-50' : soldOut ? 'border-red-700/60' : totalQty <= 5 ? 'border-yellow-700/60' : 'border-gray-800'}`}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img src={product.image} alt={product.name}
                        className={`w-full h-full object-cover ${hidden || soldOut ? 'grayscale' : ''}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white text-sm truncate">{product.name}</p>
                        {isCustom && <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full">Custom</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{product.category}</span>
                        {hidden && <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">مخفي</span>}
                        {!hidden && soldOut && <span className="text-xs text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full">Sold Out</span>}
                        {!hidden && !soldOut && totalQty <= 5 && <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> منخفض ({totalQty})</span>}
                        {!hidden && !soldOut && totalQty > 5 && <span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">متاح ({totalQty})</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toggleHidden(product.id)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium ${hidden ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                        {hidden ? 'إظهار' : 'إخفاء'}
                      </button>
                      {isCustom && (
                        deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => { deleteCustomProduct(product.id); setDeleteConfirm(null); }}
                              className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded-lg">تأكيد</button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="text-xs bg-gray-700 text-gray-300 px-2 py-1.5 rounded-lg">لا</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(product.id)}
                            className="text-red-400 hover:text-red-300 bg-gray-800 hover:bg-gray-700 p-1.5 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )
                      )}
                      <button onClick={() => setExpanded(isExp ? null : product.id)}
                        className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-lg transition-colors">
                        {isExp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExp && (
                    <div className="border-t border-gray-800 p-4">
                      <p className="text-xs text-gray-500 mb-3" style={{ direction: 'rtl' }}>
                        اكتب الكمية — لو صفر يبقى Sold Out أوتوماتيك ويتحدث على كل الأجهزة
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {iphoneModels.map(model => {
                          const qty     = s.models?.[model] ?? 0;
                          const soldOut = qty === 0;
                          return (
                            <div key={model}
                              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border transition-colors ${soldOut ? 'bg-red-900/20 border-red-700/40' : qty <= 2 ? 'bg-yellow-900/20 border-yellow-700/40' : 'bg-gray-800 border-gray-700'}`}>
                              <div className="flex items-center gap-2 min-w-0">
                                {soldOut ? <X className="w-3 h-3 text-red-400 flex-shrink-0" /> : <Check className="w-3 h-3 text-green-400 flex-shrink-0" />}
                                <span className="text-xs text-gray-300 truncate">{model}</span>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => setModelQty(product.id, model, qty - 1)}
                                  className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-gray-300 font-bold transition-colors">−</button>
                                <input type="number" min="0" value={qty}
                                  onChange={e => setModelQty(product.id, model, e.target.value)}
                                  className="w-12 text-center text-xs font-bold rounded border border-gray-700 bg-gray-900 text-white outline-none py-1" />
                                <button onClick={() => setModelQty(product.id, model, qty + 1)}
                                  className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-gray-300 font-bold transition-colors">+</button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ══════════ REPORT TAB ══════════ */}
      {activeTab === 'report' && (
        <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
          <h2 className="text-lg font-bold">📊 التقرير المالي</h2>

          {/* Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5" style={{ direction: 'rtl' }}>
            <h3 className="font-semibold text-gray-300 mb-4 text-sm">إعدادات الحسابات</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">تكلفة الكفر الواحد (جنيه)</label>
                <input type="number" value={reportForm.cost}
                  onChange={e => setReportForm(p => ({ ...p, cost: e.target.value }))}
                  style={inp(false)} />
                <p className="text-xs text-gray-500 mt-1">غيرها حسب تكلفتك الفعلية</p>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">سعر البيع (جنيه)</label>
                <input type="number" value={SELL_PRICE} disabled
                  style={{ ...inp(false), opacity: 0.5, cursor: 'not-allowed' }} />
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <ShoppingBag className="w-5 h-5" />, label: 'إجمالي الطلبات', value: totalSold, color: '#3b82f6', bg: '#1e3a5f' },
              { icon: <DollarSign className="w-5 h-5" />, label: 'إجمالي الإيرادات', value: `${totalRevenue} جنيه`, color: '#10b981', bg: '#064e3b' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'صافي الربح', value: `${totalProfit} جنيه`, color: totalProfit >= 0 ? '#f59e0b' : '#ef4444', bg: totalProfit >= 0 ? '#451a03' : '#450a0a' },
              { icon: <BarChart2 className="w-5 h-5" />, label: 'إجمالي التوصيل', value: `${deliveryTotal} جنيه`, color: '#8b5cf6', bg: '#2e1065' },
            ].map(({ icon, label, value, color, bg }) => (
              <div key={label} style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 16, padding: '16px' }}>
                <div style={{ color, marginBottom: 8 }}>{icon}</div>
                <p style={{ color: '#9ca3af', fontSize: '11px', marginBottom: 4 }}>{label}</p>
                <p style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5" style={{ direction: 'rtl' }}>
            <h3 className="font-semibold text-gray-300 mb-4 text-sm">تفاصيل الحسابات</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'عدد الطلبات',        value: `${totalSold} طلب`,          color: '#fff' },
                { label: 'سعر البيع',           value: `${SELL_PRICE} جنيه`,        color: '#fff' },
                { label: 'إجمالي الإيرادات',   value: `${totalRevenue} جنيه`,      color: '#10b981' },
                { label: 'تكلفة المنتجات',     value: `${totalCost} جنيه`,         color: '#ef4444' },
                { label: 'إجمالي التوصيل (دخل)', value: `${deliveryTotal} جنيه`,  color: '#8b5cf6' },
                { label: 'صافي الربح',          value: `${totalProfit} جنيه`,       color: totalProfit >= 0 ? '#f59e0b' : '#ef4444' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                  <span style={{ color: '#9ca3af' }}>{label}</span>
                  <span style={{ color, fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ ORDERS TAB ══════════ */}
      {activeTab === 'orders' && (
        <div className="max-w-4xl mx-auto px-4 pb-12 space-y-4">
          <h2 className="text-lg font-bold">🛍️ الطلبات ({orders.length})</h2>
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">مفيش طلبات لسه</div>
          ) : (
            orders.map((order, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4" style={{ direction: 'rtl' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-white text-sm">{order.confNum}</p>
                    <p className="text-gray-400 text-xs">{new Date(order.timestamp).toLocaleString('ar-EG')}</p>
                  </div>
                  <span className="bg-green-900/40 text-green-400 text-xs px-3 py-1 rounded-full font-semibold">
                    {order.grandTotal} جنيه
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <p>👤 {order.name}</p>
                  <p>📞 {order.phone}</p>
                  <p>📍 {order.governorate}</p>
                  <p>🚚 توصيل: {order.deliveryFee} جنيه</p>
                </div>
                {order.items && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    {order.items.map((item, j) => (
                      <p key={j} className="text-xs text-gray-300">• {item.name} ({item.selectedColor}) x{item.quantity}</p>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
