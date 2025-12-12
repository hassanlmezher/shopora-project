import Store from "../models/Store.js";

export const requestStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStores = async (req, res) => {
  const stores = await Store.find({ status: "approved" });
  res.json(stores);
};

export const updateStoreStatus = async (req, res) => {
  const { status } = req.body;
  const store = await Store.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(store);
};
