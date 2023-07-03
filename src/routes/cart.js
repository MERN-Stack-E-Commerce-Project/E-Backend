const express = require("express");
const router = express.Router();

const { requireSignin, userMiddleware } = require("../common-middleware");
const { addItemToCart, getCartItems } = require("../controller/cart");
// const { addToCart, getCartItems} = require("../controller/cart");

router.post("/user/cart/add-to-cart", requireSignin, userMiddleware, addItemToCart);
router.post("/user/cart/getCartItems", requireSignin, userMiddleware, getCartItems);


module.exports = router;
