import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userEmail: String,
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    items: Array,
    orderedAt: Number,
    status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
