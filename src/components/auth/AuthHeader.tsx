import type { ReactNode } from "react";

interface AuthHeaderProps {
  title?: ReactNode;
  darkText?: string;
  lightText?: string;
  brightGreenText?: string;
  description?: string;
  stacked?: boolean;
  titleClassName?: string;
}

const AuthHeader = ({
  title,
  darkText,
  lightText,
  brightGreenText,
  description,
  stacked = false,
  titleClassName = "",
}: AuthHeaderProps) => {
  const isDarkHeader = Boolean(brightGreenText);

  return (
    <div className="mt-3">
      <h1
        className={`
                    header-font
                    text-[35px]
                    leading-[0.9]
                    tracking-[-0.04em]
                    font-extrabold
                    ${titleClassName}
                `}
      >
        {title ? (
          title
        ) : stacked ? (
          <>
            {darkText && <span className="text-[#6F7278]">{darkText}</span>}

            {darkText && <br />}

            {lightText && (
              <span className={isDarkHeader ? "text-[#FFFFFF]" : "text-[#071B14]"}>
                {lightText}
              </span>
            )}

            {brightGreenText && (
              <>
                <br />
                <span className="text-[#D8F9E0]">{brightGreenText}</span>
              </>
            )}
          </>
        ) : (
          <>
            <span className="text-[#6F7278]">{darkText}</span>

            <span className="text-[#071B14]">{lightText}</span>

            {brightGreenText && (
              <>
                {" "}
                <span className="text-[#D8F9E0]">{brightGreenText}</span>
              </>
            )}
          </>
        )}
      </h1>

      {description && (
        <p
          className={`
                        mt-5
                        text-base
                        leading-6
                        font-thin
                        text-xs
                        ${isDarkHeader ? "text-white" : "text-[#6B7280]"}
                        ${titleClassName}
                    `}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
