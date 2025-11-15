import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import useNotificationStore from "../store/useNotificationStore";

const categories = ["Shirts", "Headphones", "Shoes", "Accessories", "Tech", "Home", "Lifestyle"] as const;

function ItemForm() {
  const navigate = useNavigate();
  const addUserShopItem = useNotificationStore((state) => state.addUserShopItem);
  const acceptedRequest = useNotificationStore((state) =>
    state.requests.find((request) => request.status === "accepted")
  );
  const [name, setName] = useState("");
  const [namee, setNamee] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>(categories[0]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ratings, setRatings] = useState("(0)");
  const [popup, setPopup] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const isSubmissionReady = Boolean(acceptedRequest);

  useEffect(() => {
    if (!popup) {
      return undefined;
    }
    const timer = setTimeout(() => setPopup(null), 2200);
    return () => clearTimeout(timer);
  }, [popup]);

  const formattedPrice = useMemo(() => {
    if (!priceLabel.trim()) {
      return "";
    }
    return priceLabel.trim().startsWith("$") ? priceLabel.trim() : `$${priceLabel.trim()}`;
  }, [priceLabel]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmissionReady) {
      setPopup({ message: "Get your shop approved before adding items.", variant: "error" });
      return;
    }

    if (!name.trim() || !priceValue.trim()) {
      setPopup({ message: "Please give the item a name and price.", variant: "error" });
      return;
    }

    const numericPrice = Number(priceValue);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setPopup({ message: "Provide a valid numeric price value.", variant: "error" });
      return;
    }

    addUserShopItem(acceptedRequest!.id, {
      image: image.trim(),
      name: name.trim(),
      namee: namee.trim() || "Product",
      price: formattedPrice || `$${numericPrice.toFixed(2)}`,
      priceValue: numericPrice,
      description: description.trim(),
      by: acceptedRequest!.shopTitle,
      category,
      ratings: ratings.trim() || "(0)",
      reviews: [],
    });

    setName("");
    setNamee("");
    setPriceLabel("");
    setPriceValue("");
    setDescription("");
    setImage("");
    setRatings("(0)");
    setPopup({ message: "Item added to your shop.", variant: "success" });
  };

  return (
    <div className="min-h-screen bg-[#65CD99] px-4 py-6 sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#f0fff7]"
        >
          Back
        </button>
        <form
          onSubmit={handleSubmit}
          className="rounded-[2.5rem] bg-white p-8 shadow-xl sm:p-10"
        >
          <p className="text-3xl font-bold text-[#1F3B2F]">Add a new item</p>
          <p className="mt-2 text-sm text-[#4B5B56]">
            Fill in the details below so your shop is ready for visitors.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Product name"
              className="rounded-2xl border border-[#E0E3E1] px-4 py-3 text-sm text-[#1F3B2F] focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
            />
            <input
              type="text"
              value={priceLabel}
              onChange={(event) => setPriceLabel(event.target.value)}
              placeholder="Price label (e.g., $199)"
              className="rounded-2xl border border-[#E0E3E1] px-4 py-3 text-sm text-[#1F3B2F] focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as typeof categories[number])}
              className="rounded-2xl border border-[#E0E3E1] px-4 py-3 text-sm text-[#1F3B2F] focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="Image URL"
              className="rounded-2xl border border-[#E0E3E1] px-4 py-3 text-sm text-[#1F3B2F] focus:outline-none focus:ring-2 focus:ring-[#65CD99]"
              required
            />
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
              rows={3}
              className="rounded-2xl border border-[#E0E3E1] px-4 py-3 text-sm text-[#1F3B2F] focus:outline-none focus:ring-2 focus:ring-[#65CD99] md:col-span-2"
            />
          </div>
          <button
            type="submit"
            disabled={!isSubmissionReady}
            className="mt-6 w-full rounded-2xl bg-[#65CD99] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#53b785] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save item
          </button>
          {!isSubmissionReady && (
            <p className="mt-2 text-xs text-[#4B5B56]">
              Your shop must be approved before you can add items.
            </p>
          )}
        </form>
      </div>
      <PopupMessage message={popup?.message ?? ""} isVisible={Boolean(popup)} variant={popup?.variant ?? "info"} />
    </div>
  );
}

export default ItemForm;
