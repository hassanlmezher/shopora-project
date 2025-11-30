import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.patch("/:id", auth, updateOrderStatus);

export default router;
