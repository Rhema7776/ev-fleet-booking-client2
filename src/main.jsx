import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <div className="min-h-screen">

            <RouterProvider router={router} />

        </div>

    </React.StrictMode>
);