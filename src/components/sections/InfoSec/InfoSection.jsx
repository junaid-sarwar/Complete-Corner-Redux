import React from 'react';
import { FaHeadset, FaLock, FaShippingFast, FaTag } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';

const InfoSection = () => {
  const infoItems = [
    {
      icon: <FaShippingFast className="text-3xl text-amber-300" />,
      title: 'Free Shipping',
      description: 'Get your orders delivered with no extra cost.',
    },
    {
      icon: <FaHeadset className="text-3xl text-amber-300" />,
      title: 'Support 24/7',
      description: 'We are here to assist you anytime.',
    },
    {
      icon: <FaMoneyBill1Wave className="text-3xl text-amber-300" />,
      title: '100% Money Back',
      description: 'Full refund if you are not satisfied.',
    },
    {
      icon: <FaLock className="text-3xl text-amber-300" />,
      title: 'Payment Secure',
      description: 'Your payment information is safe with us.',
    },
    {
      icon: <FaTag className="text-3xl text-amber-300" />,
      title: 'Discount',
      description: 'Enjoy the best prices on our products.',
    },
  ];

  return (
    <div className="bg-white py-12 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md
            transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-gray-50"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
              {item.icon}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
