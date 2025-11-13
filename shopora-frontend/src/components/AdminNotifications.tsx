import { useNavigate } from "react-router-dom";

function AdminNotifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pt-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
        <section className="rounded-3xl bg-white px-6 py-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#388063]/70">Admin notifications</p>
          <p className="mt-3 text-3xl font-bold text-[#1F3B2F]">No alerts yet</p>
          <p className="mt-2 text-sm text-[#4B5B56]">
            This space will surface administrative updates once they are available.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AdminNotifications;
