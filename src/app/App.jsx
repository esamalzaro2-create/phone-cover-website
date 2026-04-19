import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </CartProvider>
  );
}
