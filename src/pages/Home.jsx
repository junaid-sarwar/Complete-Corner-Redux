import React from 'react';
import Banner from '../components/sections/banner/Banner';
import BrandSection from '../components/sections/brands/BrandSection';
import InfoSection from '../components/sections/InfoSec/InfoSection';
import TrendingSection from '../components/trending/TrendingSection';

const Home = () => {
  return (
    <>
      <Banner />
      <BrandSection />
      <InfoSection />
      {/* <CategorySection /> */}
      <TrendingSection />
    </>
  );
};

export default Home;
