import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    if (halfStars) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-${stars.length}`}  />);
    }

    return stars;
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12 text-red-500">Product not found.</div>;
  }

  return (
    <div className="mx-auto py-12 px-4 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <h3 className="text-3xl font-bold mb-4 text-amber-600">{product.brand}</h3>
          <p className="text-lg mb-4 text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>

          <div className="flex mb-4 text-yellow-300">
            {renderStars(product.rating)}
          </div>

          <p className="text-lg mb-4 text-green-500">
            <strong>Warranty:</strong> {product.warrantyInformation ? product.warrantyInformation : 'No warranty info available'}
          </p>

          <p className="text-lg mb-4 text-gray-500">
            <strong>Stock:</strong> {product.stock ? product.stock : 'No stock info available'}
          </p>

          <button className="bg-amber-300 text-white px-4 py-2 rounded hover:bg-amber-400">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
