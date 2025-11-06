import auth from "../images/auth.png"
import { useNavigate } from 'react-router-dom'
function Signup() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center bg-linear-to-b from-[#66CE9A] to-[#388063] h-screen">
      <div className="bg-[#D9D9D9] flex flex-col justify-center items-center h-120 w-90 rounded-l-4xl">
        <img className="w-90 h-120" src={auth} alt="auth image" />
      </div>  
      <div className="bg-[#D9D9D9] flex flex-col justify-center items-center h-120 w-100 rounded-r-4xl">
        <p className="text-[#4EA67D] text-5xl font-bold">Sign up</p>
        <input type="text" className="border-1 border-[#0E5861] w-70 h-10 mr-5 mt-10 p-2 rounded-2xl" placeholder="Email address"/>
        <input type="text" className="border-1 border-[#0E5861] w-70 h-10 mr-5 mt-5 p-2 rounded-2xl" placeholder="Password"/>
        <input type="text" className="border-1 border-[#0E5861] w-70 h-10 mr-5 mt-5 p-2 rounded-2xl" placeholder="Confirm password "/>
        <div className="flex gap-2 mt-6 mr-9">
            <p className="text-[13px] text-[#666666]">Already have an account?</p>
            <button className="text-[13px] font-bold text-[#5FC392] transition duration-300 ease-in-out hover:text-[#0E5861]" onClick={() => navigate('/login')}>Log In</button>
        </div>
        <button className="text-white font-bold bg-[#65CD99] border-none rounded-2xl text-[19px] w-40 h-12 mt-10 transition duration-300 ease-in-out hover:bg-white hover:text-[#65CD99]">Sign Up</button>
      </div>
    </div>
  )
}

export default Signup
