const nodemailer=require('nodemailer');
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
    from:'hadimortada1245@gmail.com',
    to:'mohammad.sleimane@isae.edu.lb',
    subject:"Dear mhmd",
    text:'You bought a mercedes car from Hadi cars hub and you choose Zahle as a location to receive it,It takes time to be there maybe 3 days.' 
}
transporter.sendMail(options,(error,info)=>{
    if(error)console.log(error);
    else console.log(info.response);
})