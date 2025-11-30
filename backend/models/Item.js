import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    image: String,
    images: [String],
    name: String,
    namee: String,
    price: Number,
    priceValue: Number,
    description: String,
    by: String,
    category: String,
    ratings: String,
    reviews: Array
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
