import { useNavigate } from "react-router-dom";
import useNotificationStore from "../store/useNotificationStore";
import type { ShopRequestStatus } from "../store/useNotificationStore";

const statusStyles: Record<ShopRequestStatus, string> = {
  pending: "text-[#D69E2E]",
  accepted: "text-[#16A34A]",
  declined: "text-[#DC2626]",
};

function UserNotifications() {
  const navigate = useNavigate();
  const requests = useNotificationStore((state) => state.requests);
  const sortedRequests = [...requests].reverse();

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pt-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
        >
          Back
        </button>
        <section className="rounded-3xl bg-white px-6 py-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3B86]/70">User notifications</p>
          {sortedRequests.length === 0 ? (
            <>
              <p className="mt-3 text-3xl font-bold text-[#1F3B2F]">Nothing new right now</p>
              <p className="mt-2 text-sm text-[#4B5B56]">
                Whenever there is news about orders, drops, or carts, it will show up here.
              </p>
            </>
          ) : (
            <div className="mt-6 space-y-4">
              {sortedRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border border-[#E1E9E4] bg-[#F9FCF8] p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-[#1F3B2F]">{request.shopTitle}</p>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${statusStyles[request.status]}`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#4B5B56]">{request.description}</p>
                  <p className="mt-2 text-xs text-[#6A857C]">Phone: {request.phone}</p>
                  <p className="mt-1 text-[11px] text-gray-400">
                    Submitted on {new Date(request.submittedAt).toLocaleString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserNotifications;
