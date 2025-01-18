import React from "react";

const TrendingCard = ({ img, title, cat }) => {
  return (
    <div className="w-[250px] sm:w-[400px] mx-auto">
      <div>
        <img src={img} alt={title} className="w-full h-auto rounded-lg" />
      </div>
      <a href={`/category/${cat}`} className="block mt-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium">{title}</h3>
            <span className="text-sm sm:text-lg text-medium text-gray-600 dark:text-gray-400">
              Explore Now!
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default TrendingCard;
