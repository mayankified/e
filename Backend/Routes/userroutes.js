const express=require('express');
const { register, login, logout ,forgotPassword,getUserdetails,updatepassword} = require('../Controllers/usercontroller');
const router=express.Router();
// const authenticateUser=require("../utils/authentication");
require('dotenv').config();



router.post("/register",register);
router.post("/login",login);
router.post("/password/forgot",forgotPassword);
router.get("/logout",logout);
router.get("/me",getUserdetails,);
router.post("/changepassword",updatepassword)


module.exports=router;

