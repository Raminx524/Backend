const Product = require("../Models/product.model");
const { buildCritiria } = require("../helpers/product.helper");

async function getProductsCount(req, res) {
  const { query } = req;
  const criteria = buildCritiria(query);
  try {
    const count = await Product.countDocuments(criteria);
    res.status(200).json({ count });
  } catch (err) {
    console.log(
      "product.controller, getProductCount. Error while getting product count",
      err
    );
    res
      .status(500)
      .json({ message: "Server error while getting products count" });
  }
}

async function getProducts(req, res) {
  const { query } = req;
  const critiria = buildCritiria(query);
  let page = query.page || 1;
  if (page < 1) page = 1;

  const limit = query.limit || 3;
  const startIndex = (page - 1) * limit || 0;
  try {
    const products = await Product.find(critiria).skip(startIndex).limit(limit);
    res.status(200).json(products);
  } catch (err) {
    console.log(
      "product.controller, getProducts. Error while getting product",
      err
    );
    res.status(500).json({ message: "Server error while getting products" });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, getProductById. CastError! product not found with id: ${id}`
      );
      return res.status(404).json({ message: "product not found" });
    }
    console.log(
      `product.controller, getProductById. Error while getting product with id: ${id}`,
      err
    );
    res.status(500).json({ message: "Server error while getting product" });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, deleteProduct. CastError! product not found with id: ${id}`
      );
      return res.status(404).json({ message: "product not found" });
    } else {
      console.log(
        `product.controller, deleteProduct. Error while deleting product with id: ${id}`,
        err
      );
      res.status(500).json({ message: "Server error while deleting product" });
    }
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`product.controller, createProduct. ${err}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function editProduct(req, res) {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, getProductById. CastError! product not found with id: ${id}`,
        err
      );
      res.status(404).json({ message: "product not found" });
    } else if (err.name === "ValidationError") {
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`product.controller, updateProduct. ${err}`);
      res.status(500).json({ message: "Server error while updateing robot" });
    }
  }
}

module.exports = {
  getProductsCount,
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
