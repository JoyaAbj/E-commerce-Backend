const Order=require('../models/orderModel');
// userId cars shipmentId status
const add=async(req,res)=>{
    const {userId, cars , shipmentId , status}=req.body;
    try{
    if(!userId || !cars ||  !shipmentId || !status)throw Error('All fields must be filled');
    const resultat=await Order.create({userId, cars , shipmentId , status});
    if(!resultat)throw Error("An error occured while adding an order");
    res.status(200).json({message:'An oreder added successfully',resultat});
    }catch(error){
        res.status(500).json({message:"Failed to add an order",error:error.message})
    }
}
const getAll=async(req,res)=>{
    try{
        const find=Order.find({});
        if(!find)throw Error('Failed to get all from order');
        res.status(200).json({message:'Getting all from oreders collection successfully',find})
    }catch(error){
        res.status(500).json({message:'Failed to get all from oreders collection',error:error.message})
    }
}
const findByUserId=async(req,res)=>{
    const {Id}=req.params;
    try{
        if(!Id)throw Error("No id passed as parameter !");
        const resultat=await Order.find({userId:Id});
        if(!resultat)throw Error("An error occured while selecting  orders by userId");
        res.status(200).json({message:'selecting  orders by userId successfully',resultat})
    }catch(error){
        res.status(500).json({message:'Failed to get all orders',error:error.message})
    }
}
module.exports={add,getAll,findByUserId};