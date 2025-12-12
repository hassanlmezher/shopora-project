import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const addReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;

    const review = await Review.create({
      user,
      product,
      rating,
      comment,
    });

    const reviews = await Review.find({ product });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(product, {
      ratings: avgRating,
      reviewsCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
