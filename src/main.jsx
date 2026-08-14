import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import.meta.env.VITE_GOOGLE_CLIENT_ID
import "./index.css";

import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

            <div className="min-h-screen">

            <RouterProvider router={router} />

            </div>

        </GoogleOAuthProvider>

);

