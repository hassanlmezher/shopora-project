import { useNavigate } from "react-router-dom";
import shirt from "../images/shirt.png";
import stars from "../images/5stars.png";
import { type UserShopItem } from "../store/useNotificationStore";

interface YourItemProps {
  item: UserShopItem;
  onRemove?: () => void;
}

function YourItem({ item, onRemove }: YourItemProps) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/details", { state: { ...item, returnPath: "/my-shop" } });
  };

  return (
    <div className="flex w-full max-w-[360px] flex-col justify-between rounded-3xl border border-[#E4ECE7] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-4">
        <img className="mx-auto h-48 w-full object-contain" src={item.image || shirt} alt={`${item.name} ${item.namee}`} />
        <div className="space-y-1">
          <p className="text-xl font-bold text-[#1F3B2F]">{item.name}</p>
          <p className="text-lg font-semibold text-[#5AB688]">{item.namee}</p>
        </div>
      </div>
      <p className="mt-2 min-h-[40px] text-sm text-[#4B5B56]">{item.description || "No description provided yet."}</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <img className="h-6 w-24 object-contain" src={stars} alt="rating stars" />
        <p className="text-sm text-gray-600">{item.ratings}</p>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleDetails}
          className="flex-1 rounded-2xl border border-[#5AB688] bg-[#5AB688] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#5AB688]"
        >
          Details
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex-1 rounded-2xl border border-[#1F1F1F] bg-white px-4 py-2 text-sm font-semibold text-[#1F1F1F] transition hover:bg-[#1F1F1F] hover:text-white"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default YourItem;
