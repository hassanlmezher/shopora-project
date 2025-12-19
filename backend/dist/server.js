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
app.use(cors());
app.use(express.json());
async function connectDB() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(mongoUri, { dbName: "shopora" });
    console.log("MongoDB Connected Successfully");
}
app.get("/", (_req, res) => {
    res.send("shopora backend running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((err, _req, res, _next) => {
    const message = err instanceof Error ? err.message : "Unexpected server error";
    res.status(500).json({ message });
});
// Chrome blocks some "unsafe" ports like 6000; default to 6001 if none is provided.
const PORT = Number(process.env.PORT) || 6001;
connectDB()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Mongo Connection Error:", message);
    process.exit(1);
});
