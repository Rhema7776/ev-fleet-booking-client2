import { useNavigate } from "react-router-dom";
import { logout } from "@/services/auth/authService";
import { ROUTES } from "@/constants/routes";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className ?? "text-sm font-semibold text-red-500 hover:text-red-600 transition"}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
