import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const icons = [
  {
    name: "facebook",
    url: "https://www.facebook.com/",
    icon: <FaFacebook/>,
  },
  {
    name: "twitter",
    url: "https://twitter.com/",
    icon: <FaTwitter/>,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/",
    icon: <FaInstagram/>,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/",
    icon: <FaLinkedin/>,
  },
];

const company = [
  {
    name: "New Arrivals",
    url: "/#new",
  },
  {
    name: "Discount",
    url: "/#sale",
  },
  {
    name: "Mobile App",
    url: "/#mobile",
  },
  {
    name: "Young's Favourite",
    url: "/#young",
  },
];

const quickLinks = [
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Brands",
    url: "/#brands",
  },
  {
    name: "Community",
    url: "/#community",
  },
];

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="text-white px-10 py-16 max-w-screen-2xl mx-auto">
        <div className="flex justify-between flex-wrap gap-8 lg:gap-0">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Complete Corner</h1>
            <p className="text-gray-500">
              Complete your style with awesome clothes from us.
            </p>
            <div className="flex gap-4 items-center">
              {icons.map((icon) => (
                <a
                  key={icon.name}
                  href={icon.url}
                  target="_blank"
                  className="bg-amber-300 p-2 text-black rounded-lg text-xl hover:text-amber-300 hover:bg-black hover:scale-105"
                  style={{ fontSize: "2rem" }}
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl text-[#8E8E8E]">Company</h3>
            {company.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className="text-gray-500 block hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-xl text-[#8E8E8E]">Quick Links</h3>
            {quickLinks.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className="text-gray-500 block hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-xl text-[#8E8E8E]">Legal</h3>
            <Link to={"/"} className="text-gray-500 block hover:text-white">
              Terms & Conditions
            </Link>
            <Link to={"/"} className="text-gray-500 block hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="container mx-auto flex justify-center">
            <p className="text-center text-white">
              Junaid Sarwar &copy; All rights Reserved. 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
