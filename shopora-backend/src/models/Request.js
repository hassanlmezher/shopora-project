import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
            quatity: Number
        }
    ],
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
});

export default mongoose.model("Request", requestSchema);