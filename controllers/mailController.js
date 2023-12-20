const nodemailer = require('nodemailer');
const Shipment = require('../models/shipmentModel');
const Order=require('../models/orderModel');
const send = async (req, res) => {
    const { email, name, shipmentId } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        pool: true,
        host: "hadimortada1245@gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'hadimortada1245@gmail.com',
            pass: 'f n e i l x z q f l y r s g b e'
        }
    });
    let data = "";
    try {
        const shipmendData = await Shipment.findOne({ _id: shipmentId });
        if (!shipmendData) return;
        data = shipmendData;
    } catch (error) {
        res.status(500).json({ message: 'Failed to select the location', error: error.message })
    }
    if (data.length === 0) return;
    const options = {
        from: 'DriveEpic',
        to: `${email}`,
        subject: `Dear ${name}`,
        text: `Hello, your order will be shipped to ${data.location} within ${data.duration}`
    }
    transporter.sendMail(options, (error, info) => {
        if (error) console.log(error);
        else {
            console.log(info.response);
            res.status(200).json({ message: 'success', data });
        }
    })
}
const sendAfter = async (req, res) => {
    const { email, name, orderId } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        pool: true,
        host: "hadimortada1245@gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'hadimortada1245@gmail.com',
            pass: 'f n e i l x z q f l y r s g b e'
        }
    });
    try{
        const updated=await Order.findByIdAndUpdate({_id:orderId},{status:true});
        res.status(200).json({message:"success",updated});
    }catch(error){
        res.status(500).json({message:'failed to update the status',error:error.message})
    }
    const options = {
        from: 'DriveEpic',
        to: `${email}`,
        subject: `Dear ${name}`,
        text: `Hello, your order arrived and thank you for your purchase.Click the following link to confirm that you received your order: https://leetcode.com/hadimortada1245/`
    }
    transporter.sendMail(options, (error, info) => {
        if (error) console.log(error);
        else {
            console.log(info.response);
            res.status(200).json({ message: 'success', data });
        }
    })
}
module.exports = { send ,sendAfter}