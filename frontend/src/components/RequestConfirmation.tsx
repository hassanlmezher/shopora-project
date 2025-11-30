import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import useNotificationStore, { type UserShopItem } from "../store/useNotificationStore";

type ItemCardProps = {
  item: UserShopItem;
  onViewDetails?: () => void;
  onDelete?: () => void;
};

function ItemCard({ item, onViewDetails, onDelete }: ItemCardProps) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-lg">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#F4F7F6] p-3 shadow-sm">
          <img src={item.image} alt={`${item.name} ${item.namee}`} className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="text-lg font-semibold text-[#1F3B2F]">{item.name}</div>
          <p className="text-sm text-[#6A857C]">{item.namee}</p>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-bold text-[#3B7CFF]">{item.price}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9AA9A4]">
              {item.category} · {item.ratings}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-[#4B5B56]">{item.description || "No description provided yet."}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onViewDetails}
          className="flex-1 rounded-full border border-[#3B7CFF] px-6 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#3B7CFF] hover:text-white"
        >
          View details
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full bg-[#1F1F1F] px-6 py-2 text-sm font-semibold text-white transition hover:bg-black ${
            onDelete ? "" : "cursor-not-allowed opacity-40"
          }`}
          disabled={!onDelete}
          onClick={onDelete}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

function RequestConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId } = useParams<{ requestId: string }>();
  const request = useNotificationStore((state) => state.requests.find((item) => item.id === requestId));
  const updateRequestStatus = useNotificationStore((state) => state.updateRequestStatus);
  const deleteUserShopItem = useNotificationStore((state) => state.deleteUserShopItem);
  const [popup, setPopup] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const locationState = location.state as { fromNotifications?: boolean } | null;
  const sortedItems = useMemo(() => [...(request?.items ?? [])], [request?.items]);
  const handleBack = () => {
    if (locationState?.fromNotifications) {
      navigate(-1);
      return;
    }
    navigate("/notifications/admin");
  };

  useEffect(() => {
    if (!popup) {
      return undefined;
    }
    const timer = setTimeout(() => setPopup(null), 2200);
    return () => clearTimeout(timer);
  }, [popup]);

  const handleBanShop = () => {
    if (!request) {
      return;
    }
    updateRequestStatus(request.id, "declined");
    setPopup({ message: "Shop banned.", variant: "error" });
    setTimeout(() => {
      navigate("/adminDashboard");
    }, 600);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!requestId) {
      return;
    }
    deleteUserShopItem(requestId, itemId);
    setPopup({ message: "Item deleted from this request.", variant: "success" });
  };

  const handleViewItemDetails = (item: UserShopItem) => {
    navigate("/details", {
      state: { ...item, returnPath: "/adminDashboard" },
    });
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E1E9E4] bg-white p-8 text-center shadow-lg">
          <p className="text-xl font-semibold text-[#1F3B2F]">Request not found.</p>
          <p className="mt-2 text-sm text-[#4B5B56]">This request may have been handled already.</p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 rounded-2xl border border-[#8DB9FF] px-6 py-2 text-sm font-semibold text-[#1E3B86] transition hover:bg-[#8DB9FF] hover:text-white"
          >
            Back to notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleBanShop}
            className="rounded-2xl border border-transparent bg-[#F87171] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#DC2626]"
          >
            Ban shop
          </button>
        </div>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xl font-semibold text-[#1F3B2F]">Store inventory</p>
            <span className="text-sm text-[#6A857C]">Sorted by newest</span>
          </div>
          {sortedItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {sortedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={() => handleViewItemDetails(item)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center text-sm text-[#6A857C] shadow-sm">
              No items were submitted with this request yet.
            </div>
          )}
        </section>
      </div>

      <PopupMessage message={popup?.message ?? ""} isVisible={Boolean(popup)} variant={popup?.variant ?? "info"} />
    </div>
  );
}

export default RequestConfirmation;
