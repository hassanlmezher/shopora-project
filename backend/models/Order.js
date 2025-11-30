import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userEmail: String,
    items: Array,
    orderedAt: Number,
    status: { type: String, default: "pending" },
});

export default mongoose.model("Order", orderSchema);