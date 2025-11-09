import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import allRoutes from "./routes/routes";
import "./index.css";

const router = createBrowserRouter(allRoutes, {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true, 
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
