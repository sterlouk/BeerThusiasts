import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BeerCatalog from "./pages/BeerCatalog";
import BeerDetails from "./pages/BeerDetails";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import ServiceOrders from "./pages/ServiceOrders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<BeerCatalog />} />
        <Route path="/beers/:id" element={<BeerDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/service" element={<ServiceOrders />} />
        <Route path="/service/order/:id" element={<OrderDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
