import express from "express";
import  {User} from "../models/user.js"
import { get } from "mongoose";
import {register,login,getAllUsers, getMyProfile,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import e from "express";
const router = express.Router();

router.get("/all",getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me",isAuthenticated,getMyProfile);

//dynamic route ko last me rkhne ki koshish kro
// router.get("/userid/special",specialFunc)

// router.get("/userid/:id",getUserDetails)

// router.put("/userid/:id",updateUser)

// router.delete("/userid/:id",deleteUser)

//this is same as above 3 lines in more comprised way
//when dealing with same url
// router
//       .route("userid/:id")
//       .get(getUserDetails)
//       .put(updateUser)
//       .delete(deleteUser)

export default router;