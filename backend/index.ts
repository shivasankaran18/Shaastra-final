import express from "express"
import cors from "cors"

import { PrismaClient } from "@prisma/client";

import { error } from "console";
import { userRouter } from "./routes/userRoutes";
import axios from "axios";

const DJANGO_URL = "http://localhost:8000"

const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())
const BACKEND_PORT = 3000



app.listen(BACKEND_PORT,()=>{
    console.log("Running")
})


app.use("/api/user",userRouter);

//@ts-ignore
app.get("/check",(req,res)=>{
    return res.send("running")
})


app.post('/api/credit-score', async (req, res) => {
    const { account_number } = req.body;
    console.log(account_number)
    try {
      // Fetch CIBIL score from Django backend
      const cibilResponse = await axios.get(`${DJANGO_URL}/cibil/${account_number}/`);
      const cibilScore = cibilResponse.data.cibil_score; // Assuming 'cibil_score' is the key in the response
  
      // Fetch sentiment score from Django backend
      const sentimentResponse = await axios.post(`${DJANGO_URL}/api/sentiment/`, { user_handle: account_number });
      const sentimentScore = sentimentResponse.data.sentiment_score; // Assuming 'sentiment_score' is the key in the response
  
      // Calculate the combined score
      if (cibilScore !== undefined && sentimentScore !== undefined) {
        // Applying the weights
        const weightedCibilScore = (cibilScore / 1000) * 0.80; // Normalize to 0-1 and give 80% weight
        const weightedSentimentScore = sentimentScore * 0.20; // Give 20% weight
  
        // Total predicted score
        const totalPredictedScore = (weightedCibilScore + weightedSentimentScore) * 1000;
  
        // Return the total predicted score
        res.json({ predicted_score: Math.round(totalPredictedScore) });
      } else {
        res.status(400).json({ error: 'Invalid data from CIBIL or sentiment API' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });