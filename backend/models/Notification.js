import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: String,
    message: String,
    timestamp: Number,
    userEmail: String
});

export default mongoose.model("Notification", notificationSchema);