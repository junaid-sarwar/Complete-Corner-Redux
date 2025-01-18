import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10 px-4">
      <h2 className="text-4xl font-bold text-[#E0C340] mb-6 text-center">About Us</h2>
      <p className="text-lg text-white text-center mb-10 max-w-3xl">
        Welcome to Complete Corner! We're passionate about providing the best
        shopping experience for you. Our goal is to offer a variety of products
        at unbeatable prices, and we strive to create a community where customers
        and sellers can connect and grow together. We believe that everyone deserves
        access to high-quality products, and we're here to make that happen.
      </p>
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-[#E0C340] mb-4">Our Mission</h3>
        <p className="text-lg text-white mb-4">
          At Complete Corner, our mission is to empower local businesses by
          providing them with a platform to grow and reach more customers. We
          believe in fostering a community that supports one another while
          creating an enjoyable shopping experience for everyone.
        </p>
        <h3 className="text-2xl font-semibold text-[#E0C340] mb-4">Our Vision</h3>
        <p className="text-lg text-white">
          Our vision is to be the leading ecommerce platform for local shops and
          small businesses, where users can shop, interact, and bargain in real-time.
          We aim to create a marketplace that promotes transparency, trust, and a sense
          of belonging for both buyers and sellers.
        </p>
      </div>
    </div>
  );
};

export default About;
