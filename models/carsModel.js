const { timeStamp } = require("console");
const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  initialPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  TVA:{type:Number, required:true},
  discount:{type: Number},
  quantity:{type: Number,required:true},
  image:{type:String,required:true},
  DOR:{type:Date,required:true},
  color:{type:String, required:true}
},{ timestamps: true });

const Cars = mongoose.model("cars", carsSchema);
module.exports = Cars;