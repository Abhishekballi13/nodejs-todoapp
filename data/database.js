import mongoose from "mongoose";

//connecting database
export const connectDB= () =>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName:"backendapi"
})
.then((c)=>console.log(`Database Connected with ${c.connection.host}`))
.catch((e)=>console.log(e));
};
