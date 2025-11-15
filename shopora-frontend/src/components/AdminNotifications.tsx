import { useNavigate } from "react-router-dom";
import useNotificationStore from "../store/useNotificationStore";
import type { ShopRequestStatus } from "../store/useNotificationStore";

const statusStyles: Record<ShopRequestStatus, string> = {
  pending: "text-[#D97706]",
  accepted: "text-[#059669]",
  declined: "text-[#DC2626]",
};

function AdminNotifications() {
  const navigate = useNavigate();
  const requests = useNotificationStore((state) => state.requests);
  const sortedRequests = [...requests].reverse();

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
          {sortedRequests.length === 0 ? (
            <>
              <p className="mt-3 text-3xl font-bold text-[#1F3B2F]">No alerts yet</p>
              <p className="mt-2 text-sm text-[#4B5B56]">
                This space will surface administrative updates once they are available.
              </p>
            </>
          ) : (
            <div className="mt-6 space-y-4">
              {sortedRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border border-[#E1E9E4] bg-[#fdfdfd] p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-[#1F3B2F]">New shop request</p>
                      <p className="text-sm text-[#4B5B56]">{request.shopTitle}</p>
                      <p className="text-xs text-[#6A857C]">{request.description}</p>
                      <p className="text-xs text-[#6A857C]">Phone: {request.phone}</p>
                      <p className="text-[11px] text-gray-400">
                        Submitted on {new Date(request.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${statusStyles[request.status]}`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/requests/${request.id}`, { state: { fromNotifications: true } })
                      }
                      className="rounded-2xl border border-[#65CD99] px-4 py-2 text-sm font-semibold text-[#388063] transition hover:bg-[#65CD99] hover:text-white"
                    >
                      View details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminNotifications;

