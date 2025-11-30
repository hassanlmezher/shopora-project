import mongoose from "mongoose";
const shopSchema = new mongoose.Schema({
    ownerEmail: String,
    title: String,
    description: String,
    phone: String,
    status: { type: String, default: "pending" },
    items: [{ type: mongoose.Schema.Types.ObjectId, red: "Item" }],
});

export default mongoose.model("Shop", shopSchema);
