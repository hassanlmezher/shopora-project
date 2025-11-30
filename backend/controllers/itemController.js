import Item from "../models/Item.js";
import Shop from "../models/Shop.js";

export const addItem = async (req, res) => {
  try {
    const {
      shopId: requestedShopId,
      image,
      images,
      name,
      namee,
      price,
      priceValue,
      description,
      category,
      ratings,
    } = req.body;

    const ownerEmail = req.user;
    const shop = requestedShopId
      ? await Shop.findById(requestedShopId)
      : await Shop.findOne({ ownerEmail });

    if (!shop || shop.status !== "accepted") {
      return res.status(400).json({ message: "Shop not approved or doesn't exist" });
    }

    const item = await Item.create({
      shopId: shop._id,
      image,
      images,
      name,
      namee,
      price: typeof price === "number" ? price : priceValue,
      priceValue: priceValue ?? Number(price) ?? 0,
      description,
      by: shop.title,
      category,
      ratings,
    });

    shop.items.push(item._id);
    await shop.save();

    return res.json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getItemsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const items = await Item.find({ shopId });
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
