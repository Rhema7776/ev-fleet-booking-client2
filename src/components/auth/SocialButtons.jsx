
import { useEffect, useState } from "react";

import googleIcon from "@/assets/images/google.svg";
import facebookIcon from "@/assets/images/facebook.svg";
import appleIcon from "@/assets/images/apple.svg";

import { socialLogin } from "@/services/auth/authService";
import { GoogleLogin } from "@react-oauth/google";
import { loadFacebookSDK } from "@/services/auth/facebookAuthService";
import { loadAppleSDK } from "@/services/auth/appleAuthService";
import { ROUTES } from "@/constants/routes";

const SocialButtons = ({
    role,
    redirectTo,
    navigate,
}) => {
    const [facebookReady, setFacebookReady] = useState(false);
    const [appleReady, setAppleReady] = useState(false);

const OTP_ROLE_CONFIG = {
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

const redirectAfterSocialLogin = ({ user, isNewUser }) => {

    if (isNewUser && OTP_ROLE_CONFIG[role]) {

        const config = OTP_ROLE_CONFIG[role];

        navigate(ROUTES.VERIFY_EMAIL, {
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
            console.log("APPLE SDK SKIPPED — no client ID configured yet");
            return;
        }

        try {
            console.log("LOADING APPLE SDK...");
            await loadAppleSDK();
            if (!mounted) return;
            console.log("APPLE SDK READY FOR LOGIN");
            setAppleReady(true);
        } catch (error) {
            console.error("APPLE SDK INITIALIZATION FAILED:", error);
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
            console.log("LOADING FACEBOOK SDK...");

            await loadFacebookSDK();

            if (!mounted) return;

            console.log("FACEBOOK SDK READY FOR LOGIN");

            setFacebookReady(true);

        } catch (error) {

            console.error(
                "FACEBOOK SDK INITIALIZATION FAILED:",
                error
            );

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
    console.log("APPLE LOGIN STARTED");

    if (!appleReady || !window.AppleID) {
        console.error("APPLE SDK IS NOT READY");
        return;
    }

    try {
        const response = await window.AppleID.auth.signIn();

        console.log("APPLE LOGIN RESPONSE:", response);

        const idToken = response?.authorization?.id_token;

        if (!idToken) {
            console.error("Apple id_token was not received.", response);
            return;
        }

        console.log("APPLE ID TOKEN RECEIVED");

        // Apple only sends `user` (name) on the FIRST login ever — capture it if present
        const fullName = response?.user?.name
            ? `${response.user.name.firstName ?? ""} ${response.user.name.lastName ?? ""}`.trim()
            : undefined;

        const { user, isNewUser } = await socialLogin({ provider: "APPLE", token: idToken, fullName, role });
            console.log("APPLE SOCIAL LOGIN SUCCESS:", user, "isNewUser:", isNewUser);
            redirectAfterSocialLogin({ user, isNewUser });

    } catch (error) {
        console.error("APPLE SOCIAL LOGIN FAILED:", error);
    }
};

    /*
    |--------------------------------------------------------------------------
    | GOOGLE
    |--------------------------------------------------------------------------
    */

    const handleGoogleError = () => {

        console.error("GOOGLE LOGIN FAILED");

    };

    const handleGoogleSuccess = async (credentialResponse) => {

    try {

        const credential = credentialResponse?.credential;

        if (!credential) {
            console.error("Google credential was not received.", credentialResponse);
            return;
        }

        const { user, isNewUser } = await socialLogin({
            provider: "GOOGLE",
            token: credential,
            role,
        });

        console.log("GOOGLE SOCIAL LOGIN SUCCESS:", user, "isNewUser:", isNewUser);

        redirectAfterSocialLogin({ user, isNewUser });

    } catch (error) {
        console.error("GOOGLE SOCIAL LOGIN FAILED:", error.response?.data || error);
    }
};

    /*
    |--------------------------------------------------------------------------
    | FACEBOOK SDK
    |--------------------------------------------------------------------------
    */
const handleFacebookLogin = () => {
    console.log("FACEBOOK LOGIN STARTED");

    if (!facebookReady || !window.FB) {
        console.error(
            "FACEBOOK SDK IS NOT READY"
        );
        return;
    }

    console.log(
        "FACEBOOK FB OBJECT:",
        window.FB
    );

    console.log(
        "CALLING FB.LOGIN..."
    );

    window.FB.login(
        (response) => {
            console.log(
                "FACEBOOK LOGIN RESPONSE:",
                response
            );

            if (!response.authResponse) {
                console.error(
                    "FACEBOOK LOGIN FAILED OR CANCELLED:",
                    response
                );
                return;
            }

            const accessToken =
                response.authResponse.accessToken;

            console.log(
                "FACEBOOK ACCESS TOKEN RECEIVED"
            );

            (async () => {
                try {
                    const { user, isNewUser } =
                        await socialLogin({
                            provider: "FACEBOOK",
                            token: accessToken,
                            role,
                        });

                    console.log(
                        "FACEBOOK SOCIAL LOGIN SUCCESS:",
                        user,
                        "isNewUser:",
                        isNewUser
                    );

                    redirectAfterSocialLogin({ user, isNewUser });

                } catch (error) {
                    console.error(
                        "FACEBOOK SOCIAL LOGIN FAILED:",
                        error.response?.data ||
                        error
                    );
                }
            })    
        ();
        },
        {
            scope: "email",
        }
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
                    <div
                        className="
                            absolute inset-0
                            rounded-[20px]
                            bg-gray-100
                            flex items-center justify-center
                            overflow-hidden
                            pointer-events-none
                        "
                    >
                        <img
                            src={googleIcon}
                            alt="Google"
                            className="w-7 h-7 object-contain"
                        />
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
                    className="
                        w-14
                        h-14
                        rounded-[20px]
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-200
                        transition
                    "
                >
                    <img
                        src={facebookIcon}
                        alt="Facebook"
                        className="w-7 h-7"
                    />
                </button>

                {/* APPLE */}
                {/* <button
                    type="button"
                    disabled
                    className="
                        w-14
                        h-14
                        rounded-[20px]
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        opacity-60
                        cursor-not-allowed
                    "
                >
                    <img
                        src={appleIcon}
                        alt="Apple"
                        className="w-7 h-7 object-contain"
                    />
                </button> */}
                {/* APPLE option 2 */}
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

