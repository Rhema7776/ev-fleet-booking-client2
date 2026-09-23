import { useEffect, useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import type { AxiosError } from "axios";

import googleIcon from "@/assets/images/google.svg";
import facebookIcon from "@/assets/images/facebook.svg";
import appleIcon from "@/assets/images/apple.svg";

import { socialLogin, type AuthUser } from "@/services/auth/authService";
import { loadFacebookSDK } from "@/services/auth/facebookAuthService";
import { loadAppleSDK } from "@/services/auth/appleAuthService";
import { ROUTES } from "@/constants/routes";

interface SocialButtonsProps {
  role?: string;
  redirectTo?: string;
  navigate?: (to: string, options?: { state?: Record<string, unknown> }) => void;
}

interface OtpRoleConfigEntry {
  darkText: string;
  lightText: string;
  currentStep: number;
  totalSteps: number;
  redirectTo: string;
  nextRoute: string;
}

const OTP_ROLE_CONFIG: Record<string, OtpRoleConfigEntry> = {
  FLEET_OWNER: {
    darkText: "Verify",
    lightText: "your email",
    currentStep: 1,
    totalSteps: 4,
    redirectTo: ROUTES.REGISTER_SUCCESS,
    nextRoute: ROUTES.REGISTER_SUCCESS,
  },
  INDIVIDUAL_PARTNER: {
    darkText: "Verify",
    lightText: "your email",
    currentStep: 1,
    totalSteps: 4,
    redirectTo: ROUTES.REGISTER_SUCCESS,
    nextRoute: ROUTES.REGISTER_SUCCESS,
  },
};

const SocialButtons = ({ role, redirectTo, navigate }: SocialButtonsProps) => {
  const [facebookReady, setFacebookReady] = useState(false);
  const [appleReady, setAppleReady] = useState(false);

  const redirectAfterSocialLogin = ({
    user,
    isNewUser,
  }: {
    user: AuthUser;
    isNewUser: boolean;
  }) => {
    if (isNewUser && role && OTP_ROLE_CONFIG[role]) {
      const config = OTP_ROLE_CONFIG[role];

      navigate?.(ROUTES.VERIFY_EMAIL, {
        state: {
          email: user.email,
          role,
          fullName: user.fullName,
          darkText: config.darkText,
          lightText: config.lightText,
          description: `Enter the code we sent to ${user.email}`,
          redirectTo: config.redirectTo,
          nextRoute: config.nextRoute,
          currentStep: config.currentStep,
          totalSteps: config.totalSteps,
        },
      });

      return;
    }

    if (navigate && redirectTo) {
      navigate(redirectTo);
      return;
    }

    window.location.href = "/dashboard";
  };

  useEffect(() => {
    let mounted = true;

    const initializeApple = async () => {
      if (!import.meta.env.VITE_APPLE_CLIENT_ID) {
        return;
      }

      try {
        await loadAppleSDK();
        if (!mounted) return;
        setAppleReady(true);
      } catch (error) {
        console.error("Apple SDK initialization failed:", error);
        setAppleReady(false);
      }
    };

    initializeApple();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeFacebook = async () => {
      try {
        await loadFacebookSDK();
        if (!mounted) return;
        setFacebookReady(true);
      } catch (error) {
        console.error("Facebook SDK initialization failed:", error);
        setFacebookReady(false);
      }
    };

    initializeFacebook();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | APPLE
  |--------------------------------------------------------------------------
  */
  const handleAppleLogin = async () => {
    if (!appleReady || !window.AppleID) {
      console.error("Apple SDK is not ready.");
      return;
    }

    try {
      const response = await window.AppleID.auth.signIn();
      const idToken = response?.authorization?.id_token;

      if (!idToken) {
        console.error("Apple id_token was not received.");
        return;
      }

      // Apple only sends `user` (name) on the FIRST login ever — capture it if present
      const fullName = response?.user?.name
        ? `${response.user.name.firstName ?? ""} ${response.user.name.lastName ?? ""}`.trim()
        : undefined;

      const { user, isNewUser } = await socialLogin({
        provider: "APPLE",
        token: idToken,
        fullName,
        role,
      });

      redirectAfterSocialLogin({ user, isNewUser });
    } catch (error) {
      console.error("Apple social login failed:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | GOOGLE
  |--------------------------------------------------------------------------
  */
  const handleGoogleError = () => {
    console.error("Google login failed.");
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const credential = credentialResponse?.credential;

      if (!credential) {
        console.error("Google credential was not received.");
        return;
      }

      const { user, isNewUser } = await socialLogin({
        provider: "GOOGLE",
        token: credential,
        role,
      });

      redirectAfterSocialLogin({ user, isNewUser });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Google social login failed:", axiosError.response?.data || axiosError);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FACEBOOK SDK
  |--------------------------------------------------------------------------
  */
  const handleFacebookLogin = () => {
    if (!facebookReady || !window.FB) {
      console.error("Facebook SDK is not ready.");
      return;
    }

    window.FB.login(
      (response) => {
        if (!response.authResponse) {
          console.error("Facebook login failed or was cancelled.");
          return;
        }

        const accessToken = response.authResponse.accessToken;

        (async () => {
          try {
            const { user, isNewUser } = await socialLogin({
              provider: "FACEBOOK",
              token: accessToken,
              role,
            });

            redirectAfterSocialLogin({ user, isNewUser });
          } catch (error) {
            const axiosError = error as AxiosError;
            console.error(
              "Facebook social login failed:",
              axiosError.response?.data || axiosError
            );
          }
        })();
      },
      { scope: "email" }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */
  return (
    <div className="mt-10">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-xs text-[#9CA3AF]">or</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <p className="text-center text-xs text-gray-500 mb-5 mt-5">
        use any of your favourite social media
      </p>

      <div className="flex justify-center gap-4">
        {/* GOOGLE */}
        <div className="relative w-14 h-14">
          {/* Visual layer only — clipped to a circle, decorative */}
          <div className="absolute inset-0 rounded-[20px] bg-gray-100 flex items-center justify-center overflow-hidden pointer-events-none">
            <img src={googleIcon} alt="Google" className="w-7 h-7 object-contain" />
          </div>

          {/* Real Google button — NOT clipped, sits on top, fully clickable */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0">
            <GoogleLogin
              type="icon"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              shape="circle"
              size="large"
            />
          </div>
        </div>

        {/* FACEBOOK */}
        <button
          type="button"
          onClick={handleFacebookLogin}
          disabled={!facebookReady}
          className="w-14 h-14 rounded-[20px] bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <img src={facebookIcon} alt="Facebook" className="w-7 h-7" />
        </button>

        {/* APPLE */}
        <button
          type="button"
          onClick={handleAppleLogin}
          disabled={!appleReady}
          className={`
                        w-14 h-14 rounded-[20px] bg-gray-100
                        flex items-center justify-center transition
                        ${appleReady ? "hover:bg-gray-200 cursor-pointer" : "opacity-50 cursor-not-allowed"}
                    `}
        >
          <img src={appleIcon} alt="Apple" className="w-7 h-7 object-contain" />
        </button>
      </div>
    </div>
  );
};

export default SocialButtons;
