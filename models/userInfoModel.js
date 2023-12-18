const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  nameOnCard: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cvc: { type: String, required: true },
  expDate: { type: String, required: true },
},{ timestamps: true });

const UserInfo = mongoose.model("userInfo", userInfoSchema);
module.exports = UserInfo;
