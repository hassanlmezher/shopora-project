import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useAuthStore from "../store/useAuthStore";
import YourItem from "./YourItem";
import useNotificationStore from "../store/useNotificationStore";

function UserShop() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { requests, deleteUserShopItem } = useNotificationStore();
  const acceptedRequest = requests.find((request) => request.status === "accepted");
  const items = acceptedRequest?.items ?? [];
  const canAddItems = Boolean(acceptedRequest);

  const handleAddItem = () => {
    if (canAddItems) {
      navigate("/itemform");
      return;
    }
    navigate("/settings");
  };

  const backPath = isLoggedIn ? "/DashboardLoggedIn" : "/dashboard";

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-10">
        <button
          type="button"
          onClick={() => navigate(backPath)}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-[#1F3B2F]">My shop</p>
          {acceptedRequest ? (
            <p className="text-sm text-[#4B5B56]">
              Managing &quot;{acceptedRequest.shopTitle}&quot;. {acceptedRequest.description}
            </p>
          ) : (
            <p className="text-sm text-[#4B5B56]">
              Your request is still pending approval. Once approved, you can start selling.
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-between gap-6 pt-6">
          {items.length > 0 ? (
            items.map((item) => (
              <YourItem
                key={item.id}
                item={item}
                onRemove={() => acceptedRequest && deleteUserShopItem(acceptedRequest.id, item.id)}
              />
            ))
          ) : (
            <div className="flex flex-1 flex-col items-start justify-center gap-4 rounded-3xl border border-dashed border-[#5AB688]/40 bg-white px-6 py-10 text-[#5AB688] shadow-sm">
              <p className="text-xl font-semibold">No items in your shop yet.</p>
              <p className="text-sm text-[#4B5B56]">
                Add your first product so everyone can discover what you are selling.
              </p>
            </div>
          )}

          <div className="flex min-w-[220px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-[#5AB688]/40 bg-white px-6 py-10 text-center shadow-sm">
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-[#5AB688] w-[10rem] text-white text-7xl font-bold rounded-2xl h-[10rem] shadow-lg transition hover:bg-[#479270]"
            >
              +
            </button>
            <p className="text-[#5AB688] font-bold text-2xl">Add an item</p>
            {!canAddItems && (
              <p className="text-xs text-[#4B5B56]">Get your shop approved first in settings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShop;
