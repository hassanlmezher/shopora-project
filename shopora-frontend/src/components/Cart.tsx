import { useNavigate } from "react-router-dom";
import back from "../images/back.png"
import shirt from "../images/shirt.png"

function Cart() {
    const navigate = useNavigate();
  return (
    <div>
      <img className="w-30 mt-10 ml-10" onClick={() => navigate('/DashboardLoggedIn')} src={back} alt="logo" />
      <p className="text-[#65CD99] font-bold text-5xl ml-50">My Cart</p>
      <div className="mt-20 ml-60 flex gap-4">
        <img className="w-30" src={shirt} alt="shirt picture" />
        <div>
            <p className="">Metalica T-Shirt</p>
        </div>
        
      </div>
    </div>
  )
}

export default Cart
