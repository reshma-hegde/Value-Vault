import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        minLength:[3,"username must contain atleast 3 letters"],
        maxLength:[40,"username exceeded limits"],
    },
    password:{
        type:String,
        minLength:[8,"password must contain atleast 8 letters"],
    
    },
    email:String,
    address:String,
    phone:{
        type:String,
        selected:false,
        minLength:[10,"phone number must contain atleast 10 digits"],
        maxLength:[10,"phone number exceeded 10 digits"],
    },
    profileImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    paymentMethods:{
        bankTransfer:{
            bankAccountNumber:String,
            bankAccountName:String,
            bankName:String,
        },
        upipayment:{
            upinumber:String,
        },
    },
    role:{
        type: String,
        enum:["Seller","Bidder","Admin"],
    },
    unpaidCommission:{
        type:Number,
        default:0,
    },
    auctionsWon:{
        type:Number,
        default:0,
    },
    moneySpent:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
});
}
export const User=mongoose.model("User",userSchema);