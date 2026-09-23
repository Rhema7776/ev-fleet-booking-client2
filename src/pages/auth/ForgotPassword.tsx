import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { ROUTES } from "@/constants/routes";
import { forgotPassword } from "@/services/auth/authService";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";

import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/button";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword({ email });

      navigate(ROUTES.VERIFY_EMAIL, {
        state: {
          email,
          purpose: "RESET_PASSWORD",
          darkText: "Verify",
          lightText: "your email",
          description: `Enter the verification code sent to ${email}`,
          redirectTo: ROUTES.RESET_PASSWORD,
        },
      });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Unable to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBackButton />

      <AuthHeader
        darkText="Reset your"
        lightText="password."
        description="Enter your email address and we'll send you a verification code."
      />

      <form onSubmit={handleSubmit} className="space-y-8 mt-10">
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" variant="dark" loading={loading} disabled={!email}>
          Continue
        </Button>
      </form>

      <AuthFooter text="Remember your password?" linkText="Log in" to={ROUTES.LOGIN} />
    </AuthContainer>
  );
};

export default ForgotPassword;
