import back from "../images/back.png"
import moustache from "../images/moustache.png"
import gucci from "../images/gucci.png"
import apple from "../images/apple.png"
import StoreCard from "./StoreCard";
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore';

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

function Stores() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-10">
        <button
          type="button"
          onClick={() => isLoggedIn ? navigate('/DashboardLoggedIn') : navigate('/dashboard')}
          className="border border-gray-300 flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#388063] shadow-sm transition hover:bg-[#65CD99] hover:text-white"
        >
          Back
        </button>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map(store => (
            <StoreCard key={store.name} image={store.image} name={store.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stores
