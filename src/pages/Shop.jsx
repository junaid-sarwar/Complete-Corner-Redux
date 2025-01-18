import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Shop = ({ cart, setCart }) => {
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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Update quantity and totalPrice if product exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + product.price }
            : item
        );
      } else {
        // Add new product to cart
        return [
          ...prevCart,
          { id: product.id, name: product.title, price: product.price, quantity: 1, totalPrice: product.price },
        ];
      }
    });
    alert(`${product.title} added to cart!`);
  };

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
                  onClick={() => addToCart(product)}
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
