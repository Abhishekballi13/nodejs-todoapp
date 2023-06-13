import mongoose from "mongoose";

//connecting database
export const connectDB= () =>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName:"backendapi"
})
.then(()=>console.log("Database Connected"))
.catch((e)=>console.log(e));
};
