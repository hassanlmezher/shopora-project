import { useNavigate } from "react-router-dom";

interface AdminShopCardProps {
  storeName: string;
  onDetails?: () => void;
}

function AdminShopCard({ storeName, onDetails }: AdminShopCardProps) {
  const trimmedName = storeName.trim();
  const safeName = trimmedName.length ? trimmedName : "Store";
  const [primaryText, ...rest] = safeName.split(/\s+/);
  const secondaryText = rest.join(" ");
    const navigate = useNavigate();    
  return (
 
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-6 rounded-2xl bg-[#65CD99] p-6 text-center shadow-lg shadow-[#65CD99]/50">
      <div className="space-y-1">
        <p className="text-white text-3xl font-bold sm:text-4xl">{primaryText}</p>
        {secondaryText && (
          <p className="text-white text-3xl font-bold sm:text-4xl -mt-1">{secondaryText}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => {navigate("/adminDetails")}}
        className={`w-full max-w-[180px] rounded-2xl border border-white bg-white/90 py-2 font-bold text-[#65CD99] transition duration-300 ease-in-out hover:bg-black hover:text-white ${
          onDetails ? "" : "cursor-not-allowed opacity-70"
        }`}
      >
        Details
      </button>
    </div>
  );
}

export default AdminShopCard;
