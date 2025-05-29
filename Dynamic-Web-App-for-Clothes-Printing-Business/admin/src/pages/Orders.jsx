import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const CustomShirtPreview = ({ customData, className = "", isFullPreview = false, onClick }) => {
  const [selectedSide, setSelectedSide] = useState("front");
  
  const designs = customData?.designs;
  const design = designs?.[selectedSide];
  const color = customData?.color || "white";
  const baseImageKey = `${color}-shirt${selectedSide === "back" ? "-back" : ""}`;
  const baseImage = assets[baseImageKey] || assets.parcel_icon; // Fallback to a generic icon

  if (!customData || !designs) { // Check if designs object itself is missing
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-100 text-xs text-slate-500 p-2 rounded-lg border border-slate-300 text-center ${className}`}>
        Design Data Missing
      </div>
    );
  }

  if (!design) { 
     const availableSide = Object.keys(designs).find(s => designs[s]);
     if (availableSide && designs[availableSide]) {
       
        return (
            <div className={`w-full h-full flex items-center justify-center bg-slate-100 text-xs text-slate-500 p-2 rounded-lg border border-slate-300 text-center ${className}`}>
                {`${selectedSide.charAt(0).toUpperCase() + selectedSide.slice(1)} view not available`}
                {isFullPreview && Object.keys(designs).length > 0 && (
                     <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                     {["front", "back"].map((side) => (
                       designs[side] && ( // Only show buttons for sides that have designs
                         <button
                           key={side}
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedSide(side);
                           }}
                           className={`px-3 py-1.5 text-xs rounded-md shadow-lg transition-all ${
                             selectedSide === side ? "bg-indigo-600 text-white" : "bg-white hover:bg-slate-200 text-slate-700"
                           }`}
                         >
                           {side.toUpperCase()}
                         </button>
                       )
                     ))}
                   </div>
                )}
            </div>
        );
     }
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-100 text-xs text-slate-500 p-2 rounded-lg border border-slate-300 text-center ${className}`}>
        Preview Unavailable
      </div>
    );
  }


  // Determine scale factor for full preview
  const scaleFactor = isFullPreview ? 1.75 : 1; // Adjusted scale factor for better visuals
  const defaultFontSize = 20; // Base font size for small preview
  const defaultImageSize = 40; // Base image size for small preview


  return (
    <div className={`relative group ${className} overflow-hidden`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {isFullPreview && Object.keys(designs).length > 1 && ( // Show side selectors only if multiple designs exist
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 p-1 bg-slate-500 bg-opacity-20 rounded-full">
          {["front", "back"].map((side) => (
            designs[side] && ( // Only show buttons for sides that have designs
              <button
                key={side}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSide(side);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-md transition-all focus:outline-none ${
                  selectedSide === side ? "bg-indigo-600 text-white" : "bg-white hover:bg-slate-100 text-slate-700"
                }`}
              >
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </button>
            )
          ))}
        </div>
      )}

      <img
        src={baseImage}
        alt={`${color} shirt ${selectedSide} view`}
        className="w-full h-full object-contain rounded-md" // ensure rounded corners if parent has them
      />

      {/* Render text */}
      {design.text && (
        <div
          style={{
            position: "absolute",
            left: `${design.textPosition?.x || 50}%`,
            top: `${design.textPosition?.y || 50}%`,
            transform: "translate(-50%, -50%)",
            color: design.textColor || "#000000",
            fontSize: `${(parseFloat(design.fontSize) || defaultFontSize) * scaleFactor}px`,
            fontFamily: design.fontFamily || "Arial, sans-serif", // More common fallback
            whiteSpace: "nowrap",
            textAlign: "center",
            userSelect: "none",
            fontWeight: design.fontWeight || "normal", // Add fontWeight
            fontStyle: design.fontStyle || "normal",   // Add fontStyle
          }}
        >
          {design.text}
        </div>
      )}

      {/* Sticker/image */}
      {design.image && (
        <img
          src={design.image}
          alt="Custom design element"
          style={{
            position: "absolute",
            left: `${design.imagePosition?.x || 50}%`,
            top: `${design.imagePosition?.y || 50}%`,
            width: `${(parseFloat(design.imageSize) || defaultImageSize) * scaleFactor}px`,
            height: 'auto', // Maintain aspect ratio, assuming imageSize is width
            // If imageSize is a general dimension for square images, use it for height too:
            // height: `${(parseFloat(design.imageSize) || defaultImageSize) * scaleFactor}px`,
            transform: "translate(-50%, -50%) rotate(${design.imageRotation || 0}deg)", // Added rotation
            pointerEvents: "none",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [previewCustomData, setPreviewCustomData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by most recent
        toast.success("Orders successfully retrieved.");
      } else {
        toast.error(response.data.message || "Failed to retrieve orders.");
      }
    } catch (err) {
      toast.error("Error retrieving orders. Please check console for details.");
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders(); // Refetch to get the latest order list with updated status
        toast.success("Order status updated successfully.");
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (err) {
      toast.error("Error updating order status. Please try again.");
      console.error("Update status error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gradient-to-br from-slate-100 to-slate-300 min-h-screen">
      <header className="mb-8 md:mb-12">
        <h3 className="text-3xl sm:text-4xl font-bold text-center text-slate-800">
          📦 Order Management Dashboard
        </h3>
      </header>

      {loading ? (
        <div className="flex justify-center items-center my-20 text-lg text-slate-600">
          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Fetching orders, please wait...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center my-20 text-xl text-slate-500">
          There are currently no orders to display.
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[1fr_2.5fr_1.5fr_1fr_1.5fr] gap-4 md:gap-6 items-start bg-white border border-slate-200 shadow-lg rounded-xl p-4 md:p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image(s) Column */}
              <div className="flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-2 items-center justify-center md:items-start">
                {order.items.slice(0, 3).map((item, idx) => ( // Show max 3 item previews
                  <div key={idx} className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border border-slate-200 shrink-0">
                    {item.custom && item.customData ? (
                      <CustomShirtPreview
                        customData={item.customData}
                        className="cursor-pointer"
                        onClick={() => setPreviewCustomData(item.customData)}
                      />
                    ) : (
                      <img
                        src={item.image?.[0] || assets.parcel_icon}
                        alt={item.name || "Product image"}
                        className="w-full h-full object-cover rounded-md cursor-pointer"
                        onClick={() => setPreviewCustomData({ image: item.image?.[0], name: item.name })}
                      />
                    )}
                  </div>
                ))}
                {order.items.length > 3 && (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-semibold">
                        +{order.items.length - 3} more
                    </div>
                )}
              </div>

              {/* Items & Address Info Column */}
              <div className="text-slate-700 text-sm space-y-2">
                <div className="space-y-1">
                  <p className="font-semibold text-base text-slate-800">Order ID: <span className="font-normal text-slate-600">{order._id}</span></p>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-xs sm:text-sm">
                      <span className="font-semibold">{item.name}</span> × {item.quantity} 
                      {item.size && <span className="text-slate-500"> (Size: {item.size})</span>}
                      {item.custom && <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Custom Design</span>}
                    </p>
                  ))}
                </div>
                <hr className="my-2 border-slate-200" />
                <div className="space-y-0.5">
                    <p className="font-semibold text-slate-800">Shipping Address:</p>
                    <p><b>{order.address.firstName} {order.address.lastName}</b></p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pincode}
                    </p>
                    <p>Contact: <a href={`tel:${order.address.phone}`} className="text-indigo-600 hover:underline">{order.address.phone}</a></p>
                </div>
              </div>

              {/* Payment & Date Info Column */}
              <div className="text-sm space-y-1 text-slate-600">
                <p><strong className="text-slate-700">Total Items:</strong> {order.items.length}</p>
                <p><strong className="text-slate-700">Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong className="text-slate-700">Payment Status:</strong>{" "}
                  {order.payment ? (
                    <span className="text-green-600 font-semibold">Confirmed <span className="font-bold">✓</span></span>
                  ) : (
                    <span className="text-amber-600 font-semibold">Pending <span className="font-bold">⏳</span></span>
                  )}
                </p>
                <p><strong className="text-slate-700">Order Date:</strong> {new Date(order.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>

              {/* Total Amount Column */}
              <p className="text-lg sm:text-xl font-bold text-green-600 self-center text-center md:text-left">
                Total: {currency}{order.amount.toFixed(2)}
              </p>

              {/* Status Dropdown Column */}
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                aria-label={`Update status for order ${order._id}`}
              >
                <option value="Order Placed">📝 Order Placed</option>
                <option value="Processing">⚙️ Processing</option>
                <option value="Packing">📦 Packing</option>
                <option value="Order Shipped">🚚 Shipped</option>
                <option value="Out for Delivery">📍 Out for Delivery</option>
                <option value="Delivered">✅ Delivered</option>
                <option value="Cancelled">❌ Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewCustomData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setPreviewCustomData(null)}
        >
          <div 
            className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-semibold text-slate-800 mb-4 text-center">
              {previewCustomData.designs ? "Custom Design Preview" : (previewCustomData.name || "Product Preview")}
            </h4>
            
            {/* Check if it's a custom design object or a simple image object */}
            {previewCustomData.designs ? (
              <CustomShirtPreview 
                customData={previewCustomData} 
                isFullPreview 
                className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full bg-slate-100 rounded-lg" 
              />
            ) : (
              <img 
                src={previewCustomData.image} 
                alt={previewCustomData.name || "Product image"} 
                className="w-full max-h-[70vh] object-contain rounded-lg" 
              />
            )}
            <button
              className="mt-6 px-4 py-2.5 bg-red-600 text-white rounded-lg w-full font-semibold hover:bg-red-700 transition-colors text-sm sm:text-base"
              onClick={() => setPreviewCustomData(null)}
              aria-label="Close preview"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;