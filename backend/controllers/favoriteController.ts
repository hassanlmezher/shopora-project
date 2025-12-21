import type { Request, Response } from "express";
import { Types } from "mongoose";
import Favorite, { type FavoriteDocument } from "../models/Favorite.js";
import Product from "../models/Product.js";

interface ToggleFavoriteBody {
  user?: string;
  product?: string;
}

export const toggleFavorite = async (
  req: Request<unknown, unknown, ToggleFavoriteBody>,
  res: Response
): Promise<Response> => {
  try {
    const { user, product } = req.body;
    if (!user || !product) {
      return res.status(400).json({ message: "User and product are required." });
    }

    const productExists = await Product.exists({ _id: product });
    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    const userId = new Types.ObjectId(user);
    const productId = new Types.ObjectId(product);
    const favorite = await Favorite.findOne<FavoriteDocument>({ user: userId });
    if (!favorite) {
      const created = await Favorite.create({ user: userId, products: [productId] });
      return res.status(201).json(created?.toJSON());
    }

    const isAlreadyFavorite = favorite.products.some(
      (id) => id.toString() === productId.toString()
    );
    favorite.products = isAlreadyFavorite
      ? favorite.products.filter((id) => id.toString() !== productId.toString())
      : [...favorite.products, productId];

    await favorite.save();
    await favorite.populate("products");

    return res.json(favorite.toJSON());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to toggle favorite";
    return res.status(500).json({ message });
  }
};

export const getFavorites = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<Response> => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const favorites = await Favorite.findOne<FavoriteDocument>({
      user: userId,
    }).populate("products");

    if (!favorites) {
      return res.json({ products: [] });
    }

    return res.json(favorites.toJSON());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch favorites";
    return res.status(500).json({ message });
  }
};
