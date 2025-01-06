import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

const prisma = new PrismaClient();

export const userLogin = async (req: any, res: any) => {
   try {
      const body = req.body;

      const user = await prisma.user.findUnique({
         where: {
            email: body.email,
         },
      });
      if (!user) {
         return res
            .status(500)
            .json({ success: false, message: "user not found" });
      }
      const verifyPass = await bcrypt.compare(body.password, user.password);
      if (!verifyPass) {
         return res
            .status(500)
            .json({ success: false, message: "Invalid Password" });
      }
      const token = createToken(user.email);
      return res.status(200).json({ success: true, token: "Bearer " + token });
   } catch(e) {
      console.log(e)
      return res.status(500).json({ msg: "error" });
   }
};

const createToken = (id: any) => {
   return jwt.sign({ id }, process.env.JWT_SECRET || "");
};

export const userReg = async (req: any, res: any) => {
   try {
      const body = req.body;
      
      const password = body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const user = await prisma.user.create({
         data: {
            email:body.email,
            password:hashedPass,
            name:body.name,
            mobileno:body.mobileno,
            aadharno:body.aadharno

            
         },
      });

      const createdAccounts = await Promise.all(
         body.accnos.map((acc:any) =>
           prisma.account.create({
             data: {
               accno: acc.accountNumber,
               bankName: acc.bankName,
               userId: user.id, 
             },
           })
         )
       );
      const token = createToken(user.id);
      return res.json({
         success: true,
         message: "Student Created Successfully",
         token: "Bearer " + token,
         user
      });
   } catch(e){
      console.log(e)
      return res.status(500).json({msg:"error"})
      

   }
};


function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp
}

export const sendOTP=async(req:any,res:any)=>{
   try{

      const body=req.body;
      const otp=generateOTP();
      
      console.log(body)   
      await prisma.oTP.create({
         data:{
            userId:parseInt(body.userId),
            otp,

         }
      })

       let mail=mailPortion(otp,body.email)
        let info=await transporter.sendMail(mail)

      return res.status(200).json({otp});


   }
   catch(e){
      console.log(e)

      return res.status(500).json({msg:"error"});
   }



}


export const verifyOTP=async(req:any,res:any)=>{
   const body=req.body;
   try{
      
      
      
      const temp=await prisma.oTP.findMany({
         where:{
            userId:parseInt(body.userId),
            otp:parseInt(body.otp)
         }
      })
      if(!temp)
      {
         return res.status(500).json({msg:"error"});
      }

     
      const token = createToken(body.email);
      await prisma.oTP.deleteMany({
         where:{
            userId:parseInt(body.userId)
         }
      })

      return res.status(200).json({msg:"verified",token:"Bearer "+token});





   }
   catch(e){
      await prisma.oTP.deleteMany({
         where:{
            userId:parseInt(body.userId)
         }
      })
      console.log(e)

      return res.status(500).json({msg:"error"});
   }


}





export const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.email, 
      pass: process.env.password   
    }
  });



  export function mailPortion(otp:number,email:string){
    let mailOptions={
        from:process.env.email,
        to:email,
        subject:"OTP Verification",

        html:`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Basic card styling */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #1a1a1a; /* Black background */
      color: #ffffff; /* White text */
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #2c2c2c; /* Dark gray background for the card */
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }
    .email-header {
      background-color: #8a2be2; /* Violet header */
      color: #ffffff; /* White text for header */
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
    }
    .email-body {
      padding: 20px;
      text-align: center;
    }
    .otp-box {
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
      background-color: #8a2be2; /* Violet background for OTP box */
      padding: 15px 25px;
      border-radius: 8px;
      display: inline-block;
      margin: 20px 0;
    }
    .email-footer {
      background-color: #1a1a1a; /* Black footer background */
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #bbbbbb; /* Light gray footer text */
    }
    a {
      color: #8a2be2; /* Violet links */
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->
    <div class="email-header">
      OTP Verification
    </div>

    <!-- Body Section -->
    <div class="email-body">
      <p>Dear User,</p>
      <p>Your One-Time Password (OTP) is:</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
    </div>

    <!-- Footer Section -->
    <div class="email-footer">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
    }


    return mailOptions


}
