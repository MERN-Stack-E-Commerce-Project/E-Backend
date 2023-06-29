const express=require("express");
const { signup, signin, signout} = require("../../controller/admin/auth");
const {requireSignin}= require("../../common-middleware/index");
const router=express.Router();
const {validateSigninRequest,validateSignupRequest,isRequestValidated}=require("../../validators/auth");

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signout", requireSignin,signout);

// router.post("/profile",requireSignin,(req,res)=>{
//    res.status(200).json({ message: "user profile"});
// });


module.exports = router;