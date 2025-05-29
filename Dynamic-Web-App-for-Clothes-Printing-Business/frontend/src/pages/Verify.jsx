

import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        toast.error("Please log in to verify payment.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId, userId: token }, // Include userId
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment successful! Order placed.");
        navigate("/orders");
      } else {
        navigate("/cart");
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred during payment verification.");
      navigate("/cart");
    }
  };

  useEffect(() => {
    if (token && orderId) {
      verifyPayment();
    }
  }, [token, orderId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Verifying Payment...</h2>
        <p className="text-gray-600 mt-4">Please wait while we verify your payment.</p>
      </div>
    </div>
  );
};

export default Verify;
