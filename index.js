const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");

async function main() {
  await connectDB();
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  const productRoutes = require("./Routes/product.route");
  app.use("/api/product", productRoutes);

  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}
main();
