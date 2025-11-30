import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const userEmail = req.user;
    const { items, storeId } = req.body;

    const order = await Order.create({
      userEmail,
      storeId,
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

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
