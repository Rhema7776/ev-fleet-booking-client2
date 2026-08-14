import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import { resetPassword } from "@/services/auth/authService";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";

import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/button";

const ResetPassword = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const email = state?.email;

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const passwordsMatch =
        password &&
        confirmPassword &&
        password === confirmPassword;

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!passwordsMatch) return;

        try {

            setLoading(true);

            setError("");

            await resetPassword({

                email,

                password,

            });

            navigate(ROUTES.LOGIN);

        }

        catch (err) {

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Unable to reset password."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthHeader

                darkText="Create a new"

                lightText="password"

                description="Your new password must be different from your previous password."

            />

            <form

                onSubmit={handleSubmit}

                className="space-y-6 mt-10"

            >

                <PasswordInput

                    label="New Password"

                    name="password"

                    placeholder="Enter new password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                    autoComplete="new-password"

                />

                <PasswordInput

                    label="Confirm Password"

                    name="confirmPassword"

                    placeholder="Confirm password"

                    value={confirmPassword}

                    onChange={(e) => setConfirmPassword(e.target.value)}

                    autoComplete="new-password"

                    error={

                        confirmPassword &&

                        !passwordsMatch

                            ? "Passwords do not match."

                            : ""

                    }

                />

                {error && (

                    <p className="text-sm text-red-500">

                        {error}

                    </p>

                )}

                <Button

                    type="submit"

                    variant="dark"

                    loading={loading}

                    disabled={!passwordsMatch || loading}

                >

                    Reset Password

                </Button>

            </form>

        </AuthContainer>

    );

};

export default ResetPassword;