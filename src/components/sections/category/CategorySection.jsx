import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../../assets/productCategory';
import axios from 'axios';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [visibleCategories, setVisibleCategories] = useState(3); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);

      const images = {};
      for (let category of categoriesData) {
        const categoryResponse = await axios.get(category.url);
        const firstProductImage = categoryResponse.data.products[0]?.images[0];
        if (firstProductImage) {
          images[category.slug] = firstProductImage;
        } else {
          images[category.slug] = 'defaultImage.png';
        }
      }
      setCategoryImages(images);
      setIsLoading(false); 
    };
    getCategories();
  }, []);

  const loadMoreCategories = () => {
    setVisibleCategories(prev => prev + 3); 
  };

  return (
    <div className='container mx-auto py-10'>
         <div className='text-4xl font-extrabold text-center text-gray-800 mb-6'>
        <span className="bg-gradient-to-r from-yellow-400 to-orange-600 text-transparent bg-clip-text">CATEGORIES</span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {categories.slice(0, visibleCategories).map((category, index) => (
          <div
            key={index}
            className='relative h-64 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 ease-in-out'
          >
            {/* Image container with adjusted height and width */}
            <div className="w-full h-full relative">
              <img
                src={categoryImages[category.slug] || 'defaultImage.png'}
                alt={category.name}
                className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className='absolute bottom-6 left-6 z-10'>
              <p className='text-xl font-bold text-black'>{category.name}</p>
              <p className='text-sm text-black mt-1'>View All</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show View More button if there are more categories to show */}
      {visibleCategories < categories.length && (
        <div className='flex justify-center mt-4'>
          <button
            onClick={loadMoreCategories}
            className='bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition'
          >
            View More
          </button>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading && <div className="text-center mt-4">Loading...</div>}
    </div>
  );
};

export default CategorySection;
