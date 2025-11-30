import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const requests = await Request.find().populate("storeId").populate("items.itemId");
    res.json(requests);
});

router.post("/", async (req, res) => {
    const request = await Request.create(req.body);
    res.json(request);
});

router.patch("/:id", async (req, res) => {
    const updated = await Request.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
    res.json(updated);
});

export default router;