import { Types } from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const getCart = async (req, res) => {
    try {
        const userId = new Types.ObjectId(req.params.userId);
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        return res.json(cart ? cart.toJSON() : { items: [] });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to fetch cart";
        return res.status(500).json({ message });
    }
};
export const addToCart = async (req, res) => {
    try {
        const { user, item } = req.body;
        if (!user || !item?.product) {
            return res.status(400).json({ message: "User and product are required." });
        }
        const productExists = await Product.exists({ _id: item.product });
        if (!productExists) {
            return res.status(404).json({ message: "Product not found." });
        }
        const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
        const userId = new Types.ObjectId(user);
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            const newCart = await Cart.create({
                user: userId,
                items: [{ product: new Types.ObjectId(item.product), quantity }],
            });
            return res.status(201).json(newCart?.toJSON());
        }
        const existingItem = cart.items.find((cartItem) => cartItem.product.toString() === item.product);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ product: new Types.ObjectId(item.product), quantity });
        }
        await cart.save();
        await cart.populate("items.product");
        return res.json(cart.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to update cart";
        return res.status(500).json({ message });
    }
};
export const updateCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;
        const normalizedQty = quantity ?? 1;
        if (normalizedQty < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1." });
        }
        const cart = await Cart.findOne({ user: new Types.ObjectId(userId) }).populate("items.product");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }
        const item = cart.items.find((entry) => entry.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart." });
        }
        item.quantity = normalizedQty;
        await cart.save();
        await cart.populate("items.product");
        return res.json(cart.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to update cart item";
        return res.status(500).json({ message });
    }
};
export const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ user: new Types.ObjectId(userId) });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }
        cart.items = cart.items.filter((entry) => entry.product.toString() !== productId);
        await cart.save();
        await cart.populate("items.product");
        return res.json(cart.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to remove cart item";
        return res.status(500).json({ message });
    }
};
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: new Types.ObjectId(req.params.userId) });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }
        cart.items = [];
        await cart.save();
        return res.json(cart.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to clear cart";
        return res.status(500).json({ message });
    }
};
