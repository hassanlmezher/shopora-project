import Header from "./Header"
import back from "../images/back.png"
import { useNavigate } from "react-router-dom";
import useAuthStore from '../store/useAuthStore';

function Settings() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  return (
    <div>
      <Header/>
      <div className="pl-15">
        <img className="w-30" src={back} alt="back button" onClick={() => isLoggedIn? navigate('/DashboardLoggedIn') : navigate('/dashboard')}/>
      </div>
    </div>
  )
}

export default Settings

