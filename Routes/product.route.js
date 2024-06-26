const express = require("express");

const {
  getProductsCount,
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
} = require("../controllers/product.controller");

const router = express.Router();
router.get("/count", getProductsCount);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);
router.patch("/:id", editProduct);

module.exports = router;
