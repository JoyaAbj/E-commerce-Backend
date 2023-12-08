const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "seller", "customer"], required: true },
},{ timestamps: true });

const Users = mongoose.model("users", userSchema);
module.exports = Users;
