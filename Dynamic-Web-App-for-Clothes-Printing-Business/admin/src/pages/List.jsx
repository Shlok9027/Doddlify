import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-6 text-2xl font-bold text-gray-800">🛍️ All Products List</p>

      <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 flex flex-col gap-4">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 bg-gradient-to-r from-indigo-100 to-pink-100 text-sm font-semibold text-gray-800 rounded-xl shadow-md">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong className="text-center">Actions</strong>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-6 py-4 px-6 border border-gray-100 bg-white hover:bg-gray-50 transition-all duration-200 rounded-lg shadow-md"
          >
            <img
              src={item.image?.[0]}
              alt="product"
              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
            />
            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-lg text-gray-700 font-medium">
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-600 hover:text-red-800 text-xl text-right md:text-center transition-all duration-200"
              title="Remove product"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
