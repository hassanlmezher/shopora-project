import Order from "../models/Order.js";
export const createOrder = async (req, res) => {
    const order = await Order.create(req.body);
    res.status(201).json(order);
};
export const getOrdersByUser = async (req, res) => {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
};
