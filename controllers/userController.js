const Users=require("../models/userModel");
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const generateToken=(id,role)=>{
    const token=jwt.sign({id,role},process.env.SECRET_KEY,{expiresIn:'1d'});
    return token;
}
const register=async(req,res)=>{
    const {fullName,phoneNumber,email,password,role}=req.body;
    try{
        if(!fullName || !phoneNumber || !email || !password || !role)
            throw Error("All fields must be filled !");
        const exist= await Users.findOne({email});
        if(exist)throw Error("Email already in use");
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=await Users.create({
            fullName:fullName,
            phoneNumber:phoneNumber,
            email:email,
            password:hashedPassword,
            role:role
        });
        if(!user)throw Error("An error occured during adding a user ");
        const token=generateToken(user._id,role);
        res.status(200).json({message:"Adding a user successfully",token});
    }catch(error){
        res.status(500).json({message:"Failed to add a user",error:error.message})
    }
}
const login=async(req,res)=>{
    const {email ,password}=req.bod;
    try{
        if(!email || !password)throw Error("All fields must be filled");
        const exist =await Users.findOne({email});
        if(!exist)throw Error("Not registered yet");
        const comparing=await bcrypt.compare(password,exist.password);
        const token=generateToken(exist._id,exist.role);
        res.status(200).json({message:"login successfully",token});
    }catch(error){
        res.status(500).json({message:`Failed to login by ${email}`,error:error.message})
    }
}
module.exports={register,login};
