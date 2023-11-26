const Review=require('../models/reviewModel');
const add=async(req,res)=>{
    const  {fullName, Email,comment,rating}=req.body
    try{
        if(!fullName||!Email ||!comment || !rating)throw Error("All fields must be filled");
        const result=await Review.create({fullName, Email,comment,rating});
        if(!result)throw Error("An error occured during adding a review");
        res.status(200).json({message:"A review added successfully",result});
    }catch(error){
        res.status(500).json({message:"Failed to add a review",error:error.message})
    }
}
const getAll=async(req,res)=>{
    try{
        const get=await Review.find({});
        if(!get)throw Error("An error occured while getting all reviews");
        res.status(200).json({message:"Getting all reviews successfully",get});
    }catch(error){
        res.status(500).json({message:"Failed to select all reviews",error:error.message})
    }
}
const getReviewById=async(req,res)=>{
    const {Id}=req.params
    try{
        if(!req.params)throw Error("No id passed as parameter")
        const get=await Review.findOne({_id:Id});
        if(!get)throw Error("An error occured while getting a review");
        res.status(200).json({message:"Getting a review successfully",get});
    }catch(error){
        res.status(500).json({message:"Failed to select a review",error:error.message})
    }
}
const getReviewByEmail=async(req,res)=>{
    const {Email}=req.body
    try{
        if(!Email)throw Error("No email passed detected")
        const get=await Review.find({Email});
        if(!get)throw Error("An error occured while getting reviews by email");
        res.status(200).json({message:"Getting reviews by email successfully",get});
    }catch(error){
        res.status(500).json({message:`Failed to select  reviews by email ${Email}`,error:error.message})
    }
}
const deleteReviewById=async(req,res)=>{
    const {Id}=req.params
    try{
        if(!Id)throw Error("No id passed as parameter")
        const deleteOne=await Review.findOneAndDelete({_id:Id});
        if(!deleteOne)throw Error("An error occured while deleting a review");
        res.status(200).json({message:"Deleting a review successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to delete a review",error:error.message})
    }
}
const updateReviewById=async(req,res)=>{
    const {Id}=req.params;
    const  {fullName, Email,comment,rating}=req.body;
    try{
        if(!Id)throw Error("No id passed as parameter");
        if(!fullName||!Email ||!comment || !rating)throw Error("All fields must be filled");
        const updateOne=await Review.findOneAndUpdate({_id:Id},{fullName, Email,comment,rating});
        if(!updateOne)throw Error("An error occured while updating a review");
        res.status(200).json({message:"A review  updated successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to update a review",error:error.message})
    }
}
module.exports={add,getAll,getReviewById,deleteReviewById,updateReviewById,getReviewByEmail};