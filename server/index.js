import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app=express()
app.use(express.json())
app.use(cors())

const connectDB =async ()=>{
    const conn=await mongoose.connect(process.env.MONGO_URL)

    if(conn){
        console.log(`Mongodb connected successfully`);
    }
};
connectDB();

app.get('/',(req,res)=>{
    res.json({
        message:`Welcome to expense tracker API`
    })
})

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


