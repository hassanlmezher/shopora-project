import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);

export default router;
