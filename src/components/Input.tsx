"use client";

import React, { forwardRef, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      type = "text",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // Generate id fallback if not provided
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between"
          >
            <span>{label}</span>
            {props.required && (
              <span className="text-red-500 font-normal text-xs">*</span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 text-lg pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 ${
              leftIcon ? "pl-11" : "pl-4"
            } ${isPassword ? "pr-11" : "pr-4"} ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200/90 hover:border-slate-300 focus:border-brand-navy focus:ring-brand-navy/10"
            } ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HiOutlineEyeOff className="text-lg" />
              ) : (
                <HiOutlineEye className="text-lg" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-0.5">
            {error}
          </p>
        )}

        {hint && !error && (
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
