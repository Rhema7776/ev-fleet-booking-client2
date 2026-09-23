/**
 * The shape of `location.state` as it flows through the OTP verification
 * step. Different senders populate different subsets: ForgotPassword sends
 * email/purpose/redirectTo for password reset; SocialButtons sends a
 * richer set (role, fullName, nextRoute, step counters) for a brand-new
 * social-signup flow. Every field is optional since no single sender
 * populates all of them.
 */
export interface OtpFlowState {
  email?: string;
  code?: string;
  purpose?: string;
  role?: string;
  fullName?: string;
  businessName?: string;
  contactPerson?: string;
  phoneNumber?: string;
  darkText?: string;
  lightText?: string;
  description?: string;
  redirectTo?: string;
  nextRoute?: string;
  currentStep?: number;
  totalSteps?: number;
}
