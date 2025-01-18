import React from "react";
import Image1 from "../../assets/images/sectionsImages/Rectangle 25.png";
import Image2 from "../../assets/images/sectionsImages/Rectangle 26.png";
import Image3 from "../../assets/images/sectionsImages/Rectangle 23.jpg";
import TrendingCard from "./TrendingCard";

const Heading = ({ label, className }) => (
  <h2 className={className}>{label}</h2>
);

const trendingArrival = [
  {
    image: Image1,
    title: "Groceries",
    cat: "groceries",
  },
  {
    image: Image2,
    title: "Beauty Products",
    cat: "beauty-products",
  },
  {
    image: Image3,
    title: "Furniture & Woods",
    cat: "furniture sofa",
  },
];

const TrendingSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div id="new">
        <Heading label="Trendings" className="text-3xl sm:text-3xl font-bold" />
        <div className="flex py-16 justify-between flex-wrap gap-8 lg:gap-0">
          {trendingArrival.map(({ image, title, cat }) => (
            <a href={`/category/${cat}`} key={cat}>
              <TrendingCard img={image} title={title} cat={cat} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
