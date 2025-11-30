import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createShopRequest, approveShop, getAllShops } from "../controllers/shopController.js";

const router = express.Router();

router.post("/request", auth, createShopRequest);
router.get("/", getAllShops);
router.patch("/approve/:id", approveShop);

export default router;
