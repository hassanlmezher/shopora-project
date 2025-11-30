import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

router.get("/:storeId", async (req, res) => {
    const items = await Item.find({ storeId: req.params.storeId });
    res.json(item);
});

export default router;