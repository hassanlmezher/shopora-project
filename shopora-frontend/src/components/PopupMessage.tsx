import React from "react";

interface PopupMessageProps {
  message: string;
  isVisible: boolean;
  variant?: "success" | "error" | "info";
  icon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<PopupMessageProps["variant"]>,
  string
> = {
  success: "bg-blue-600 text-white",
  error: "bg-[#1f1f1f] text-white",
  info: "bg-white text-[#1f1f1f]",
};

export default function PopupMessage({
  message,
  isVisible,
  variant = "info",
  icon,
}: PopupMessageProps) {
  if (!message) return null;

  const colors = variantStyles[variant];

  return (
    <div
      className={`pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-3xl px-5 py-4 text-center text-sm font-semibold shadow-lg transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } ${colors}`}
    >
      <div className="flex items-center gap-2 justify-center">
        {icon && <span>{icon}</span>}
        <span>{message}</span>
      </div>
    </div>
  );
}
