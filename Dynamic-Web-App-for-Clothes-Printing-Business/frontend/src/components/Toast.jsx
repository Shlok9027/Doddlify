// Toast.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="z-50"
      toastClassName={({ type }) => {
        switch (type) {
          case "success":
            return "bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg p-4 my-3";
          case "error":
            return "bg-gradient-to-r from-red-500 via-orange-600 to-yellow-500 text-white font-medium rounded-lg shadow-lg p-4 my-3";
          case "info":
            return "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg p-4 my-3";
          case "warning":
            return "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white font-medium rounded-lg shadow-lg p-4 my-3";
          default:
            return "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white font-medium rounded-lg shadow-lg p-4 my-3";
        }
      }}
      progressClassName="bg-pink-300"
    />
  );
};

export default Toast;
