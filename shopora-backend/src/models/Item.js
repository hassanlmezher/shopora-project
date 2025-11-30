import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    }
});

export default mongoose.model("Item", itemSchema);