import type { Request, Response } from "express";
import { Types } from "mongoose";
import Order, { type OrderDocument } from "../models/Order.js";
import Product from "../models/Product.js";

interface CreateOrderBody {
  user?: string;
  items?: Array<{ product?: string; quantity?: number; priceAtPurchase?: number }>;
}

export const createOrder = async (
  req: Request<unknown, unknown, CreateOrderBody>,
  res: Response
): Promise<Response> => {
  try {
    const { user, items } = req.body;
    if (!user || !items?.length) {
      return res.status(400).json({ message: "User and at least one item are required." });
    }

    const normalizedItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity ?? 1,
      priceAtPurchase: item.priceAtPurchase ?? 0,
    }));

    const invalid = normalizedItems.find(
      (item) => !item.product || item.quantity <= 0 || item.priceAtPurchase < 0
    );
    if (invalid) {
      return res.status(400).json({ message: "Each item needs product, quantity, and price." });
    }

    const productIds = normalizedItems.map((item) => new Types.ObjectId(item.product!));
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== normalizedItems.length) {
      return res.status(404).json({ message: "One or more products were not found." });
    }

    const order = await Order.create({
      user: new Types.ObjectId(user),
      items: normalizedItems.map((item) => ({
        product: new Types.ObjectId(item.product!),
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),
    });
    return res.status(201).json(order?.toJSON());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order";
    return res.status(500).json({ message });
  }
};

export const getOrdersByUser = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<Response> => {
  try {
    const orders = await Order.find<OrderDocument>({ user: req.params.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    return res.json(orders.map((order) => order.toJSON()));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch orders";
    return res.status(500).json({ message });
  }
};
