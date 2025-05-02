import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  primaryName?: string;
  secondaryName?: string;
  className?: string;
}

const SpinnerBtn: React.FC<ButtonProps> = (
  {
    loading,
    primaryName = "Save",
    secondaryName = "Processing...",
    className = "px-4 py-2",
  },
  props
) => {
  return (
    <button
      {...props}
      className={`btn capitalize bg-[--primary] !text-white text-sm ${className}`}>
      {loading ? (
        <span
          className="flex items-center justify-center"
          style={{ display: loading ? "flex" : "none" }}>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {secondaryName}
        </span>
      ) : (
        <span>{primaryName}</span>
      )}
    </button>
  );
};

export default SpinnerBtn;
