// router.tsx
import { RouteErrorBoundary } from "@/components/shared/errors";
import { RoleType } from "@/constants/roles";
import { ProtectedRoute } from "@/modules/auth/components/index.ts";
import { lazyWithRetry } from "@/lib/chunk-load";
import { createHashRouter, Navigate, Outlet, useParams } from "react-router";

function RedirectWhKonkDetailToSku() {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/sku/konks" replace />;
  return <Navigate to={`/sku/konks/${id}`} replace />;
}

function RedirectUserDetailToAdmin() {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/admin/users" replace />;
  return <Navigate to={`/admin/users/${id}`} replace />;
}

function RedirectConstantDetailToAdmin() {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/admin/constants" replace />;
  return <Navigate to={`/admin/constants/${id}`} replace />;
}

const App = lazyWithRetry(() => import("./App"));

const Login = lazyWithRetry(() => import("@/modules/auth/pages/login"));
const Register = lazyWithRetry(() => import("./modules/auth/pages/register"));

const Art = lazyWithRetry(() =>
  import("./modules/arts/pages/art").then((module) => ({
    default: module.Art,
  })),
);
const Arts = lazyWithRetry(() =>
  import("./modules/arts/pages/arts").then((module) => ({
    default: module.Arts,
  })),
);
const ArtsUpdate = lazyWithRetry(() =>
  import("./modules/arts/pages/artsUpdate").then((module) => ({
    default: module.ArtsUpdate,
  })),
);
const ArtsUtils = lazyWithRetry(() =>
  import("./modules/arts/pages/artsUtils").then((module) => ({
    default: module.ArtsUtils,
  })),
);

const Ask = lazyWithRetry(() =>
  import("./modules/asks/pages/ask").then((module) => ({
    default: module.Ask,
  })),
);
const Asks = lazyWithRetry(() =>
  import("./modules/asks/pages/asks").then((module) => ({
    default: module.Asks,
  })),
);
const Pulls = lazyWithRetry(() =>
  import("./modules/asks/pages/pulls").then((module) => ({
    default: module.Pulls,
  })),
);
const KasksPage = lazyWithRetry(() =>
  import("./modules/kasks/pages/kasks").then((module) => ({
    default: module.KasksPage,
  })),
);

const Defs = lazyWithRetry(() =>
  import("./modules/defs/pages/defs").then((module) => ({
    default: module.Defs,
  })),
);
const Main = lazyWithRetry(() =>
  import("./pages/main").then((module) => ({ default: module.Main })),
);

const Row = lazyWithRetry(() =>
  import("./modules/rows/pages/row").then((module) => ({
    default: module.Row,
  })),
);
const Rows = lazyWithRetry(() =>
  import("./modules/rows/pages/rows").then((module) => ({
    default: module.Rows,
  })),
);


const Zones = lazyWithRetry(() =>
  import("./modules/zones/pages/zones").then((module) => ({
    default: module.Zones,
  })),
);
const ZonesImportExport = lazyWithRetry(() =>
  import("./modules/zones/pages/zones-import-export").then((module) => ({
    default: module.ZonesImportExport,
  })),
);
const Zone = lazyWithRetry(() =>
  import("./modules/zones/pages/zone").then((module) => ({
    default: module.Zone,
  })),
);

const Dels = lazyWithRetry(() =>
  import("./modules/dels/pages/dels").then((module) => ({
    default: module.Dels,
  })),
);
const Del = lazyWithRetry(() =>
  import("./modules/dels/pages/del").then((module) => ({
    default: module.Del,
  })),
);

const Prods = lazyWithRetry(() =>
  import("./modules/prods/pages/prods").then((module) => ({
    default: module.Prods,
  })),
);
const Prod = lazyWithRetry(() =>
  import("./modules/prods/pages/prod").then((module) => ({
    default: module.Prod,
  })),
);

const Konks = lazyWithRetry(() =>
  import("./modules/konks/pages/konks").then((module) => ({
    default: module.Konks,
  })),
);
const Konk = lazyWithRetry(() =>
  import("./modules/konks/pages/konk").then((module) => ({
    default: module.Konk,
  })),
);
const Skugrs = lazyWithRetry(() =>
  import("./modules/skugrs/pages/skugrs").then((module) => ({
    default: module.Skugrs,
  })),
);
const Skugr = lazyWithRetry(() =>
  import("./modules/skugrs/pages/skugr").then((module) => ({
    default: module.Skugr,
  })),
);
const Sku = lazyWithRetry(() =>
  import("./modules/skus/pages/sku").then((module) => ({
    default: module.Sku,
  })),
);
const CompetitorSkus = lazyWithRetry(() =>
  import("./modules/skus/pages/competitor-skus").then((module) => ({
    default: module.CompetitorSkus,
  })),
);
const SkuSlices = lazyWithRetry(() =>
  import("./modules/sku-analytics/pages/sku-slices").then((module) => ({
    default: module.SkuSlices,
  })),
);
const BtradeSlices = lazyWithRetry(() =>
  import("./modules/btrade-slices/pages/btrade-slices").then((module) => ({
    default: module.BtradeSlices,
  })),
);
const SkuKonkProdSales = lazyWithRetry(() =>
  import("./modules/sku-analytics/pages/sku-konk-prod-sales").then(
    (module) => ({
      default: module.SkuKonkProdSales,
    }),
  ),
);
const SkuKonkProdStock = lazyWithRetry(() =>
  import("./modules/sku-analytics/pages/sku-konk-prod-stock").then(
    (module) => ({
      default: module.SkuKonkProdStock,
    }),
  ),
);
const SkuStatistics = lazyWithRetry(() =>
  import("./modules/sku-analytics/pages/sku-statistics").then((module) => ({
    default: module.SkuStatistics,
  })),
);
const SkuStatisticsProd = lazyWithRetry(() =>
  import("./modules/sku-analytics/pages/sku-statistics-prod").then((module) => ({
    default: module.SkuStatisticsProd,
  })),
);
const SkuStatisticsSkugr = lazyWithRetry(() =>
  import("./modules/sku-analytics/pages/sku-statistics-skugr").then(
    (module) => ({
      default: module.SkuStatisticsSkugr,
    }),
  ),
);

const Analogs = lazyWithRetry(() =>
  import("./modules/analogs/pages/analogs").then((module) => ({
    default: module.Analogs,
  })),
);
const Analog = lazyWithRetry(() =>
  import("./modules/analogs/pages/analog").then((module) => ({
    default: module.Analog,
  })),
);
const AnalogSlices = lazyWithRetry(() =>
  import("./modules/analog-slices/pages/analog-slices").then((module) => ({
    default: module.AnalogSlices,
  })),
);
const SalesPage = lazyWithRetry(() =>
  import("./modules/sales/pages/sales").then((module) => ({
    default: module.Sales,
  })),
);
const StockComparisonPage = lazyWithRetry(() =>
  import("./modules/stock-comparison/pages/stock-comparison").then((module) => ({
    default: module.StockComparison,
  })),
);

const Constants = lazyWithRetry(() =>
  import("./modules/constants/pages/constants").then((module) => ({
    default: module.Constants,
  })),
);
const Constant = lazyWithRetry(() =>
  import("./modules/constants/pages/constant").then((module) => ({
    default: module.Constant,
  })),
);

const BlocksPage = lazyWithRetry(() =>
  import("./modules/blocks/pages/blocks").then((module) => ({
    default: module.BlocksPage,
  })),
);
const BlockPage = lazyWithRetry(() =>
  import("./modules/blocks/pages/block").then((module) => ({
    default: module.BlockPage,
  })),
);
const SegPage = lazyWithRetry(() =>
  import("./modules/blocks/pages/seg").then((module) => ({
    default: module.SegPage,
  })),
);
const PalletGroupsPage = lazyWithRetry(() =>
  import("./modules/pallet-groups/pages/pallet-groups").then((module) => ({
    default: module.PalletGroupsPage,
  })),
);
const PalletGroupPage = lazyWithRetry(() =>
  import("./modules/pallet-groups/pages/pallet-group").then((module) => ({
    default: module.PalletGroupPage,
  })),
);

const PalletPage = lazyWithRetry(() =>
  import("./modules/pallets/pages/pallet").then((module) => ({
    default: module.Pallet,
  })),
);
const NotFound = lazyWithRetry(() =>
  import("./pages/not-found").then((module) => ({
    default: module.NotFound,
  })),
);
const Unauthorized = lazyWithRetry(() =>
  import("./modules/auth/pages/unauthorized").then((module) => ({
    default: module.Unauthorized,
  })),
);
const Forbidden = lazyWithRetry(() =>
  import("./modules/auth/pages/forbidden").then((module) => ({
    default: module.Forbidden,
  })),
);
const UsersPage = lazyWithRetry(() =>
  import("./modules/auth/pages/users").then((module) => ({
    default: module.UsersPage,
  })),
);
const UserPage = lazyWithRetry(() =>
  import("./modules/auth/pages/user").then((module) => ({
    default: module.UserPage,
  })),
);
const EventsPage = lazyWithRetry(() =>
  import("./modules/events/pages/events").then((module) => ({
    default: module.EventsPage,
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
            element: (
              <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
                <ArtsUpdate />
              </ProtectedRoute>
            ),
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
        path: "analogs",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: <Analogs />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "slices",
            element: <AnalogSlices />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "sales",
            element: (
              <ProtectedRoute>
                <SalesPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "stock-comparison",
            element: (
              <ProtectedRoute>
                <StockComparisonPage />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: ":id",
            element: <Analog />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "sku",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "konks",
            element: (
              <ProtectedRoute>
                <Konks />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "konks/:id",
            element: (
              <ProtectedRoute>
                <Konk />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "sku-slices",
            element: (
              <ProtectedRoute>
                <SkuSlices />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "btrade-slices",
            element: (
              <ProtectedRoute>
                <BtradeSlices />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "sales",
            element: (
              <ProtectedRoute>
                <SkuKonkProdSales />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "stock-comparison",
            element: (
              <ProtectedRoute>
                <SkuKonkProdStock />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "statistics",
            element: (
              <ProtectedRoute>
                <SkuStatistics />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "statistics/prod",
            element: (
              <ProtectedRoute>
                <SkuStatisticsProd />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "statistics/skugr",
            element: (
              <ProtectedRoute>
                <SkuStatisticsSkugr />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "skugrs",
            element: (
              <ProtectedRoute>
                <Skugrs />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "competitor-skus",
            element: (
              <ProtectedRoute>
                <CompetitorSkus />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "skugrs/:id",
            element: (
              <ProtectedRoute>
                <Skugr />
              </ProtectedRoute>
            ),
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "skus/:id",
            element: (
              <ProtectedRoute>
                <Sku />
              </ProtectedRoute>
            ),
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
            path: "konks",
            element: <Navigate to="/sku/konks" replace />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "konks/:id",
            element: <RedirectWhKonkDetailToSku />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "constants",
            element: <Navigate to="/admin/constants" replace />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "constants/:id",
            element: <RedirectConstantDetailToAdmin />,
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
            path: "pallets/:title",
            element: <PalletPage />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "users",
        element: <Navigate to="/admin/users" replace />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "users/:id",
        element: <RedirectUserDetailToAdmin />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
            <Outlet />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "users",
            element: <UsersPage />,
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
            path: "constants",
            element: <Constants />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "constants/:id",
            element: <Constant />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "events",
            element: <EventsPage />,
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
          {
            path: "kasks",
            element: <KasksPage />,
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
