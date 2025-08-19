class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message||"Internal server error";
    err.statusCode=err.statusCode||500;
    if(err.name=="jsonWebTokenError"){
        const message="Json web token is invalid, try again";
        rr=new ErrorHandler(message,400);
    }
    if(err.name=="TokenExpiredError"){
        const message="token expired is invalid, try again";
        rr=new ErrorHandler(message,400);
    }
    if(err.name=="CastError"){
        const message=`invalid ${err.path}`;
        rr=new ErrorHandler(message,400);
    }
    const errorMessage=err.errors? Object.values(err.errors).map((error)=>error.message)
    .join(" "): err.message;
    return res.status(err.statusCode).json({
        success:false,
        message:errorMessage,
    });
};
export default ErrorHandler;