import {User} from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { generateToken } from "../utils/jwtToken.js";

export const register=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files||Object.keys(req.files).length=== 0){
        return next(new ErrorHandler("Profile image required",400));
    }

    const {profileImage}=req.files;
 
    const allowedFormats=["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(profileImage.mimetype)){
        return next(new ErrorHandler("File format isn't supported",400));
    }
    const{userName,email,password,phone,address,role,bankAccountName,bankAccountNumber,bankName,upinumber}
    =req.body;

    if(!userName || !email || !password || !phone|| !address|| !role){
        return next(new ErrorHandler("Plese filll the form",400));
    }
    if(role==="Seller")
    {
        if(!bankAccountName|| !bankAccountNumber || !bankName )
        {
            return next(new ErrorHandler("Please filll the entire bank details",400));
        }
        if(!upinumber){
            return next(new ErrorHandler("Please fill the upi number",400));
        }
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("user already registred",400));
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        profileImage.tempFilePath,
        {
            folder: "Value_Vault",
        }
    );
    if(!cloudinaryResponse||cloudinaryResponse.error)
    {
        console.error("cloudinary error:",cloudinaryResponse.error||"unknown error");
        return next(new ErrorHandler("Failed to upload file image",500));
    }
    const user=await User.create({
        userName,email,password,phone,address,role,profileImage:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        },
        paymentMethods:{
                bankTransfer:{
                    bankAccountNumber,
                    bankAccountName,
                    bankName,
                },
                upipayment:{
                    upinumber,
                },
        },
    });
    generateToken(user,` Welcome, ${user.userName}`,201,res);
});

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return next(new ErrorHandler("please fuill full form"));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("Invalid credentials",400));
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid credetientls",400));
    }
    generateToken(user,`Welcome back, ${user.userName}`,200,res);
});

export const getProfile=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

export const logout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
    httpOnly: true,
    })
    .json({
        success: true,
        message:"Logout successful", 
    });
    });

export const fetchLeaderboard=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find({moneySpent:{ $gt:0}});
    const leaderboard=users.sort((a,b)=>b.moneySpent-a.moneySpent);
    res.status(200).json({
        success:true,
        leaderboard,
    });
});