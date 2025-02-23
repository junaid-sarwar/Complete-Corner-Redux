import React, { useEffect } from 'react';
import Banner from '../components/sections/banner/Banner';
import BrandSection from '../components/sections/brands/BrandSection';
import InfoSection from '../components/sections/InfoSec/InfoSection';
import TrendingSection from '../components/trending/TrendingSection';
import CommunitySection from '../components/sections/communitySec/CommunitySection';
import DownloadSection from '../components/sections/downloadSec/DownloadSection';
import { setProducts } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  // const dispatch = useDispatch();
  // const products = useSelector(state => state.product.products);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://dummyjson.com/products");
  //       dispatch(setProducts(response.data.products));
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchData();
  // }, [dispatch]);

  return (
    <>
      <Banner />
      <BrandSection />
      <InfoSection />
      <TrendingSection />
      <DownloadSection />
      <CommunitySection />

      {/* <div>
        <h2>Top Products</h2>
        <div>
          {products.slice(0, 5).map((product) => (
            <div key={product.id}>{product.title}</div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Home;
