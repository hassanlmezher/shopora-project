import express from "express";
import Store from "../models/Store.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const stores = await Store.find();
    res.json(stores);
});

router.post("/", async (req, res) => {
    const store = await Store.create(req.body);
    res.json(store);
});

export default router;