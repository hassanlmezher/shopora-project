import { Schema, model } from "mongoose";
const productSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
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
        min: 0,
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: (value) => value.length > 0,
            message: "At least one product image is required",
        },
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
        min: 0,
        max: 5,
    },
    reviewsCount: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { timestamps: true });
productSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        if (ret._id) {
            ret.id = String(ret._id);
        }
        delete ret._id;
        return ret;
    },
});
export default model("Product", productSchema);
