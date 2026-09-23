import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

import router from "./router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found — expected a #root element in index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  </GoogleOAuthProvider>
);
