const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  cars: { type: Array, required: true },
  shipmentId: {type: Schema.Types.ObjectId, ref: "shipment" },
  status: { type: Boolean, default:false}
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
