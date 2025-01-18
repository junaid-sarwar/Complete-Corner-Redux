import React from 'react';
import Banner from '../components/sections/banner/Banner';
import BrandSection from '../components/sections/brands/BrandSection';
import InfoSection from '../components/sections/InfoSec/InfoSection';
import TrendingSection from '../components/trending/TrendingSection';
import CommunitySection from '../components/sections/communitySec/CommunitySection';
import DownloadSection from '../components/sections/downloadSec/DownloadSection';

const Home = () => {
  return (
    <>
      <Banner />
      <BrandSection />
      <InfoSection />
      <TrendingSection />
      <DownloadSection/>
      <CommunitySection/>
    </>
  );
};

export default Home;
