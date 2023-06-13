import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req,res)=>{};

export const login = async(req,res,next)=>{
    try {
      const {email,password}=req.body;

    const user = await User.findOne({email}).select("+password");
    
    if(!user)return next(new ErrorHandler("Invalid Email or Password",400));

      const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",400))

      sendCookie(user,res,`welcome back,${user.name}`,200);
    } catch (error) {
      next(error);
    }
};

export const register = async(req,res)=>{
  try {
    const {name,email,password}=req.body;
  
    let user = await User.findOne({email});
    
    if(user)return next(new ErrorHandler("user already exist",400));
   
    //10 indicate kr rha kitna strong
    const hashedPassword = await bcrypt.hash(password,10)
   
    user = await User.create({name,email,password:hashedPassword});
   
    sendCookie(user,res,"registered Successfully",201);
  } catch (error) {
    next(error);
  }
}

export const getMyProfile = (req,res) =>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
}

export const logout = (req,res)=>{
    res
    .status(200)
    .cookie("token","",{
      expires:new Date(Date.now()),
      sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
      secure:process.env.NODE_ENV === "Development"?false:true,
    })
    .json({
        success:true,
        user:req.user,
    })
}

// export const getAllUsers = async(req,res)=>{
//     const users = await User.find({});
//     //query ek object hai uske andar sare values access krskte hai
//     const keyword =req.query.keyword;
//     console.log(keyword)
//     res.json({
//         success:true,
//         users,
//     })
// }

// export const register = async(req,res)=>{
   
//     const {name,email,password} = req.body;

//     const users = await User.create({
//         name:name,
//         email:email,
//         password:password,
//     });

//     res.status(201).cookie("tempi","lol").json({
//         success:true,
//         message:"registered Successfully",
//     });
// }


// export const specialFunc=(req,res)=>{
//     res.json({
//         success:true,
//         message:"just Joking"
//     })
// }

// export const getUserDetails = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         user,
//     })
// }

// export const updateUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         message:"updated"
//     })
// }

// export const deleteUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
    
//     await user.remove();

//     res.json({
//         success:true,
//         message:"deleted"
//     })
// }

