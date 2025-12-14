import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
