import { useEffect, useRef, useState } from "react";
import auth from "../images/loginlogin.png";
import { useNavigate } from 'react-router-dom';
import PopupMessage from "./PopupMessage";
import {
  loadRegisteredUsers,
  persistRegisteredUsers,
  type RegisteredUser,
} from "../utils/registeredUsers";

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupVariant, setPopupVariant] = useState<"success" | "error">("success");
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scheduleHide = (callback?: () => void) => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        setShowPopup(false);
        hideTimerRef.current = null;
        callback?.();
      }, 1200);
    };

    useEffect(() => {
      return () => {
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
      };
    }, []);

    const handleSignup = () => {
      const errors: FieldErrors = {};
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const trimmedConfirmPassword = confirmPassword.trim();
      const emailPattern = /^\S+@\S+\.\S+$/;

      if (!trimmedEmail) {
        errors.email = "Email address is required.";
      } else if (!emailPattern.test(trimmedEmail)) {
        errors.email = "Enter a valid email address.";
      }

      if (!trimmedPassword) {
        errors.password = "Password is required.";
      } else if (trimmedPassword.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }

      if (!trimmedConfirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
      } else if (trimmedPassword && trimmedPassword !== trimmedConfirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }

      const normalizedEmail = trimmedEmail.toLowerCase();
      const existingUsers = loadRegisteredUsers();
      if (
        trimmedEmail &&
        existingUsers.some((user) => user.email.toLowerCase() === normalizedEmail)
      ) {
        errors.email = "An account already exists with this email.";
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      const newUser: RegisteredUser = {
        email: normalizedEmail,
        password: trimmedPassword,
      };
      persistRegisteredUsers([...existingUsers, newUser]);
      setFieldErrors({});
      setPopupMessage("Signup successful! Redirecting to login.");
      setPopupVariant("success");
      setShowPopup(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      scheduleHide(() => navigate("/login"));
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#6E98FF] to-[#1E3B86] px-4 py-10">
      <div className="flex  max-w-5xl flex-col gap-20 overflow-hidden rounded-3xl bg-[#D9D9D9] shadow-xl lg:flex-row">
        <div className="flex w-full items-center justify-center bg-[#D9D9D9]  lg:w-1/2 ">
          <img className="w-full max-w-lg sm:max-w-sm rounded-l-2xl" src={auth} alt="auth illustration" />
        </div>  
        <div className="flex w-full flex-col justify-center gap-6 px-8 py-10 lg:w-1/2 lg:px-12">
          <p className="text-center text-4xl font-bold text-[#3875F0] sm:text-5xl lg:text-left">Sign up</p>
          <input
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`h-12 w-full rounded-2xl px-4 text-base text-black placeholder:text-[#6B7280] focus:outline-none ${fieldErrors.email ? "border border-red-500 focus:border-red-500" : "border border-[#0E5861] focus:border-[#8DB9FF]"}`}
            placeholder="Email address"
          />
          {fieldErrors.email && (
            <p className="text-left text-xs font-semibold text-red-500">{fieldErrors.email}</p>
          )}
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className={`h-12 w-full rounded-2xl px-4 text-base text-black placeholder:text-[#6B7280] focus:outline-none ${fieldErrors.password ? "border border-red-500 focus:border-red-500" : "border border-[#0E5861] focus:border-[#8DB9FF]"}`}
            placeholder="Password"
          />
          {fieldErrors.password && (
            <p className="text-left text-xs font-semibold text-red-500">{fieldErrors.password}</p>
          )}
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            className={`h-12 w-full rounded-2xl px-4 text-base text-black placeholder:text-[#6B7280] focus:outline-none ${fieldErrors.confirmPassword ? "border border-red-500 focus:border-red-500" : "border border-[#0E5861] focus:border-[#8DB9FF]"}`}
            placeholder="Confirm password"
          />
          {fieldErrors.confirmPassword && (
            <p className="text-left text-xs font-semibold text-red-500">{fieldErrors.confirmPassword}</p>
          )}
          <div className="flex flex-col gap-2 text-center text-sm text-[#666666] sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <p>Already have an account?</p>
            <button className="font-bold text-[#5FC392] transition duration-300 ease-in-out hover:text-[#0E5861]" onClick={() => navigate('/login')}>Log In</button>
          </div>
          <button className="w-full rounded-2xl bg-[#3875F0] py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:bg-white hover:text-[#8DB9FF]" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
      <PopupMessage message={popupMessage} isVisible={showPopup} variant={popupVariant} />
    </div>
  )
}

export default Signup
