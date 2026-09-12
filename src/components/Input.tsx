"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export interface InputProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  placeholder?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}

// Reads from the nearest <FormProvider> via useFormContext — every usage
// must be rendered inside a form wired up with react-hook-form's useForm().
const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  hint,
  leftIcon,
  required,
  disabled,
  className = "",
  maxLength,
  inputMode,
  autoComplete,
}: InputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message as string | undefined;

        return (
          <div className="w-full flex flex-col gap-1.5 text-left">
            {label && (
              <label
                htmlFor={name}
                className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between"
              >
                <span>{label}</span>
                {required && <span className="text-red-500 font-normal text-xs">*</span>}
              </label>
            )}

            <div className="relative flex items-center">
              {leftIcon && (
                <div className="absolute left-3.5 text-slate-400 text-lg pointer-events-none flex items-center justify-center">
                  {leftIcon}
                </div>
              )}

              <input
                id={name}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                inputMode={inputMode}
                autoComplete={autoComplete}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 ${
                  leftIcon ? "pl-11" : "pl-4"
                } ${isPassword ? "pr-11" : "pr-4"} ${
                  error
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200/90 hover:border-slate-300 focus:border-brand-navy focus:ring-brand-navy/10"
                } ${className}`}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
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
              <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-0.5">{error}</p>
            )}

            {hint && !error && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
          </div>
        );
      }}
    />
  );
};

export default Input;
