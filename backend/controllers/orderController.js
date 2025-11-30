import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const userEmail = req.user;
    const { items } = req.body;

    const order = await Order.create({
      userEmail,
      items,
      orderedAt: Date.now(),
      status: "pending",
    });

    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userEmail = req.user;
    const orders = await Order.find({ userEmail });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
