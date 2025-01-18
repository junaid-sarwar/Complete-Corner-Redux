import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import { useState, useEffect } from "react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      fetch("https://dummyjson.com/users")
        .then((response) => response.json())
        .then((data) => {
          const users = data.users;
          const user = users.find((user) => user.username === username);

          if (user) {
            setLoggedInUser(user);
            setIsLoggedIn(true);
          } else {
            console.error("User not found!");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => console.error("Error fetching users:", error));
    } else {
      setLoggedInUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      setIsLoggedIn(!!username);

      if (username) {
        fetch("https://dummyjson.com/users")
          .then((response) => response.json())
          .then((data) => {
            const users = data.users;
            const user = users.find((user) => user.username === username);

            if (user) {
              setLoggedInUser(user);
            } else {
              console.error("User not found!");
              setLoggedInUser(null);
            }
          })
          .catch((error) => console.error("Error fetching users:", error));
      } else {
        setLoggedInUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar cart={cart} user={loggedInUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />}
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
        <Route path="/login" element={<Login redirectTo="/" />} />
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
