import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import useNotificationStore from "../store/useNotificationStore";
import type { ShopRequestStatus } from "../store/useNotificationStore";

function RequestConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId } = useParams<{ requestId: string }>();
  const request = useNotificationStore((state) => state.requests.find((item) => item.id === requestId));
  const updateRequestStatus = useNotificationStore((state) => state.updateRequestStatus);
  const [popup, setPopup] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const locationState = location.state as { fromNotifications?: boolean } | null;
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

  const handleDecision = (status: ShopRequestStatus) => {
    if (!request || request.status !== "pending") {
      return;
    }

    updateRequestStatus(request.id, status);
    setPopup({
      message: status === "accepted" ? "Request accepted." : "Request declined.",
      variant: status === "accepted" ? "success" : "error",
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

  const statusLabel = request.status[0].toUpperCase() + request.status.slice(1);

  return (
    <div className="min-h-screen bg-[#F4F7F6] px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <button
          type="button"
          onClick={handleBack}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
        >
          Back
        </button>

        <section className="rounded-3xl border border-[#E1E9E4] bg-white p-8 shadow-xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-2xl font-semibold text-[#1F3B2F]">Request confirmation</p>
              <p className="text-sm text-[#4B5B56]">
                Review what the creator submitted before accepting or declining.
              </p>
            </div>
            <span className="rounded-full border border-[#E2E8F0] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#6A857C]">
              {statusLabel}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E3B86]/80">Shop title</p>
              <p className="text-lg font-semibold text-[#1F3B2F]">{request.shopTitle}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E3B86]/80">
                Description
              </p>
              <p className="text-sm text-[#4B5B56]">{request.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E3B86]/80">Phone</p>
              <p className="text-sm text-[#4B5B56]">{request.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E3B86]/80">Submitted</p>
              <p className="text-sm text-[#4B5B56]">
                {new Date(request.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleDecision("accepted")}
              disabled={request.status !== "pending"}
              className="rounded-2xl bg-[#16A34A] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => handleDecision("declined")}
              disabled={request.status !== "pending"}
              className="rounded-2xl border border-[#DC2626] px-6 py-2 text-sm font-semibold text-[#DC2626] transition hover:bg-[#DC2626] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Decline
            </button>
          </div>
        </section>
      </div>

      <PopupMessage message={popup?.message ?? ""} isVisible={Boolean(popup)} variant={popup?.variant ?? "info"} />
    </div>
  );
}

export default RequestConfirmation;
