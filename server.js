require('dotenv').config();
const connection = require('./config/connection');
const userRoute=require('./routes/userRoute');
const carRoute=require('./routes/carRoute');
const shipmentRoute=require('./routes/shipmentRoute');
const userInfoRoute= require("./routes/userInfoRoute")
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users',userRoute);
app.use('/cars',carRoute);
app.use('/shipments',shipmentRoute);
app.use('/userInfo',userInfoRoute);
app.listen(process.env.PORT,()=>{
    connection.checkConnection();
    console.log(`server is running on port:${process.env.PORT}`)
})
