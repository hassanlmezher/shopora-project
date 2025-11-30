import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "user not found" });

        const match = await user.comparePassword(password);
        if(!match) return res.status(404).json({ error: "Incorrect password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;