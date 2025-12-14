import express from "express";
import {
  addReview,
  getReviewsByProduct,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview);
router.get("/product/:productId", getReviewsByProduct);

export default router;
