import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import useFavoritesStore from "../store/useFavoritesStore";

function Favorites() {
  const navigate = useNavigate();
  const items = useFavoritesStore((state) => state.items);

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/DashboardLoggedIn")}
            className="border border-gray-300 flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
          >
            Back to dashboard
          </button>
          <div>
            <p className="text-3xl font-bold text-[#1F3B2F]">My Favorites</p>
            <p className="text-sm text-[#6C7A6D]">Items you have saved across Shopora.</p>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-[#1E3B86]/30 bg-white p-10 text-center text-lg font-semibold text-[#1E3B86]">
            You haven't favorited anything yet. Tap the heart on a product to save it here.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item.id} {...item} reviews={item.reviews ?? []} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;

