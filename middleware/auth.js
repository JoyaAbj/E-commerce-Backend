const jwt=require('jsonwebtoken');
const Users=require('../models/userModel');
const authenticated=(role)=>{
    return (req,res,next)=>{
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer')
          )
            return res.status(400).json({
              message: 'No auth credentials',
            });
        const {authorization} =req.headers;
        const token=authenticated.split(' ')[1];
        if(!token)return res.status(400).json({message:"No token detected"});
        try{
            const credentials=jwt.verify(token,process.env.Secret_key);
            if(credentials.role!==role)throw Error("You are not authorized");
            next();
        }catch(error){
            res.status(500).json({message:"An error occured",error:error.message})
        }
    }
}