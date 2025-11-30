import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

connectDB();

app.use("/auth", authRoutes);
app.use("/stores", storeRoutes);
app.use("/items", itemRoutes);
app.use("/requests", requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
