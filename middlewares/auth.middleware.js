const jwt = require("jsonwebtoken");
const Product = require("../Models/product.model");

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  // Get token from header, the client should be responsible for sending the token
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

async function authorizeUser(req, res, next) {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  if (product.user.toString() !== req.userId) {
    return res.status(403).json({ message: "User not Authorized!" });
  }
  next();
}

module.exports = { verifyToken, authorizeUser };
