import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate hook
import { fetchCategories } from '../assets/productCategory';

const Navbar = ({ cart }) => {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login', { state: { redirectTo: '/' } });
  };
  

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Complete Corner</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form>
            <input
              type="text"
              placeholder="Search Products"
              className="w-full border py-2 px-4"
            />
            <FaSearch className="absolute top-3 right-3 text-red-500" />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="hidden md:block" onClick={handleLogin}>Login | Register</button>
          <button className="block md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FaUser />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center justify-between py-4 px-4 text-sm font-bold border-t">
        <button className="flex items-center space-x-2" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
          <span>All Categories</span>
        </button>
        <button className="flex items-center space-x-2" onClick={() => setLinksOpen(!linksOpen)}>
          <span>Menu</span>
        </button>
      </div>

      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-white shadow-lg border rounded-md z-10`}>
        <ul className="space-y-2 p-4">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center text-sm font-medium hover:bg-gray-100 p-2 rounded"
            >
              {category.icon && (
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-5 h-5 mr-2"
                />
              )}
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div className={`md:hidden ${linksOpen ? 'block' : 'hidden'} bg-white border-t py-4`}>
        <div className="space-y-4 text-center">
          <Link to="/" className="block hover:underline">Home</Link>
          <Link to="/shop" className="block hover:underline">Shop</Link>
          <Link to="/" className="block hover:underline">Contact Us</Link>
          <Link to="/" className="block hover:underline">About</Link>
        </div>
      </div>

      {/* Desktop Menu */}
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
                  {category.icon && (
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <Link to="/" className="hover:underline">
            Contact Us
          </Link>
          <Link to="/" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
