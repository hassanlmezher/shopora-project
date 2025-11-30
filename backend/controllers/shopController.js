import Shop from "../models/Shop.js";
import Item from "../models/Item.js";

export const createShopRequest = async (req, res) => {
  try {
    const { shopTitle, description, phone, category, image, email, name } = req.body;
    const ownerEmail = req.user || email;

    const shop = await Shop.create({
      ownerEmail,
      email: email || ownerEmail,
      title: shopTitle || name,
      name: shopTitle || name,
      description,
      phone,
      category,
      image,
      status: "pending",
    });

    return res.json(shop);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const approveShop = async (req, res) => {
  try {
    const { id } = req.params;

    const shop = await Shop.findByIdAndUpdate(id, { status: "accepted" }, { new: true });

    return res.json(shop);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    return res.json(shops);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (typeof req.body.banned === "boolean") updates.banned = req.body.banned;
    if (req.body.status) updates.status = req.body.status;
    if (req.body.category) updates.category = req.body.category;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.phone) updates.phone = req.body.phone;

    const shop = await Shop.findByIdAndUpdate(id, updates, { new: true });
    return res.json(shop);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
