import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  return (
    <div className="w-[20%] min-h-screen bg-gradient-to-b from-white via-gray-100 to-slate-200 shadow-md border-r border-gray-300 backdrop-blur-sm">
      <div className="flex flex-col pt-6 gap-4 pl-[20%] text-[15px]">
        {/* Add Items */}
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2 rounded-l-xl transition-all duration-300 ease-in-out
      bg-white/60 hover:bg-violet-100 hover:border-violet-300 hover:shadow-[0_2px_10px_rgba(139,92,246,0.2)] hover:scale-[1.02] active:bg-violet-200"
          to="/add"
        >
          <img
            className="w-5 h-5 transition-transform duration-300 hover:rotate-6"
            src={assets.add_icon}
            alt="Add"
          />
          <p className="hidden md:block text-gray-700 group-hover:text-violet-700">
            New Item
          </p>
        </NavLink>

        {/* List Items */}
        <NavLink
          className="flex items-center gap-3 border border-blue-200 border-r-0 px-4 py-2 rounded-l-xl transition-all duration-300 ease-in-out 
      bg-white/60 hover:bg-sky-100 hover:border-sky-300 hover:shadow-[0_2px_10px_rgba(56,189,248,0.2)] hover:scale-[1.02] active:bg-sky-200"
          to="/list"
        >
          <img
            className="w-5 h-5 transition-transform duration-300 hover:rotate-6"
            src={assets.list_icon}
            alt="List"
          />
          <p className="hidden md:block text-blue-700 group-hover:text-sky-700">
            Product List
          </p>
        </NavLink>

        {/* Order */}
        <NavLink
          className="flex items-center gap-3 border border-green-200 border-r-0 px-4 py-2 rounded-l-xl transition-all duration-300 ease-in-out 
      bg-white/60 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-[0_2px_10px_rgba(52,211,153,0.2)] hover:scale-[1.02] active:bg-emerald-200"
          to="/order"
        >
          <img
            className="w-5 h-5 transition-transform duration-300 hover:rotate-6"
            src={assets.order_icon}
            alt="Order"
          />
          <p className="hidden md:block text-green-700 group-hover:text-emerald-700">
            Order
          </p>
        </NavLink>
      </div>
      
    </div>
    
  );
};

export default SideBar;
