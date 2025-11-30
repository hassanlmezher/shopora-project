import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { sendNotification, getNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", auth, sendNotification);
router.get("/", auth, getNotifications);

export default router;
