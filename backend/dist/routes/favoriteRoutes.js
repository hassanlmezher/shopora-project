import express from "express";
import { toggleFavorite } from "../controllers/favoriteController.js";
const router = express.Router();
router.post("/", toggleFavorite);
export default router;
