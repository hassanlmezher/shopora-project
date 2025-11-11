import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import { catalogue } from "../data/catalogue";

const STORE_META = {
  hassan: "Hassan's shop",
  dani: "Dani's shop",
  mhamad: "Mhamad's shop",
} as const;

type StoreSlug = keyof typeof STORE_META;

function StoreItems() {
  const { shopId } = useParams<{ shopId?: string }>();
  const slug = shopId && (Object.keys(STORE_META) as StoreSlug[]).includes(shopId as StoreSlug)
    ? (shopId as StoreSlug)
    : undefined;
  const storeName = slug ? STORE_META[slug] : undefined;
  const navigate = useNavigate();

  const items = useMemo(() => {
    if (!storeName) {
      return [];
    }
    return catalogue.filter((item) => item.by === storeName);
  }, [storeName]);

  if (!storeName) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F4F7F6] px-4">
        <p className="text-xl font-semibold text-[#388063]">We couldn't find that shop.</p>
        <button
          type="button"
          onClick={() => navigate("/stores")}
          className="mt-6 rounded-full border border-[#388063] px-5 py-2 text-sm font-bold text-[#388063] transition hover:bg-[#388063] hover:text-white"
        >
          Back to stores
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/stores")}
            className="border border-gray-300 flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
          >
            Back
          </button>
          <p className="text-2xl font-bold text-[#388063]">{storeName}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={`${item.name}-${item.namee}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoreItems;
