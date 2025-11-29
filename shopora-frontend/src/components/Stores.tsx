import moustache from "../images/moustache.png";
import gucci from "../images/gucci.png";
import apple from "../images/apple.png";
import profileImage from "../images/profile.png";
import StoreCard from "./StoreCard";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useAdminStores from "../store/useAdminStores";
import useNotificationStore from "../store/useNotificationStore";

const storeImages: Record<string, string> = {
  hassan: moustache,
  dani: gucci,
  mhamad: apple,
};

function Stores() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const stores = useAdminStores((state) => state.stores);
  const activeStores = stores.filter((store) => !store.banned);
  const storefronts = activeStores.map((store) => ({
    ...store,
    image: storeImages[store.id] ?? profileImage,
  }));
  const acceptedRequest = useNotificationStore((state) =>
    state.requests.find((request) => request.status === "accepted")
  );
  const creatorShopImage = acceptedRequest?.items[0]?.image ?? profileImage;
  const hasStores = storefronts.length > 0;
  const hasCreatorShop = Boolean(acceptedRequest);
  const shouldShowGrid = hasStores || hasCreatorShop;

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-10">
        <button
          type="button"
          onClick={() => (isLoggedIn ? navigate("/DashboardLoggedIn") : navigate("/dashboard"))}
          className="border border-gray-300 flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
        >
          Back
        </button>
        {shouldShowGrid ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {storefronts.map((store) => (
              <StoreCard
                key={store.id}
                image={store.image}
                name={store.name}
                onExplore={() => navigate(`/stores/${store.id}`)}
              />
            ))}
            {acceptedRequest && (
              <StoreCard
                key="creator-shop"
                image={creatorShopImage}
                name={acceptedRequest.shopTitle}
                onExplore={() => navigate("/my-shop")}
              />
            )}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-10 text-center text-lg font-semibold text-[#1E3B86] shadow-sm">
            All storefronts have been banned for now.
          </div>
        )}
      </div>
    </div>
  )
}

export default Stores
