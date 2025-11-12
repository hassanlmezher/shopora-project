import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png"
import lightMode from "../images/lightMode.png"
import AdminShopCard from "./AdminShopCard";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
        <img className="w-20 max-w-[120px] sm:w-24 lg:w-28" src={logo} alt="logo" />
        <div className="flex gap-7 justify-center items-center">
            <img className="h-10 w-10" src={lightMode} alt="toggle theme" />
            <button onClick={() => navigate('/login')} className="bg-[#65CD99] text-white font-bold p-2 rounded-2xl transition hover:text-[#65CD99] hover:bg-white hover:border-2 hover:border-[#65CD99]">Logout</button>
        </div>
      </div>
      <div className="grid grid-cols-3 pt-15 pl-30">
        <AdminShopCard/>
      </div>
    </div>
  )
}

export default AdminDashboard
