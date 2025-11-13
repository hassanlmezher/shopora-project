import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import useNotificationStore from "../store/useNotificationStore";

function ShopForm() {
  const navigate = useNavigate();
  const [shopTitle, setShopTitle] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [popupContent, setPopupContent] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const submittedShopRequest = useNotificationStore((state) => state.submitShopRequest);

  useEffect(() => {
    if (!popupContent) return undefined;
    const timer = setTimeout(() => setPopupContent(null), 2500);
    return () => clearTimeout(timer);
  }, [popupContent]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!shopTitle.trim() || !shopDescription.trim() || !phoneNumber.trim()) {
      setPopupContent({ message: "Please complete all the fields before submitting.", variant: "error" });
      return;
    }
    
    submittedShopRequest({
      shopTitle: shopTitle.trim(),
      description: shopDescription.trim(),
      phone: phoneNumber.trim(),
    });

    setShopTitle("");
    setShopDescription("");
    setPhoneNumber("");
    setPopupContent({ message: "Your shop request is pending review.", variant: "sucess" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#65CD99] px-4 pb-10 pt-6 sm:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <button
          type="button"
          onClick={() => navigate("/welcome-create")}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
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
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              placeholder="Shop title.."
            />
            <textarea
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              value={shopDescription}
              onChange={(event) => setShopDescription(event.target.value)}
              placeholder="Shop description.."
              rows={5}
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="w-full max-w-xl rounded-2xl bg-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              placeholder="Phone number.."
            />
            <button
              type="submit"
              className="rounded-2xl bg-[#65CD99] px-10 py-3 font-bold text-white transition hover:bg-white hover:border-2 hover:border-[#65CD99] hover:text-[#65CD99]"
            >
              Submit
            </button>
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
