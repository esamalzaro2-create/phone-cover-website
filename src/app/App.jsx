import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { StockProvider } from './context/StockContext';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <StockProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </CartProvider>
    </StockProvider>
  );
}
