import Favorite from "../models/Favorite.js";
export const toggleFavorite = async (req, res) => {
    const fav = await Favorite.findOneAndUpdate({ user: req.body.user }, { $addToSet: { products: req.body.product } }, { upsert: true, new: true });
    res.json(fav);
};
