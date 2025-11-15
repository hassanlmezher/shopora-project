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
    <div className="shadow-lg rounded-3xl shadow-gray-300 w-full max-w-[420px] flex-1 flex flex-col gap-4 overflow-hidden bg-white sm:w-[45%] lg:w-[30%] p-6 transition hover:-translate-y-1">
      <div className="flex flex-col gap-3">
        <img
          className="mx-auto h-40 w-full object-contain sm:h-48"
          src={item.image || shirt}
          alt={`${item.name} ${item.namee}`}
        />
        <div className="flex flex-col items-center text-center">
          <p className="text-xl font-bold text-[#1F3B2F]">{item.name}</p>
          <p className="text-lg font-semibold text-[#5ABC8E]">{item.namee}</p>
        </div>
      </div>
      <p className="text-center text-sm text-[#4B5B56]">{item.description || "No description provided yet."}</p>
      <div className="flex items-center justify-center gap-3">
        <img className="w-28" src={stars} alt="rating stars" />
        <p className="text-sm text-gray-600">{item.ratings}</p>
      </div>
      <div className="flex flex-wrap justify-between gap-3 mt-auto">
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
