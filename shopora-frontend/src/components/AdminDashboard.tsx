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
  const bannedStores = useMemo(() => stores.filter((store) => store.banned), [stores]);
  const activeStores = useMemo(() => stores.filter((store) => !store.banned), [stores]);
  const totalShopCount = totalStores + acceptedRequests.length;

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-8">
        <header className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <img className="w-20 max-w-[120px] sm:w-24 lg:w-28" src={logo} alt="logo" />
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/admin/shop-requests")}
              className="relative rounded-full border border-[#8DB9FF]/30 bg-[#8DB9FF]/10 p-3 text-[#1E3B86] transition hover:bg-[#8DB9FF]/20"
              aria-label="View shop requests"
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
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
            {activeStores.length > 0 || acceptedRequests.length > 0 ? (
              <>
                {activeStores.map((store) => (
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

        {bannedStores.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DC2626]/70">
                  Banned stores
                </p>
                <p className="text-2xl font-bold text-[#DC2626]">Manage banned storefronts</p>
              </div>
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-[#DC2626] shadow-sm">
                {bannedStores.length} {bannedStores.length === 1 ? "store" : "stores"}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bannedStores.map((store) => (
                <AdminShopCard
                  key={store.id}
                  storeName={store.name}
                  onDetails={() => navigate(`/admin/stores/${store.id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
