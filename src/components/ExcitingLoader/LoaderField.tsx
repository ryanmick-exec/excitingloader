import { Check } from "lucide-react";

export type LoaderFieldState = "inactive" | "loading" | "complete";

interface LoaderFieldProps {
  state: LoaderFieldState;
  loadingTitle: string;
  completeText: string;
  counter?: number;
  counterLabel?: string;
}

const LoaderField = ({
  state,
  loadingTitle,
  completeText,
  counter,
  counterLabel,
}: LoaderFieldProps) => {
  if (state === "inactive") {
    return null;
  }

  return (
    <div className="flex items-center justify-between pl-3 pr-3 py-4 bg-card rounded-[6px] border border-[#E2E2E2] transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Spinner or Checkmark */}
        {state === "loading" ? (
          <div className="relative w-6 h-6">
            <svg
              className="w-6 h-6 spin-slow"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />
              <path
                d="M12 2C6.48 2 2 6.48 2 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-loader-blue"
              />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-loader-complete flex items-center justify-center transition-all duration-300">
            <Check className="w-4 h-4 text-success-foreground" strokeWidth={3} />
          </div>
        )}

        {/* Title or Complete Text */}
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            state === "loading"
              ? "text-loader-text-loading"
              : "text-loader-text-complete"
          }`}
        >
          {state === "loading" ? loadingTitle : completeText}
        </span>
      </div>

      {/* Counter */}
      {state === "loading" && counter !== undefined && (
        <span className="text-loader-counter text-sm font-medium tabular-nums pr-[9px]">
          {counter.toLocaleString()} {counterLabel}
        </span>
      )}
    </div>
  );
};

export default LoaderField;
