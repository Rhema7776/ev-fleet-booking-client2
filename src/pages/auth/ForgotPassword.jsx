import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";

import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        navigate(ROUTES.VERIFY_EMAIL, {
            state: {
                email,
            },
        });

    };

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthHeader
                darkText="Forgot"
                lightText="password?"
                description="Enter your email address and we'll send you a verification code."
            />

            <form
                onSubmit={handleSubmit}
                className="space-y-8 mt-10"
            >

                <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />

                <Button
                    type="submit"
                    variant="dark"
                    disabled={!email}
                >
                    Continue
                </Button>

            </form>

            <AuthFooter
                text="Remember your password?"
                linkText="Log in"
                to={ROUTES.LOGIN}
            />

        </AuthContainer>

    );

};

export default ForgotPassword;