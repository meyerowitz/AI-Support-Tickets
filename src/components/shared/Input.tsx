import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            error
              ? "border-critical bg-critical-bg focus:border-critical"
              : "border-gray-300 bg-white hover:border-gray-400 focus:border-primary"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-critical flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
