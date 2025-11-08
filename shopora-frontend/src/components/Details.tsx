import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import reviews from "../images/reviews.png"
import stars from "../images/5stars.png"

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  const { image, name, namee, reviews: productReviews } = location.state || {};
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
            <img src={image} alt={`${name} ${namee} pic`} className="w-40 mt- ml-40" />
            <div >
                <p className="text-white text-4xl font-bold">{name}</p>
                <p className="text-white text-3xl font-bold">{namee}</p>
            </div>
        </div>
        <img src={reviews} alt="a picture" className="w-30 mt-15 ml-45" />
        <div className="bg-white absolute top-15 right-20 w-100 h-130 rounded-3xl  justify-center items-center">
          <p className="text-[#65CD99] font-bold text-3xl mt-5 ml-3">{productReviews?.length || 0} Reviews</p>
          {productReviews?.map((review: { reviewer: string; rating: number; text: string }, index: number) => (
            <div key={index} className="mt-10 ml-5 border-2 rounded-2xl mr-5 p-4">
              <div className="flex">
                <p>{review.reviewer}</p>
                <img className="w-25 mt-[-10px] ml-10" src={stars} alt="" />
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Review:</p>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Details
