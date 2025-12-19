import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;