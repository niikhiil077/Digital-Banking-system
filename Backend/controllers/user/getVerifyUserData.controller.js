export const getVerifyUserController = async(req,res,next)=>{
    res.json({
        message: "User data verified",
        user:req.user.name,
        mobileNo:req.user.mobileNo,
        accType:req.user.accType,
        userId:req.user.userId
    })
}