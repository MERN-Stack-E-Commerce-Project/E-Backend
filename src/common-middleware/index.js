
const jwt = require("jsonwebtoken");


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
 console.log(req.user.role);
 if (req.user.role !== "user") {
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