import express from "express"
import cors from "cors"

import { PrismaClient } from "@prisma/client";

import { error } from "console";


const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())
const BACKEND_PORT = process.env.PORT



app.listen(BACKEND_PORT,()=>{
    console.log("Running")
})


app.use("/api/user",userRouter);


app.get("/check",(req,res)=>{
    return res.send("running")
})
