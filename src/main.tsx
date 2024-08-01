import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import "./index.css";
import store from "./store/store.ts";
import IntlStoreProvider from "./providers/IntlProvider.tsx";
import { StoreProvider } from "easy-peasy";

const App = lazy(() => import("./pages/App"));
const RouteError = lazy(() => import("./pages/errors/RouteError"));

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
    <StoreProvider store={store}>
      <IntlStoreProvider>
        <RouterProvider router={router} />
      </IntlStoreProvider>
    </StoreProvider>
  );
};

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
