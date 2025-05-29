


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "inr";
const deliveryCharge = 49;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing Order using COD Method
const placedOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Process items to include custom data
    const processedItems = items.map((item) => ({
      ...item,
      custom: item.custom || false,
      customData: item.customData || null,
      _id: item.custom ? undefined : item._id, // Remove _id for custom products
      customId: item.custom ? item.customId : undefined, // Add customId for custom products
    }));

    const orderData = {
      userId,
      items: processedItems,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Order using Stripe Method
const placedOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Process items to include custom data
    const processedItems = items.map((item) => ({
      ...item,
      custom: item.custom || false,
      customData: item.customData || null,
      _id: item.custom ? undefined : item._id, // Remove _id for custom products
      customId: item.custom ? item.customId : undefined, // Add customId for custom products
    }));

    const orderData = {
      userId,
      items: processedItems,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Create line_items for Stripe checkout session
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to paise (Stripe requires amount in smallest currency unit)
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as a separate line item
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100, // Convert to paise
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error placing order with Stripe:", error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error verifying Stripe payment:", error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders Data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: error.message });
  }
};

// User Orders Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placedOrder,
  placedOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};