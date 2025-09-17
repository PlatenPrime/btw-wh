import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Loader } from "@/components/shared/loading-states/loader.tsx";
import "./index.css";
import { AuthProvider } from "./modules/auth/providers/auth-provider/auth-provider.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>,
);
