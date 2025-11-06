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
      <div className="border border-black h-70 mt-[-300px] flex justify-center items-center">
        <div className="bg-">

        </div>
      </div>
    </div>
  )
}

export default Settings

