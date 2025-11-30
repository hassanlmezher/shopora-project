import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { toggleFavorite, getFavorites } from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/toggle", auth, toggleFavorite);
router.get("/", auth, getFavorites);

export default router;
