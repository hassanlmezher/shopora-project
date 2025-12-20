import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../images/loginlogin.png";
import PopupMessage from "./PopupMessage";
import useAuthStore from "../store/useAuthStore";

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
  const { signup, isLoading } = useAuthStore();

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

  useEffect(
    () => () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    },
    []
  );

  const handleSignup = async () => {
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

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const success = await signup(trimmedEmail, trimmedPassword);
    if (!success) {
      setPopupMessage("Signup failed. Please try again.");
      setPopupVariant("error");
      setShowPopup(true);
      return;
    }

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0A1B2E] via-[#1F3D73] to-[#6CA7FF] px-4 py-10">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] bg-white/85 shadow-2xl backdrop-blur-lg md:grid-cols-[1.05fr_1fr]">
        <div className="relative hidden h-full md:block">
          <img className="absolute inset-0 h-full w-full object-cover" src={auth} alt="signup illustration" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
          <div className="absolute bottom-8 left-8 right-8 text-white drop-shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Create account</p>
            <p className="mt-2 text-3xl font-bold leading-tight">Join the Shopora community</p>
            <p className="mt-3 text-sm text-blue-100/90">
              Track orders, favorite products, and manage your own storefront.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 py-10 sm:px-10">
          <p className="text-center text-3xl font-bold text-[#0F172A] sm:text-4xl md:text-left">Sign up</p>
          <p className="text-center text-sm text-slate-500 md:text-left">
            Create your account to start shopping and selling. Already have one?{" "}
            <button
              className="font-semibold text-[#1D4ED8] transition hover:text-[#0E86FF]"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</label>
              <input
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`mt-2 h-12 w-full rounded-2xl border px-4 text-base text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  fieldErrors.email ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-blue-200"
                }`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.email}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`mt-2 h-12 w-full rounded-2xl border px-4 text-base text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    fieldErrors.password ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-blue-200"
                  }`}
                  placeholder="At least 6 characters"
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.password}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Confirm</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  className={`mt-2 h-12 w-full rounded-2xl border px-4 text-base text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    fieldErrors.confirmPassword ? "border-red-400 focus:ring-red-300" : "border-slate-200 focus:ring-blue-200"
                  }`}
                  placeholder="Re-enter password"
                />
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <button
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#00B4D8] py-3 text-lg font-semibold text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl active:translate-y-[0px]"
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
      <PopupMessage message={popupMessage} isVisible={showPopup} variant={popupVariant} />
    </div>
  );
}

export default Signup;
