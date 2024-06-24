const Product = require("../Models/product.model");
async function getProducts(req, res) {
  try {
    const name = req.query.name || "";
    const products = await Product.find({
      name: { $regex: name, $options: "i" }, // "i" for case-insensitive
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
    // if(err.status === 404)
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  const product = PRODUCTS.find((product) => product._id === id);
  if (!product) {
    return res.status(404).json({ message: "Error: Product Not Found!" });
  }
  res.status(200).json(product);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const products = [...PRODUCTS];
  const productIndex = products.findIndex((product) => product._id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Error: Product Not Found!" });
  }
  products.splice(productIndex, 1);
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({ message: "Product deleted successfully" });
}

async function createProduct(req, res) {
  const newProduct = req.body;
  const products = [...PRODUCTS, newProduct];
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(201).json({ message: "Product added successfully!" });
}

async function editProduct(req, res) {
  const { id } = req.params;
  const products = PRODUCTS.map((product) => {
    if (product._id === id) {
      return { ...product, ...req.body };
    }
    return product;
  });
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({ message: "Product edited successfully!" });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
