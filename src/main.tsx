import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import IntlStoreProvider from "./providers/IntlProvider.tsx";
import Header from "@/components/header.tsx";

import.meta.glob('/src/assets/thunder/Web-TT/Thunder-*.css', { eager: true });

const App = lazy(() => import("./pages/App")); // <-- puisqu'on est dans SCAD
const RouteError = lazy(() => import("./pages/errors/RouteError"));
const Fallback = lazy(() => import("./pages/fallback/Fallback"));

const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
  },
]);

const Root: React.FunctionComponent = () => {
  return (
      <IntlStoreProvider>
        <Suspense fallback={<Fallback />}>
            <Header />
            <RouterProvider router={router} />
        </Suspense>
      </IntlStoreProvider>
  );
};

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
