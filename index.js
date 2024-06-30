const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
const { verifyToken } = require("./middlewares/auth.middleware");

async function main() {
  await connectDB();
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  const authRoutes = require("./Routes/auth.route");
  const protectedRoutes = require("./Routes/protected.route");

  app.use("/api/auth", authRoutes);
  app.use("/api/protected", verifyToken, protectedRoutes);

  const productRoutes = require("./Routes/product.route");
  app.use("/api/product", productRoutes);

  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}
main();
