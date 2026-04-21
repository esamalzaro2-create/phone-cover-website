import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import { ShippingInfo } from './pages/ShippingInfo';
import { FAQ } from './pages/FAQ';
import { Returns } from './pages/Returns';
import { CustomDesign } from './pages/CustomDesign';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'cart', Component: Cart },
      { path: 'contact', Component: Contact },
      { path: 'shipping', Component: ShippingInfo },
      { path: 'faq', Component: FAQ },
      { path: 'returns', Component: Returns },
      { path: 'custom-design', Component: CustomDesign },
      { path: 'admin', Component: Admin },
      { path: '*', Component: NotFound },
    ],
  },
]);
