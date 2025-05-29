import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";



const Hero = () => {

  const {navigate} = useContext(ShopContext);

   const handleShopNowClick = () => {
    navigate("/collection"); 
  };
 

  return (
    /* Hero Section */
    <div className="flex flex-col sm:flex-row border border-gray-300 shadow-lg bg-gradient-to-r from-gray-100 via-gray-200 to-white">
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] space-y-4">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base tracking-wide uppercase text-gray-700 hover:text-gray-900 transition-colors duration-300">
              Best Sellers
            </p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed tracking-wide hover:scale-105 transition-transform duration-300">
            Fashion Carnival
          </h1>

          <div onClick={handleShopNowClick}  className="rata-regular flex items-center gap-2 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
            <p className="font-bold text-sm md:text-base tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-300">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#1b1a1a]"></p>
          </div>
        </div>
      </div>

      {/* Right Side (Image) */}
      <img
        src={assets.hero_img}
        alt=""
        className="w-full sm:w-1/2 object-cover hover:scale-105 transition-transform duration-500 rounded-md shadow-md"
      />
    </div>
  );
};

export default Hero;
