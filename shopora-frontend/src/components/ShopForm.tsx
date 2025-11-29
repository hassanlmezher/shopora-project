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
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    setIsSubmitted(true);
    setHasAttemptedSubmit(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#8DB9FF] px-4 pb-10 pt-6 sm:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <button
          type="button"
          onClick={() => navigate("/DashboardLoggedIn")}
          className="ml-10 mt-4 flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1E3B86] shadow-sm transition hover:bg-[#8DB9FF] hover:text-white"
        >
          Back
        </button>
        <div className="mt-6 flex flex-1 items-center justify-center">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl bg-white px-6 py-6 text-center shadow-xl sm:px-10 lg:px-16"
            >
              <p className="text-2xl font-bold text-[#2D54E0] sm:text-3xl">Ask the admin for a permission</p>
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
                className={`rounded-2xl px-10 py-3 font-bold text-white transition hover:bg-white hover:border-2 hover:border-[#2D54E0] hover:text-[#2D54E0] ${
                  !userEmail || hasActiveRequest ? "bg-[#4C67A6] text-[#B7CCFF] cursor-not-allowed" : "bg-[#2D54E0]"
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
          ) : (
            <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-3xl bg-white px-6 py-8 text-center shadow-xl sm:px-10 lg:px-16 border-2 border-green-200">
              <p className="text-2xl font-bold text-green-600 sm:text-3xl">Your form was successfully submitted!</p>
              <div className="w-full max-w-xl bg-gray-50 p-6 rounded-2xl text-left border border-gray-200">
                <h3 className="text-lg font-semibold text-[#2D54E0] mb-4">Submitted Details:</h3>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong className="text-[#2D54E0]">Shop Title:</strong> {shopTitle}</p>
                  <p className="text-gray-700"><strong className="text-[#2D54E0]">Description:</strong> {shopDescription}</p>
                  <p className="text-gray-700"><strong className="text-[#2D54E0]">Phone Number:</strong> {phoneNumber}</p>
                </div>
              </div>
            </div>
          )}
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
