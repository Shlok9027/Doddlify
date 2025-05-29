import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
   
    <div className="flex flex-col sm:flex-row justify-around gap-12 text-center py-20 px-5 text-sm sm:text-md md:text-lg  rounded-lg shadow-lg">
  <div className="p-5 rounded-xl transition transform hover:scale-105 hover:bg-blue-100">
    <img src={assets.exchange_icon} className="w-16 m-auto mb-4 opacity-90 hover:opacity-100" alt="Exchange Policy Icon" />
    <p className="font-bold text-gray-800">Hassle-Free Exchanges</p>
    <p className="text-gray-700">Easily swap your products at no extra cost.</p>
  </div>
  
  <div className="p-5 rounded-xl transition transform hover:scale-105 hover:bg-green-100">
    <img src={assets.quality_icon} className="w-16 m-auto mb-4 opacity-90 hover:opacity-100" alt="Return Policy Icon" />
    <p className="font-bold text-gray-800">7-Day Return Assurance</p>
    <p className="text-gray-700">Enjoy a worry-free return policy within 7 days.</p>
  </div>

  <div className="p-5 rounded-xl transition transform hover:scale-105 hover:bg-yellow-100">
    <img src={assets.support_img} className="w-16 m-auto mb-4 opacity-90 hover:opacity-100" alt="Customer Support Icon" />
    <p className="font-bold text-gray-800">Dedicated Customer Support</p>
    <p className="text-gray-700">Experience top-notch assistance whenever you need it.</p>
  </div>
</div>
  );
};

export default OurPolicy;
