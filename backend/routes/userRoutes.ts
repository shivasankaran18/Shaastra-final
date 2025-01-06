
import { Router } from "express";
import { userLogin, userReg } from "../controllers/userController";

export const userRouter=Router();

//@ts-ignore
userRouter.post("/login",userLogin);
//@ts-ignore
userRouter.post("/register",userReg);
