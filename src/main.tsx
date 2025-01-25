import "@/index.css";
import Router from "@/router.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AllProviders } from "./providers/AllProviders";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllProviders>
      <Router />
    </AllProviders>
  </StrictMode>
);
