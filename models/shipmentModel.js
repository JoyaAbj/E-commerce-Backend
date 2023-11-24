const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  location: {type: String, required:true},
  duration: { type: String, required:true}
});

const Shipment = mongoose.model("shipment", shipmentSchema);
module.exports = Shipment;