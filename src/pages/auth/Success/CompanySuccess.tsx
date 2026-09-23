import { motion } from "framer-motion";

import AuthSuccessLayout from "./AuthSuccessLayout";
import verificationBadge from "@/assets/icons/verificationBadge.svg";

interface CompanySuccessProps {
  logo: string;
  companyName: string;
  description: string;
  buttonText: string;
  redirectTo: string;
}

const CompanySuccess = ({
  logo,
  companyName,
  description,
  buttonText,
  redirectTo,
}: CompanySuccessProps) => {
  return (
    <AuthSuccessLayout buttonText={buttonText} redirectTo={redirectTo}>
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mb-14"
      >
        {/* White Ring */}

        <div className="w-38 h-38 rounded-full backdrop-blur-sm flex items-center justify-center">
          {/* Logo */}

          <div className="w-30 h-30 rounded-full bg-black overflow-hidden flex items-center justify-center shadow-2xl">
            <img src={logo} alt={companyName} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Verification Badge */}

        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 260 }}
          className="absolute top-4 right-2 w-10 h-10 rounded-full bg-transparent shadow-xl flex items-center justify-center"
        >
          {/* Kept as a deliberate alternative — an icon-based badge was
              tried, an image badge was used instead. Not dead debris. */}
          {/* <Check size={25} strokeWidth={3} className="text-[#06311E]" /> */}
          <img src={verificationBadge} alt="Verified" className="w-full h-full object-contain" />
        </motion.div>
      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-white text-[38px] leading-[0.9] header-font whitespace-pre-line max-w-md"
      >
        {companyName}
        {"\n"}
        is now on
        {"\n"}
        LeaseHub!
      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-white/85 text-sm mt-8 max-w-sm leading-none"
      >
        {description}
      </motion.p>
    </AuthSuccessLayout>
  );
};

export default CompanySuccess;
