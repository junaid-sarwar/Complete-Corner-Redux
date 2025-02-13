import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyCard from '../assets/images/secttion/emptycart.png';
import Swal from 'sweetalert2';

const Checkout = ({ isLoggedIn }) => {
  const [cart, setCart] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      Swal.fire({
        title: "Order Placed!", 
        icon: "success",
        draggable: true
      }).then(() => {
        localStorage.removeItem('cart');
        navigate('/');
      });
    }
  };

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {cart.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Checkout</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
            <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-sm font-semibold mb-5">Billing Information</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={billingInfo.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="zip" className="block text-sm font-medium">Zip Code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={billingInfo.zip}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-sm font-semibold mb-5">Cart Summary</h3>
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
                onClick={handleCheckout}
              >
                Checkout
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

export default Checkout;