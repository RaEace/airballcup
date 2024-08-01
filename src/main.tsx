import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteError from "./pages/errors/RouteError.tsx";

const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
  },
]);

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
