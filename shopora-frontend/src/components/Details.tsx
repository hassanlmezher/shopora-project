import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useOrderStore, { normalizeItemId } from "../store/useOrderStore";
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

  const locationState = location.state as
    | {
        image?: string;
        name?: string;
        namee?: string;
        reviews?: Review[];
        returnPath?: string;
      }
    | null;

  const { image, name, namee, reviews: productReviews, returnPath } = locationState ?? {};

  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(productReviews || []);
  const [validationErrors, setValidationErrors] = useState<{ rating?: string; reviewText?: string }>({});

  const totalReviews = reviews.length;
  const storageKey = name && namee ? `reviews-${name}-${namee}` : null;
  const itemKey = name && namee ? normalizeItemId(name, namee) : null;

  const hasOrdered = useOrderStore((state) => (itemKey ? state.hasOrdered(itemKey) : false));
  const hasReviewed = useOrderStore((state) => (itemKey ? state.hasReviewed(itemKey) : false));
  const markReviewed = useOrderStore((state) => state.markReviewed);
  const canReview = hasOrdered && !hasReviewed;

  useEffect(() => {
    if (!storageKey) {
      return;
    }

    const savedReviews = localStorage.getItem(storageKey);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [storageKey]);

  useEffect(() => {
    if (!canReview) {
      setShowAddReview(false);
    }
  }, [canReview]);

  const handleBack = () => {
    if (returnPath) {
      navigate(returnPath);
      return;
    }
    navigate(isLoggedIn ? "/DashboardLoggedIn" : "/dashboard");
  };

  const handleReviewSubmit = () => {
    const trimmedReview = newReview.trim();
    const errors: { rating?: string; reviewText?: string } = {};

    if (selectedRating < 1 || selectedRating > 5) {
      errors.rating = "Please select a rating between 1 and 5.";
    }

    if (!trimmedReview) {
      errors.reviewText = "Please write your review before submitting.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    if (!itemKey || !canReview) {
      return;
    }

    const newReviewObj: Review = {
      reviewer: "You",
      rating: selectedRating,
      text: trimmedReview,
    };

    setReviews((prev) => {
      const updated = [...prev, newReviewObj];
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });
    markReviewed(itemKey);
    setNewReview("");
    setSelectedRating(5);
    setShowAddReview(false);
    window.dispatchEvent(new Event("reviewsUpdated"));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 md:px-10 lg:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 rounded-[32px] border border-gray-200 bg-white p-5 shadow-xl">
        <button
          type="button"
          onClick={handleBack}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#1E3B86] sm:w-fit"
        >
          Back
        </button>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-b from-white via-slate-50 to-white p-6 text-center shadow-inner lg:items-start lg:text-left">
            <div className="w-full max-w-[360px] sm:max-w-[420px]">
              <img
                src={image}
                alt={`${name ?? ""} ${namee ?? ""} pic`}
                className="w-70 rounded-3xl object-contain shadow-2xl"
              />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{name}</p>
              <p className="text-xl font-semibold text-slate-500 sm:text-2xl">{namee}</p>
            </div>
          </div>

          <div className="w-full rounded-3xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-4">
                  <img src={reviewss} alt="reviews icon" className="w-12 sm:w-16" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Reviews</p>
                    <p className="text-3xl font-bold text-slate-900">{totalReviews}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddReview((prev) => !prev)}
                  disabled={!hasOrdered || hasReviewed}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#8DB9FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2D54E0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3B86] sm:w-auto ${
                    !hasOrdered || hasReviewed ? "cursor-not-allowed opacity-60" : ""
                  }`}
                >
                  {hasReviewed
                    ? "Review submitted"
                    : showAddReview
                    ? "Close Review Form"
                    : "Add Review"}
                </button>
              </div>
              {(!hasOrdered || hasReviewed) && (
                <div className="space-y-1 text-sm text-slate-500">
                  {!hasOrdered && <p>Purchase this item before leaving a review.</p>}
                  {hasReviewed && <p>You already reviewed this item.</p>}
                </div>
              )}
            </div>

            {showAddReview && (
              <div className="mt-5 space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setSelectedRating(star);
                          setValidationErrors((prev) => ({ ...prev, rating: undefined }));
                        }}
                        className={`text-2xl ${star <= selectedRating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        {"\u2605"}
                      </button>
                    ))}
                  </div>
                  {validationErrors.rating && (
                    <p className="mt-1 text-xs font-medium text-red-500">{validationErrors.rating}</p>
                  )}
                </div>

                <textarea
                  value={newReview}
                  onChange={(e) => {
                    setNewReview(e.target.value);
                    setValidationErrors((prev) => ({ ...prev, reviewText: undefined }));
                  }}
                  placeholder="Write your review here..."
                  className={`w-full resize-none rounded-xl border p-3 text-sm text-gray-700 outline-none ${
                    validationErrors.reviewText
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#8DB9FF]"
                  }`}
                  rows={4}
                />

                {validationErrors.reviewText && (
                  <p className="mt-1 text-xs font-medium text-red-500">{validationErrors.reviewText}</p>
                )}

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
                    className="w-full rounded-xl bg-[#8DB9FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2D54E0] sm:w-auto"
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
                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-semibold text-gray-900">{review.reviewer}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${star <= review.rating ? "text-yellow-400" : "text-slate-200"}`}
                          >
                            {"\u2605"}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-slate-500">No reviews yet. Be the first to add one.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
