import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Details() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  return (
    <div>
      <button
          type="button"
          onClick={() => isLoggedIn ? navigate('/DashboardLoggedIn') : navigate('/dashboard')}
          className="flex border m-10 border-gray-300 w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
    </div>
  )
}

export default Details
