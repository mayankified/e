import express,{Router} from "express";
import {login,logout,reg,getprofile} from '../Controllers/user.js'
import { auth } from "../Middleware/Auth.js";

const userrouter=express.Router();

userrouter.post("/register",reg );

userrouter.post("/login", login);

userrouter.post("/logout",logout );

userrouter.get("/myprofile", auth,getprofile );

export default userrouter;