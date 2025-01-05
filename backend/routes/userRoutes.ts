
import { Router } from "express";

export const userRouter=Router();


userRouter.post("/login",userLogin);
userRouter.post("/register",registerLogin);
