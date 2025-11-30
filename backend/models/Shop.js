import mongoose from "mongoose";
const shopSchema = new mongoose.Schema(
  {
    ownerEmail: String,
    email: String,
    title: String,
    name: String,
    description: String,
    phone: String,
    category: String,
    image: String,
    status: { type: String, default: "pending" },
    banned: { type: Boolean, default: false },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
