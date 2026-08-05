import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthFooter from "@/components/auth/AuthFooter";
import SocialButtons from "@/components/auth/SocialButtons";
import PasswordInput from "@/components/auth/PasswordInput";

import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/button";

import { login } from "@/services/auth/authService";

const LoginPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            await login({

                email,

                password,

            });

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to login."

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
                darkText="Log"
                lightText="in"
                description="Enter your details to continue."
            />

            <form
                onSubmit={handleSubmit}
                className="mt-10"
            >

                <div className="space-y-5">

                    <TextInput
                        label="Email"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                </div>

                <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="
                        inline-block
                        mt-4
                        text-sm
                        font-semibold
                        text-brand-primary
                    "
                >
                    Forgot password?
                </Link>

                {

                    error && (

                        <p className="mt-4 text-sm text-red-500">

                            {error}

                        </p>

                    )

                }

                <div className="mt-8">

                    <Button
                        type="submit"
                        variant="dark"
                        loading={loading}
                    >

                        Continue

                    </Button>

                </div>

            </form>

            <AuthDivider />

            <SocialButtons />

            <AuthFooter
                text="New to LeasHub?"
                linkText="Create account"
                to={ROUTES.REGISTER}
            />

        </AuthContainer>

    );

};

export default LoginPage;