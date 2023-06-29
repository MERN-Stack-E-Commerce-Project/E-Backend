const Cart = require("../models/cart");

exports.addToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (data) {
      const product = req.body.cartItems.product;
      const isItemAdded = data.cartItems.find((c) => c.product == product);
      console.log(req.body.cartItems.quantity);

      let qty = req.body.cartItems.quantity;

      if (qty == null) qty = 1;
 
      let condition = {};
      let action = {};

      if (isItemAdded) {
        condition = {
          user: req.user._id,
          "cartItems.product": product,
        };
        action = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: isItemAdded.quantity + qty,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }

      Cart.findOneAndUpdate(condition, action).exec((err, _data) => {
        if (err) return res.status(400).json({ err });
        if (_data) return res.status(200).json({ _data });
      });
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) {
          return res.status(400).json({ error });
        }
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};
