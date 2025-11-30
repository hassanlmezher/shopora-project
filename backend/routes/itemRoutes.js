import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addItem, getItemsByShop, deleteItem } from "../controllers/itemController.js";

const router = express.Router();

router.post("/", auth, addItem);
router.get("/:shopId", getItemsByShop);
router.delete("/:id", auth, deleteItem);

export default router;
