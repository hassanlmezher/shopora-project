import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";
import lightMode from "../images/lightMode.png";

function Header() {
  const navigate = useNavigate();


  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
      <img
        className="w-20 max-w-[120px] sm:w-24 lg:w-28"
        src={logo}
        alt="logo"
        onClick={() => navigate("/DashboardLoggedIn")}
      />
      <div className="flex justify-center items-center gap-7">
        <img className="h-10 w-10" src={lightMode} alt="toggle theme" />
        <button
          className="flex w-full items-center cursor-pointer justify-center gap-3 rounded-2xl bg-white/90 px-4 py-2 text-sm font-bold text-[#1F3B2F] border-2 border-[#1F3B2F] transition hover:bg-black hover:text-white"
          onClick={() => navigate("/login")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
