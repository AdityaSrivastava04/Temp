import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPaintBrush,
  FaChartLine,
  FaBullhorn,
  FaWallet,
  FaLaptop,
  FaCode,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

const categories = [
  { name: "Design", jobs: 235, icon: <FaPaintBrush /> },
  { name: "Sales", jobs: 756, icon: <FaChartLine /> },
  { name: "Marketing", jobs: 140, icon: <FaBullhorn /> },
  { name: "Finance", jobs: 325, icon: <FaWallet /> },
  { name: "Technology", jobs: 436, icon: <FaLaptop /> },
  { name: "Engineering", jobs: 542, icon: <FaCode /> },
  { name: "Business", jobs: 211, icon: <FaBriefcase /> },
  { name: "Human Resource", jobs: 346, icon: <FaUsers /> },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-15 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-[#3B8BEB] bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Explore by
            </span>{" "}
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              category
            </span>
          </h2>
          <p className="text-lg text-gray-500 mt-3">
            Discover jobs across various industries and specialties
          </p>
        </div>
        <button
          className="flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 group cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Show all jobs
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative p-8 border border-gray-200 rounded-xl bg-white hover:bg-gradient-to-br from-blue-50 to-white transition-all duration-300 shadow-sm hover:shadow-lg group overflow-hidden cursor-pointer"
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
          >
            {/* Background decoration (appears on hover) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-gray-500 font-medium flex items-center">
                {category.jobs.toLocaleString()} jobs
                <span className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;