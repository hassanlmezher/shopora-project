import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";
import lightMode from "../images/lightMode.png";
import AdminShopCard from "./AdminShopCard";
import useAdminStores from "../store/useAdminStores";

function AdminDashboard() {
  const navigate = useNavigate();
  const stores = useAdminStores((state) => state.stores);
  const totalStores = stores.length;

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-8">
        <header className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <img className="w-20 max-w-[120px] sm:w-24 lg:w-28" src={logo} alt="logo" />
          <div className="flex items-center justify-center gap-6">
            <img className="h-10 w-10" src={lightMode} alt="toggle theme" />
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-2xl border border-transparent bg-[#65CD99] px-5 py-2 font-bold text-white transition hover:border-[#65CD99] hover:bg-white hover:text-[#65CD99]"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#388063]/70">
                Stores overview
              </p>
              <p className="text-2xl font-bold text-[#1F3B2F]">Manage storefronts</p>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm">
              {totalStores} {totalStores === 1 ? "store" : "stores"}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {totalStores > 0 ? (
              stores.map((store) => (
                <AdminShopCard
                  key={store.id}
                  storeName={store.name}
                  onDetails={() => navigate(`/admin/stores/${store.id}`)}
                />
              ))
            ) : (
              <div className="col-span-full rounded-3xl bg-white p-8 text-center text-[#388063] shadow-sm">
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
