EV Fleet Booking — Frontend
Setup
bash
npm install or yarn 
npm run dev or yarn dev

Runs on https://localhost:5173 (HTTPS via self-signed cert — your browser may show a warning on first load, this is expected in dev).

Environment Variables

Copy .env.example to .env and fill in the values below. Never commit .env to git.

All frontend env variables must be prefixed with VITE_ or Vite will not expose them to the browser. Vite only reads .env at server start — restart npm run dev after any change.

API
Variable	Description
VITE_API_BASE_URL	Backend URL this app calls. http://localhost:3000 for local backend, or the deployed/ngrok URL when testing against a remote one.
Google Sign-In
Variable	Description
VITE_GOOGLE_CLIENT_ID	Same OAuth Web Client ID as backend's GOOGLE_CLIENT_ID. Safe to expose publicly — this is expected to be visible in frontend bundles.

Google Cloud Console → Credentials → your Client ID → make sure both are listed under Authorized JavaScript origins:

http://localhost:5173
https://your-deployed-frontend-domain.com
Facebook Login
Variable	Description
VITE_FACEBOOK_APP_ID	Same App ID as backend's FACEBOOK_APP_ID. Safe to expose publicly. Never put FACEBOOK_APP_SECRET here — that stays backend-only.
Apple Sign-In

(Blocked on Apple Developer Program enrollment — see backend README for details.)

Variable	Description
VITE_APPLE_CLIENT_ID	Same Services ID as backend's APPLE_CLIENT_ID
VITE_APPLE_REDIRECT_URI	Must exactly match the redirect URI registered on the Services ID in Apple's portal. Update this whenever the domain changes (localhost → ngrok → deployed).

Until real values exist, the Apple button will render disabled — this is expected behavior (guarded in appleAuthService.js), not a bug.

Notes for the team
Social buttons (SocialButtons.jsx) share one pattern: SDK loads async on mount, button stays disabled until xReady state flips true, then the click handler calls the provider's SDK and forwards the resulting token to services/auth/authService.js's socialLogin().
Google's button uses an invisible-overlay trick to match custom icon styling — see SocialButtons.jsx for the two-layer (visual + clickable) structure. Don't add overflow-hidden to the clickable layer — it clips Google's iframe and breaks clicking.
If testing Facebook/Google against a deployed or ngrok backend, make sure that URL is also added to each provider's allowed-origins list (see backend README's Meta config checklist).