import express from "express";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem, } from "../controllers/cartController.js";
const router = express.Router();
router.get("/:userId", getCart);
router.post("/", addToCart);
router.patch("/:userId/items/:productId", updateCartItem);
router.delete("/:userId/items/:productId", removeCartItem);
router.delete("/:userId", clearCart);
export default router;
