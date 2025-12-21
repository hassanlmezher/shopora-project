import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { type UserDocument } from "../models/User.js";

interface AuthPayload {
  email?: string;
  password?: string;
}

const normalizeEmail = (email: string | undefined) => email?.trim().toLowerCase() ?? "";

export const signup = async (
  req: Request<unknown, unknown, AuthPayload>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Provide a valid email and password (min 6 chars)." });
    }

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email: normalizedEmail, password: hashed });
    return res.status(201).json(user.toJSON());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign up";
    return res.status(500).json({ message });
  }
};

export const login = async (
  req: Request<unknown, unknown, AuthPayload>,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || typeof password !== "string") {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne<UserDocument>({ email: normalizedEmail }).select(
      "+password"
    );
    const isValid =
      user && typeof password === "string"
        ? await bcrypt.compare(password, user.password)
        : false;

    if (!isValid || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json(user.toJSON());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to log in";
    return res.status(500).json({ message });
  }
};
