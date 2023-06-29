const express= require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router= express.Router();
const {createCategory,getCategory}=require("../controller/category");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(path.dirname(__dirname), "/uploads/"));
  },
  filename: function (req, res, cb) {
    cb(null, shortid.generate() + "-" + res.originalname);
  },
});

const upload = multer({ storage });






router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);

router.post("/category/getcategory",getCategory);


module.exports=router;      