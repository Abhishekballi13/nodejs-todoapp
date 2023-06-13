import mongoose from "mongoose";

//creating schema

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})
//creating and exporting user
export const User = mongoose.model("User",schema);