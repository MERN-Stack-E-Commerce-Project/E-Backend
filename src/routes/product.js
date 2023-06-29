const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const {createProduct}=require("../controller/product")
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

const upload=multer({storage});
router.post("/product/create", requireSignin, adminMiddleware,upload.array("productPictures"),createProduct );
router.post("/product/getproduct", (req,res)=>{

});

module.exports = router;
