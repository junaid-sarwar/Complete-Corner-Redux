import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchCategories } from '../../../assets/productCategory';
import Banner1 from '../../../assets/images/secttion/banner.png';

const Banner = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleShopNow = () => {
    navigate('/shop');
  };

  return (
    <div className="bg-white px-4 md:px-16 lg:px-24">
      <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-0 md:space-x-4">
        {/* Banner Section */}
        <div className="w-full bg-gray-200 p-8 md:max-w-screen-2xl mt-8 md:mt-0 md:items-start relative rounded-lg overflow-hidden flex justify-between flex-wrap items-center gap-10">
          <div className="top-10 left-8 sm:left-16 md:left-20 text-left">
            <div className="text-3xl sm:text-6xl font-bold flex flex-col gap-2">
              <span className="bg-white text-black px-4 py-2">LET'S</span>
              <span className="px-4 py-2">EXPLORE</span>
              <span className="bg-[#E0C340] text-black px-4 py-2 -rotate-2">
                UNIQUE
              </span>
              <span className="px-4 py-2">THINGS.</span>
            </div>
            <p className="text-base px-4 mt-4 md:text-lg">
              Live for Influential and Innovative fashion!
            </p>
            <button
              className="mt-6 mx-4 bg-black text-white px-6 py-2 text-sm font-medium rounded-md shadow hover:bg-gray-800 transition hover:scale-105"
              onClick={handleShopNow}
            >
              Shop Now
            </button>
          </div>
          <img src={Banner1} alt="Banner" className="w-auto -mb-8 h-60 md:h-96 mt-auto" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
