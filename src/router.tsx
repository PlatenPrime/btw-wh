// router.tsx
import { lazy } from "react";
import { createHashRouter, Navigate, Outlet } from "react-router";
import { ProtectedRoute } from "./modules/auth/components";

const App = lazy(() => import("./App"));

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

const Art = lazy(() =>
  import("./pages/art").then((module) => ({ default: module.Art })),
);
const Arts = lazy(() =>
  import("./pages/arts").then((module) => ({ default: module.Arts })),
);
const ArtsUpdate = lazy(() =>
  import("./pages/artsUpdate").then((module) => ({
    default: module.ArtsUpdate,
  })),
);
const ArtsUtils = lazy(() =>
  import("./pages/artsUtils").then((module) => ({ default: module.ArtsUtils })),
);

const Ask = lazy(() =>
  import("./pages/ask").then((module) => ({ default: module.Ask })),
);
const Asks = lazy(() =>
  import("./pages/asks").then((module) => ({ default: module.Asks })),
);

const Defs = lazy(() =>
  import("./pages/defs").then((module) => ({ default: module.Defs })),
);
const Main = lazy(() =>
  import("./pages/main").then((module) => ({ default: module.Main })),
);
const Path = lazy(() =>
  import("./pages/path").then((module) => ({ default: module.Path })),
);

const Row = lazy(() =>
  import("./pages/row").then((module) => ({ default: module.Row })),
);
const Rows = lazy(() =>
  import("./pages/rows").then((module) => ({ default: module.Rows })),
);

const Stock = lazy(() =>
  import("./pages/stock").then((module) => ({ default: module.Stock })),
);
const Stocks = lazy(() =>
  import("./pages/stocks").then((module) => ({ default: module.Stocks })),
);

const WhUtils = lazy(() =>
  import("./pages/whUtils").then((module) => ({ default: module.WhUtils })),
);
const Zones = lazy(() =>
  import("./pages/zones").then((module) => ({ default: module.Zones })),
);

export const router = createHashRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        ),
      },
      {
        path: "arts",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <Arts /> },
          { path: "update", element: <ArtsUpdate /> },
          { path: "utils", element: <ArtsUtils /> },
          { path: ":artikul", element: <Art /> },
        ],
      },
      {
        path: "wh",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "rows", element: <Rows /> },
          { path: "rows/:row", element: <Row /> },
          { path: "stocks", element: <Stocks /> },
          { path: "stocks/:stock", element: <Stock /> },
          { path: "zones", element: <Zones /> },
          { path: "utils", element: <WhUtils /> },
        ],
      },
      {
        path: "refiling",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "asks", element: <Asks /> },
          { path: "asks/:ask", element: <Ask /> },
          { path: "defs", element: <Defs /> },
          { path: "path", element: <Path /> },
        ],
      },
    ],
  },
  // Catch-all route for unauthenticated users
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
