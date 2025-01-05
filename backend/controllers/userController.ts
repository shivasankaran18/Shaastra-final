import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const userLogin = async (req: Request, res: Response) => {
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
            .json({ success: false, message: "Student not found" });
      }
      const verifyPass = await bcrypt.compare(body.password, user.password);
      if (!verifyPass) {
         return res
            .status(500)
            .json({ success: false, message: "Invalid Password" });
      }
      const token = createToken(body.id);
      return res.status(200).json({ success: true, token: "Bearer " + token });
   } catch {
      return res.status(500).json({ msg: "error" });
   }
};

const createToken = (id: any) => {
   return jwt.sign({ id }, process.env.JWT_SECRET || "");
};

export const userReg = async (req: Request, res: Response) => {
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
            accnos:body.accnos,
            mobileno:body.mobileno,
            aadharno:body.aadharno

            
         },
      });
      const token = createToken(body.id);
      return res.json({
         success: true,
         message: "Student Created Successfully",
         token: "Bearer " + token,
      });
   } catch{
      return res.status(500).json({msg:"error"})
      

   }
};
