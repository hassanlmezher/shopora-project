import Favorite from "../models/Favorite.js";
import Item from "../models/Item.js";

export const toggleFavorite = async (req, res) => {
  try {
    const userEmail = req.user;
    const { itemId } = req.body;

    const exists = await Favorite.findOne({ userEmail, itemId });

    if (exists) {
      await Favorite.deleteOne({ _id: exists._id });
      return res.json({ message: "Removed" });
    } else {
      await Favorite.create({ userEmail, itemId });
      return res.json({ message: "Added" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userEmail = req.user;

    const favorites = await Favorite.find({ userEmail }).populate("itemId");

    return res.json(favorites.map(f => f.itemId));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
