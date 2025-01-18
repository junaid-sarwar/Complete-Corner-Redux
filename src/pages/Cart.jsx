import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import EmptyCard from '../assets/images/secttion/emptycart.png';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart, isLoggedIn }) => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productIds = cart.map((product) => product.id);
        const response = await axios.get(`https://dummyjson.com/products`);
        const products = response.data.products.filter((product) =>
          productIds.includes(product.id)
        );
        setProductData(products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (cart.length > 0) {
      fetchProductData();
    }
  }, [cart]);

  const handleQuantityChange = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                type === 'increase'
                  ? product.quantity + 1
                  : Math.max(1, product.quantity - 1),
              totalPrice:
                type === 'increase'
                  ? product.totalPrice + product.price
                  : Math.max(product.price, product.totalPrice - product.price),
            }
          : product
      )
    );
  };

  const handleRemoveProduct = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { redirectTo: '/checkout' } });
    }
  };  

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {cart.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Shopping Cart</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
            <div className="md:w-2/3">
              <div className="flex justify-between border-b items-center mb-4 text-xs font-bold">
                <p>Products</p>
                <div className="flex space-x-8">
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>SubTotal</p>
                  <p>Remove</p>
                </div>
              </div>
              <div>
                {cart.map((product) => {
                  const productDetails = productData.find(
                    (item) => item.id === product.id
                  );
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border-b"
                    >
                      <div className="md:flex items-center space-x-4">
                        <img
                          src={productDetails ? productDetails.thumbnail : '/path/to/fallback-image.png'}
                          alt={product.name}
                          className="w-16 h-16 object-contain rounded"
                        />
                        <div className="flex-1 ml-4">
                          <h3 className="text-lg font-semibold">
                            {productDetails ? productDetails.title : 'Loading...'}
                          </h3>
                        </div>
                      </div>
                      <div className="flex space-x-12 items-center">
                        <p>${product.price}</p>
                        <div className="flex items-center justify-center border">
                          <button
                            className="text-xl font-bold px-1.5 border-r"
                            onClick={() => handleQuantityChange(product.id, 'decrease')}
                          >
                            -
                          </button>
                          <p className="text-xl px-2">{product.quantity}</p>
                          <button
                            className="text-xl px-1 border-l"
                            onClick={() => handleQuantityChange(product.id, 'increase')}
                          >
                            +
                          </button>
                        </div>
                        <p>${product.totalPrice.toFixed(2)}</p>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-sm font-semibold mb-5">Cart Total</h3>
              <div className="flex justify-between mb-5 border-b pb-1">
                <span className="text-sm">Total Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-amber-300 text-black py-2 hover:bg-amber-500"
                onClick={handleProceedToCheckout}
              >
                {isLoggedIn ? 'Proceed to Checkout' : 'Proceed to Login'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img src={EmptyCard} alt="Empty Cart" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default Cart;
