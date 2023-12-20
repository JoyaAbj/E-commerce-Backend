const Order = require("../models/orderModel");
const Cars = require("../models/carsModel");
// userId cars shipmentId status
const add = async (req, res) => {
  const { userId, cars, shipmentId, status } = req.body;
  try {
    // if (!userId || cars || !shipmentId || !status)
    //   throw Error("All fields must be filled");
    const resultat = await Order.create({ userId, cars, shipmentId, status });
    if (!resultat) throw Error("An error occured while adding an order");
    res.status(200).json({ message: "order added successfully", resultat });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add an order", error: error.message });
  }
};
const getAll = async (_, res) => {
  try {
    const allOrders =await Order.find({});
    if (!allOrders) throw Error("Failed to get all from order");
    res
      .status(200)
      .json({
        message: "all orders retrieved successfully",
        allOrders
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to get all orders",
        error: error.message
      });
  }
};
const findByUserId = async (req, res) => {
  const { Id } = req.params;
  try {
    const resultat = await Order.find({ userId: Id });
    if (!resultat)
      throw Error("An error occured while selecting  orders by userId");
    res
      .status(200)
      .json({ message: "selecting orders by userId successfully", resultat });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all orders", error: error.message });
  }
};
const updateOrderToDoneById = async(req,res)=>{
  const {Id} = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate({_id:Id},{status:true});
    if(!updatedOrder) throw Error("error while updating order");
    const result=await getOrderById(Id);
    res.status(202).json({message:"order set to done", result})
  } catch (error) {
    res.status(500).json({message:"could not update order", error:error.message})
  }
}

const updateOrderById = async(req,res)=>{
  const {Id} = req.params;
  const {cars,shipmentId}= req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate({_id:Id},{cars,shipmentId});
    if(!updatedOrder) throw Error("error while updating order");
    const result=await getOrderById(Id);
    res.status(202).json({message:"order updated successfully",result})
  } catch (error) {
    res.status(500).json({message:"could not update order", error:error.message})
  }
}

const deleteOrder = async (req, res) => {
  const { Id } = req.params;
  try {
      const deletedOrder = await Order.findByIdAndDelete({ _id:Id });
      if (!deletedOrder) throw Error("An error occured");
      res.status(200).json({ message: "Order deleted successfully" ,deletedOrder});
  } catch (error) {
      res.status(500).json({ message: "An error occured during deleting order", error: error.message })
  }
}


const getOrderById = async(Id)=>{
  try {
    const order= await Order.findById({_id:Id});
    return order;
  } catch (error) {
    return error;
  }
}
const getNOrdersByMonth = async(req,res)=>{
  try {
    const d=new Date().getFullYear();
    const orders=await Order.find({status:true}).select(['updatedAt','cars']).sort({ 'updatedAt': -1 });
  const orderData=[];
  orders.forEach ((order)=>{
    const m=new Date(order.updatedAt).getMonth();
    const y=new Date(order.updatedAt).getFullYear();
    const obj={
      month:m,
      year:y,
      order:order.cars
    };
    orderData.push(obj);
  });
  res.status(200).json({message:'Orders selected with date successfully',orderData});
  }catch (error) {
    res.status(500).json({message:"Failed to fetch orders broup by the date",error:error.message})
  }
}
const selectingOrderData=async(req,res)=>{
  try{
   const orders=await Order.find({})
  .populate({
    path: 'userId',
    model: 'users',
    select: 'fullName phoneNumber email role'
  }).populate({
    path: 'cars',
    model: 'cars',
    select: 'carName company type description initialPrice sellingPrice TVA discount quantity files DOR color'
  });
      res.status(200).json({orders});
  }catch(error){
     res.status(500).json({message:"Failed to select order data",error:error.message})
  }
}

const selectingOrderDataByUserId=async(req,res)=>{
  const {Id}=req.params;
  try{
   const orders=await Order.find({userId:Id})
  .populate({
    path: 'cars',
    model: 'cars',
    select: 'carName company type description initialPrice sellingPrice TVA discount quantity files DOR color'
  })
  .populate({
    path: 'shipmentId',
    model: 'shipment',
    select: 'location'
  })
  ;
      res.status(200).json({orders});
  }catch(error){
     res.status(500).json({message:"Failed to select order data",error:error.message})
  }
}
module.exports = {selectingOrderDataByUserId,selectingOrderData,add,getNOrdersByMonth, getAll, findByUserId, updateOrderToDoneById , updateOrderById, deleteOrder};
