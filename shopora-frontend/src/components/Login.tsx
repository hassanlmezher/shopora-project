import React, { useEffect, useRef, useState } from "react";
import auth from "../images/auth.png"
import { useNavigate } from 'react-router-dom'
import useAuthStore from "../store/useAuthStore";
import PopupMessage from "./PopupMessage";


function Login() {
    const navigate = useNavigate();
    const email = "hassan@gmail.com";
    const password = "hassan123";
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";
    const [ emaill, setEmaill ] = useState("");
    const [ passwordd, setPassWordd ] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupVariant, setPopupVariant] = useState<"success" | "error">("success");
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { login, logout } = useAuthStore();
    
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmaill(e.target.value)
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassWordd(e.target.value)
    };
    const scheduleHide = (callback?: () => void) => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        setShowPopup(false);
        hideTimerRef.current = null;
        callback?.();
      }, 1000);
    };

    useEffect(() => {
      return () => {
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
      };
    }, []);

    const handleLogIn = () => {
      if(adminEmail === emaill && adminPassword === passwordd) {
        setPopupMessage("Welcome back Admin!");
        setPopupVariant("success");
        setShowPopup(true);
        scheduleHide(() => {
          login();
          navigate('/adminDashboard');
        });
      }
      else if(email === emaill && password === passwordd) {
        setPopupMessage("Login successful!");
        setPopupVariant("success");
        setShowPopup(true);
        scheduleHide(() => {
          login();
          navigate('/DashboardLoggedIn');
        });
      } else {
        setPopupMessage("Login failed! Please check your credentials.");
        setPopupVariant("error");
        logout();
        setShowPopup(true);
        scheduleHide();
      }
    };
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#66CE9A] to-[#388063] px-4 py-10">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-[#D9D9D9] shadow-xl lg:flex-row">
        <div className="flex w-full flex-col justify-center gap-6 px-8 py-10 lg:w-1/2 lg:px-12">
          <p className="text-center text-4xl font-bold text-[#4EA67D] sm:text-5xl lg:text-left">Log In</p>
          <input
            type="text"
            className="h-12 w-full rounded-2xl border border-[#0E5861] px-4 text-base focus:border-[#65CD99] focus:outline-none"
            onChange={handleEmail}
            placeholder="Email address"
          />
          <input
            type="password"
            className="h-12 w-full rounded-2xl border border-[#0E5861] px-4 text-base focus:border-[#65CD99] focus:outline-none"
            onChange={handlePassword}
            placeholder="Password"
          />
          <div className="flex flex-col gap-2 text-center text-sm text-[#666666] sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <p>Don't have an account?</p>
            <button
              className="font-bold text-[#5FC392] transition duration-300 ease-in-out hover:text-[#0E5861]"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
          <button
            className="w-full rounded-2xl bg-[#65CD99] py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#65CD99]"
            onClick={handleLogIn}
          >
            Log In
          </button>
        </div>
        <div className="flex w-full items-center justify-center bg-[#D9D9D9] px-8 py-10 lg:w-1/2 lg:px-12">
          <img className="w-full max-w-xs sm:max-w-sm" src={auth} alt="auth illustration" />
        </div>
      </div>
      <PopupMessage message={popupMessage} isVisible={showPopup} variant={popupVariant} />
    </div>
  )
}

export default Login
