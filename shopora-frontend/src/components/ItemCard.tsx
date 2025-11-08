import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";

interface Review {
  reviewer: string;
  rating: number;
  text: string;
}

interface ProductItem {
  image: string;
  name: string;
  namee: string;
  price: string;
  priceValue: number;
  description: string;
  by: string;
  reviews: Review[];
}

function ItemCard({ image, name, namee, price, priceValue, description, by, reviews }: ProductItem) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addItem = useCartStore((state) => state.addItem);

  const safeReviews = reviews ?? [];
  const reviewCount = safeReviews.length;
  const averageRating =
    reviewCount > 0 ? safeReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : 0;
  const roundedRating = Math.round(averageRating);
  const averageRatingLabel = reviewCount > 0 ? averageRating.toFixed(1) : "0.0";

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addItem({
      id: `${name}-${namee}`,
      image,
      name,
      namee,
      by,
      price: priceValue,
    });
  };

  const handleDetailsClick = () => {
    navigate("/details", { state: { image, name, namee, reviews } });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <img className="mx-auto w-32 sm:w-36" src={image} alt={`${name} ${namee}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold text-[#333]">{name}</p>
          <p className="text-lg font-semibold text-[#555]">{namee}</p>
        </div>
        <p className="text-xl font-bold text-[#5DBC8C]">{price}</p>
      </div>
      <p className="text-sm text-gray-500 sm:text-base">{description}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex" aria-label={`Average rating ${averageRatingLabel} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-lg ${star <= roundedRating ? "text-yellow-400" : "text-gray-300"}`}>
                {"\u2605"}
              </span>
            ))}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-semibold text-gray-900">
              {averageRatingLabel}
              <span className="text-xs font-normal text-gray-500"> / 5</span>
            </span>
            <span className="text-xs text-gray-500">
              {reviewCount} review{reviewCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <p className="whitespace-nowrap text-sm font-semibold text-gray-600">{by}</p>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          className="w-full rounded-2xl bg-[#5DBC8C] px-4 py-3 text-sm font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button
          className="w-full rounded-2xl border-2 border-[#5DBC8C] px-4 py-3 text-sm font-bold text-[#5DBC8C] transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
