import { createBrowserRouter } from "react-router";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: () => <div>Index</div> },
      { path: "arts", 
        children: [
          { index: true, element: <div>Arts</div> },
          { path: "dashboard", element: <div>Dashboard</div> },
          { path: "update", element: <div>Update</div> },
          { path: "utils", element: <div>Utils</div> },
        ],

      },
    ],
  },
]);
