const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  cars: [{ type: mongoose.Schema.Types.ObjectId,ref:'cars'}],
  shipmentId: {type: mongoose.Schema.Types.ObjectId, ref: "shipment" },
  status: { type: Boolean, default:false}
},{ timestamps: true });

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
