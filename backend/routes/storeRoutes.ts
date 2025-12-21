import express from "express";
import {
  requestStore,
  getStores,
  updateStoreStatus
} from "../controllers/storeController.js";

const router = express.Router();

router.post("/", requestStore);
router.get("/", getStores);
router.patch("/:id/status", updateStoreStatus);

export default router;