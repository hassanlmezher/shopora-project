import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import reviewss from "../images/reviews.png";

type Review = {
  reviewer: string;
  rating: number;
  text: string;
};

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  const { image, name, namee, reviews: productReviews } = location.state || {};

  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(productReviews || []);

  const totalReviews = reviews.length;
  const storageKey = name && namee ? `reviews-${name}-${namee}` : null;

  useEffect(() => {
    if (!storageKey) {
      return;
    }

    const savedReviews = localStorage.getItem(storageKey);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [storageKey]);

  const handleBack = () => {
    navigate(isLoggedIn ? "/DashboardLoggedIn" : "/dashboard");
  };

  const handleReviewSubmit = () => {
    if (!newReview.trim()) {
      return;
    }

    const newReviewObj: Review = {
      reviewer: "You",
      rating: selectedRating,
      text: newReview.trim(),
    };

    setReviews((prev) => {
      const updated = [...prev, newReviewObj];
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });
    setNewReview("");
    setSelectedRating(5);
    setShowAddReview(false);
    window.dispatchEvent(new Event("reviewsUpdated"));
  };

  return (
    <div className="min-h-screen bg-[#65CD99] px-4 py-6 sm:px-6 md:px-10 lg:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <button
          type="button"
          onClick={handleBack}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#388063] sm:w-fit"
        >
          Back
        </button>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/10 p-6 text-center backdrop-blur-sm lg:items-start lg:text-left">
            <img
              src={image}
              alt={`${name ?? ""} ${namee ?? ""} pic`}
              className="w-40 max-w-full rounded-2xl object-contain sm:w-56"
            />
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white sm:text-4xl">{name}</p>
              <p className="text-xl font-semibold text-white/90 sm:text-2xl">{namee}</p>
            </div>
          </div>

          <div className="w-full rounded-3xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={reviewss} alt="reviews icon" className="w-16 sm:w-20 lg:w-24" />
                <p className="text-2xl font-bold text-[#65CD99] sm:text-3xl">{totalReviews} Reviews</p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddReview((prev) => !prev)}
                className="w-full rounded-xl bg-[#65CD99] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4CAF50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#388063] sm:w-auto"
              >
                {showAddReview ? "Close" : "Add Review"}
              </button>
            </div>

            {showAddReview && (
              <div className="mt-5 space-y-4 rounded-2xl border border-dashed border-[#65CD99]/40 bg-gray-50 p-4 sm:p-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        className={`text-2xl ${star <= selectedRating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        {"\u2605"}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-700 outline-none focus:border-[#65CD99]"
                  rows={4}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReviewSubmit}
                    className="w-full rounded-xl bg-[#65CD99] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4CAF50] sm:w-auto"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-5">
              {totalReviews > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={`${review.reviewer}-${index}`}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-semibold text-gray-900">{review.reviewer}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            {"\u2605"}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">No reviews yet. Be the first to add one.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
