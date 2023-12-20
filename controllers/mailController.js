const nodemailer=require('nodemailer');
const send=(req,res)=>{
const {subject,message,name}=req.body;
const transporter=nodemailer.createTransport({
    service:'gmail',
    pool: true,
  host: "hadimortada1245@gmail.com",
  port: 465,
  secure: true ,
    auth:{
        user:'hadimortada1245@gmail.com',
        pass:'f n e i l x z q f l y r s g b e' 
    }
});
const options={
    from:'DriveEpic',
    to:'joyaaboujaoude627@gmail.com',
    subject:"Dear Joya",
    text:`${message}` 
}
transporter.sendMail(options,(error,info)=>{
    if(error)console.log(error);
    else console.log(info.response);
})
}
module.exports={send}