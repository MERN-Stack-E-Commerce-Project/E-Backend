const express = require("express");
const router = express.Router();

const { requireSignin, userMiddleware } = require("../common-middleware");
const { addToCart} = require("../controller/cart");

router.post("/user/cart/add-to-cart", requireSignin, userMiddleware, addToCart);


module.exports = router;
