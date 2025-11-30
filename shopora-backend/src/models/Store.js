import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

export default mongoose.model("Store", storeSchema);