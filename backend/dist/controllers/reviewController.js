import Review from "../models/Review.js";
import Product from "../models/Product.js";
export const addReview = async (req, res) => {
    try {
        const { user, product, rating, comment } = req.body;
        if (!user || !product || typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "User, product, and rating (1-5) are required." });
        }
        const review = await Review.create({
            user,
            product,
            rating,
            comment: comment?.trim() ?? "",
        });
        const reviews = await Review.find({ product });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);
        await Product.findByIdAndUpdate(product, {
            ratings: avgRating,
            reviewsCount: reviews.length,
        });
        return res.status(201).json(review.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to add review";
        return res.status(500).json({ message });
    }
};
export const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "email")
            .sort({ createdAt: -1 });
        return res.json(reviews.map((review) => review.toJSON()));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load reviews";
        return res.status(500).json({ message });
    }
};
