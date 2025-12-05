import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "shopora",
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    } 

    connectDB();

    app.get("/", (req, res) => {
        res.send("shopora backend running!");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}