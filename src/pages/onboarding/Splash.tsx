import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/ui/Logo";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark">
      <Logo />
    </main>
  );
};

export default Splash;
