import Header from "./Header"
import back from "../images/back.png"
import { useNavigate } from "react-router-dom";
import useAuthStore from '../store/useAuthStore';
import profile from "../images/profile.png";
import heart from "../images/heart.png";
import cartt from "../images/cartt.png";
import create from "../images/create.png"

function Settings() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  return (
    <div>
      <Header/>
      <div className="pl-15">
        <img className="w-30" src={back} alt="back button" onClick={() => isLoggedIn? navigate('/DashboardLoggedIn') : navigate('/dashboard')}/>
      </div>
      <div className="h-130 flex justify-center items-center">
        <img className="absolute w-35 top-30" src={profile} alt="profile pic" />
        <p className="font-bold text-2xl absolute top-70 ml-3">Hassan Mezher</p>
      </div>
      <div className=" h-70 mt-[-300px] w-[1000px] ml-45 flex justify-around items-center">
        <div className="bg-[#65CD99] flex flex-col justify-center items-center w-45 h-50 rounded-3xl">
          <img className="w-25" src={heart} alt="heart icon" />
          <p className="text-white font-bold">View all of your</p>
          <p className="text-white font-bold">favorited items!</p>
        </div>
        <div className="bg-[#65CD99] flex flex-col justify-center items-center gap-2 w-45 h-50 rounded-3xl">
          <img className="w-22" src={cartt} alt="heart icon" />
          <div>
            <p className="text-white font-bold">View all of your</p>
            <p className="text-white font-bold">favorited items!</p>
          </div>
        </div>
        <div className="bg-[#65CD99] flex flex-col justify-center items-center gap-2 w-45 h-50 rounded-3xl">
          <img className="w-18" src={create} alt="heart icon" />
          <div>
          <p className="text-white font-bold">View all of your</p>
          <p className="text-white font-bold">favorited items!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

