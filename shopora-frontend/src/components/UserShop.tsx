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

        <section className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {items.length > 0 ? (
            items.map((item) => (
              <YourItem
                key={item.id}
                item={item}
                onRemove={() => acceptedRequest && deleteUserShopItem(acceptedRequest.id, item.id)}
              />
            ))
          ) : (
            <div className="lg:col-span-2 xl:col-span-3 mx-auto flex w-full max-w-2xl flex-col justify-center gap-4 rounded-3xl border border-dashed border-[#5AB688]/40 bg-white px-8 py-12 text-[#5AB688] shadow-sm">
              <p className="text-xl font-semibold">No items in your shop yet.</p>
              <p className="mt-2 text-sm text-[#4B5B56]">
                Add your first product so everyone can discover what you are selling.
              </p>
            </div>
          )}
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-[#5AB688]/40 bg-white px-6 py-10 text-center shadow-sm">
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-[#5AB688] flex h-[10rem] w-[10rem] items-center justify-center rounded-2xl text-7xl font-bold text-white transition hover:bg-[#479270]"
            >
              +
            </button>
            <p className="text-[#5AB688] font-bold text-2xl">Add an item</p>
            {!canAddItems && (
              <p className="text-xs text-[#4B5B56]">Get your shop approved first in settings.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserShop;
