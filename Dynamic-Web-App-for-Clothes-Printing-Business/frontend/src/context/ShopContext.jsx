

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const customShirtTemplate = {
  _id: "custom-shirt",
  name: "Custom T-Shirt",
  price: 1499, // Match the price shown in Customize.jsx
  image: [],
  sizes: ["S", "M", "L", "XL"],
  description: "Design your own personalized T-shirt.",
  category: "custom",
};

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 49;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Generate a unique key for custom products
  const getCustomDesignKey = (baseId, customData) => {
    return `${baseId}-${btoa(JSON.stringify(customData))}`;
  };

  // Add to Cart (Handle both regular and custom products)
  const addToCart = async (itemId, size, customData = null) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (customData) {
      const key = getCustomDesignKey(itemId, customData);
      if (cartData[key]) {
        cartData[key].quantity += 1;
      } else {
        cartData[key] = {
          size,
          custom: true,
          customData,
          quantity: 1,
        };
      }
    } else {
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {
          [size]: 1,
        };
      }
    }

    setCartItems(cartData);

    // Save to backend if user is logged in
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size, customData }, // Include customData in the request
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData); // Update cartItems with backend data
          toast.success("Added to cart!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart. Please try again.");
      }
    }
  };

  // Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (item.custom) {
        totalCount += item.quantity || 0; 
      } else {
        for (const size in item) {
          if (item[size] > 0) {
            totalCount += item[size];
          }
        }
      }
    }
    return totalCount;
  };

  // Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]?.custom) {
      if (quantity === 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId].quantity = quantity;
      }
    } else {
      if (quantity === 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }
    }

    setCartItems(cartData);

    // Update backend if user is logged in
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData); // Update cartItems with backend data
          toast.success("Cart updated!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("Failed to update cart. Please try again.");
      }
    }
  };

  // Get Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const item = cartItems[itemId];

      if (item.custom) {
        totalAmount += item.quantity * customShirtTemplate.price;
      } else {
        const productInfo = products.find((p) => p._id === itemId);
        if (productInfo) {
          for (const size in item) {
            totalAmount += productInfo.price * item[size];
          }
        }
      }
    }

    return totalAmount;
  };

  // Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    }
  };

  // Fetch User Cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {}); // Ensure cartItems is updated with backend data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to fetch cart. Please try again.");
    }
  };

  // Load Products and Cart on Mount
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  // Clear Cart
  const clearCart = () => {
    setCartItems({});
    toast.success("Cart cleared!");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    clearCart,
    navigate,
    customShirtTemplate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;