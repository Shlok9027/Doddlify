import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d643ad] via-[#c6a2a8] to-[#f5f5f5] text-white px-6 py-16">
      
      {/* Title */}
      <div className="text-center mb-14">
        <Title
          text1="CONNECT"
          text2=" WITH US"
          className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 transform hover:scale-105 transition-transform duration-500"
        />
        <p className="mt-4 text-gray-200 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          We're here to help! Whether it's a question, suggestion, or just a hello, reach out — we’d love to hear from you.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-6xl mx-auto mt-10">
        
        {/* Image */}
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full max-w-sm md:max-w-md rounded-3xl shadow-xl shadow-pink-500/30 transform hover:scale-105 transition-transform duration-500"
        />

        {/* Contact Info */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-lg text-white w-full max-w-xl transition-all duration-500 hover:shadow-yellow-300/30">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6">📍 Visit Our Space</h2>
          <p className="text-base leading-relaxed text-gray-100 mb-4">
            <span className="font-semibold text-cyan-300">Location:</span> <br />
            Konka Kalal Toli, Church Road, Ranchi, Jharkhand – 834001, India
          </p>
          <p className="text-base leading-relaxed text-gray-100 mb-4">
            <span className="font-semibold text-green-300">Phone:</span> <br />
            +91 (415) 333-0123
          </p>
          <p className="text-base leading-relaxed text-gray-100">
            <span className="font-semibold text-red-300">Email:</span> <br />
            <a
              href="mailto:admin@doddlify.com"
              className="text-blue-400 hover:text-orange-400 underline transition-colors duration-300"
            >
              admin@doddlify.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
