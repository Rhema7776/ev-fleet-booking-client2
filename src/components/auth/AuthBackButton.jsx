import { useNavigate } from "react-router-dom";
import leftarrow from "@/assets/images/Icon Button.svg";

const AuthBackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-8"
        >
            <img src={leftarrow} alt="Back" />
        </button>
    );
};

export default AuthBackButton;