exports.error_handler = (err,req,res,next)=>{
    if(err.name === "UnauthorizedError"){
        return res.status(401).json({
            status:"Error",
            message:"The user is not authorized"
        })
    }
    if(err.name === "ValidationError"){
        return res.status(401).json({
            status:"Error",
            message:err
        })
    }
    return res.status(500).json(err)

}