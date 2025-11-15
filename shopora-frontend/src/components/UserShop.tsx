import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useAuthStore from "../store/useAuthStore";
import YourItem from "./YourItem";

function UserShop() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  
  return (
    <div>
      <Header />
      <div className="pl-30">
        <button
          type="button"
          onClick={() => (isLoggedIn ? navigate("/DashboardLoggedIn") : navigate("/dashboard"))}
          className="flex w-fit cursor-pointer  mt-5 items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
        <p className="text-3xl mt-5 font-bold">Your Show Name</p>
        <div className="flex flex-wrap pt-10 gap-7">
          <YourItem />
          <YourItem />
          <YourItem />
        </div>
      </div>

    </div>
  )
}

export default UserShop
