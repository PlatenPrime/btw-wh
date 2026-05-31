import { Loader } from "@/components/shared/feedback/loading-states";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ErrorBoundary } from "@/components/shared/errors";
import "./index.css";
import { Providers } from "@/providers/providers.tsx";
import { router } from "@/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
);
