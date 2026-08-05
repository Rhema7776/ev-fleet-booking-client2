import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/ui/button";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthHeader from "@/components/auth/AuthHeader";

import OTPInput from "@/components/auth/OTPInput";

import { ROUTES } from "@/constants/routes";

const OTPVerification = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const email = state?.email ?? "";

    const darkText = state?.darkText ?? "Verify";

    const lightText = state?.lightText ?? "your email";

    const description =
        state?.description ??
        `Enter the code we sent to ${email}`;

    const redirectTo =
        state?.redirectTo ??
        ROUTES.CREATE_PASSWORD

    const currentStep =
        state?.currentStep ?? 1;

    const totalSteps =
        state?.totalSteps ?? 4;

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [seconds, setSeconds] = useState(56);

    const [verifying, setVerifying] = useState(false);

    const [verified, setVerified] = useState(false);

    useEffect(() => {

        if (!verified) return;

        const timer = setTimeout(() => {

            navigate(redirectTo, {
                state,
            });

        }, 1200);

        return () => clearTimeout(timer);

    }, [verified, navigate, redirectTo, state]);

    useEffect(() => {

        if (seconds === 0) return;

        const timer = setTimeout(() => {

            setSeconds((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [seconds]);

    useEffect(() => {

        const completed = otp.every(
            (digit) => digit !== ""
        );

        if (!completed || verified) return;

        setVerifying(true);

        const verifyTimer = setTimeout(() => {

            setVerifying(false);

            setVerified(true);

        }, 1800);

        return () => clearTimeout(verifyTimer);

    }, [otp, verified]);

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar
                current={state?.currentStep ?? 1}
                total={state?.totalSteps ?? 4}
            />

            <AuthHeader
                darkText={darkText}
                lightText={lightText}
                description={description}
            />

            <div className="mt-10">

                <OTPInput
                    value={otp}
                    onChange={setOtp}
                />

                <p className="mt-8 text-center text-sm">

                    {seconds > 0 ? (

                        <span className="text-gray-400">

                            Resend code in 0:
                            {seconds
                                .toString()
                                .padStart(2, "0")}

                        </span>

                    ) : (

                        <button
                            className="font-semibold text-brand-primary"
                            onClick={() => {

                                setOtp([
                                    "",
                                    "",
                                    "",
                                    "",
                                    "",
                                    "",
                                ]);

                                setVerified(false);

                                setVerifying(false);

                                setSeconds(56);

                            }}
                        >

                            Resend Code

                        </button>

                    )}

                </p>

                <div className="mt-12">

                    {verifying && (

                        <div className="flex justify-center">

                            <Loader2
                                size={28}
                                className="animate-spin text-brand-primary"
                            />

                        </div>

                    )}

                    {verified && (

                        <Button
                            variant="dark"
                            loading
                        >

                            Next

                        </Button>

                    )}

                </div>

            </div>

        </AuthContainer>

    );

};

export default OTPVerification;