import { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set, get } from 'firebase/database';
import { db } from '../firebase';
import { products as initialProducts, iphoneModels } from '../data/products';

const StockContext = createContext(null);

function buildDefaultStock() {
  const stock = {};
  initialProducts.forEach(p => {
    stock[p.id] = { hidden: false, models: {} };
    iphoneModels.forEach(m => { stock[p.id].models[m] = 10; });
  });
  return stock;
}

export function StockProvider({ children }) {
  const [stock, setStock]                   = useState({});
  const [customProducts, setCustomProducts] = useState([]);
  const [loading, setLoading]               = useState(true);

  // ── تحميل البيانات من Firebase ──
  useEffect(() => {
    const stockRef   = ref(db, 'stock');
    const customRef  = ref(db, 'customProducts');

    // Stock
    const unsubStock = onValue(stockRef, snap => {
      if (snap.exists()) {
        setStock(snap.val());
      } else {
        // أول مرة — نحفظ الـ default
        const def = buildDefaultStock();
        set(stockRef, def);
        setStock(def);
      }
      setLoading(false);
    });

    // Custom products
    const unsubCustom = onValue(customRef, snap => {
      if (snap.exists()) {
        const data = snap.val();
        setCustomProducts(Object.values(data));
      } else {
        setCustomProducts([]);
      }
    });

    return () => { unsubStock(); unsubCustom(); };
  }, []);

  // ── حفظ Stock على Firebase ──
  const saveStock = (newStock) => {
    setStock(newStock);
    set(ref(db, 'stock'), newStock);
  };

  // ── تحديث كمية موديل ──
  const setModelQty = (productId, model, qty) => {
    const value = Math.max(0, Number(qty));
    const newStock = {
      ...stock,
      [productId]: {
        ...stock[productId],
        models: { ...stock[productId]?.models, [model]: value },
      },
    };
    saveStock(newStock);
  };

  // ── إخفاء / إظهار منتج ──
  const toggleHidden = (productId) => {
    const newStock = {
      ...stock,
      [productId]: { ...stock[productId], hidden: !stock[productId]?.hidden },
    };
    saveStock(newStock);
  };

  // ── إضافة منتج custom ──
  const addCustomProduct = (product) => {
    const id         = 'custom_' + Date.now();
    const newProduct = { ...product, id, price: 250 };

    // حفظ المنتج
    const newCustoms = [...customProducts, newProduct];
    const customsObj = {};
    newCustoms.forEach(p => { customsObj[p.id] = p; });
    set(ref(db, 'customProducts'), customsObj);

    // إنشاء stock للمنتج الجديد
    const models = {};
    iphoneModels.forEach(m => { models[m] = 10; });
    const newStock = { ...stock, [id]: { hidden: false, models } };
    saveStock(newStock);
  };

  // ── حذف منتج custom ──
  const deleteCustomProduct = (id) => {
    const newCustoms = customProducts.filter(p => p.id !== id);
    const customsObj = {};
    newCustoms.forEach(p => { customsObj[p.id] = p; });
    set(ref(db, 'customProducts'), Object.keys(customsObj).length ? customsObj : null);

    const newStock = { ...stock };
    delete newStock[id];
    saveStock(newStock);
  };

  // ── Helpers ──
  const isModelSoldOut = (productId, model) => {
    return (stock[productId]?.models?.[model] ?? 0) === 0;
  };

  const isProductSoldOut = (productId) => {
    const models = stock[productId]?.models ?? {};
    return Object.keys(models).length > 0 && Object.values(models).every(qty => qty === 0);
  };

  const isHidden = (productId) => {
    return stock[productId]?.hidden ?? false;
  };

  const decrementStock = (productId, model) => {
    const current = stock[productId]?.models?.[model] ?? 0;
    if (current <= 0) return;
    setModelQty(productId, model, current - 1);
  };

  return (
    <StockContext.Provider value={{
      stock, customProducts, loading,
      setModelQty, toggleHidden,
      addCustomProduct, deleteCustomProduct,
      isModelSoldOut, isProductSoldOut, isHidden,
      decrementStock,
    }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error('useStock must be used within StockProvider');
  return ctx;
}
