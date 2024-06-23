const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const productRoutes = require("./Routes/product.route");
app.use("/api/product", productRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
