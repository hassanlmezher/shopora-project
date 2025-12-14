import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "shopora",
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Mongo Connection Error:", error.message);
    process.exit(1);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("shopora backend running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
