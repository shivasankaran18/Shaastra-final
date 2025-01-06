import express from "express"
import cors from "cors"

import { PrismaClient } from "@prisma/client";

import { error } from "console";
import { userRouter } from "./routes/userRoutes";


const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())
const BACKEND_PORT = 3000;



app.listen(BACKEND_PORT,()=>{
    console.log("Running")
})


app.use("/api/user",userRouter);


app.get("/check",async (req:any,res:any)=>{
    await prisma.user.deleteMany({})
    await prisma.oTP.deleteMany({})
    return res.send("running")
})
