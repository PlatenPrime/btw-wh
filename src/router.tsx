// router.tsx
import { createHashRouter } from "react-router";
import { lazy } from "react";

const App = lazy(() => import("./App"));

const Art = lazy(() => import("./pages/art").then(module => ({ default: module.Art })));
const Arts = lazy(() => import("./pages/arts").then(module => ({ default: module.Arts })));
const ArtsUpdate = lazy(() => import("./pages/artsUpdate").then(module => ({ default: module.ArtsUpdate })));
const ArtsUtils = lazy(() => import("./pages/artsUtils").then(module => ({ default: module.ArtsUtils })));

const Ask = lazy(() => import("./pages/ask").then(module => ({ default: module.Ask })));
const Asks = lazy(() => import("./pages/asks").then(module => ({ default: module.Asks })));

const Defs = lazy(() => import("./pages/defs").then(module => ({ default: module.Defs })));
const Main = lazy(() => import("./pages/main").then(module => ({ default: module.Main })));
const Path = lazy(() => import("./pages/path").then(module => ({ default: module.Path })));

const Row = lazy(() => import("./pages/row").then(module => ({ default: module.Row })));
const Rows = lazy(() => import("./pages/rows").then(module => ({ default: module.Rows })));

const Stock = lazy(() => import("./pages/stock").then(module => ({ default: module.Stock })));
const Stocks = lazy(() => import("./pages/stocks").then(module => ({ default: module.Stocks })));

const WhUtils = lazy(() => import("./pages/whUtils").then(module => ({ default: module.WhUtils })));
const Zones = lazy(() => import("./pages/zones").then(module => ({ default: module.Zones })));

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Main },
      {
        path: "arts",
        children: [
          { path: "dashboard", Component: Arts },
          { path: "update", Component: ArtsUpdate },
          { path: "utils", Component: ArtsUtils },
          { path: ":artikul", Component: Art },
        ],
      },
      {
        path: "wh",
        children: [
          { path: "rows", Component: Rows },
          { path: "rows/:row", Component: Row },
          { path: "stocks", Component: Stocks },
          { path: "stocks/:stock", Component: Stock },
          { path: "zones", Component: Zones },
          { path: "utils", Component: WhUtils },
        ],
      },
      {
        path: "refiling",
        children: [
          { path: "asks", Component: Asks },
          { path: "asks/:ask", Component: Ask },
          { path: "defs", Component: Defs },
          { path: "path", Component: Path },
        ],
      },
    ],
  },
]);
