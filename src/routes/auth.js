
const express=require("express");
const {requireSignin}=require("../common-middleware/index")
const { signup, signin} = require("../controller/auth");
const router=express.Router();
const {validateSignupRequest, isRequestValidated, validateSigninRequest} = require("../validators/auth");

router.post("/signin",validateSigninRequest,isRequestValidated,signin);
router.post("/signup", validateSignupRequest,isRequestValidated, signup);
// router.post("/signout", requireSignin,signout);

// router.post("/profile",requireSignin,(req,res)=>{
//    res.status(200).json({ message: "user profile"});
// });


module.exports = router;