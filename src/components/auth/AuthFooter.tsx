import { Link } from "react-router-dom";

interface AuthFooterProps {
  text: string;
  linkText: string;
  to: string;
}

const AuthFooter = ({ text, linkText, to }: AuthFooterProps) => {
  return (
    <p className="text-center text-sm text-gray-500 mt-auto">
      {text} <Link to={to} className="font-semibold text-brand-primary">{linkText}</Link>
    </p>
  );
};

export default AuthFooter;
