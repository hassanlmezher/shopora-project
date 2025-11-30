import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userEmail: String,
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
});

export default mongoose.model("Favorite", favoriteSchema);