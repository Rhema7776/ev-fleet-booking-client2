import type { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "dark" | "outline" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  /** Was silently dropped before — never destructured, so className
      passed by callers (e.g. flex-1 / flex-[2] for sizing two buttons
      in a row) never actually reached the element. */
  className?: string;
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const variants = {
    primary: `
            bg-primary
            text-brand-dark
            hover:opacity-90
        `,

    dark: `
            bg-black
            text-white
            hover:bg-neutral-900
        `,

    outline: `
            bg-white
            text-black
            border
            border-transparent
        `,

    // Added — "secondary" was already being passed by at least one caller
    // (CompleteEnterpriseProfile's Skip button) with no matching variant
    // defined, meaning it silently fell through to undefined styling.
    secondary: `
            bg-slate-100
            text-slate-900
            hover:bg-slate-200
        `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
                shadow-lg
                hover:shadow-xl
                w-full
                h-[52px]
                rounded-full
                font-semibold
                transition-all
                duration-300
                disabled:opacity-50
                disabled:pointer-events-none
                flex
                items-center
                justify-center
                ${variants[variant]}
                ${className}
            `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
