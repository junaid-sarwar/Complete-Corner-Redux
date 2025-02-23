import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const Shop = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
  };  
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const addToCarts = (product) => {
  //   setCart((prevCart) => {
  //     const existingProduct = prevCart.find((item) => item.id === product.id);
  //     let updatedCart;

  //     if (existingProduct) {
  //       updatedCart = prevCart.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + product.price }
  //           : item
  //       );
  //     } else {
  //       updatedCart = [
  //         ...prevCart,
  //         { id: product.id, name: product.title, price: product.price, quantity: 1, totalPrice: product.price },
  //       ];
  //     }

  //     // Save to localStorage
  //     localStorage.setItem('cart', JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });

  //   toast.success(`${product.title} added to cart!`, {
  //     position: 'top-center',
  //     duration: 2000,
  //   });
  // };

  return (
    <div className="mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg relative"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold">{product.title}</h3>
                  </Link>
                  <p className="text-gray-500">${product.price}</p>
                </div>
                <button
                  onClick={(e)=>handleAddToCart(e,product)}
                  className="absolute bottom-2 right-2 bg-amber-300 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-400 shadow-lg"
                >
                  +
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;