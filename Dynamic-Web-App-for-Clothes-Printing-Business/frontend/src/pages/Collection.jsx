import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';

import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    category.includes(value)
      ? setCategory((prev) => prev.filter((item) => item !== value))
      : setCategory((prev) => [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    subCategory.includes(value)
      ? setSubCategory((prev) => prev.filter((item) => item !== value))
      : setSubCategory((prev) => [...prev, value]);
  };

  const applyFilter = () => {
    if (!products || products.length === 0) return;

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    if (filterProducts.length === 0) return;

    let filteredProdCopy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filteredProdCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(filteredProdCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        setFilterProducts(() => {
          applyFilter();
        });
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen px-4 sm:px-10">
      {/* Filter Option */}
      <div className="min-w-60 bg-white shadow-xl rounded-xl p-5 transition-all hover:scale-[1.01] duration-300">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold text-gray-800 hover:text-black"
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-4 transition-transform duration-300 ${showFilter ? 'rotate-90' : ''} sm:hidden`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border-t border-gray-300 pt-4 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-bold text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <input
                type="checkbox"
                className="accent-blue-500"
                value={'Men'}
                onChange={toggleCategory}
              />
              MEN
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <input
                type="checkbox"
                className="accent-blue-500"
                value={'Women'}
                onChange={toggleCategory}
              />
              WOMEN
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <input
                type="checkbox"
                className="accent-blue-500"
                value={'Kids'}
                onChange={toggleCategory}
              />
              KIDS
            </label>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div
          className={`border-t border-gray-300 pt-4 mt-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-bold text-gray-700">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Topwear'}
                onChange={toggleSubCategory}
              />
              Topwear
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Ethnicwear'}
                onChange={toggleSubCategory}
              />
              Ethnicwear
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Trousers'}
                onChange={toggleSubCategory}
              />
              Trousers
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'T-Shirts'}
                onChange={toggleSubCategory}
              />
              T-Shirts
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Casual Shirts'}
                onChange={toggleSubCategory}
              />
             Casual Shirts
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <input
                type="checkbox"
                className="accent-green-500"
                value={'Casual Shirts'}
                onChange={toggleSubCategory}
              />
             Women's Sarees
            </label>
          </div>
        </div>
      </div>

      {/* Right Side --> Product List */}
      <div className="flex-1">
        {/* Title and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Title text1={'ENTIRE '} text2={'INVENTORY'} />
          <select
            onChange={(e) => {
              setSortType(e.target.value);
            }}
            value={sortType}
            className="border border-gray-300 text-sm rounded-lg px-3 py-2 hover:border-black transition-colors duration-300"
          >
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {filterProducts.map((product) => (
            <ProductItem 
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
