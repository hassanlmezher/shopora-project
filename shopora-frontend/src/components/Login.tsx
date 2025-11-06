import React, { useState } from "react";
import auth from "../images/auth.png"
import { useNavigate } from 'react-router-dom'



function Login() {
    const navigate = useNavigate();
    const email = "hassan@gmail.com";
    const password = "hassan123";
    const [ emaill, setEmaill ] = useState("");
    const [ passwordd, setPassWordd ] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmaill(e.target.value)
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassWordd(e.target.value)
    };
    const handleLogIn = () => {
      if(email === emaill && password === passwordd) {
        setPopupMessage("Login successful!");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/DashboardLoggedIn');
        }, 1000);
      } else {
        setPopupMessage("Login failed! Please check your credentials.");
        setShowPopup(true);
      }
    };
    const closePopup = () => {
      setShowPopup(false);
    };
  return (
    <div className="flex justify-center items-center bg-linear-to-b from-[#66CE9A] to-[#388063] h-screen">
      <div className="bg-[#D9D9D9] flex flex-col justify-center items-center h-120 w-100 rounded-l-4xl">
        <p className="text-[#4EA67D] text-5xl font-bold">Log In</p>
        <input type="text" className="border-1 border-[#0E5861] w-70 h-10 mr-5 mt-10 p-2 rounded-2xl " onChange={handleEmail} placeholder="Email address"/>
        <input type="password" className="border-1 border-[#0E5861] w-70 h-10 mr-5 mt-5 p-2 rounded-2xl" onChange={handlePassword} placeholder="Password"/>
        <div className="flex gap-2 mt-6 mr-9">
            <p className="text-[13px] text-[#666666]">Don't have an account?</p>
            <button className="text-[13px] font-bold text-[#5FC392] transition duration-300 ease-in-out hover:text-[#0E5861]" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
        <button className="text-white font-bold bg-[#65CD99] border-none rounded-2xl text-[19px] w-40 h-12 mt-10 transition duration-300 ease-in-out hover:bg-white hover:text-[#65CD99]" onClick={handleLogIn}>Log In</button>
      </div>
      <div className="bg-[#D9D9D9] flex flex-col justify-center items-center h-120 w-90 rounded-r-4xl">
        <img className="w-90 h-120" src={auth} alt="auth image" />
      </div>
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-3xl shadow-lg  transition-all duration-500 ${showPopup ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${popupMessage.includes("successful") ? 'bg-[#77e4ad] text-white' : 'bg-black shadow shadow-gray-700 text-white'}`}>
        <p className="text-sm font-semibold text-center">{popupMessage}</p>
        {popupMessage.includes("failed") && (
          <button className="mt-2 px-3 py-1 w-50 h-8  text-red-600 font-bold border-2 bg-white border-red-700 rounded-2xl text-xs block mx-auto" onClick={closePopup}>Close</button>
        )}
      </div>
    </div>
  )
}

export default Login
