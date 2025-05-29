import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
  


    <div className="bg-gray-100 text-gray-900 py-10 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 opacity-30 blur-md"></div>

  <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-8 relative z-10">
    <div className="transition transform hover:scale-105">
      <img src={assets.logo} className="mb-5 w-32 opacity-90 hover:opacity-100" alt="Doddlify Logo" />
      <p className="w-full md:w-2/3 text-gray-800 leading-relaxed">
        Discover a seamless shopping experience with Doddlify. Quality, convenience, and trust—all in one place.
      </p>
      <p className="mt-4 text-sm text-purple-700 italic opacity-80">
        "Empowering better shopping, one click at a time."
      </p>
    </div>

    <div className="transition transform hover:scale-105">
      <p className="text-xl font-semibold mb-5 text-gray-800">Company</p>
      <ul className="flex flex-col gap-2 text-gray-700 hover:text-gray-900">
        <li className="cursor-pointer hover:underline hover:text-purple-600 transition-all duration-300">Home</li>
        <li className="cursor-pointer hover:underline hover:text-purple-600 transition-all duration-300">About Us</li>
        <li className="cursor-pointer hover:underline hover:text-purple-600 transition-all duration-300">Delivery</li>
        <li className="cursor-pointer hover:underline hover:text-purple-600 transition-all duration-300">Privacy Policy</li>
      </ul>
    </div>

    <div className="transition transform hover:scale-105">
      <p className="text-xl font-semibold mb-5 text-gray-800">Get In Touch</p>
      <ul className="flex flex-col gap-2 text-gray-700 hover:text-gray-900">
        <li className="cursor-pointer hover:underline hover:text-purple-600 transition-all duration-300">📞 +1-234-234-8754</li>
        <li className="cursor-pointer hover:underline hover:text-purple-600 transition-all duration-300">📧 contact@doddlify.com</li>
      </ul>
      <p className="mt-4 text-sm text-gray-600">
        Our support team is available <span className="text-purple-600 font-semibold">24/7</span>. Let’s connect!
      </p>
    </div>
  </div>

  <div className="mt-10 relative z-10">
    <hr className="border-gray-300" />
    <p className="py-5 text-sm text-center text-gray-700">© 2025 Doddlify - All Rights Reserved</p>
  </div>
</div>
  );
};

export default Footer;
