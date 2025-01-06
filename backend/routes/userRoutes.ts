
import { Router } from "express";

import { sendOTP, userLogin, userReg, verifyOTP } from "../controllers/userController";

export const userRouter=Router();

//@ts-ignore
userRouter.post("/login",userLogin);

//@ts-ignore
userRouter.post("/register",userReg);
userRouter.post("/verifyotp",verifyOTP);
userRouter.post("/sendotp",sendOTP);



