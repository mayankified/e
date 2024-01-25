const User=require('../models/usermodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendToken=require("../utils/jwtToken")
require('dotenv').config();
const sendEmail=require("../utils/sendEmail");
const ErrorHandler=require("../utils/errorHandler");
// const authenticateUser=require("../utils/authentication");
// Function for registering the user



exports.register=async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        awator:{
            public_id: "This is the sample id",
            url: "profile picture"
        },
    });

     sendToken(user,201,res);
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log('Login failed. Invalid credentials.');
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        console.log('Login successful. User:', user);
        sendToken(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


exports.logout = async(req,res)=>{


    // Bascially not getting what actually it is doing 
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
};

// exports.forgotPassword=async(req,res,next)=>{
//     const user=await User.findOne({email: req.body.email});
//     if(!user){
//         return next(new ErrorHandler("User is not found"),404);
//     }
//         const resetToken=user.getResetPasswordToken();
//         await user.save({validateBeforeSave: false});
//         const resetpasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
//         const message=`Your password reset  token is \n\n ${resetpasswordUrl} \n\n if you have not requested this then please ignore this email`;
//         try{
//             await sendEmail({
//                 email: user.email,
//                 subject: `mail is sent successfully`,
//                 message
//             });
//             res.status(200).json({
//                 success:true,
//                 message:`Email is send to ${user.email} successfully`
//             });
//         }
//             catch (error) {
//                 console.error('Error sending email:', error); 
//                 user.resetpasswordToken = undefined;
//                 user.resetpasswordExpire = undefined;
//                 await user.save({ validateBeforeSave: false });

//                 return res.status(500).json({
//                     success: false,
//                     message: 'Failed to send the email for password reset'
//                 });
//             }
//         }


exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User is not found"), 404);
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetpasswordUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
    const message = `Your password reset token is \n\n ${resetpasswordUrl} \n\n if you have not requested this then please ignore this email`;

    try {
        await sendEmail(user.email, resetToken); 
        res.status(200).json({
            success: true,
            message: `Email is sent to ${user.email} successfully`
        });
    } catch (error) {
        console.error('Error sending email:', error);
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            success: false,
            message: 'Failed to send the email for password reset'
        });
    }
};



        // Get user details
exports.getUserdetails=async(req,res)=>{
    const { email } = req.body;
    const user = await User.findOne({ email })
    if(user){
        res.status(200).json({
            success: true,
            user
        });
    }
    else{
        res.status(200).json({
            success: false,
            message:"The following user doesn't exists"
        });
    }
    
};


exports.updatepassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        if (!user.password) {
            return res.status(500).json({ success: false, message: 'User password is missing or undefined' });
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect old password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};