import express from "express";
import { getFavorites, toggleFavorite } from "../controllers/favoriteController.js";

const router = express.Router();
router.post("/", toggleFavorite);
router.get("/:userId", getFavorites);

export default router;
