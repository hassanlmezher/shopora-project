import auth from "../images/auth.png"
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#66CE9A] to-[#388063] px-4 py-10">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-[#D9D9D9] shadow-xl lg:flex-row">
        <div className="flex w-full items-center justify-center bg-[#D9D9D9] px-8 py-10 lg:w-1/2 lg:px-12">
          <img className="w-full max-w-xs sm:max-w-sm" src={auth} alt="auth illustration" />
        </div>  
        <div className="flex w-full flex-col justify-center gap-6 px-8 py-10 lg:w-1/2 lg:px-12">
          <p className="text-center text-4xl font-bold text-[#4EA67D] sm:text-5xl lg:text-left">Sign up</p>
          <input type="text" className="h-12 w-full rounded-2xl border border-[#0E5861] px-4 text-base focus:border-[#65CD99] focus:outline-none" placeholder="Email address"/>
          <input type="password" className="h-12 w-full rounded-2xl border border-[#0E5861] px-4 text-base focus:border-[#65CD99] focus:outline-none" placeholder="Password"/>
          <input type="password" className="h-12 w-full rounded-2xl border border-[#0E5861] px-4 text-base focus:border-[#65CD99] focus:outline-none" placeholder="Confirm password"/>
          <div className="flex flex-col gap-2 text-center text-sm text-[#666666] sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <p>Already have an account?</p>
            <button className="font-bold text-[#5FC392] transition duration-300 ease-in-out hover:text-[#0E5861]" onClick={() => navigate('/login')}>Log In</button>
          </div>
          <button className="w-full rounded-2xl bg-[#65CD99] py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#65CD99]">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Signup
