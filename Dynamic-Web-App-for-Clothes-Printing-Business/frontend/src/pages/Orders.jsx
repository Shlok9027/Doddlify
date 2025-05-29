import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { FaShippingFast } from "react-icons/fa";
import { assets } from "../assets/assets";

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
              selectedSide === side
                ? "bg-purple-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {side.charAt(0).toUpperCase() + side.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <img
          src={
            assets[`${color}-shirt${selectedSide === "back" ? "-back" : ""}`]
          }
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

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        // Show latest orders at the top
        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders.");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t-4 border-indigo-600 py-10 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-white via-indigo-50 to-indigo-200 min-h-screen">
      <div className="text-4xl font-bold text-indigo-700 mb-8 text-center animate-fade-in-up">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-xl animate-pulse">
          😔 You haven't placed any orders yet.
        </div>
      ) : (
        <div className="space-y-8">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-[1.02] border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-6"
            >
              <div className="flex items-start gap-6">
                {item.custom ? (
                  <div className="w-20 h-20">
                    <CustomShirtPreview customData={item.customData} />
                  </div>
                ) : (
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-md hover:scale-105 transition duration-300"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition">
                    {item.name}
                    {item.custom && (
                      <span className="ml-2 text-purple-600 font-semibold">
                        [Custom]
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-gray-600 text-sm">
                    <p>
                      <span className="font-medium">Price:</span> {currency}
                      {item.price}
                    </p>
                    <p>
                      <span className="font-medium">Qty:</span> {item.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span> {item.size}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Payment:</span>{" "}
                      {item.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4 sm:gap-6">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-sm text-sm font-semibold transition-all duration-300
    ${
      item.status === "Cancelled"
        ? "bg-red-100 text-red-700"
        : item.status === "Delivered"
        ? "bg-green-100 text-green-700"
        : item.status === "Packing" || item.status === "Order Shipped"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      item.status === "Cancelled"
                        ? "bg-red-500"
                        : item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Packing" ||
                          item.status === "Order Shipped"
                        ? "bg-blue-500"
                        : "bg-yellow-400"
                    }`}
                  ></span>
                  <span>{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-500 hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  <FaShippingFast />
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
