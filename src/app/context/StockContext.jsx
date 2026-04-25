import { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { products as initialProducts, iphoneModels } from '../data/products';

const StockContext = createContext(null);

const DEFAULT_PRICE = 250;

function buildDefaultStock() {
  const stock = {};
  initialProducts.forEach(p => {
    stock[p.id] = {
      hidden: false,
      price: DEFAULT_PRICE,
      salePercent: 0, // نسبة الخصم 0 = مفيش خصم
      models: {},
    };
    iphoneModels.forEach(m => { stock[p.id].models[m] = 10; });
  });
  return stock;
}

export function StockProvider({ children }) {
  const [stock, setStock]                   = useState({});
  const [customProducts, setCustomProducts] = useState([]);
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    const stockRef  = ref(db, 'stock');
    const customRef = ref(db, 'customProducts');

    const unsubStock = onValue(stockRef, snap => {
      if (snap.exists()) {
        setStock(snap.val());
      } else {
        const def = buildDefaultStock();
        set(stockRef, def);
        setStock(def);
      }
      setLoading(false);
    });

    const unsubCustom = onValue(customRef, snap => {
      if (snap.exists()) setCustomProducts(Object.values(snap.val()));
      else setCustomProducts([]);
    });

    return () => { unsubStock(); unsubCustom(); };
  }, []);

  const saveStock = (newStock) => {
    setStock(newStock);
    set(ref(db, 'stock'), newStock);
  };

  // ── كمية موديل ──
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

  // ── سعر المنتج ──
  const setProductPrice = (productId, price) => {
    const value = Math.max(0, Number(price));
    saveStock({ ...stock, [productId]: { ...stock[productId], price: value } });
  };

  // ── نسبة الخصم ──
  const setProductSale = (productId, salePercent) => {
    const value = Math.min(100, Math.max(0, Number(salePercent)));
    saveStock({ ...stock, [productId]: { ...stock[productId], salePercent: value } });
  };

  // ── السعر بعد الخصم ──
  const getFinalPrice = (productId) => {
    const s    = stock[productId];
    const base = s?.price ?? DEFAULT_PRICE;
    const sale = s?.salePercent ?? 0;
    if (!sale) return base;
    return Math.round(base * (1 - sale / 100));
  };

  // ── إخفاء / إظهار ──
  const toggleHidden = (productId) => {
    saveStock({ ...stock, [productId]: { ...stock[productId], hidden: !stock[productId]?.hidden } });
  };

  // ── إضافة منتج custom ──
  const addCustomProduct = (product) => {
    const id         = 'custom_' + Date.now();
    const newProduct = { ...product, id };
    const newCustoms = [...customProducts, newProduct];
    const customsObj = {};
    newCustoms.forEach(p => { customsObj[p.id] = p; });
    set(ref(db, 'customProducts'), customsObj);

    const models = {};
    iphoneModels.forEach(m => { models[m] = 10; });
    saveStock({ ...stock, [id]: { hidden: false, price: DEFAULT_PRICE, salePercent: 0, models } });
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

  const isModelSoldOut  = (productId, model) => (stock[productId]?.models?.[model] ?? 0) === 0;
  const isProductSoldOut = (productId) => {
    const models = stock[productId]?.models ?? {};
    return Object.keys(models).length > 0 && Object.values(models).every(q => q === 0);
  };
  const isHidden        = (productId) => stock[productId]?.hidden ?? false;
  const hasSale         = (productId) => (stock[productId]?.salePercent ?? 0) > 0;

  const decrementStock = (productId, model) => {
    const current = stock[productId]?.models?.[model] ?? 0;
    if (current > 0) setModelQty(productId, model, current - 1);
  };

  return (
    <StockContext.Provider value={{
      stock, customProducts, loading,
      setModelQty, toggleHidden,
      setProductPrice, setProductSale, getFinalPrice, hasSale,
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
