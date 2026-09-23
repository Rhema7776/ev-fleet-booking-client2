import type { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  variant?: "white" | "success" | "transparent";
  /** Was always silently ignored before conversion — the component never
      supported it despite PartnerTypeSelection passing padded={false} and
      trying to cancel the fixed padding with negative margins that didn't
      quite match (py-2 px-5 vs -mx-6 -my-8). Now genuinely skips the
      default padding when false. */
  padded?: boolean;
}

const AuthContainer = ({ children, padded = true }: AuthContainerProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-white m-0 ${padded ? "py-2 px-5" : ""}`}>
      <div className="w-full flex-1 p-0 m-0">{children}</div>
    </div>
  );
};

export default AuthContainer;
