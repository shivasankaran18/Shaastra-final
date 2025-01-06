
import { Router } from "express";
import { sendOTP, userLogin, userReg, verifyOTP } from "../controllers/userController";

export const userRouter=Router();


userRouter.post("/login",userLogin);
userRouter.post("/register",userReg);
userRouter.post("/verifyotp",verifyOTP);
userRouter.post("/sendotp",sendOTP);


