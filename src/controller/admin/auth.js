const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");

exports.signup = (req, res) => {
  // console.log("here2");
  User.findOne({ email: req.body.email }).exec(async(error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user)
      return res.status(400).json({ message: "admin alredy registered" });

    const { firstName, lastName, email, password } = req.body;
    let username=req.body.username;
    if(username==null|| username===undefined || username==""){
      username=email.split("@")[0];
    }
    const hash_password=await bcrypt.hash(password,10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username,
      role: 'admin'
    });
   

    _user.save((error, data) => {
      if (error) return res.status(400).json({ message: error });
      if (data) return res.status(200).json({ user: data });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.role=="admin" && user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: "100h",
        });

        res.cookie('token',token,{ expiresIn: '100h' });

        const {_id, firstName, lastName, email, role, fullName } = user;

        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        if(user.role!="admin")return res.status(400).json({message:"Your are not admin"});
        return res.status(400).json({ message: "Password incorrect" });
      }
    } else {
      return res.status(400).json({ message: "admin not registerewd" });
    }
  });
};



exports.signout=(req,res)=>{
   res.clearCookie('token');
   res.status(200).json({
    message: "Signout successfully..."
   })
}