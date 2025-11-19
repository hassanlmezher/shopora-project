import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useAuthStore from "../store/useAuthStore";
import YourItem from "./YourItem";
import useNotificationStore from "../store/useNotificationStore";

function UserShop() {
  const navigate = useNavigate();
  const { isLoggedIn, userEmail } = useAuthStore();
  const { requests, deleteUserShopItem } = useNotificationStore();
  const normalizedUserEmail = userEmail?.trim().toLowerCase() ?? "";
  const ownerRequest = requests.find(
    (request) =>
      request.status === "accepted" &&
      request.ownerEmail?.toLowerCase() === normalizedUserEmail
  );
  const visibleRequest = ownerRequest ?? requests.find((request) => request.status === "accepted");
  const ownerRequestId = ownerRequest?.id;
  const items = visibleRequest?.items ?? [];
  const canAddItems = Boolean(ownerRequest);

    const handleAddItem = () => {
        if (!canAddItems) {
            return;
        }
        navigate("/itemform");
    };

  const backPath = isLoggedIn ? "/DashboardLoggedIn" : "/dashboard";

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-10">
        <button
          type="button"
          onClick={() => navigate(backPath)}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
        >
          Back
        </button>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-[#1F3B2F]">My shop</p>
          {ownerRequest ? (
            <p className="text-sm text-[#4B5B56]">
              Managing &quot;{ownerRequest.shopTitle}&quot;. {ownerRequest.description}
            </p>
          ) : visibleRequest ? (
            <div className="space-y-1">
              <p className="text-sm text-[#4B5B56]">
                Previewing &quot;{visibleRequest.shopTitle}&quot;. {visibleRequest.description}
              </p>
              <p className="text-xs text-[#FF6B6B]">
                Only the shop owner can add or remove items here.
              </p>
            </div>
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
                onRemove={
                  ownerRequestId
                    ? () => deleteUserShopItem(ownerRequestId, item.id)
                    : undefined
                }
              />
            ))
          ) : (
            <div className="lg:col-span-2 xl:col-span-3 mx-auto flex w-full max-w-2xl flex-col justify-center gap-4 rounded-3xl border border-dashed border-[#3B7CFF]/40 bg-white px-8 py-12 text-[#3B7CFF] shadow-sm">
              <p className="text-xl font-semibold">No items in your shop yet.</p>
              <p className="mt-2 text-sm text-[#4B5B56]">
                Add your first product so everyone can discover what you are selling.
              </p>
            </div>
          )}
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-[#3B7CFF]/40 bg-white px-6 py-10 text-center shadow-sm">
            <button
              type="button"
              onClick={handleAddItem}
              disabled={!canAddItems}
              className={`bg-[#3B7CFF] flex h-[10rem] w-[10rem] items-center justify-center rounded-2xl text-7xl font-bold text-white transition ${
                canAddItems
                  ? "hover:bg-[#1A4ADC]"
                  : "cursor-not-allowed opacity-60"
              }`}
            >
              +
            </button>
            <p className="text-[#3B7CFF] font-bold text-2xl">Add an item</p>
            {!canAddItems && (
              <p className="text-xs text-[#4B5B56]">
                {visibleRequest
                  ? `Only the owner of "${visibleRequest.shopTitle}" can add items.`
                  : "Get your shop approved before you can add items."}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserShop;
