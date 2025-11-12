import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function WelcomeCreate() {
    const navigate = useNavigate();
      const { isLoggedIn } = useAuthStore();
  return (
    <div className="bg-[#65CD99] pt-10 h-screen px-10 flex flex-col gap-3">
      <div className="  flex w-full max-w-5xl flex-col gap-10">
      <button
        type="button"
        onClick={() => (isLoggedIn ? navigate("/DashboardLoggedIn") : navigate("/dashboard"))}
        className="flex w-fit items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
      >
        Back
      </button>
    </div>
    <div className="bg-white h-[85%] rounded-3xl py-20">
      <div className="px-40">
        <p className="text-[#65CD99] font-bold text-6xl">Create</p>
        <p className="text-[#65CD99] font-bold text-6xl ml-10 mt-2">Your own</p>
        <p className="text-[#65CD99] font-bold text-7xl ml-20 mt-2">Shop!</p>
      </div>
      <button onClick={() => navigate("/shopForm")} className="bg-[#65CD99] text-white font-bold text-5xl mt-20 rounded-r-2xl p-3 text-end pr-10 w-140 ">Create</button>
    </div>
  </div>
  )
}

export default WelcomeCreate
