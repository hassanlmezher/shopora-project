import back from "../images/back.png"
import moustache from "../images/moustache.png"
import gucci from "../images/gucci.png"
import apple from "../images/apple.png"
import StoreCard from "./StoreCard";
import { useNavigate } from 'react-router-dom'

function Stores() {
    const navigate = useNavigate();
    const stores = [
        {
            image: moustache,
            name: "Moustache",
        },
        {
            image: gucci,
            name: "Gucci",
        },
        {
            image: apple,
            name: "Apple",
        }
    ];
  return (
    <div>
      <img className="w-30 mt-6 ml-6 cursor-pointer" src={back} alt="back button" onClick={() => navigate('/DashboardLoggedIn')} />
      <div className="m-10 pl-10 pr-10 grid grid-cols-3 gap-15 pl-20">
        {stores.map(store => <StoreCard image={store.image} name={store.name} />)}
      </div>
    </div>
  )
}

export default Stores
