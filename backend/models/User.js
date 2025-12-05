import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },
    { timestams: true }
);

export default mongoose.model("User", userSchema);