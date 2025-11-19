import React, { useEffect, useRef, useState } from "react";
import loginsignup from "../images/loginlogin.png"
import { useNavigate } from 'react-router-dom'
import useAuthStore from "../store/useAuthStore";
import PopupMessage from "./PopupMessage";
import { findRegisteredUserByEmail } from "../utils/registeredUsers";


type FieldErrors = {
  email?: string;
  password?: string;
};

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
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmaill(e.target.value);
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassWordd(e.target.value);
      setFieldErrors((prev) => ({ ...prev, password: undefined }));
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
      const errors: FieldErrors = {};
      const trimmedEmail = emaill.trim();
      const trimmedPassword = passwordd.trim();

      if (!trimmedEmail) {
        errors.email = "Email address is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
        errors.email = "Enter a valid email address.";
      }

      if (!trimmedPassword) {
        errors.password = "Password is required.";
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      setFieldErrors({});

      const registeredUser = findRegisteredUserByEmail(trimmedEmail);

      if (adminEmail === trimmedEmail && adminPassword === trimmedPassword) {
        setPopupMessage("Welcome back Admin!");
        setPopupVariant("success");
        setShowPopup(true);
        scheduleHide(() => {
          login();
          navigate("/adminDashboard");
        });
      } else if (registeredUser && registeredUser.password === trimmedPassword) {
        setPopupMessage("Login successful!");
        setPopupVariant("success");
        setShowPopup(true);
        scheduleHide(() => {
          login();
          navigate('/DashboardLoggedIn');
        });
      } else if (email === trimmedEmail && password === trimmedPassword) {
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
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#6E98FF] to-[#1E3B86] px-4 py-10">
      <div className="flex  max-w-5xl flex-col gap-20 overflow-hidden rounded-3xl bg-[#D9D9D9] shadow-xl lg:flex-row">
        <div className="flex w-full flex-col justify-center gap-6 px-8 py-10 lg:w-1/2 lg:px-12">
          <p className="text-center text-4xl font-bold text-blue-500 sm:text-5xl lg:text-left">Log In</p>
          <input
            type="text"
            className={`h-12 w-full rounded-2xl px-4 text-base text-black placeholder:text-[#6B7280] focus:outline-none ${
              fieldErrors.email
                ? "border border-red-500 focus:border-red-500"
                : "border border-[#0E5861] focus:border-[#8DB9FF]"
            }`}
            onChange={handleEmail}
            placeholder="Email address"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-left text-xs font-semibold text-red-500">{fieldErrors.email}</p>
          )}
          <input
            type="password"
            className={`h-12 w-80 rounded-2xl px-4 text-base text-black placeholder:text-[#6B7280] focus:outline-none ${
              fieldErrors.password
                ? "border border-red-500 focus:border-red-500"
                : "border border-[#0E5861] focus:border-[#8DB9FF]"
            }`}
            onChange={handlePassword}
            placeholder="Password"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-left text-xs font-semibold text-red-500">{fieldErrors.password}</p>
          )}
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
            className="w-full rounded-2xl bg-[#3875F0] py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#8DB9FF]"
            onClick={handleLogIn}
          >
            Log In
          </button>
        </div>
        <div className="flex w-full  bg-[#D9D9D9] lg:w-1/2">
          <img className="w-full  max-w-xs  sm:max-w-sm rounded-r-2xl " src={loginsignup} alt="auth illustration" />
        </div>
      </div>
      <PopupMessage message={popupMessage} isVisible={showPopup} variant={popupVariant} />
    </div>
  )
}

export default Login;
