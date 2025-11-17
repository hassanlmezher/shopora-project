import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "shopora-theme-selection";

const prefersDarkMode = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedValue === "dark") {
    return true;
  }
  if (storedValue === "light") {
    return false;
  }
  return prefersDarkMode();
};

type ThemeToggleProps = {
  className?: string;
};

const SunIcon = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2" />
    <path d="M12 21v2" />
    <path d="M4.22 4.22l1.42 1.42" />
    <path d="M18.36 18.36l1.42 1.42" />
    <path d="M1 12h2" />
    <path d="M21 12h2" />
    <path d="M4.22 19.78l1.42-1.42" />
    <path d="M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getInitialTheme());

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.classList.toggle("dark", isDarkMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const buttonClasses = `relative inline-flex h-9 w-[88px] items-center justify-between rounded-full border border-[#E5E7EB] bg-gradient-to-tr from-white to-[#F3F4F6] px-2 shadow-inner transition ${className}`;

  const knobClasses = `absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full shadow transition duration-200 ${
    isDarkMode ? "left-2 bg-[#0F172A]" : "right-2 bg-white"
  }`;

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={toggleTheme}
      aria-label="Toggle light or dark mode"
      aria-pressed={isDarkMode}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 text-[#6B7280]">
        <span
          className={`flex items-center transition-opacity duration-200 ${
            isDarkMode ? "opacity-0" : "opacity-100"
          }`}
        >
          <SunIcon className="h-4 w-4 text-[#FACC15]" />
        </span>
        <span
          className={`flex items-center transition-opacity duration-200 ${
            isDarkMode ? "opacity-100" : "opacity-0"
          }`}
        >
          <MoonIcon className="h-4 w-4 text-[#1F2933]" />
        </span>
      </span>
      <span className={knobClasses} />
    </button>
  );
}
