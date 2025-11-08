import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import reviewss from "../images/reviews.png"
import { useState, useEffect } from "react";

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  const { image, name, namee, reviews: productReviews } = location.state || {};

  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState(productReviews || []);

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews-${name}-${namee}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [name, namee]);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem(`reviews-${name}-${namee}`, JSON.stringify(reviews));
    }
  }, [reviews, name, namee]);
  return (
    <div className="bg-[#65CD99] min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <button
            type="button"
            onClick={() => isLoggedIn ? navigate('/DashboardLoggedIn') : navigate('/dashboard')}
            className="flex border border-gray-300 w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white mb-6 ml-4 md:ml-8"
          >
            Back
          </button>
        <div className="flex flex-col md:flex-row gap-4 justify-start items-center md:items-start mb-12 ml-4 md:ml-8">
            <img src={image} alt={`${name} ${namee} pic`} className="w-32 md:w-40" />
            <div className="text-center md:text-left">
                <p className="text-white text-2xl md:text-4xl font-bold">{name}</p>
                <p className="text-white text-xl md:text-3xl font-bold">{namee}</p>
            </div>
        </div>
        <div className="ml-4 md:ml-8 mb-6 md:mb-0">
          <img src={reviewss} alt="reviews icon" className="w-24 md:w-30" />
        </div>
        <div className="bg-white w-full md:absolute md:top-20 md:right-24 md:w-96 md:h-128 rounded-3xl justify-center items-center overflow-y-auto p-6 md:p-0 mx-6 md:mx-0">
          <div className="flex justify-between items-center mt-5 ml-3 mr-3">
            <p className="text-[#65CD99] font-bold text-3xl">{reviews?.length || 0} Reviews</p>
            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="bg-[#65CD99] text-white px-4 py-2 rounded-lg hover:bg-[#4CAF50] transition"
            >
              Add Review
            </button>
          </div>

          {showAddReview && (
            <div className="mt-5 ml-5 mr-5 p-4 border-2 rounded-2xl bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`text-2xl ${star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-2 border rounded-lg resize-none"
                rows={3}
              />
              <button
                onClick={() => {
                  if (newReview.trim()) {
                    const newReviewObj = {
                      reviewer: "You",
                      rating: selectedRating,
                      text: newReview.trim()
                    };
                    setReviews((prev: any) => [...prev, newReviewObj]);
                    setNewReview("");
                    setSelectedRating(5);
                    setShowAddReview(false);
                    window.dispatchEvent(new Event('reviewsUpdated'));
                  }
                }}
                className="mt-2 bg-[#65CD99] text-white px-4 py-2 rounded-lg hover:bg-[#4CAF50] transition"
              >
                Submit Review
              </button>
            </div>
          )}

          {reviews?.map((review: { reviewer: string; rating: number; text: string }, index: number) => (
            <div key={index} className="mt-10 ml-5 border-2 rounded-2xl mr-5 p-4">
              <div className="flex">
                <p>{review.reviewer}</p>
                <div className="ml-10 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Review:</p>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Details
