

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const CustomShirtPreview = ({ customData, className = "" }) => {
  const [selectedSide, setSelectedSide] = useState("front");
  const design = customData?.designs?.[selectedSide];
  const color = customData?.color || "white";

  return (
    <div className={`relative w-full h-full group ${className}`}>
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {["front", "back"].map((side) => (
          <button
            key={side}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSide(side);
            }}
            className={`px-2 py-1 text-xs rounded shadow-md transform hover:scale-105 transition-all ${
              selectedSide === side ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            {side.charAt(0).toUpperCase() + side.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <img 
          src={assets[`${color}-shirt${selectedSide === "back" ? "-back" : ""}`]} 
          alt={`${selectedSide} view`}
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
        />
        
        {design?.text && (
          <div
            style={{
              position: "absolute",
              left: `${design.textPosition?.x}%`,
              top: `${design.textPosition?.y}%`,
              transform: "translate(-50%, -50%)",
              color: design.textColor,
              fontSize: `${design.fontSize}px`,
              fontFamily: design.fontFamily,
              whiteSpace: "nowrap",
              textAlign: "center",
              userSelect: "none",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {design.text}
          </div>
        )}

        {design?.image && (
          <img
            src={design.image}
            alt="Custom design"
            style={{
              position: "absolute",
              left: `${design.imagePosition?.x}%`,
              top: `${design.imagePosition?.y}%`,
              width: `${design.imageSize}px`,
              height: `${design.imageSize}px`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              userSelect: "none",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
            }}
          />
        )}
      </div>
    </div>
  );
};

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate, customShirtTemplate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    try {
      let tempData = [];
      for (const itemId in cartItems) {
        const item = cartItems[itemId];
        
        if (item.custom) {
          tempData.push({
            _id: itemId,
            size: item.size,
            quantity: item.quantity,
            custom: true,
            customData: item.customData,
            name: "Custom T-Shirt",
            price: customShirtTemplate.price,
          });
        } else {
          for (const size in item) {
            if (item[size] > 0) {
              const product = products.find((p) => p._id === itemId);
              tempData.push({
                _id: itemId,
                size: size,
                quantity: item[size],
                custom: false,
                name: product?.name || "Unknown Product",
                price: product?.price || 0,
              });
            }
          }
        }
      }
      setCartData(tempData);
    } catch (error) {
      console.error("Error processing cart data:", error);
    }
  }, [cartItems, products, customShirtTemplate]);

  const getProductData = (item) => {
    if (item.custom) {
      return {
        name: "Custom T-Shirt",
        price: customShirtTemplate.price,
        image: [assets[`${item.customData?.color || 'white'}-shirt`]],
      };
    }
    return products.find((product) => product._id === item._id) || {};
  };

  return (
    <div className="border-t-4 border-purple-600 p-8 sm:p-10 bg-gradient-to-br from-white via-purple-50 to-purple-200 shadow-xl rounded-lg transition-all duration-500 ease-in-out hover:bg-gradient-to-br hover:shadow-2xl">
      <div className="text-3xl sm:text-4xl font-bold text-purple-700 mb-6 hover:text-indigo-400 transition-colors duration-300">
        <Title text1={"YOUR"} text2={"  BAG"} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-xl animate-pulse">
            🛒 Your cart is empty.
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = getProductData(item);
            
            if (!productData.name) return null; // Skip if product data is not found

            return (
              <div
                key={index}
                className="py-6 border-t border-b border-gray-300 grid grid-cols-1 sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-6 hover:bg-purple-200 transition-all duration-500 rounded-md hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-start gap-7">
                  {item.custom ? (
                    <div className="w-16 sm:w-24 h-16 sm:h-24">
                      <CustomShirtPreview
                        customData={item.customData}
                      />
                    </div>
                  ) : (
                    <img
                      src={productData.image[0]}
                      className="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded-md shadow-md transition-transform duration-500 hover:scale-110 hover:shadow-xl hover:rotate-[2deg]"
                      alt={productData.name}
                    />
                  )}
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-800 hover:text-indigo-500 transition-colors duration-300">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-sm text-gray-600 hover:text-green-500 transition duration-300">
                        {currency} {productData.price}
                      </p>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full hover:bg-indigo-300 transition-all duration-500 hover:shadow-md">
                        {item.size}
                      </span>
                      {item.custom && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full hover:bg-indigo-300 transition-all duration-500 hover:shadow-md">
                          {item.customData?.color || 'White'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && value !== "0") {
                      updateQuantity(item._id, item.size, Number(value));
                    }
                  }}
                  className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-center hover:border-indigo-400 transition-all duration-500 hover:shadow-md"
                  type="number"
                  min={1}
                  value={item.quantity}
                />

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 h-5 cursor-pointer hover:scale-110 hover:text-purple-600 transition-transform duration-500 hover:rotate-[2deg]"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-xl transition-all duration-500 ease-in-out hover:shadow-gray-500 hover:scale-[1.04]">
              <button
                onClick={() => navigate("/place-order", { state: { items: cartData } })}
                className="bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white text-sm py-3 px-6 rounded-md transition duration-300 ease-in-out hover:from-gray-900 hover:via-black hover:to-gray-800 hover:shadow-xl hover:scale-105 hover:text-yellow-300 active:scale-95 active:bg-gray-900"
              >
                🛍️{" "}
                <span className="font-semibold tracking-wider uppercase">
                  Proceed to Checkout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;