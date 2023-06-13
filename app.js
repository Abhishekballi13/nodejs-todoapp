import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors from "cors"
//inititalizing server
export const app=express()

//connecting our config.env with app.js
config({
    path:"./data/config.env"
})

//using middleware isko pehle use kran
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
//custom url set krdiya /users ,
//using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)


app.get("/",(req,res)=>{
    res.send("Nice Working");
})

//using errro middleware
app.use(errorMiddleware)