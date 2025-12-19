import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true });
userSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        if (ret._id) {
            ret.id = String(ret._id);
        }
        delete ret._id;
        delete ret.password;
        return ret;
    },
});
export default model("User", userSchema);
