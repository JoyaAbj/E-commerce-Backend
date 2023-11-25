const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  location: { type: String, required: true },
  nameOnCard: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  cvv: { type: Number, required: true },
  expDate: { type: Date, required: true },
});

const UserInfo = mongoose.model("userInfo", userInfoSchema);
module.exports = UserInfo;
