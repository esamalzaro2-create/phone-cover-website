import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, iphoneModels } from '../data/products';

const StockContext = createContext(null);

// ── بناء الـ stock الافتراضي من products.js ──
function buildDefaultStock() {
  const stock = {};
  initialProducts.forEach(p => {
    stock[p.id] = {
      hidden: false,
      models: {},
    };
    iphoneModels.forEach(m => {
      stock[p.id].models[m] = 10; // كمية افتراضية 10
    });
  });
  return stock;
}

function loadStock() {
  try {
    const saved = localStorage.getItem('covercraft_stock');
    if (saved) return JSON.parse(saved);
  } catch {}
  return buildDefaultStock();
}

function loadCustomProducts() {
  try {
    const saved = localStorage.getItem('covercraft_custom_products');
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

export function StockProvider({ children }) {
  const [stock, setStock]                 = useState(loadStock);
  const [customProducts, setCustomProducts] = useState(loadCustomProducts);

  // حفظ تلقائي لما يتغير أي حاجة
  useEffect(() => {
    localStorage.setItem('covercraft_stock', JSON.stringify(stock));
  }, [stock]);

  useEffect(() => {
    localStorage.setItem('covercraft_custom_products', JSON.stringify(customProducts));
  }, [customProducts]);

  // ── تحديث كمية موديل معين ──
  const setModelQty = (productId, model, qty) => {
    const value = Math.max(0, Number(qty));
    setStock(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        models: { ...prev[productId]?.models, [model]: value },
      },
    }));
  };

  // ── إخفاء / إظهار منتج ──
  const toggleHidden = (productId) => {
    setStock(prev => ({
      ...prev,
      [productId]: { ...prev[productId], hidden: !prev[productId]?.hidden },
    }));
  };

  // ── حذف منتج custom ──
  const deleteCustomProduct = (id) => {
    setCustomProducts(prev => prev.filter(p => p.id !== id));
    setStock(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // ── إضافة منتج custom ──
  const addCustomProduct = (product) => {
    const id = 'custom_' + Date.now();
    const newProduct = { ...product, id, price: 250 };
    setCustomProducts(prev => [...prev, newProduct]);
    // إنشاء stock للمنتج الجديد
    const models = {};
    iphoneModels.forEach(m => { models[m] = 10; });
    setStock(prev => ({ ...prev, [id]: { hidden: false, models } }));
  };

  // ── هل الموديل sold out؟ ──
  const isModelSoldOut = (productId, model) => {
    return (stock[productId]?.models?.[model] ?? 0) === 0;
  };

  // ── هل المنتج كله sold out؟ ──
  const isProductSoldOut = (productId) => {
    const models = stock[productId]?.models ?? {};
    return Object.values(models).every(qty => qty === 0);
  };

  // ── هل المنتج مخفي؟ ──
  const isHidden = (productId) => {
    return stock[productId]?.hidden ?? false;
  };

  // ── تخفيض الكمية لما حد يطلب ──
  const decrementStock = (productId, model) => {
    setStock(prev => {
      const current = prev[productId]?.models?.[model] ?? 0;
      if (current <= 0) return prev;
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          models: { ...prev[productId].models, [model]: current - 1 },
        },
      };
    });
  };

  return (
    <StockContext.Provider value={{
      stock, customProducts,
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
