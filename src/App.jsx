import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import { useState } from "react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              totalQuantity={cart.reduce((acc, item) => acc + item.quantity, 0)}
              totalPrice={cart.reduce((acc, item) => acc + item.totalPrice, 0)}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={<Login redirectTo="/" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
