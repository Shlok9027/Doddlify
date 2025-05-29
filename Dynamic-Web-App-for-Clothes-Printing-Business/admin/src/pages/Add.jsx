

import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loader, setLoader] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
   <form
  onSubmit={onSubmitHandler}
  className="w-full max-w-6xl mx-auto bg-gradient-to-r from-fuchsia-100 to-white p-8 rounded-2xl shadow-lg border border-b-neutral-900 flex flex-col gap-8"
>
  <h2 className="text-4xl font-extrabold text-center text-neutral-900 mb-6">
    ✨ Add New Product
  </h2>

  {/* Image Upload */}
  <div>
    <p className="font-semibold text-xl mb-3 text-neutral-700">Upload Images</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {[image1, image2, image3, image4].map((img, i) => (
        <label key={i} className="cursor-pointer group relative">
          <img
            src={img ? URL.createObjectURL(img) : assets.upload_area}
            alt={`image${i + 1}`}
            className="w-51 max-w-2xl   rounded-2xl border-2 border-dashed border-gray-300 group-hover:shadow-2xl transition-all duration-400"
          />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])
            }
          />
        </label>
      ))}
    </div>
  </div>

  {/* Product Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <label className="block font-semibold text-lg mb-2 text-neutral-700">Product Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-50 to-pink-200 transition-all duration-300 placeholder-neutral-400"
        placeholder="e.g. Classic Hoodie"
      />
    </div>
    <div>
      <label className="block font-semibold text-lg mb-2 text-neutral-700">Price (₹)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-yellow-50 to-yellow-200 transition-all duration-300 placeholder-neutral-400"
        placeholder="e.g. 999"
      />
    </div>
    <div>
      <label className="block font-semibold text-lg mb-2 text-neutral-700">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-green-50 to-green-200 transition-all duration-300"
      >
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>
    </div>
    <div>
      <label className="block font-semibold text-lg mb-2 text-neutral-700">Subcategory</label>
      <select
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-blue-50 to-blue-200 transition-all duration-300"
      >
        <option>Topwear</option>
        <option>Bottomwear</option>
        <option>Winterwear</option>
        <option>Ethnicwear</option>
                <option>Trousers</option>
                <option>T-Shirts</option>
                <option>Casual Shirts</option>
                <option>Women's Sarees</option>

      </select>
    </div>
  </div>

  {/* Description */}
  <div>
    <label className="block font-semibold text-lg mb-2 text-neutral-700">Description</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-neutral-50 to-neutral-100 transition-all duration-300 placeholder-neutral-400"
      rows={4}
      placeholder="Describe the product..."
    ></textarea>
  </div>

  {/* Sizes */}
  <div>
    <p className="font-semibold text-xl mb-3 text-neutral-700">Available Sizes</p>
    <div className="flex gap-4 flex-wrap">
      {["S", "M", "L", "XL", "XXL"].map((size, index) => {
        const sizeColors = [
          "bg-red-100 text-red-700 border-red-300",
          "bg-blue-100 text-blue-700 border-blue-300",
          "bg-green-100 text-green-700 border-green-300",
          "bg-yellow-100 text-yellow-700 border-yellow-300",
          "bg-purple-100 text-purple-700 border-purple-300"
        ];
        return (
          <div
            key={size}
            onClick={() => toggleSize(size)}
            className={`px-6 py-3 rounded-xl border text-md font-semibold cursor-pointer transition-all duration-300 transform
              ${sizes.includes(size)
                ? `${sizeColors[index]} shadow-lg scale-105`
                : "bg-gray-200 text-gray-700 border-gray-300 hover:scale-105 hover:bg-gray-300"}`}
          >
            {size}
          </div>
        );
      })}
    </div>
  </div>

  {/* Bestseller */}
  <div className="flex items-center gap-4 mt-4">
    <input
      type="checkbox"
      checked={bestseller}
      onChange={() => setBestseller(!bestseller)}
      className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
    />
    <label className="text-lg text-neutral-700 font-medium">Mark as Bestseller</label>
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="mt-6 w-full sm:w-fit px-10 py-4 bg-gradient-to-r from-neutral-900 to-pink-700 text-white font-bold rounded-xl hover:from-neutral-800 hover:to-pink-600 hover:scale-110 transition transform"
  >
    {loader ? "Submitting..." : "🚀 Add Product"}
  </button>
</form>

  );
};

export default Add;