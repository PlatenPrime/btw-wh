// router.tsx
import { lazy } from "react";
import { createHashRouter, Outlet } from "react-router";
import { RouteErrorBoundary } from "./components/error-components/route-error-boundary";
import { ProtectedRoute } from "./modules/auth/components";

const App = lazy(() => import("./App"));

const Login = lazy(() => import("@//modules/auth/pages/login"));
const Register = lazy(() => import("./modules/auth/pages/register"));

const Art = lazy(() =>
  import("./modules/arts/pages/art").then((module) => ({
    default: module.Art,
  })),
);
const Arts = lazy(() =>
  import("./modules/arts/pages/arts").then((module) => ({
    default: module.Arts,
  })),
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
  import("./modules/rows/pages/row").then((module) => ({
    default: module.Row,
  })),
);
const Rows = lazy(() =>
  import("./modules/rows/pages/rows").then((module) => ({
    default: module.Rows,
  })),
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

const PalletPage = lazy(() =>
  import("./modules/pallets/pages/pallet").then((module) => ({
    default: module.Pallet,
  })),
);
const NotFound = lazy(() =>
  import("./pages/not-found").then((module) => ({
    default: module.NotFound,
  })),
);
const Unauthorized = lazy(() =>
  import("./modules/auth/pages/unauthorized").then((module) => ({
    default: module.Unauthorized,
  })),
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
    path: "/unauthorized",
    Component: Unauthorized,
  },
  {
    path: "/",
    Component: App,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "arts",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "dashboard",
            element: <Arts />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update",
            element: <ArtsUpdate />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "utils",
            element: <ArtsUtils />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: ":artikul",
            element: <Art />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "wh",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "rows",
            element: <Rows />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "rows/:row",
            element: <Row />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "stocks",
            element: <Stocks />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "stocks/:stock",
            element: <Stock />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "zones",
            element: <Zones />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "utils",
            element: <WhUtils />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "pallets/:title",
            element: <PalletPage />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "refiling",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "asks",
            element: <Asks />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "asks/:ask",
            element: <Ask />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "defs",
            element: <Defs />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "path",
            element: <Path />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },

      // 404 route - must be last in children array
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
    ],
  },
]);
