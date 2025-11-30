import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashed });

    return res.json({ message: "User created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(400).json({ message: "Invalid email/password" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ message: "Invalid email/password" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const user = { email, role: "user" };

    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
