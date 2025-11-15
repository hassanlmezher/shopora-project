interface AdminShopCardProps {
  storeName: string;
  onDetails?: () => void;
}

function AdminShopCard({ storeName, onDetails }: AdminShopCardProps) {
  const trimmedName = storeName.trim();
  const safeName = trimmedName.length ? trimmedName : "Store";
  const [primaryText, ...rest] = safeName.split(/\s+/);
  const secondaryText = rest.join(" ");

  return (
 
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-6 rounded-2xl bg-[#8DB9FF] p-6 text-center shadow-lg shadow-[#8DB9FF]/50">
      <div className="space-y-1">
        <p className="text-white text-3xl font-bold sm:text-4xl">{primaryText}</p>
        {secondaryText && (
          <p className="text-white text-3xl font-bold sm:text-4xl -mt-1">{secondaryText}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDetails?.()}
        className={`w-full max-w-[180px] rounded-2xl border border-white bg-white/90 py-2 font-bold text-[#8DB9FF] transition duration-300 ease-in-out hover:bg-black hover:text-white ${
          onDetails ? "" : "cursor-not-allowed opacity-70"
        }`}
        disabled={!onDetails}
      >
        Details
      </button>
    </div>
  );
}

export default AdminShopCard;
