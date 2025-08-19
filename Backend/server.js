import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
});

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});

//npm install bcrypt,cloudinary,cookie-parser,cors,dotenv,express express-fileupload,json mongoose,node-cron, nodemailer
//npm init