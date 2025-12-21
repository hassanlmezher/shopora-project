import React, { useEffect, useRef, useState } from "react";
import loginsignup from "../images/loginlogin.png";
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../store/useAuthStore";
import PopupMessage from "./PopupMessage";


type FieldErrors = {
  email?: string;
  password?: string;
};

function Login() {
    const navigate = useNavigate();
    const [ emaill, setEmaill ] = useState("");
    const [ passwordd, setPassWordd ] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupVariant, setPopupVariant] = useState<"success" | "error">("success");
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { login, logout, isLoading } = useAuthStore();
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

    const handleLogIn = async () => {
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

      const success = await login(trimmedEmail, trimmedPassword);
      if (!success) {
        setPopupMessage("Login failed! Please check your credentials.");
        setPopupVariant("error");
        logout();
        setShowPopup(true);
        scheduleHide();
        return;
      }

      setPopupMessage("Login successful!");
      setPopupVariant("success");
      setShowPopup(true);
      scheduleHide(() => {
        navigate('/DashboardLoggedIn');
      });
    };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#193B74] to-[#6CA7FF] px-4 py-10">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] bg-white/85 shadow-2xl backdrop-blur-lg md:grid-cols-[1.1fr_1fr]">
        <div className="relative hidden h-full bg-[#0F172A] md:block">
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            src={loginsignup}
            alt="auth illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute bottom-8 left-8 right-8 text-white drop-shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Welcome back</p>
            <p className="mt-2 text-3xl font-bold leading-tight">Access your Shopora dashboard</p>
            <p className="mt-3 text-sm text-blue-100/90">
              Manage your stores, favorites, orders, and cart from a single place.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 py-10 sm:px-10">
          <p className="text-center text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-left">Log In</p>
          <p className="text-center text-sm text-slate-500 md:text-left">
            Enter your credentials to continue. New here?{" "}
            <button
              className="font-semibold text-[#1D4ED8] transition hover:text-[#0E86FF]"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</label>
              <input
                type="text"
                className={`mt-2 h-12 w-full rounded-2xl border px-4 text-base text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  fieldErrors.email ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-blue-200"
                }`}
                onChange={handleEmail}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Password</label>
              <input
                type="password"
                className={`mt-2 h-12 w-full rounded-2xl border px-4 text-base text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  fieldErrors.password ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-blue-200"
                }`}
                onChange={handlePassword}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.password}</p>
              )}
            </div>
          </div>

          <button
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#00B4D8] py-3 text-lg font-semibold text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl active:translate-y-[0px]"
            onClick={handleLogIn}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </div>
      <PopupMessage message={popupMessage} isVisible={showPopup} variant={popupVariant} />
    </div>
  );
}

export default Login;
