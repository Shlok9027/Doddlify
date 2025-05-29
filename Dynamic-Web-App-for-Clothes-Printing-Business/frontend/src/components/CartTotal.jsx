


import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal + (subtotal > 0 ? delivery_fee : 0);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl transition duration-500 hover:shadow-purple-300">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
          Order Summary
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Review your order summary before proceeding to checkout.
        </p>
      </div>

      <div className="flex justify-center gap-6 text-xs text-gray-500 mb-4">
        <p>📦 Cart Items</p>
        <p>🚚 Shipping Cost</p>
        <p>🔒 Secured Payment</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl border border-purple-300 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <p className="text-sm text-gray-700 mb-1">Subtotal</p>
          <div className="text-xl font-semibold text-purple-800">
            {currency} {subtotal}.00
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl border border-indigo-300 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <p className="text-sm text-gray-700 mb-1">Shipping Fee</p>
          <div className="text-xl font-semibold text-indigo-800">
            {currency} {delivery_fee}
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded-xl border border-purple-700 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
          <p className="text-sm text-white/80 mb-1">Total</p>
          <div className="text-xl font-bold">
            {currency} {total}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        {subtotal > 0 && (
          <p className="text-sm text-green-600 font-medium mb-3">
           
          </p>
        )}
        <p className="text-sm text-gray-600 italic">
          🛡️ Your payment is secured with 256-bit encryption.
        </p>
      </div>
    </div>
  );
};

export default CartTotal;