const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  cars: { type: [mongoose.Schema.Types.ObjectId],ref:'cars', required: true },
  shipmentId: {type: mongoose.Schema.Types.ObjectId, ref: "shipment" },
  status: { type: Boolean, default:false}
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
