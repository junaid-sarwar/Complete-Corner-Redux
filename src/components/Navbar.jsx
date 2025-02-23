import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = ({ cart }) => {
  const [categories, setCategories] = useState([]);
  const [upperMenuOpen, setUpperMenuOpen] = useState(false);
  const [lowerMenuOpen, setLowerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loggedIn, user } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  const handleLogin = () => {
    navigate("/login", { state: { redirectTo: "/" } });
  };

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const productCategories = [...new Set(data.products.map((product) => product.category))];
        setCategories(productCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login"); 
  };

  return (
    <nav className="bg-white shadow-md">
      {/* Upper Navbar */}
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Complete Corner</Link>
        </div>
        <div className="relative hidden md:flex flex-1 lg:w-2/3 mx-4">
          <form className="w-full">
            <input
              type="text"
              placeholder="Search Products"
              className="w-full border py-2 px-4 rounded-2xl border-black"
            />
            <FaSearch className="absolute top-3 right-3 text-red-500" />
          </form>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {loggedIn ? (
            <div className="flex items-center space-x-2">
              <img
                src={user?.image || "https://via.placeholder.com/40"}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{user?.firstName}</span>
              <button
                className="text-sm font-medium text-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin}>Login | Register</button>
          )}
        </div>
        {/* Hamburger Button for Upper Navbar */}
        <button
          className="block md:hidden"
          onClick={() => setUpperMenuOpen(!upperMenuOpen)}
        >
          <FaBars />
        </button>
      </div>


      {/* Upper Navbar Dropdown Menu for Mobile */}
      <div className={`md:hidden ${upperMenuOpen ? "block" : "hidden"} bg-white shadow-lg`}>
        <div className="px-4 py-2">
          <form>
            <input
              type="text"
              placeholder="Search Products"
              className="w-full border py-2 px-4 rounded-2xl border-black"
            />
          </form>
        </div>
        <div className="flex flex-col items-start px-4 py-2 space-y-2">
          <Link to="/cart" className="relative flex items-center">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {loggedIn ? (
            <div className="flex items-center space-x-2">
              <img
                src={user?.image || "https://via.placeholder.com/40"}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{user?.firstName}</span>
              <button
                className="text-sm font-medium text-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin}>Login | Register</button>
          )}
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="md:hidden flex items-center justify-between py-4 px-4 text-sm font-bold border-t">
        <button
          className="flex items-center space-x-2"
          onClick={() => setLowerMenuOpen(!lowerMenuOpen)}
        >
          <FaBars />
          <span>Menu</span>
        </button>
      </div>

      {/* Lower Navbar Dropdown Menu for Mobile */}
      <div className={`md:hidden ${lowerMenuOpen ? "block" : "hidden"} bg-white border-t`}>
        <div className="space-y-4 text-center justify-between py-4">
          <Link
            to="/"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 px-2 ${isActive("/") ? "active:decoration-amber-400 underline decoration-4 underline-offset-4" : ""
              }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 px-2 ${isActive("/shop") ? "decoration-amber-400 underline decoration-4 underline-offset-4" : ""
              }`}
          >
            Shop
          </Link>
          <Link
            to="/contact-us"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 px-2 ${isActive("/contact-us") ? "decoration-amber-400 underline decoration-4 underline-offset-4" : ""
              }`}
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 px-2 ${isActive("/about") ? "decoration-amber-400 underline decoration-4 underline-offset-4" : ""
              }`}
          >
            About
          </Link>
        </div>
      </div>

      {/* Desktop Lower Navbar */}
      <div className="hidden md:flex items-center justify-between py-4 px-4 text-sm font-bold border-t">
        <div className="relative group">
          <button className="flex items-center space-x-2 hover:underline">
            <FaBars />
            <span>All Categories</span>
          </button>
          <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg border rounded-md hidden group-hover:block z-10">
            <ul className="space-y-2 p-4">
              {categories.slice(0, 7).map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm font-medium hover:bg-gray-100 p-2 rounded"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 ${isActive("/") ? "focus:decoration-amber-400 focus:underline focus:decoration-4 focus:underline-offset-4" : ""
              }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 ${isActive("/shop") ? "focus:decoration-amber-400 focus:underline focus:decoration-4 focus:underline-offset-4" : ""
              }`}
          >
            Shop
          </Link>
          <Link
            to="/contact-us"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 ${isActive("/contact-us") ? "focus:decoration-amber-400 focus:underline focus:decoration-4 focus:underline-offset-4" : ""
              }`}
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className={`hover:underline decoration-transparent hover:decoration-amber-400 ${isActive("/about") ? "focus:decoration-amber-400 focus:underline focus:decoration-4 focus:underline-offset-4" : ""
              }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;