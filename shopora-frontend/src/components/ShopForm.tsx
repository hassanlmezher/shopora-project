import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import useNotificationStore from "../store/useNotificationStore";
import useAuthStore from "../store/useAuthStore";

function ShopForm() {
  const navigate = useNavigate();
  const [shopTitle, setShopTitle] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [popupContent, setPopupContent] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const submitShopRequest = useNotificationStore((state) => state.submitShopRequest);
  const { isLoggedIn, userEmail } = useAuthStore();
  const normalizedUserEmail = userEmail?.trim().toLowerCase() ?? "";
  const hasActiveRequest = useNotificationStore(
    (state) =>
      Boolean(normalizedUserEmail) &&
      state.requests.some(
        (request) =>
          request.ownerEmail === normalizedUserEmail && request.status !== "declined"
      )
  );
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (!popupContent) return undefined;
    const timer = setTimeout(() => setPopupContent(null), 2500);
    return () => clearTimeout(timer);
  }, [popupContent]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = userEmail?.trim();

    if (!trimmedEmail) {
      setPopupContent({ message: "Please log in to request a shop.", variant: "error" });
      return;
    }

    if (hasActiveRequest && hasAttemptedSubmit) {
      setPopupContent({
        message: "You already have an active request. Please wait for a response.",
        variant: "error",
      });
      return;
    }
    if (!shopTitle.trim() || !shopDescription.trim() || !phoneNumber.trim()) {
      setPopupContent({ message: "Please complete all the fields before submitting.", variant: "error" });
      return;
    }
    
    submitShopRequest({
      shopTitle: shopTitle.trim(),
      description: shopDescription.trim(),
      phone: phoneNumber.trim(),
      ownerEmail: trimmedEmail,
      items: [],
    });

    setShopTitle("");
    setShopDescription("");
    setPhoneNumber("");
    setPopupContent({ message: "Your shop request is pending review.", variant: "success" });
    setHasAttemptedSubmit(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#8DB9FF] px-4 pb-10 pt-6 sm:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <button
          type="button"
          onClick={() => navigate("/DashboardLoggedIn")}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
        >
          Back
        </button>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-5 rounded-3xl bg-white px-6 py-10 text-center shadow-xl sm:px-10 lg:px-16"
          >
            <p className="text-2xl font-bold text-gray-400 sm:text-3xl">Ask the admin for a permission</p>
            <input
              type="text"
              value={shopTitle}
              onChange={(event) => setShopTitle(event.target.value)}
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8DB9FF]"
              placeholder="Shop title.."
            />
            <textarea
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8DB9FF]"
              value={shopDescription}
              onChange={(event) => setShopDescription(event.target.value)}
              placeholder="Shop description.."
              rows={5}
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8DB9FF]"
              placeholder="Phone number.."
            />
            <button
              type="submit"
              disabled={!userEmail || hasActiveRequest}
              className={`rounded-2xl px-10 py-3 font-bold text-white transition hover:bg-white hover:border-2 hover:border-[#8DB9FF] hover:text-[#8DB9FF] ${
                !userEmail || hasActiveRequest ? "bg-[#B7CCFF] text-[#4C67A6] cursor-not-allowed" : "bg-[#8DB9FF]"
              }`}
            >
              Submit
            </button>
            {hasActiveRequest && (
              <p className="text-sm font-semibold text-[#FF6B6B]">
                You already have a pending or approved shop request.
              </p>
            )}
            {!isLoggedIn && (
              <p className="text-xs text-[#4B5B56]">
                Log in or create an account before asking the admin for a shop.
              </p>
            )}
          </form>
        </div>
      </div>
      <PopupMessage 
        message={popupContent?.message ?? ""}
        isVisible={Boolean(popupContent)}
        variant={popupContent?.variant ?? "success"}
      />
    </div>
  );
}

export default ShopForm;