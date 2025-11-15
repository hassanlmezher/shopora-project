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
    <div className="shadow-lg h-[420px] rounded-3xl shadow-gray-300 w-[22%] min-w-[220px] flex flex-col justify-center items-center bg-white p-6">
      <img className="w-36 object-contain" src={item.image || shirt} alt={`${item.name} ${item.namee}`} />
      <p className="font-bold mt-2 text-xl text-[#5DBC8C]">{item.price}</p>
      <div className="text-center">
        <p className="font-bold text-[1.3rem]">{item.name}</p>
        <p className="font-semibold text-[1.3rem] text-gray-600">{item.namee}</p>
      </div>
      <p className="mt-2 text-sm text-center px-4 text-[#4B5B56]">
        {item.description || "No description provided yet."}
      </p>
      <div className="flex justify-center items-center gap-3 mt-2">
        <img className="w-24" src={stars} alt="rating stars" />
        <p className="text-sm mb-2 text-gray-600">{item.ratings}</p>
      </div>
      <div className="flex justify-center items-center gap-4 mt-auto">
        <button
          type="button"
          onClick={handleDetails}
          className="bg-[#5AB688] text-white cursor-pointer h-10 w-28 rounded-2xl hover:bg-white hover:border-2 hover:border-[#5AB688] hover:text-[#5AB688] transition"
        >
          Details
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="bg-white border-2 border-black text-black cursor-pointer h-10 w-28 rounded-2xl hover:bg-black hover:text-white transition"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default YourItem;
