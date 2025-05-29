

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Make _id optional
      customId: { type: String, required: false }, // Add customId for custom products
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
      image: { type: Array, default: [] },
      custom: { type: Boolean, default: false },
      customData: { type: Object, default: null },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;