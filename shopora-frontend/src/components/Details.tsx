import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import headphones from "../images/headphones.png";
import reviews from "../images/reviews.png"

function Details() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  return (
    <div className="bg-[#65CD99] h-screen p-10">
      <button
          type="button"
          onClick={() => isLoggedIn ? navigate('/DashboardLoggedIn') : navigate('/dashboard')}
          className="flex border  border-gray-300 w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
        <div className="flex gap-4 justify-start items-center">
            <img src={headphones} alt="headphones pic" className="w-40 mt- ml-40" />
            <div >
                <p className="text-white text-4xl font-bold">Wireless</p>
                <p className="text-white text-3xl font-bold">Headphones V120</p>
            </div>
        </div>
        <img src={reviews} alt="a picture" className="w-30 mt-15 ml-45" />
    </div>
  )
}

export default Details
