import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            priceAtPurchase: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        default: "pending",
    },
}, { timestamps: true });
orderSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        if (ret._id) {
            ret.id = String(ret._id);
        }
        delete ret._id;
        return ret;
    },
});
export default model("Order", orderSchema);
