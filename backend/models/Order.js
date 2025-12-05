import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObejctId,
            ref: "User",
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },

                priceAtPurchase: {
                    type: Number,
                    required: true,
                }
            }
        ],

        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "canceled"],
            default: "pending",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);