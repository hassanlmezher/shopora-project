import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdminStores, { type AdminStoreItem } from "../store/useAdminStores";
import PopupMessage from "./PopupMessage";

type PopupVariant = "success" | "error" | "info";

interface PopupState {
  message: string;
  variant: PopupVariant;
  isVisible: boolean;
}

function AdminDetails() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const { stores, itemsByStore, removeStore, removeItem } = useAdminStores();

  const store = storeId ? stores.find((entry) => entry.id === storeId) : undefined;
  const items = storeId ? itemsByStore[storeId] ?? [] : [];

  const [storeSnapshot, setStoreSnapshot] = useState(store);
  const [itemsSnapshot, setItemsSnapshot] = useState(items);
  const [popup, setPopup] = useState<PopupState>({ message: "", variant: "info", isVisible: false });

  useEffect(() => {
    if (!popup.isVisible) {
      return;
    }
    const timeout = setTimeout(() => {
      setPopup((prev) => ({ ...prev, isVisible: false }));
    }, 2200);
    return () => clearTimeout(timeout);
  }, [popup.isVisible]);

  useEffect(() => {
    if (store) {
      setStoreSnapshot(store);
    }
  }, [store]);

useEffect(() => {
  if (store) {
    setItemsSnapshot(items);
  }
}, [items, store]);

  const activeStore = store ?? storeSnapshot;
  const activeItems = store ? items : itemsSnapshot;

  const showPopup = (message: string, variant: PopupVariant) => {
    setPopup({ message, variant, isVisible: true });
  };

  const handleGoBack = () => {
    navigate("/adminDashboard");
  };

  const handleBanStore = () => {
    if (!storeId || !activeStore) {
      return;
    }
    const currentName = activeStore.name;
    removeStore(storeId);
    showPopup(`${currentName} was banned.`, "error");
    setTimeout(() => {
      navigate("/adminDashboard");
    }, 1200);
  };

  const handleViewItemDetails = (item: AdminStoreItem) => {
    navigate("/details", { state: item });
  };

  const handleDeleteItem = (item: AdminStoreItem) => {
    if (!storeId) {
      return;
    }
    removeItem(storeId, item.itemId);
    showPopup(`${item.name} removed from ${activeStore?.name ?? "store"}.`, "success");
  };

  if (!activeStore) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F4F7F6] px-4 text-center">
        <p className="text-xl font-semibold text-[#388063]">We couldn't find that shop.</p>
        <button
          type="button"
          onClick={handleGoBack}
          className="mt-6 rounded-full border border-[#388063] px-5 py-2 text-sm font-bold text-[#388063] transition hover:bg-[#388063] hover:text-white"
        >
          Back to admin dashboard
        </button>
        <PopupMessage message="Shop not found." isVisible />
      </div>
    );
  }

  const itemCount = activeItems.length;

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleBanStore}
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
          {itemCount > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {activeItems.map((item) => (
                <div key={item.itemId} className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-md">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl bg-[#F4F7F6] object-contain"
                    />
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-[#1F3B2F]">{item.name}</p>
                      <p className="text-sm text-[#6A857C]">{item.namee}</p>
                      <p className="text-xl font-bold text-[#65CD99]">{item.price}</p>
                      <p className="text-xs uppercase tracking-wide text-[#9AA9A4]">
                        {item.category} · {item.ratings}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-[#4B5B56]">{item.description}</div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleViewItemDetails(item)}
                      className="flex-1 rounded-2xl border border-[#65CD99] px-4 py-2 text-sm font-semibold text-[#388063] transition hover:bg-[#65CD99] hover:text-white"
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item)}
                      className="flex-1 rounded-2xl border border-transparent bg-[#1F1F1F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
                    >
                      Delete item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center text-[#6A857C] shadow-sm">
              No items left in this store.
            </div>
          )}
        </section>
      </div>

      <PopupMessage message={popup.message} isVisible={popup.isVisible} variant={popup.variant} />
    </div>
  );
}

export default AdminDetails;
