import { Schema, model } from "mongoose";
const storeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
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
        enum: ["pending", "approved", "declined"],
        default: "pending",
    },
}, { timestamps: true });
storeSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        if (ret._id) {
            ret.id = String(ret._id);
        }
        delete ret._id;
        return ret;
    },
});
export default model("Store", storeSchema);
