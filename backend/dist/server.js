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
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(mongoUri, {
            dbName: "shopora",
        });
        console.log("MongoDB Connected Successfully");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Mongo Connection Error:", message);
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
const PORT = Number(process.env.PORT) || 6000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
