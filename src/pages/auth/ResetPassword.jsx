import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";

import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/button";

const ResetPassword = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordsMatch =
        password &&
        confirmPassword &&
        password === confirmPassword;

    const handleSubmit = (e) => {

        e.preventDefault();

        navigate(ROUTES.SUCCESS);

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

                <Button
                    type="submit"
                    variant="dark"
                    disabled={!passwordsMatch}
                >
                    Reset Password
                </Button>

            </form>

        </AuthContainer>

    );

};

export default ResetPassword;