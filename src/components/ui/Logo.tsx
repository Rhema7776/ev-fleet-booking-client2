import logo from "@/assets/icons/companylogo.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return <img src={logo} alt="Company Logo" className={className} />;
};

export default Logo;
