import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
        default: "",
    },
}, { timestamps: true });
reviewSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        if (ret._id) {
            ret.id = String(ret._id);
        }
        delete ret._id;
        return ret;
    },
});
export default model("Review", reviewSchema);
