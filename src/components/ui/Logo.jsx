import logo from "@/assets/images/Frame 1.png";

const Logo = ({ className = "" }) => {

    return (

        <img
            src={logo}
            alt="Company Logo"
            className={className}
        />

    );

};

export default Logo;