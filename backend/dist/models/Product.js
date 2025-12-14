import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    subtitle: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
        validate: v => v.length === 3,
    },
    description: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviewsCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });
export default mongoose.model("Product", productSchema);
