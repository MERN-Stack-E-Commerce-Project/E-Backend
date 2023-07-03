
const jwt = require("jsonwebtoken");


// /////////////////////////////
const multer = require("multer");
const shortid= require("shortid");
const path= require("path");
const storage = multer.diskStorage({
     destination: function (req,res,cb){
         cb(null,path.join(path.dirname(__dirname),("/uploads/")))
        },
     filename: function(req,res,cb){
            cb(null,shortid.generate()+"-"+res.originalname) 
        }
    });

exports.upload=multer({storage});
// ////////////////////////
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET,(err,user)=>
  {
    if(err){
      return res.status(400).json({message:"Authorization required/ Invalid Token"});
    }
  if(user){
    req.user=user;
  }
  else{
    return res.status(400).json({message:"something went wrong"});
  }
  });
next();
  // jwt.decode()
}; 


exports.userMiddleware =(req,res,next)=>{
//  console.log(req.user.role);
 if (req.user && req.user.role !== "user") {
   return res.status(400).json({ message: "Access denied" });
 }
 next();
}
exports.adminMiddleware =(req,res,next)=>{
    console.log(req.user.role);
     if(req.user.role !== "admin"){
        return res.status(400).json({message:"Access denied"});

     }
     next();
}