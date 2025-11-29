import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";
import AdminShopCard from "./AdminShopCard";
import useAdminStores from "../store/useAdminStores";
import useNotificationStore from "../store/useNotificationStore";

function AdminDashboard() {
  const navigate = useNavigate();
  const stores = useAdminStores((state) => state.stores);
  const totalStores = stores.length;
  const requests = useNotificationStore((state) => state.requests);
  const acceptedRequests = useMemo(
    () => requests.filter((request) => request.status === "accepted"),
    [requests]
  );
  const pendingRequestCount = useMemo(
    () => requests.filter((request) => request.status === "pending").length,
    [requests]
  );
  const totalShopCount = totalStores + acceptedRequests.length;

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-8">
        <header className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <img className="w-20 max-w-[120px] sm:w-24 lg:w-28" src={logo} alt="logo" />
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/notifications/admin")}
              className="relative rounded-full border border-[#8DB9FF]/30 bg-[#8DB9FF]/10 p-3 text-[#1E3B86] transition hover:bg-[#8DB9FF]/20"
              aria-label="View notifications"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9a6 6 0 1 1 12 0v4.2l1.2 2.8a1 1 0 0 1-.92 1.4H5.7a1 1 0 0 1-.92-1.4L6 13.2z" />
                <path d="M10 19a2 2 0 0 0 4 0" />
              </svg>
              {pendingRequestCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[18px] items-center justify-center rounded-full bg-[#FF6B6B] px-1 text-[11px] font-bold text-white">
                  {pendingRequestCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-2xl border border-transparent bg-[#2D54E0] px-5 py-2 font-bold text-white transition hover:border-[#2D54E0] hover:bg-white hover:text-[#2D54E0]"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1E3B86]/70">
                Stores overview
              </p>
              <p className="text-2xl font-bold text-[#1F3B2F]">Manage storefronts</p>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm">
              {totalShopCount} {totalShopCount === 1 ? "store" : "stores"}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {totalShopCount > 0 ? (
              <>
                {stores.filter((store) => !store.banned).map((store) => (
                  <AdminShopCard
                    key={store.id}
                    storeName={store.name}
                    onDetails={() => navigate(`/admin/stores/${store.id}`)}
                  />
                ))}
                {acceptedRequests.map((request) => (
                  <AdminShopCard
                    key={`request-${request.id}`}
                    storeName={request.shopTitle}
                    onDetails={() =>
                      navigate(`/admin/requests/${request.id}`, {
                        state: { fromNotifications: true },
                      })
                    }
                  />
                ))}
              </>
            ) : (
              <div className="col-span-full rounded-3xl bg-white p-8 text-center text-[#1E3B86] shadow-sm">
                All storefronts have been banned for now.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
