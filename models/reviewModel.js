const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  fullName: {type: String, required:true},
  Email: { type: String, required:true},
  comment:{type:String , required:true},
  rating:{type:Number, required:true}
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;