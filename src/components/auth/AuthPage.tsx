import type { ReactNode } from "react";

interface AuthPageProps {
  children: ReactNode;
}

const AuthPage = ({ children }: AuthPageProps) => {
  return <div className="min-h-screen flex flex-col w-full p-0 m-0">{children}</div>;
};

export default AuthPage;
