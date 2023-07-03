const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const { createCategory, getCategory, updateCategory, deleteCategories } = require("../controller/category");
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

router.post("/category/getcategory", getCategory);

router.post(
  "/category/update",
  requireSignin,
  adminMiddleware,
  upload.array("categoryImage"),
  updateCategory
);
router.post(
  "/category/delete",
  requireSignin,
  adminMiddleware,  
  deleteCategories,
);



module.exports = router;
