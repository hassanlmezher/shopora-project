import Shop from "../models/Shop.js";
import Item from "../models/Item.js";

export const createShopRequest = async (req, res) => {
  try {
    const { shopTitle, description, phone } = req.body;
    const ownerEmail = req.user;

    const shop = await Shop.create({
      ownerEmail,
      title: shopTitle,
      description,
      phone,
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
