import Cart from "../models/Cart.js";
export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    res.json(cart);
};
export const addToCart = async (req, res) => {
    const cart = await Cart.findOneAndUpdate({ user: req.body.user }, { $push: { items: req.body.item } }, { upsert: true, new: true });
    res.json(cart);
};
