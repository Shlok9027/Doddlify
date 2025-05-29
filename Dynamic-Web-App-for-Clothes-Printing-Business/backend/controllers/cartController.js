

import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, customData } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (customData) {
      // Handle custom products
      const customKey = `${itemId}-${Date.now()}`; // Unique key for custom products
      if (cartData[customKey]) {
        cartData[customKey].quantity += 1;
      } else {
        cartData[customKey] = {
          size,
          custom: true,
          customData,
          quantity: 1,
        };
      }
    } else {
      // Handle regular products
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product added to cart", cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update product in user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

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

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    res.json({
      success: true,
      cartData,
      message: "Cart data retrieved",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };