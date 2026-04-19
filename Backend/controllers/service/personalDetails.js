export const personalDetailsController = (req,res,next)=>{
    
res.status(200).json({
    name:req.user.name,
    mobileNo:req.user.mobileNo,
    accType:req.user.accType
})
}