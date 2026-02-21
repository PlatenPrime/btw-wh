// router.tsx
import { RouteErrorBoundary } from "@/components/shared/error-components/route-error-boundary";
import { RoleType } from "@/constants/roles";
import { ProtectedRoute } from "@/modules/auth/components/index.ts";
import { lazy } from "react";
import { createHashRouter, Outlet } from "react-router";

const App = lazy(() => import("./App"));

const Login = lazy(() => import("@/modules/auth/pages/login"));
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
  import("./modules/arts/pages/artsUpdate").then((module) => ({
    default: module.ArtsUpdate,
  })),
);
const ArtsUtils = lazy(() =>
  import("./modules/arts/pages/artsUtils").then((module) => ({
    default: module.ArtsUtils,
  })),
);

const Ask = lazy(() =>
  import("./modules/asks/pages/ask").then((module) => ({
    default: module.Ask,
  })),
);
const Asks = lazy(() =>
  import("./modules/asks/pages/asks").then((module) => ({
    default: module.Asks,
  })),
);
const Pulls = lazy(() =>
  import("./modules/asks/pages/pulls").then((module) => ({
    default: module.Pulls,
  })),
);

const Defs = lazy(() =>
  import("./modules/defs/pages/defs").then((module) => ({
    default: module.Defs,
  })),
);
const Main = lazy(() =>
  import("./pages/main").then((module) => ({ default: module.Main })),
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
  import("./modules/stocks/pages/stock").then((module) => ({
    default: module.Stock,
  })),
);
const Stocks = lazy(() =>
  import("./modules/stocks/pages/stocks").then((module) => ({
    default: module.Stocks,
  })),
);

const WhUtils = lazy(() =>
  import("./modules/wh/pages/whUtils").then((module) => ({
    default: module.WhUtils,
  })),
);
const Zones = lazy(() =>
  import("./modules/zones/pages/zones").then((module) => ({
    default: module.Zones,
  })),
);
const ZonesImportExport = lazy(() =>
  import("./modules/zones/pages/zones-import-export").then((module) => ({
    default: module.ZonesImportExport,
  })),
);
const Zone = lazy(() =>
  import("./modules/zones/pages/zone").then((module) => ({
    default: module.Zone,
  })),
);

const Dels = lazy(() =>
  import("./modules/dels/pages/dels").then((module) => ({
    default: module.Dels,
  })),
);
const Del = lazy(() =>
  import("./modules/dels/pages/del").then((module) => ({
    default: module.Del,
  })),
);

const Prods = lazy(() =>
  import("./modules/prods/pages/prods").then((module) => ({
    default: module.Prods,
  })),
);
const Prod = lazy(() =>
  import("./modules/prods/pages/prod").then((module) => ({
    default: module.Prod,
  })),
);

const BlocksPage = lazy(() =>
  import("./modules/blocks/pages/blocks").then((module) => ({
    default: module.BlocksPage,
  })),
);
const BlockPage = lazy(() =>
  import("./modules/blocks/pages/block").then((module) => ({
    default: module.BlockPage,
  })),
);
const SegPage = lazy(() =>
  import("./modules/blocks/pages/seg").then((module) => ({
    default: module.SegPage,
  })),
);
const PalletGroupsPage = lazy(() =>
  import("./modules/pallet-groups/pages/pallet-groups").then((module) => ({
    default: module.PalletGroupsPage,
  })),
);
const PalletGroupPage = lazy(() =>
  import("./modules/pallet-groups/pages/pallet-group").then((module) => ({
    default: module.PalletGroupPage,
  })),
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
const Forbidden = lazy(() =>
  import("./modules/auth/pages/forbidden").then((module) => ({
    default: module.Forbidden,
  })),
);
const UsersPage = lazy(() =>
  import("./modules/auth/pages/users").then((module) => ({
    default: module.UsersPage,
  })),
);
const UserPage = lazy(() =>
  import("./modules/auth/pages/user").then((module) => ({
    default: module.UserPage,
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
    path: "/forbidden",
    Component: Forbidden,
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
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <Zones />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "dels",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <Dels />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "dels/:id",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <Del />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "prods",
            element: (
              <ProtectedRoute>
                <Prods />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "prods/:id",
            element: (
              <ProtectedRoute>
                <Prod />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "blocks",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <BlocksPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "blocks/:id",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <BlockPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "blocks/:blockId/segs/:segId",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <SegPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "pallet-groups",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <PalletGroupsPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "pallet-groups/:id",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <PalletGroupPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "zones-import-export",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <ZonesImportExport />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "zones/:title",
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <Zone />
              </ProtectedRoute>
            ),
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
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
            <UsersPage />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "users/:id",
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
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
            path: "asks/:id",
            element: <Ask />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "defs",
            element: <Defs />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "pulls",
            element: <Pulls />,
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
