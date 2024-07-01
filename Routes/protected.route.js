const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../Models/user.model");
const Product = require("../Models/product.model");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).exec();
  const { password, ...userWithoutPassword } = user._doc;

  // res.json({ message: `You are accessing protected route ${req.userId}` });
  res.status(200).json(userWithoutPassword);
});

router.get("/users/:userId/products", async (req, res) => {
  const { userId } = req.params;
  const products = await Product.find({
    user: userId,
  }).exec();
  res.status(200).json(products);
});

module.exports = router;
