import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const location = useLocation();


  useEffect(() => {
    setVisible(
      location.pathname.startsWith("/collection") ||
        location.pathname === "/" ||
        location.pathname.startsWith("/customize")
    );
  }, [location.pathname]);

  return showSearch && visible ? (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md py-4 shadow-lg transition-all duration-300 border-b border-gray-200">
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img
            className="w-5 h-5 text-gray-400"
            src={assets.search_icon}
            alt="Search Icon"
          />
        </div>
        <input
          className="w-full pl-10 pr-10 py-2.5 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-transparent rounded-full
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-300 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for products..."
        />
        <button
          onClick={() => setShowSearch(false)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
        >
          <img
            className="w-5 h-5 text-gray-400 hover:text-gray-700 transition-colors"
            src={assets.cross_icon}
            alt="Close Search"
          />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
