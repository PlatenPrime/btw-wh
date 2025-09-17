import { Loader } from "@/components/shared/loading-states/loader.tsx";
import { useAuth } from "@/modules/auth/api/hooks/useAuth.ts";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (
    !user &&
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/unauthorized"
  ) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
