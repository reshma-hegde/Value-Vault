import mongoose from "mongoose";

export const connection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Value_Vault"
    }).then(()=>{
        console.log("connected to database");
    }).catch(err=>{
        console.log(`error occured ${err}`);
    });
};