import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#a5d3e7] via-[#d18dc0] to-[#2c5364] text-white px-6 py-16">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <Title
          text1="WHO"
          text2=" WE ARE"
          className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 drop-shadow-md transform hover:scale-105 transition-transform duration-500"
        />
        <p className="text-base sm:text-lg mt-4 max-w-3xl mx-auto text-gray-200 leading-relaxed">
          At <span className="font-bold text-yellow-300">Doddify</span>, we're not just about clothing – we're about creating an identity. Our platform empowers you to wear your imagination, with every piece tailored to tell your story.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl">
        
        {/* Image Section */}
        <img
          src={assets.about_img}
          alt="Doddify About"
          className="w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl shadow-yellow-500/30 transform hover:scale-105 transition-transform duration-500"
        />

        {/* Mission Section */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-white shadow-lg transition-all duration-500 hover:shadow-indigo-400 max-w-xl w-full">
          <h2 className="text-3xl font-extrabold mb-4 text-cyan-300">Our Vision</h2>
          <p className="text-md leading-relaxed text-gray-100">
            We envision a world where fashion is fully expressive, sustainable, and customizable. At <span className="font-semibold text-yellow-300">Doddify</span>, creativity knows no boundaries. Our goal is to bring bold ideas and personal flair to life—one custom piece at a time.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mt-20">
        <Title
          text1="WHAT"
          text2=" SETS US APART"
          className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14 w-full max-w-6xl">
        {[
          {
            icon: "🧵",
            title: "Crafted to Perfection",
            description: "Every stitch tells a story. We combine timeless techniques with futuristic design to bring your vision to life.",
            hoverBg: "hover:bg-pink-600/20",
          },
          {
            icon: "💡",
            title: "Designed by You",
            description: "With real-time customization, your design is your command. Personalize every element, your way.",
            hoverBg: "hover:bg-yellow-400/20",
          },
          {
            icon: "⚡",
            title: "Effortless Experience",
            description: "Seamless UI, lightning-fast checkout, and responsive support—crafted for ease from click to delivery.",
            hoverBg: "hover:bg-cyan-500/20",
          },
        ].map(({ icon, title, description, hoverBg }, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/10 transform transition-all duration-500 hover:scale-105 ${hoverBg}`}
          >
            <h3 className="text-xl font-bold mb-3 text-yellow-300">
              {icon} {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-200">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
