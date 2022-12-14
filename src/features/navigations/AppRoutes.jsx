import { Routes, Route } from 'react-router-dom';
import Search from 'features/searches/Search';
import List from 'features/lists/List';
import ProductDetails from 'features/productDetails/ProductDetails';
import Cart from 'features/carts/Cart';
import Payment from 'features/payments/Payment';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/list" element={<List />} />
      <Route path="product-details" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
