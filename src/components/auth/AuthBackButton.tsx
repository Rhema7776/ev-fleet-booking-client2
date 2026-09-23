import { useNavigate } from "react-router-dom";
import leftarrow from "@/assets/images/Icon Button.svg";

const AuthBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="rounded-full flex items-center justify-center w-14 h-14"
    >
      <img src={leftarrow} alt="Back" />
    </button>
  );
};

export default AuthBackButton;
