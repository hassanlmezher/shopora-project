import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
import useFavoritesStore from "../store/useFavoritesStore";
import PopupMessage from "./PopupMessage";

interface Review {
  reviewer: string;
  rating: number;
  text: string;
}

interface ProductItem {
  image: string;
  images?: string[];
  name: string;
  namee: string;
  price: string;
  priceValue: number;
  description: string;
  by: string;
  reviews: Review[];
}

function ItemCard({
  image,
  images,
  name,
  namee,
  price,
  priceValue,
  description,
  by,
  reviews,
}: ProductItem) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(`${name}-${namee}`));
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" | "info" } | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slides = useMemo(() => (images && images.length ? images : [image]), [image, images]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const displayedImage = slides[currentSlide];

  const safeReviews = reviews ?? [];
  const reviewCount = safeReviews.length;
  const averageRating =
    reviewCount > 0 ? safeReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : 0;
  const roundedRating = Math.round(averageRating);
  const averageRatingLabel = reviewCount > 0 ? averageRating.toFixed(1) : "0.0";

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      setCurrentSlide(0);
      return;
    }

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [slides.length]);

  const showToast = (message: string, variant: "success" | "error" | "info" = "info") => {
    setToast({ message, variant });
    setIsToastVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
      hideTimerRef.current = null;
    }, 1000);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addItem({
      id: `${name}-${namee}`,
      image: displayedImage,
      name,
      namee,
      by,
      price: priceValue,
    });

    showToast("Item added to cart!", "success");
  };

  const handleDetailsClick = () => {
    navigate("/details", { state: { image, images, name, namee, reviews } });
  };

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const wasFavorite = isFavorite;
    toggleFavorite({
      id: `${name}-${namee}`,
      image,
      images,
      name,
      namee,
      price,
      priceValue,
      description,
      reviews: reviews ?? [],
      by,
    });
    showToast(wasFavorite ? "Item removed from favorites" : "Item added to favorites", wasFavorite ? "error" : "success");
  };

  return (
    <>
      <article className="relative flex h-full w-full max-w-[320px] flex-col gap-5 rounded-[28px] border border-blue-100 bg-gradient-to-b from-blue-50 via-white to-white shadow-[0_25px_45px_rgba(59,124,255,0.18)]">
        <div className="relative flex flex-1 flex-col gap-4 rounded-[24px] bg-white px-6 pb-6 pt-8">
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border transition ${
              isFavorite ? "border-[#FF6B6B] bg-white shadow" : "border-slate-200 bg-white/90"
            }`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#FF6B6B" : "none"}
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s-6.2-4.35-9.33-7.47A5.5 5.5 0 1 1 11.4 5.4L12 6l.6-.6a5.5 5.5 0 0 1 7.73 7.73C18.2 16.65 12 21 12 21z" />
            </svg>
          </button>
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[26px] bg-blue-50 shadow-inner shadow-blue-500/20">
            <img
              className="h-28 w-28 object-contain"
              src={displayedImage}
              alt={`${name} ${namee}`}
            />
          </div>
          {slides.length > 1 && (
            <div className="flex justify-center gap-2">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-8 rounded-full transition-all ${currentSlide === index ? "bg-[#3875F0]" : "bg-blue-100"}`}
                />
              ))}
            </div>
          )}
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900">{name}</p>
            <p className="text-sm font-semibold text-blue-700">{namee}</p>
          </div>
          <p className="text-sm text-slate-500">{description}</p>
          <div className="flex items-center justify-between rounded-[18px] border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-blue-500">Price</p>
              <p className="text-lg font-bold text-blue-700">{price}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.5em] text-blue-500">Shop</p>
              <p className="text-sm font-semibold text-slate-900">{by}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 text-lg text-[#FFB703]">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`${star <= roundedRating ? "text-[#FFB703]" : "text-slate-200"}`}>
                  {"\u2605"}
                </span>
              ))}
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-600">
              {averageRatingLabel} - ({reviewCount}) review{reviewCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="flex gap-3 rounded-b-[28px] border-t border-blue-100 bg-white px-6 py-3">
          <button
            className="flex-1 min-h-[42px] rounded-[20px] border border-transparent bg-[#3977fd] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition hover:bg-green-500 hover:text-white hover:scale-[1.01]"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className="flex-1 min-h-[42px] rounded-[20px] border-2 border-[#3977fd] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#3977fd] transition hover:bg-black hover:text-white hover:border-none hover:scale-[1.01]"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </div>
      </article>
      <PopupMessage message={toast?.message ?? ""} isVisible={isToastVisible && Boolean(toast)} variant={toast?.variant ?? "info"} />
    </>
  );
}

export default ItemCard;
