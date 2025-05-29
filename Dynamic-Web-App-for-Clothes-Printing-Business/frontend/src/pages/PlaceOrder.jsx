
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    customShirtTemplate,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmithandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      // Handle regular and custom products
      for (const productId in cartItems) {
        const item = cartItems[productId];
        if (item.custom) {
          // Handle custom products
          orderItems.push({
            customId: productId, // Use customId instead of _id
            name: "Custom T-Shirt",
            price: customShirtTemplate.price,
            quantity: item.quantity,
            size: item.size,
            custom: true,
            customData: item.customData,
          });
        } else {
          // Handle regular products
          for (const size in item) {
            const quantity = item[size];
            if (quantity > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === productId)
              );
              if (itemInfo) {
                itemInfo.size = size;
                itemInfo.quantity = quantity;
                orderItems.push(itemInfo);
              }
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully!");
          } else {
            toast.error(response.data.message || "Failed to place order");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message || "Failed to place order");
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Order placing error:", error);
      toast.error("Something went wrong placing your order. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-25 ms:pt-14 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={" INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangehandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
            placeholder="First Name"
            type="text"
            id=""
          />

          <input
            required
            onChange={onChangehandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
            placeholder="Last Name"
            type="text"
            id=""
          />
        </div>

        <input
          required
          onChange={onChangehandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
          placeholder="E-mail Address"
          type="email"
          id=""
        />

        <input
          required
          onChange={onChangehandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
          placeholder="Street"
          type="text"
          id=""
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangehandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
            placeholder="City"
            type="text"
            id=""
          />

          <input
            required
            onChange={onChangehandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
            placeholder="State"
            type="text"
            id=""
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangehandler}
            name="pincode"
            value={formData.pincode}
            className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
            placeholder="PinCode"
            type="number"
            id=""
          />

          <input
            required
            onChange={onChangehandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
            placeholder="Country"
            type="text"
            id=""
          />
        </div>
        <input
          required
          onChange={onChangehandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded-py py-1.5 px-3.5 w-full "
          placeholder="Phone"
          type="number"
          id=""
        />
      </div>

      {/*   ================================= Right Side ============================== */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12"></div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"  METHOD"} />

          {/* ========================== payment selection method ============================ */}

          <div className="flex flex-row gap-8 justify-center items-center w-full p-4">
            {/* Stripe Option */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-4 border p-4 px-6 cursor-pointer rounded-lg hover:bg-gray-200 transition-all duration-300 transform ${
                method === "stripe" ? "bg-gray-700 text-white" : "text-gray-700"
              }`}
            >
              <img
                className="h-8 mx-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-110"
                src={assets.stripe_logo}
                alt="Stripe Logo"
              />
              <p
                className={`text-sm font-medium ${
                  method === "stripe" ? "text-white" : "text-gray-700"
                }`}
              ></p>
            </div>

            {/* Razorpay Option */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-4 border p-4 px-6 cursor-pointer rounded-lg hover:bg-gray-200 transition-all duration-300 transform ${
                method === "razorpay"
                  ? "bg-gray-700 text-white"
                  : "text-gray-700"
              }`}
            >
              <img
                className="h-8 mx-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-110"
                src={assets.razorpay_logo}
                alt="Razorpay Logo"
              />
              <p
                className={`text-sm font-medium ${
                  method === "razorpay" ? "text-white" : "text-gray-700"
                }`}
              ></p>
            </div>

            {/* COD Option */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-4 border p-4 px-6 cursor-pointer rounded-lg hover:bg-gray-200 transition-all duration-300 transform ${
                method === "cod" ? "bg-gray-700 text-white" : "text-gray-700"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  method === "cod" ? "text-white" : "text-gray-700"
                }`}
              >
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-center mt-8 mb-20">
            <button
              type="submit"
              className="relative inline-block text-sm font-medium group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full opacity-30 blur-md group-hover:opacity-100 transition duration-500 ease-in-out"></span>
              <span className="relative text-gray-950 px-16 py-4 rounded-full border-2 border-transparent group-hover:border-white transition-all duration-300 ease-in-out">
                CONFIRM & PAY
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;