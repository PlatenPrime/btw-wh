import { createBrowserRouter } from "react-router";
import App from "./App";
import { Art, Arts, ArtsUpdate, ArtsUtils, Ask, Asks, Defs, Main, Path, Row, Rows, Stock, Stocks, WhUtils, Zones } from "./pages";

export const router = createBrowserRouter([
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
