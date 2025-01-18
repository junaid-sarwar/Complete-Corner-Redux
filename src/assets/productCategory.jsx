import axios from 'axios';

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
