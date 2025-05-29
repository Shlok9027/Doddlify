
import express from "express";
import {
  placedOrder,
  placedOrderStripe,
//   placedOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
//   verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authh.js";

const orderRouter = express.Router();

// Addmin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placedOrder);
orderRouter.post("/stripe", authUser, placedOrderStripe);
// orderRouter.post("/razorpay", authUser, placedOrderRazorpay);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

// Verify Payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
// orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRouter;