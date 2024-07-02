const express = require("express");
const {
  verifyToken,
  authorizeUser,
} = require("../middlewares/auth.middleware");

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
router.delete("/:id", verifyToken, authorizeUser, deleteProduct);
router.post("/", verifyToken, createProduct);
router.patch("/:id", verifyToken, authorizeUser, editProduct);

module.exports = router;
