import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postLogin, postSignUp } from "./controllers/user.js";
import { postTransaction } from "./controllers/transation.js";
dotenv.config();



const app = express()
app.use(express.json())
app.use(cors())

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    if (conn) {
        console.log(`Mongodb connected successfully`);
    }
};
connectDB();

app.get('/', (req, res) => {
    res.json({
        message: `Welcome to expense tracker API`
    })
})

app.post("/signup", postSignUp )

app.post("/login", postLogin)

app.post("/transaction",postTransaction)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


